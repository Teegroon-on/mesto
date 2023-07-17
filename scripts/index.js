let profilePopup = document.querySelector('.popup_type_edit-profile');
let profileEditBtn = document.querySelector('.profile__button_type_edit');
let profileCancelBtn = profilePopup.querySelector('.popup__cancel-button');
let profileEditForm = profilePopup.querySelector('.popup__form')
let profileNameInput = profilePopup.querySelector('#name-input');
let profileName = document.querySelector('.profile__name');
let profileJobInput = profilePopup.querySelector('#job-input');
let profileJob = document.querySelector('.profile__job');
let addCardButton = document.querySelector('.profile__button_type_add');
let addCardPopup = document.querySelector('.popup_type_add-card');
let addCardForm = addCardPopup.querySelector('.popup__form');
let addCardInputName = addCardPopup.querySelector('#title-input');
let addCardInputLink = addCardPopup.querySelector('#link-input');
let addCardCancelButton = addCardPopup.querySelector('.popup__cancel-button');
let cardsContainer = document.querySelector('.cards');
let scaleImagePopup = document.querySelector('.popup_type_image');
let scaleImagePopupCancelButton = scaleImagePopup.querySelector('.popup__cancel-button');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function toggleOpenedPopup(popup){
  popup.classList.toggle('popup_opened');
}

function generateCard(title, link, start = false) {
  let cardTemplate = document.querySelector('#card').content;
  const element = cardTemplate.querySelector('.card').cloneNode(true);
  const image = element.querySelector('.card__image');
  const likeButton = element.querySelector('.card__like-button');
  const deleteButton = element.querySelector('.card__delete-button');

  image.src = link;
  image.alt = '#';
  element.querySelector('.card__title').textContent = title;

  likeButton.addEventListener('click', () => likeButton.classList.toggle('card__like-button_active'))
  deleteButton.addEventListener('click', () => element.remove());
  image.addEventListener('click', () => {
    scaleImagePopup.querySelector('.popup__image').src = link;
    scaleImagePopup.querySelector('.popup__image-caption').textContent = title;
    toggleOpenedPopup(scaleImagePopup)
  });

  if(start){
    cardsContainer.prepend(element);
  }
  else{
    cardsContainer.append(element);
  }
}

function initialRender() {
  initialCards.forEach((item) => {
    generateCard(item.name, item.link);
  })
}

profileEditBtn.addEventListener('click', function () {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  toggleOpenedPopup(profilePopup)
});

addCardForm.addEventListener('submit', (e) =>{
  e.preventDefault()
  generateCard(addCardInputName.value, addCardInputLink.value, true)
  addCardInputName.value = '';
  addCardInputLink.value = '';
  toggleOpenedPopup(addCardPopup);
})

profileCancelBtn.addEventListener('click', () => toggleOpenedPopup(profilePopup));
addCardButton.addEventListener('click', () => toggleOpenedPopup(addCardPopup));
addCardCancelButton.addEventListener('click', () => toggleOpenedPopup(addCardPopup));
scaleImagePopupCancelButton.addEventListener('click', () => toggleOpenedPopup(scaleImagePopup))

profileEditForm.addEventListener('submit', function (e) {
  e.preventDefault()
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  profileNameInput.value = '';
  profileJobInput.value = '';
  toggleOpenedPopup(profilePopup)
});

initialRender()


