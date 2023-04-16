// класс Card создает дом элемент карточки, заполяет его
export class Card {
    constructor(templateSelector, data, handleCardClick) {
        this._templateSelector = templateSelector
        this._image = data.link
        this._title = data.name
        this._handleCardClick = handleCardClick
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
        this._card
            .querySelector('.element__like')
            .addEventListener('click', (evt) => {
                this._handleLikeClick(evt.target)
            })
        this._card
            .querySelector('.element__trash')
            .addEventListener('click', (evt) => {
                this._handleDeleteClick(evt.target)
            })
        this._card
            .querySelector('.element__photo')
            .addEventListener('click', () => {
                this._handleCardClick(this._title, this._image)
            })
    }

    // generateCard создает карточку и возвращает её
    generateCard() {
        this._card = this._getTemplate()
        this._card.querySelector('.element__photo').src = this._image
        this._card.querySelector('.element__photo').alt = this._title
        this._card.querySelector('.element__text').textContent = this._title
        this._setEventListeners()
        return this._card
    }
}
