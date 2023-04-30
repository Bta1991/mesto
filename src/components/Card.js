// класс Card создает дом элемент карточки, заполяет его
export class Card {
    constructor({ templateSelector, data, handleCardClick }) {
        this._templateSelector = templateSelector
        this._imageUrl = data.picurl
        this._imageTitle = data.picname
        this._handleCardClick = handleCardClick
        this._card = this._getTemplate()
        this._like = this._card.querySelector('.element__like')
        this._trash = this._card.querySelector('.element__trash')
        this._photo = this._card.querySelector('.element__photo')
        this._text = this._card.querySelector('.element__text')
    }

    // _getTemplate получаем шаблон карточки, создает его и возвращает
    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content.cloneNode(true)
        return cardElement
    }

    // _handleLikeClick обработка кнопки лайк
    _handleLikeClick(likeButton) {
        likeButton.classList.toggle('element__like_active')
    }

    // _handleDeleteClick обработка кнопки удаления
    _handleDeleteClick(trashButton) {
        trashButton.closest('.element').remove()
    }

    // _setEventListeners устанавливает слушатели на кнопки лайк и удаления
    _setEventListeners() {
        this._like.addEventListener('click', (evt) => {
            this._handleLikeClick(evt.target)
        })
        this._trash.addEventListener('click', (evt) => {
            this._handleDeleteClick(evt.target)
        })
        this._photo.addEventListener('click', () => {
            this._handleCardClick(this._imageTitle, this._imageUrl)
        })
    }

    // generateCard создает карточку и возвращает её
    generateCard() {
        this._photo.src = this._imageUrl
        this._photo.alt = this._imageTitle
        this._text.textContent = this._imageTitle
        this._setEventListeners()
        return this._card
    }
}
