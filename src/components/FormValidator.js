export default class FormValidator {

  constructor (formClasses, formElement) {

    this._formElement = formElement;
    this._inputSelector = formClasses.inputSelector;
    this._submitButtonSelector = formClasses.submitButtonSelector;
    this._inactiveButtonClass = formClasses.inactiveButtonClass;
    this._inputErrorClass = formClasses.inputErrorClass;
    this._errorClass = formClasses.errorClass;

    this._inputElements = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  enableValidation () {
      this._setEventListeners();
  }


  _setEventListeners () {
    this._inputElements.forEach( inputElement => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });


    this._toggleButtonState();
  }

  _isValid (inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement, inputElement.validationMessage);
    }
  }

  _showInputError (inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  hideErrors() {
    this._inputElements.forEach(input => {
      this._hideInputError (input);
    });
  }

  _toggleButtonState () {
    if (this._hasInvalidInput()) {
      this.disableButtonState();
    } else {
      this._enableButtonState();
    }
  }

  disableButtonState () {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  _enableButtonState () {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  }


  _hasInvalidInput () {
    return this._inputElements.some( inputElement => !inputElement.validity.valid);
  }
}
