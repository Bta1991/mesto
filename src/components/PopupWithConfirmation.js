import Popup from './Popup.js'

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handleDeleteSubmit) {
        super(popupSelector)
        // this._form = this._popup.querySelector('.popup__form')
        this._handleDeleteSubmit = handleDeleteSubmit
        this._submitButton = this._popup.querySelector('.popup__save')
        this._defaultText = this._submitButton.textContent
    }

    //ставим слушатель и меняем подпись кнопки
    setEventListeners() {
        super.setEventListeners()
        this._submitButton.addEventListener('click', (evt) => {
            evt.preventDefault()
            this._submitButton.textContent = 'Удаление...'
            this._handleDeleteSubmit(this._cardID, this._card)
        })
    }

    // возвращаем подпись кнопки обратно
    setLoading() {
        this._submitButton.textContent = this._defaultText
    }

    open(cardID, card) {
        super.open()
        this._cardID = cardID
        this._card = card
    }
}
