import Popup from '../components/Popup.js'

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._submitButton = this._popup.querySelector('.popup__save')
        this._defaultText = this._submitButton.textContent

        this._popupForm = this._popup.querySelector('.popup__form')
    }

    //ставим слушатель и меняем подпись кнопки
    setEventListeners() {
        super.setEventListeners()
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault()
            this._submitButton.textContent = 'Удаление...'
            this._handleSubmitCallback()
        })
    }

    //возвращаем подпись кнопки обратно
    setLoading() {
        this._submitButton.textContent = this._defaultText
    }

    setSubmitAction(action) {
        this._handleSubmitCallback = action
    }

    open(cardID, card) {
        super.open()
        this._cardID = cardID
        this._card = card
    }
}
