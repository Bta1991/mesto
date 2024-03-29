// класс Card создает дом элемент карточки, заполяет его
export default class Card {
    constructor(
        templateSelector,
        data,
        handleCardClick,
        handleLikeClick,
        handleDislikeClick,
        userID,
        handleDeleteClick
    ) {
        this._templateSelector = templateSelector
        this._data = data
        this._imageUrl = data.link
        this._imageTitle = data.name
        this._like = data.likes
        this._ownerID = data.owner._id
        this._cardID = data._id
        this._userID = userID
        this._handleCardClick = handleCardClick
        this._handleDeleteClick = handleDeleteClick
        this._handleLikeClick = handleLikeClick
        this._handleDislikeClick = handleDislikeClick
    }

    // _getTemplate получаем шаблон карточки, создает его и возвращает
    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content.querySelector('.element')
            .cloneNode(true)

        return cardElement
    }

    _checkOwner() {
        if (this._userID !== this._ownerID) {
            this._trash.remove()
        }
    }

    removeCard() {
        this._card.remove()
        this._card = null
    }

    _likeCard() {
        if (this._likeButton.classList.contains('element__like_active')) {
            this._handleDislikeClick(this._cardID, this, this._like.length)
        } else {
            this._handleLikeClick(this._cardID, this, this._like.length)
        }
    }

    checkLikesCount(data) {
        this._likeCount.textContent = data.likes.length
        this._likeButton.classList.toggle('element__like_active')
    }

    // _setEventListeners устанавливает слушатели на кнопки лайк и удаления
    _setEventListeners() {
        this._likeButton.addEventListener('click', () => {
            this._likeCard()
        })

        this._trash.addEventListener('click', () => {
            this._handleDeleteClick(this)
        })
        this._photo.addEventListener('click', () => {
            this._handleCardClick(this._imageTitle, this._imageUrl)
        })
    }

    // generateCard создает карточку и возвращает её
    generateCard() {
        //шаблон и селекторы
        this._card = this._getTemplate()
        this._likeButton = this._card.querySelector('.element__like')
        this._trash = this._card.querySelector('.element__trash')
        this._photo = this._card.querySelector('.element__photo')
        this._text = this._card.querySelector('.element__text')
        this._likeCount = this._card.querySelector('.element__like-counter')

        this._likeCount.textContent = this._like.length
        this._photo.src = this._imageUrl
        this._photo.alt = this._imageTitle
        this._text.textContent = this._imageTitle
        this._checkOwner()

        if (this._like.some((data) => data._id === this._userID)) {
            this._likeButton.classList.add('element__like_active')
        }

        this._setEventListeners()

        return this._card
    }
}
