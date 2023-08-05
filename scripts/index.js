import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import {initialCards} from "../utils/initialCards.js";
import {formSelectors,cardTemplateSelector} from "../utils/constants.js";

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
const scaleImagePopupCancelButton = scaleImagePopup.querySelector('.popup__cancel-button');
const formValidators = {};
const cards = [];

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', escapeKeyHandler);
  const formElement = popup.querySelector(formSelectors.formSelector);
  if(formElement){
    formValidators[formElement.getAttribute('name')].hideErrors();
    formValidators[formElement.getAttribute('name')].disableButtonState();
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', escapeKeyHandler);
}

function validateForms (formSelectors) {
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
    scaleImagePopup.querySelector('.popup__image').src = imageLink;
    scaleImagePopup.querySelector('.popup__image').alt = text;
    scaleImagePopup.querySelector('.popup__image-caption').textContent = text;
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
  removeEnterSubmitEventListeners(addCardPopup);
  closePopup(addCardPopup);
}

function handleClickOverlay(evt, popup) {
  if (evt.target === evt.currentTarget) {
    closePopup(popup);
  }
}

const enterKeyHandler = (evt) => {
  if (evt.key === 'Enter') {
    handleAddCard(evt);
  }
}

const escapeKeyHandler = (evt) => {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened')
    closePopup(popup)
  }
}

const setEnterSubmitEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('keydown', enterKeyHandler);
  });
}

const removeEnterSubmitEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  inputList.forEach((inputElement) => {
    inputElement.removeEventListener('keydown', enterKeyHandler);
  });
}

profileEditBtn.addEventListener('click', function () {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  setEnterSubmitEventListeners(profilePopup);
  openPopup(profilePopup);
});
addCardForm.addEventListener('submit', handleAddCard);

profileCancelBtn.addEventListener('click', () => {
  removeEnterSubmitEventListeners(profilePopup);
  closePopup(profilePopup);
});
addCardButton.addEventListener('click', () => {
  setEnterSubmitEventListeners(addCardPopup);
  openPopup(addCardPopup);
});
addCardCancelButton.addEventListener('click', () => {
  removeEnterSubmitEventListeners(addCardPopup);
  closePopup(addCardPopup);
});
scaleImagePopupCancelButton.addEventListener('click', () => closePopup(scaleImagePopup));
profileEditForm.addEventListener('submit', function (e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  profileEditForm.reset();
  removeEnterSubmitEventListeners(profilePopup);
  closePopup(profilePopup);
});
profilePopup.addEventListener('mousedown', (evt) => {
  removeEnterSubmitEventListeners(profilePopup);
  handleClickOverlay(evt, profilePopup)
});
addCardPopup.addEventListener('mousedown', (evt) => {
  removeEnterSubmitEventListeners(addCardPopup);
  handleClickOverlay(evt, addCardPopup);
});
scaleImagePopup.addEventListener('mousedown', (evt) => {
  handleClickOverlay(evt, scaleImagePopup);
})

initialRender();
validateForms(formSelectors)

