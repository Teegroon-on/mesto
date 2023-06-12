document.querySelector('.profile__button_type_edit').addEventListener('click', function () {
  document.querySelector('#name-input').value = document.querySelector('.profile__name').textContent;
  document.querySelector('#job-input').value = document.querySelector('.profile__job').textContent;
  document.querySelector('.popup').classList.toggle('popup_opened');
});

document.querySelector('.popup__cancel-button').addEventListener('click', function (){
  document.querySelector('.popup').classList.toggle('popup_opened');
});

document.querySelector('.popup__save-button').addEventListener('click', function (e) {
  e.preventDefault()
  document.querySelector('.profile__name').textContent = document.querySelector('#name-input').value;
  document.querySelector('.profile__job').textContent = document.querySelector('#job-input').value;
  document.querySelector('.popup').classList.toggle('popup_opened');
});

let likeButtons = document.querySelectorAll('.card__like-button');
for(let i = 0; i < likeButtons.length; i++){
  likeButtons[i].addEventListener('click', function (){
    likeButtons[i].classList.toggle('card__like-button_active')
  })
}
