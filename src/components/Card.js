export default class Card {
  constructor({ data, cardSelector, userId, handleCardClick, handleDeleteIconClick, handleSetLike, handleRemoveLike }) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._userId = userId;
    this._cardId = data._id;
    this._cardOwnerId = data.owner._id;
    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._likes = data.likes;
    this._handleSetLike = handleSetLike;
    this._handleRemoveLike = handleRemoveLike;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    // открытие попапа просмотра изображения кликом по изображению
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    })
    // слушатель кнопки удаления карточки
    this._deleteBtn.addEventListener('click', () => {
      this._handleDeleteIconClick(this._cardId);
    })
    // слушатель кнопки лайк
    this._likeBtn.addEventListener('click', () => {
      if (this._likeBtn.classList.contains('card__like-button_active')) {
        this._handleRemoveLike(this._cardId);
      } else {
        this._handleSetLike(this._cardId);
      }
    })
  }

  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.card__image');
    this._likeBtn = this._element.querySelector('.card__like-button');
    this._likesNumber = this._element.querySelector('.card__like-number');
    this._deleteBtn = this._element.querySelector('.card__delete-button');
    this._image.src = this._link;
    this._image.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;
    this._hasDeleteBtn();
    this._isCardLiked();
    this._likesNumber.textContent = this._likes.length;
    this._setEventListeners();

    return this._element;
  }

  _isCardLiked() {
    if (this._likes.some((user) => {
      return this._userId === user._id;
    })) {
      this._likeBtn.classList.add('card__like-button_active');
    }
  }

  handleLikeCard(data) {
    this._likes = data.likes;
    this._likesNumber.textContent = this._likes.length;
    this._likeBtn.classList.toggle('card__like-button_active');
  }

  _hasDeleteBtn() {
    if (this._userId !== this._cardOwnerId) {
      this._deleteBtn.remove();
    }
  }
}
