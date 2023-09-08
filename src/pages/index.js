import './index.css';
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo";
import Card from "../components/Card.js";
import {
  addCardButton,
  avatar,
  buttonEditAvatar, cardTemplateSelector,
  formAddCardElement,
  formEditAvatarElement,
  formEditProfileElement,
  formSelectors,
  profileEditBtn,
  profileJobInput,
  profileNameInput
} from "../utils/constants.js";
import Api from "../components/Api";
import PopupWithConfirmation from "../components/PopupWithConfirmation";


const formValidators = {};

/* ---------- API ----------- */
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-74',
  headers: {
    authorization: 'b248be84-0eef-477e-9108-228b62f4c697',
    'Content-Type': 'application/json'
  }
});
let userId;

const user = new UserInfo({
  name: '.profile__name',
  about: '.profile__job',
  avatar: '.profile__avatar'
});

const editProfilePopup = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  handleFormSubmit: (dataForm) => {
    editProfilePopup.setIsLoading(true);
    api.editUserInfo(dataForm)
      .then((dataForm) => {
        user.setUserInfo(dataForm);
        editProfilePopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        editProfilePopup.setIsLoading(false);
      });
  }
});
editProfilePopup.setEventListeners();

const editAvatarPopup = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  handleFormSubmit: (data) => {
    editAvatarPopup.setIsLoading(true);
    api.editAvatar(data)
      .then((data) => {
        user.setUserAvatar(data.avatar)
        editAvatarPopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        editAvatarPopup.setIsLoading(false);
      });
  }
});
editAvatarPopup.setEventListeners();

const addCardPopup = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  handleFormSubmit: (dataForm) => {
    addCardPopup.setIsLoading(true);
    api.addCard(dataForm)
      .then((formData) => {
        cardsSection.addItem(createCard(formData));
        addCardPopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        addCardPopup.setIsLoading(false);
      });
  }
});
addCardPopup.setEventListeners();

const scaleImagePopup = new PopupWithImage('.popup_type_image')
scaleImagePopup.setEventListeners();


function validateForms(formSelectors) {
  const formElements = Array.from(document.querySelectorAll(formSelectors.formSelector));
  formElements.forEach(formElement => {
    const formValidator = new FormValidator(formSelectors, formElement);
    formValidators[formElement.getAttribute('name')] = formValidator;
    formValidator.enableValidation();
  });
}

const createCard = (data) => {
  const card = new Card({
    data: data,
    cardSelector: cardTemplateSelector,
    userId: userId,
    handleCardClick: (name, link) => {
      viewImagePopup.open(name, link);
    },
    handleDeleteIconClick: (cardId) => {
      deleteCardPopup.open();
      deleteCardPopup.submitCallback(() => {
        api.deleteCard(cardId)
          .then(() => {
            deleteCardPopup.close();
            card.deleteCard();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      });
    },
    handleSetLike: (cardId) => {
      api.setLike(cardId)
        .then((data) => {
          card.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
    handleRemoveLike: (cardId) => {
      api.deleteLike(cardId)
        .then((data) => {
          card.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  });
  return card.generateCard();
};


const cardsSection = new Section({
  renderer: (card) => {
    cardsSection.addItem(createCard(card));
  },
}, '.cards');

const deleteCardPopup = new PopupWithConfirmation({
  popupSelector: '.popup_type_delete-card'
});
deleteCardPopup.setEventListeners();

const viewImagePopup = new PopupWithImage('.popup_type_image');
viewImagePopup.setEventListeners();

function handleEditBtnClick() {
  const userInfo = user.getUserInfo()
  profileNameInput.value = userInfo.name;
  profileJobInput.value = userInfo.about;

  formValidators[formEditProfileElement.getAttribute('name')].hideErrors();
  formValidators[formEditProfileElement.getAttribute('name')].disableButtonState();
  editProfilePopup.open()
}

function handleEditAvatarBtnClick() {
  formValidators[formEditAvatarElement.getAttribute('name')].hideErrors();
  formValidators[formEditAvatarElement.getAttribute('name')].disableButtonState();
  editAvatarPopup.open();
}

function handleAddCardBtnClick() {
  formValidators[formAddCardElement.getAttribute('name')].hideErrors();
  formValidators[formAddCardElement.getAttribute('name')].disableButtonState();
  addCardPopup.open()
}

profileEditBtn.addEventListener('click', handleEditBtnClick);
addCardButton.addEventListener('click', handleAddCardBtnClick);
buttonEditAvatar.addEventListener('click', handleEditAvatarBtnClick);

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initialCards, userData]) => {
    user.setUserInfo(userData);
    userId = userData._id;
    cardsSection.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

validateForms(formSelectors)

