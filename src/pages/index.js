import './index.css';
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo";
import Card from "../components/Card.js";
import {initialCards} from "../utils/initialCards.js";
import {
  cardTemplateSelector,
  formSelectors,
  profileEditBtn,
  profileNameInput,
  profileJobInput,
  addCardButton,
  formEditProfileElement,
  formAddCardElement
} from "../utils/constants.js";


const formValidators = {};

const user = new UserInfo('.profile__name', '.profile__job')

const editProfilePopup = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  handleFormSubmit: (dataForm) => {
    editProfilePopup.setIsLoading(true);

    user.setUserInfo({
      username: dataForm.name,
      job: dataForm.job
    })

    editProfilePopup.close();
    editProfilePopup.setIsLoading(false);
  }
});
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  handleFormSubmit: (dataForm) => {
    addCardPopup.setIsLoading(true);
    cardsSection.addItem(createCard({name: dataForm.name, link: dataForm.link}))
    addCardPopup.close();
    addCardPopup.setIsLoading(false);
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
  const card = new Card(
    data,
    cardTemplateSelector,
    (name, link) => {
      scaleImagePopup.open(name, link);
    });
  return card.generateCard();
};


const cardsSection = new Section({
  renderer: (card) => {
    cardsSection.addItem(createCard(card));
  },
}, '.cards');


function renderInitialCards() {
  cardsSection.renderItems(initialCards)
}

function handleEditBtnClick() {
  const userInfo = user.getUserInfo()
  profileNameInput.value = userInfo.username;
  profileJobInput.value = userInfo.job;

  formValidators[formEditProfileElement.getAttribute('name')].hideErrors();
  formValidators[formEditProfileElement.getAttribute('name')].disableButtonState();
  editProfilePopup.open()
}

function handleAddCardBtnClick() {
  formValidators[formAddCardElement.getAttribute('name')].hideErrors();
  formValidators[formAddCardElement.getAttribute('name')].disableButtonState();
  addCardPopup.open()
}

profileEditBtn.addEventListener('click', handleEditBtnClick);
addCardButton.addEventListener('click', handleAddCardBtnClick);


renderInitialCards();
validateForms(formSelectors)

