//import initialCards from "../utils/initialCards";

let profilePopup = document.querySelector('.popup_type_edit-profile');
let profileEditBtn = document.querySelector('.profile__button_type_edit');
let profileCancelBtn = profilePopup.querySelector('.popup__cancel-button');
let profileEditForm = profilePopup.querySelector('.popup__form')
let profileNameInput = profilePopup.querySelector('#name-input');
let profileName = document.querySelector('.profile__name');
let profileJobInput = profilePopup.querySelector('#job-input');
let profileJob = document.querySelector('.profile__job');
let likeButtons = document.querySelectorAll('.card__like-button');
let addCardButton = document.querySelector('.profile__button_type_add');
let addCardPopup = document.querySelector('.popup_type_add-card');
let addCardCancelButton = addCardPopup.querySelector('.popup__cancel-button');


function toggleOpenedPopup(popup){
  popup.classList.toggle('popup_opened');
}

profileEditBtn.addEventListener('click', function () {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  toggleOpenedPopup(profilePopup)
});

profileCancelBtn.addEventListener('click', () => toggleOpenedPopup(profilePopup));
addCardButton.addEventListener('click', () => toggleOpenedPopup(addCardPopup));
addCardCancelButton.addEventListener('click', () => toggleOpenedPopup(addCardPopup));

profileEditForm.addEventListener('submit', function (e) {
  e.preventDefault()
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  profileNameInput.value = '';
  profileJobInput.value = '';
  toggleOpenedPopup(profilePopup)
});

for(let i = 0; i < likeButtons.length; i++){
  likeButtons[i].addEventListener('click', function (){
    likeButtons[i].classList.toggle('card__like-button_active')
  })
}


