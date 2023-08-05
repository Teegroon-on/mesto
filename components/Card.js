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

    const image = this._element.querySelector('.card__image');
    image.src = this._link;
    image.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;

    this._setEventlisteners();

    return this._element;
  }

  _setEventlisteners() {

    this._element.querySelector('.card__like-button').addEventListener('click', () => this._likeCard());

    this._element.querySelector('.card__image').addEventListener('click', () => this._handleCardClick(this._link, this._name));

    this._element.querySelector('.card__delete-button').addEventListener('click', () => this._handleDelete());
  }

  _likeCard() {
    const likeButton = this._element.querySelector('.card__like-button');

    if (this._isLiked) {
      likeButton.classList.remove('card__like-button_active');
      this._isLiked = false;
    } else {
      likeButton.classList.add('card__like-button_active');
      this._isLiked = true;
    }
  }
  _handleDelete() {
    this._element.remove();
    this._element = null;
  }
}
