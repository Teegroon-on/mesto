import './index.css';
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Card from "../components/Card.js";
import {initialCards} from "../utils/initialCards.js";
import {cardTemplateSelector, formSelectors} from "../utils/constants.js";


const profilePopupElement = document.querySelector('.popup_type_edit-profile');
const profileEditBtn = document.querySelector('.profile__button_type_edit');
const profileNameInput = profilePopupElement.querySelector('#name-input');
const profileName = document.querySelector('.profile__name');
const profileJobInput = profilePopupElement.querySelector('#job-input');
const profileJob = document.querySelector('.profile__job');
const addCardButton = document.querySelector('.profile__button_type_add');
const addCardPopupElement = document.querySelector('.popup_type_add-card');
const formValidators = {};

const editProfilePopup = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  handleFormSubmit: (dataForm) => {
    editProfilePopup.loading(true);
    profileName.textContent = dataForm.name;
    profileJob.textContent = dataForm.job;
    editProfilePopup.close();
    editProfilePopup.loading(false);
  }
});
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  handleFormSubmit: (dataForm) => {
    addCardPopup.loading(true);
    cardsList.addItem(renderCard({name: dataForm.name, link: dataForm.link}))
    addCardPopup.close();
    addCardPopup.loading(false);
  }
});
addCardPopup.setEventListeners();

const scaleImagePopup = new PopupWithImage('.popup_type_image')
scaleImagePopup.setEventListeners();


function validateForms(formSelectors) {
  const formElements = Array.from(document.querySelectorAll(formSelectors.formSelector));
  formElements.forEach(formElement => {
    const form = new FormValidator(formSelectors, formElement);
    formValidators[formElement.getAttribute('name')] = form;
    form.enableValidation();
  });
}

const renderCard = (data) => {
  const card = new Card(
    data,
    cardTemplateSelector,
    (name, link) => {
    scaleImagePopup.open(name, link);
  });
  return card.generateCard();
};


const cardsList = new Section({
  renderer: (card) => {
    cardsList.addItem(renderCard(card));
  },
}, '.cards');


function initialRender() {
  cardsList.renderItems(initialCards)
}

profileEditBtn.addEventListener('click', function () {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  const formElement = profilePopupElement.querySelector(formSelectors.formSelector);
  formValidators[formElement.getAttribute('name')].hideErrors();
  formValidators[formElement.getAttribute('name')].disableButtonState();
  editProfilePopup.open()
});
addCardButton.addEventListener('click', () => {

  const formElement = addCardPopupElement.querySelector(formSelectors.formSelector);
  console.log('kek')
  formValidators[formElement.getAttribute('name')].hideErrors();
  formValidators[formElement.getAttribute('name')].disableButtonState();
  addCardPopup.open()
});


initialRender();
validateForms(formSelectors)

