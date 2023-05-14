import Popup from '../components/Popup.js'

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector)
        this._handleFormSubmit = handleFormSubmit
        this._form = this._popup.querySelector('.popup__form')
        this._inputList = this._form.querySelectorAll('.popup__input')
        this._submitButton = this._popup.querySelector('.popup__save')
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
            // перед запросом сохраняем изначальный текст кнопки
            const initialText = this._submitButton.textContent
            // меняем его, чтобы показать пользователю ожидание
            this._submitButton.textContent = 'Сохранение...'
            this._handleFormSubmit(this._getInputValues())
                .then(() => this.close()) // закрывается попап в `then`
                .catch((err) => {
                    console.log(err)
                })
                .finally(() => {
                    this._submitButton.textContent = initialText
                })
        })
    }


    close() {
        super.close()
        this._form.reset()
    }
}
