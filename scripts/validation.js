//экспортируем классы
export const inactiveButtonClass = 'popup__save_disabled'
export const inputErrorClass = 'popup__input_error'
export const errorClass = 'popup__error_visible'

//включение валидации вызовом enableValidation
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__error_visible',
})

// ФУНКЦИИ

// функция проверяет валидность входных полей формы и изменяет кнопки сохранения.
export function toggleButtonState(inputs, submitButton, inactiveButtonClass) {
    const hasInvalidInput = inputs.some((input) => !input.validity.valid)
    submitButton.classList.toggle(inactiveButtonClass, hasInvalidInput)
    submitButton.disabled = hasInvalidInput
}

// функция вывода сообщение об ошибках
function showInputError(
    formElement,
    inputElement,
    errorMessage,
    inputErrorClass,
    errorClass
) {
    const { id } = inputElement
    formElement.querySelector(`#${id}-error`).textContent = errorMessage
    inputElement.classList.add(inputErrorClass)
    formElement.querySelector(`#${id}-error`).classList.add(errorClass)
}

// функция скрыть сообщение об ошибках
function hideInputError(
    formElement,
    inputElement,
    inputErrorClass,
    errorClass
) {
    const { id } = inputElement
    formElement.querySelector(`#${id}-error`).textContent = ''
    inputElement.classList.remove(inputErrorClass)
    formElement.querySelector(`#${id}-error`).classList.remove(errorClass)
}

// функция проверки валидности введенного значения
function checkInputValidity(
    formElement,
    inputElement,
    inputErrorClass,
    errorClass
) {
    if (!inputElement.validity.valid) {
        showInputError(
            formElement,
            inputElement,
            inputElement.validationMessage,
            inputErrorClass,
            errorClass
        )
    } else {
        hideInputError(formElement, inputElement, inputErrorClass, errorClass)
    }
}

// функция сброса состояния валидации формы удаления ошибок
export function resetValidation(
    formElement,
    inputSelector,
    submitButtonSelector,
    inputErrorClass,
    errorClass
) {
    Array.from(formElement.querySelectorAll(inputSelector)).forEach(
        (inputElement) => {
            hideInputError(
                formElement,
                inputElement,
                inputErrorClass,
                errorClass
            )
        }
    )

    Array.from(formElement.querySelectorAll(`.${errorClass}`))
        .map((errorElement) => {
            errorElement.textContent = ''
            errorElement.classList.remove(errorClass)
        })
        .join('')

    toggleButtonState(
        Array.from(formElement.querySelectorAll(inputSelector)),
        submitButtonSelector,  // formElement.querySelector('.popup__save'),
        inactiveButtonClass
    )
}

// функция установки событий
function setEventListeners(
    formElement,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass
) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector))
    const submitButton = formElement.querySelector(submitButtonSelector)

    // создания события на "input" для каждого элемента в списке "inputList".
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(
                formElement,
                inputElement,
                inputErrorClass,
                errorClass
            )
            toggleButtonState(inputList, submitButton, inactiveButtonClass)
        })
    })

    toggleButtonState(inputList, submitButton, inactiveButtonClass)
}

//функция обработчик валидации и остановка стандартного поведения
function enableValidation({
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass,
}) {
    const formList = Array.from(document.querySelectorAll(formSelector))
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault()
        })
        setEventListeners(
            formElement,
            inputSelector,
            submitButtonSelector,
            inactiveButtonClass,
            inputErrorClass,
            errorClass
        )
    })
}
