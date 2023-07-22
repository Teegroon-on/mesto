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
function openPopup(popup){
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', escapeKeyHandler);
}

function closePopup(popup){
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', escapeKeyHandler);
}

function handleLikeClick(element){
  element.classList.toggle('card__like-button_active');
}

function handleDeleteCard(element){
  element.remove();
}

function generateCard(cardData) {
  const cardTemplate = document.querySelector('#card').content;
  const element = cardTemplate.querySelector('.card').cloneNode(true);
  const image = element.querySelector('.card__image');
  const likeButton = element.querySelector('.card__like-button');
  const deleteButton = element.querySelector('.card__delete-button');

  image.src = cardData.link;
  image.alt = cardData.title;
  element.querySelector('.card__title').textContent = cardData.title;

  likeButton.addEventListener('click', () => handleLikeClick(likeButton))
  deleteButton.addEventListener('click', () => handleDeleteCard(element));
  image.addEventListener('click', () => {
    scaleImagePopup.querySelector('.popup__image').src = cardData.link;
    scaleImagePopup.querySelector('.popup__image').alt = cardData.title;
    scaleImagePopup.querySelector('.popup__image-caption').textContent = cardData.title;
    openPopup(scaleImagePopup);
  });

  return element;
}
function addCard(title, link){
  cardsContainer.prepend(generateCard({title, link}));
}
function initialRender() {
  initialCards.forEach((item) => {
     cardsContainer.append(generateCard({title: item.name, link: item.link}));
  })
}

function handleClickOverlay(evt, popup){
  if (evt.target === evt.currentTarget){
    closePopup(popup);
  }
}

function handleAddCard(evt){
  evt.preventDefault()
  addCard(addCardInputName.value, addCardInputLink.value)
  addCardForm.reset()
  removeEnterSubmitEventListeners(addCardPopup);
  closePopup(addCardPopup);
}
const enterKeyHandler = (evt) => {
  if (evt.key === 'Enter') {
    handleAddCard(evt);
  }
}

const escapeKeyHandler = (evt) => {
  if(evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened')
    closePopup(popup)
  }
}

const setEnterSubmitEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  inputList.forEach((inputElement) =>{
    inputElement.addEventListener('keydown', (evt) => enterKeyHandler(evt));
  });
}

const removeEnterSubmitEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  inputList.forEach((inputElement) => {
    inputElement.removeEventListener('keydown', (evt) => enterKeyHandler(evt));
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
  const isValid = hasInvalidInput(addCardForm)
  !isValid && addCardForm.reset()
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
});;
addCardPopup.addEventListener('mousedown', (evt) => {
  removeEnterSubmitEventListeners(addCardPopup);
  handleClickOverlay(evt, addCardPopup);
});
scaleImagePopup.addEventListener('mousedown', (evt) => {
  handleClickOverlay(evt, scaleImagePopup);
})

initialRender();


