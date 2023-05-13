import Popup from '../components/Popup.js'

export default class PopupWithForm extends Popup {
    constructor( popupSelector, handleFormSubmit ) {
        super(popupSelector)
        this._handleFormSubmit = handleFormSubmit
        this._form = this._popup.querySelector('.popup__form')
        this._inputList = this._form.querySelectorAll('.popup__input')
        this._submitButton = this._popup.querySelector('.popup__save')
        this._defaultText = this._submitButton.textContent
    }

    _getInputValues() {
        const inputValues = {}
        this._inputList.forEach(
            (input) => (inputValues[input.name] = input.value)
        )
        return inputValues
    }

    setEventListeners() {
        super.setEventListeners()
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault()
            this._submitButton.textContent = 'Сохранение...'
            this._handleFormSubmit(this._getInputValues())
            this.close()
        })
    }

    setLoading() {
        this._submitButton.textContent = this._defaultText
    }

    close() {
        super.close()
        this._form.reset()
    }
}
