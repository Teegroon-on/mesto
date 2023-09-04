export const cardTemplateSelector = '#card';

const formSelector = '.popup__form';
const inputSelector = '.popup__input';
const submitButtonSelector = '.popup__save-button';
const inactiveButtonClass = 'popup__save-button_disabled';
const inputErrorClass = 'popup__input_type_error';
const errorClass = 'popup__input-error_visible';
export const formSelectors = {
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
};

export const profilePopupElement = document.querySelector('.popup_type_edit-profile');
export const profileEditBtn = document.querySelector('.profile__button_type_edit');
export const profileNameInput = profilePopupElement.querySelector('#name-input');
export const profileJobInput = profilePopupElement.querySelector('#job-input');
export const addCardButton = document.querySelector('.profile__button_type_add');
export const addCardPopupElement = document.querySelector('.popup_type_add-card');
export const formEditProfileElement = profilePopupElement.querySelector(formSelectors.formSelector);
export const formAddCardElement = addCardPopupElement.querySelector(formSelectors.formSelector);
