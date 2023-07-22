function showInputError(formElement, inputElement, errorMessage, classErrorList) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(classErrorList.classInputError);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(classErrorList.classInputErrorVisible);
}

function hideInputError(formElement, inputElement, classErrorList) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(classErrorList.classInputError);
  errorElement.classList.remove(classErrorList.classInputErrorVisible);
  errorElement.textContent = '';
}

function checkInputValidity(formElement, inputElement, classErrorList) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, classErrorList);
  } else {
    hideInputError(formElement, inputElement, classErrorList);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, className) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(className);
  } else {
    buttonElement.removeAttribute('disabled', true);
    buttonElement.classList.remove(className);
  }
}

function setEventListeners(formElement, classList) {
  const inputList = Array.from(formElement.querySelectorAll(classList.classInput));
  const buttonElement = formElement.querySelector(classList.classSaveBtn);
  const classErrorList = {
    classInputError: classList.classInputError,
    classInputErrorVisible: classList.classInputErrorVisible
  }
  toggleButtonState(inputList, buttonElement, classList.classSaveBtnDisabled);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, classErrorList);
      toggleButtonState(inputList, buttonElement, classList.classSaveBtnDisabled);
    });
  });
}

function enableValidation(classNames) {
  const formList = Array.from(document.querySelectorAll(classNames.classForm));
  const classList = {...classNames};
  delete classList.classForm;

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, classList);
  });
}

enableValidation({
  classForm: '.popup__form',
  classSaveBtn: '.popup__save-button',
  classInput: '.popup__input',
  classSaveBtnDisabled: 'popup__save-button_disabled',
  classInputError: 'popup__input_type_error',
  classInputErrorVisible: 'popup__input-error_visible'
});
