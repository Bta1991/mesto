export class FormValidator {
    constructor(object, formElement) {
        this._formElement = formElement
        this._inputSelector = object.inputSelector
        this._submitButtonSelector = object.submitButtonSelector
        this._inactiveButtonClass = object.inactiveButtonClass
        this._inputErrorClass = object.inputErrorClass
        this._errorClass = object.errorClass
    }

    // методы
    //проверяем валидность
    _hasInvalidInput(inputElement) {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid
        })
    }
    // переключаем кнопки
    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._inactiveButtonClass)
            this._buttonElement.setAttribute('disabled', true)
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass)
            this._buttonElement.removeAttribute('disabled', true)
        }
    }
    // показываем сообщение об ошибке
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(
            `#${inputElement.id}-error`
        )
        inputElement.classList.add(this._inputErrorClass)
        errorElement.textContent = errorMessage
        errorElement.classList.add(this._errorClass)
    }

    //скрыть сообщение об ошибках
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(
            `#${inputElement.id}-error`
        )
        inputElement.classList.remove(this._inputErrorClass)
        errorElement.classList.remove(this._errorClass)
        errorElement.textContent = ''
    }

    //проверки валидности введенного значения
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(
                inputElement,
                inputElement.validationMessage,
                this._obj
            )
        } else {
            this._hideInputError(inputElement, this._obj)
        }
    }

    //установки событий
    // создания события на "input" для каждого элемента в списке "inputList".
    _setEventListeners() {
        this._inputList = Array.from(
            this._formElement.querySelectorAll(this._inputSelector)
        )
        this._buttonElement = this._formElement.querySelector(
            this._submitButtonSelector
        )
        this._toggleButtonState()
        // создание события на "input" для каждого элемента в списке inputList"-.
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement)
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement)
                this._toggleButtonState()
            })
        })
    }

    //функция обработчик валидации и остановка стандартного поведения
    enableValidation() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault()
        })
        this._setEventListeners(this._formElement)
    }
}
