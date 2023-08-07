import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import {initialCards} from "../utils/initialCards.js";
import {formSelectors, cardTemplateSelector} from "../utils/constants.js";

const profilePopup = document.querySelector('.popup_type_edit-profile');
const profileEditBtn = document.querySelector('.profile__button_type_edit');
const profileCancelBtn = profilePopup.querySelector('.popup__cancel-button');
const profileEditForm = profilePopup.querySelector('.popup__form')
const profileNameInput = profilePopup.querySelector('#name-input');
const profileName = document.querySelector('.profile__name');
const profileJobInput = profilePopup.querySelector('#job-input');
const profileJob = document.querySelector('.profile__job');
const addCardButton = document.querySelector('.profile__button_type_add');
const addCardPopup = document.querySelector('.popup_type_add-card');
const addCardForm = addCardPopup.querySelector('.popup__form');
const addCardInputName = addCardPopup.querySelector('#title-input');
const addCardInputLink = addCardPopup.querySelector('#link-input');
const addCardCancelButton = addCardPopup.querySelector('.popup__cancel-button');
const cardsContainer = document.querySelector('.cards');
const scaleImagePopup = document.querySelector('.popup_type_image');
const scaleImagePopupImage = scaleImagePopup.querySelector('.popup__image');
const scaleImagePopupCaption = scaleImagePopup.querySelector('.popup__image-caption');
const scaleImagePopupCancelButton = scaleImagePopup.querySelector('.popup__cancel-button');
const formValidators = {};
const cards = [];

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', escapeKeyHandler);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', escapeKeyHandler);
}

function validateForms(formSelectors) {
  const formElements = Array.from(document.querySelectorAll(formSelectors.formSelector));
  formElements.forEach(formElement => {
    const form = new FormValidator(formSelectors, formElement);
    formValidators[formElement.getAttribute('name')] = form;
    form.enableValidation();
  });
}

function renderCard(data) {
  const card = new Card(data, cardTemplateSelector, handleCardClick);
  cards.push(card);
  return card.generateCard();
}

function handleCardClick(imageLink, text) {
  scaleImagePopupImage.src = imageLink;
  scaleImagePopupImage.alt = text;
  scaleImagePopupCaption.textContent = text;
  openPopup(scaleImagePopup);
}

function initialRender() {
  initialCards.forEach((item) => {
    cardsContainer.append(renderCard(item))
  })
}

function handleAddCard(evt) {
  evt.preventDefault()
  cardsContainer.prepend(renderCard({name: addCardInputName.value, link: addCardInputLink.value}))
  addCardForm.reset()
  closePopup(addCardPopup);
}

function handleClickOverlay(evt, popup) {
  if (evt.target === evt.currentTarget) {
    closePopup(popup);
  }
}

const escapeKeyHandler = (evt) => {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened')
    closePopup(popup)
  }
}

profileEditBtn.addEventListener('click', function () {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;;
  const formElement = profilePopup.querySelector(formSelectors.formSelector);
  formValidators[formElement.getAttribute('name')].hideErrors();
  formValidators[formElement.getAttribute('name')].disableButtonState();
  openPopup(profilePopup);
});
addCardForm.addEventListener('submit', handleAddCard);

profileCancelBtn.addEventListener('click', () => {
  closePopup(profilePopup);
});
addCardButton.addEventListener('click', () => {
  const formElement = addCardPopup.querySelector(formSelectors.formSelector);
  formValidators[formElement.getAttribute('name')].hideErrors();
  formValidators[formElement.getAttribute('name')].disableButtonState();
  openPopup(addCardPopup);
});
addCardCancelButton.addEventListener('click', () => {
  closePopup(addCardPopup);
});
scaleImagePopupCancelButton.addEventListener('click', () => closePopup(scaleImagePopup));
profileEditForm.addEventListener('submit', function (e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  profileEditForm.reset();
  closePopup(profilePopup);
});
profilePopup.addEventListener('mousedown', (evt) => {
  handleClickOverlay(evt, profilePopup)
});
addCardPopup.addEventListener('mousedown', (evt) => {
  handleClickOverlay(evt, addCardPopup);
});
scaleImagePopup.addEventListener('mousedown', (evt) => {
  handleClickOverlay(evt, scaleImagePopup);
})

initialRender();
validateForms(formSelectors)

