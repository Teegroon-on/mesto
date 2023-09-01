export default class Card {
  constructor(
    {name, link},
    templateSelector,
    handleCardClick) {
    this._name = name;
    this._link = link;
    this._isLiked = false;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;

  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.card__like-button');
    this._cardImage = this._element.querySelector('.card__image');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;

    this._setEventlisteners();

    return this._element;
  }

  _setEventlisteners() {

    this._likeButton.addEventListener('click', () => this._likeCard());

    this._cardImage.addEventListener('click', () => this._handleCardClick(this._link, this._name));

    this._element.querySelector('.card__delete-button').addEventListener('click', () => this._handleDelete());
  }

  _likeCard() {

    if (this._isLiked) {
      this._likeButton.classList.remove('card__like-button_active');
      this._isLiked = false;
    } else {
      this._likeButton.classList.add('card__like-button_active');
      this._isLiked = true;
    }
  }
  _handleDelete() {
    this._element.remove();
    this._element = null;
  }
}
