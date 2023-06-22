let profileEditBtn = document.querySelector('.profile__button_type_edit');
let profileCancelBtn = document.querySelector('.popup__cancel-button');
let profileEditForm = document.querySelector('.popup__form')
let profileNameInput = document.querySelector('#name-input');
let profileName = document.querySelector('.profile__name');
let profileJobInput = document.querySelector('#job-input');
let profileJob = document.querySelector('.profile__job');
let likeButtons = document.querySelectorAll('.card__like-button');
let profilePopup = document.querySelector('.popup');

function toggleOpenedProfilePopup(){
  profilePopup.classList.toggle('popup_opened');
}

profileEditBtn.addEventListener('click', function () {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  toggleOpenedProfilePopup()
});

profileCancelBtn.addEventListener('click', toggleOpenedProfilePopup);

profileEditForm.addEventListener('submit', function (e) {
  e.preventDefault()
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  profileNameInput.value = '';
  profileJobInput.value = '';
  toggleOpenedProfilePopup()
});

for(let i = 0; i < likeButtons.length; i++){
  likeButtons[i].addEventListener('click', function (){
    likeButtons[i].classList.toggle('card__like-button_active')
  })
}
