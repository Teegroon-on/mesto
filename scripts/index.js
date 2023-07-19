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
}

function closePopup(popup){
  popup.classList.remove('popup_opened');
}

function handleLikeClick(element){
  element.classList.toggle('card__like-button_active');
}

function handleDeleteCard(element){
  element.remove();
}

function generateCard(title, link) {
  const cardTemplate = document.querySelector('#card').content;
  const element = cardTemplate.querySelector('.card').cloneNode(true);
  const image = element.querySelector('.card__image');
  const likeButton = element.querySelector('.card__like-button');
  const deleteButton = element.querySelector('.card__delete-button');

  image.src = link;
  image.alt = title;
  element.querySelector('.card__title').textContent = title;

  likeButton.addEventListener('click', () => handleLikeClick(likeButton))
  deleteButton.addEventListener('click', () => handleDeleteCard(element));
  image.addEventListener('click', () => {
    scaleImagePopup.querySelector('.popup__image').src = link;
    scaleImagePopup.querySelector('.popup__image-caption').textContent = title;
    openPopup(scaleImagePopup);
  });

  return element;
}

function addCard(title, link){
  cardsContainer.prepend(generateCard(title, link));
}

function initialRender() {
  initialCards.forEach((item) => {
     cardsContainer.append(generateCard(item.name, item.link));
  })
}

profileEditBtn.addEventListener('click', function () {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  openPopup(profilePopup);
});

addCardForm.addEventListener('submit', (e) =>{
  e.preventDefault()
  addCard(addCardInputName.value, addCardInputLink.value)
  addCardForm.reset()
  closePopup(addCardPopup);
})

profileCancelBtn.addEventListener('click', () => closePopup(profilePopup));
addCardButton.addEventListener('click', () => openPopup(addCardPopup));
addCardCancelButton.addEventListener('click', () => closePopup(addCardPopup));
scaleImagePopupCancelButton.addEventListener('click', () => closePopup(scaleImagePopup))

profileEditForm.addEventListener('submit', function (e) {
  e.preventDefault()
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  profileEditForm.reset()
  closePopup(profilePopup);
});

initialRender()


