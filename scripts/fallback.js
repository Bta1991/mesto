//fallback для браузера который не поддерживает модули
//экспортируем классы
const inactiveButtonClass = 'popup__save_disabled'
const inputErrorClass = 'popup__input_error'
const errorClass = 'popup__error_visible'

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
function toggleButtonState(inputs, submitButton, inactiveButtonClass) {
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
function resetValidation(
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
        submitButtonSelector, // formElement.querySelector('.popup__save'),
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

//шаблон для начальных картинок
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    },
]

//выбор popup
const popupNodes = document.querySelectorAll('.popup')
const popupEdit = document.querySelector('.popup_edit')
console.log(popupEdit);
const popupAdd = document.querySelector('.popup_add')
const popupView = document.querySelector('.popup_view')

// находим все крестики проекта по универсальному селектору
const closeButtons = document.querySelectorAll('.popup__close')

//выбор форм
const formAdd = document.forms['addForm']
const formEdit = document.forms['editForm']

const editButton = document.querySelector('.profile__edit') //выбираем кнопку редактирование
const addButton = document.querySelector('.profile__add-button') //выбираем кнопку добавить картинку

// выбираем кнопку сохранить
const saveButton = '.popup__save'
// кнопка сохранить профиль
const submitEdit = popupEdit.querySelector(saveButton)
// кнопка добавить фото
const submitAdd = popupAdd.querySelector(saveButton)

//выбор переменных в окне просмотра фото
const photoUrl = popupView.querySelector('.popup__image')
const photoTitle = popupView.querySelector('.popup__photo-title')

// Находим поля формы релдактирования информации о себе в DOM
const nameInput = formEdit.querySelector('.popup__input_data_name') // выбираем елемент имя
const aboutInput = formEdit.querySelector('.popup__input_data_about') // выбираем елемент о себе

// переменные Имени и О себе
const userName = document.querySelector('.profile__name')
const userAbout = document.querySelector('.profile__subtitle')

// Находим поля формы добавления фото
const urlInput = formAdd.querySelector('.popup__input_data_url') // выбираем елемент имя
const titleInput = formAdd.querySelector('.popup__input_data_title') // выбираем елемент о себе

//функция закрытия попапа по клавише Escape
const handleEscape = (evt) => {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened') //ищем открытый попап
        if (openedPopup) {
            closePopup(openedPopup) //закрываем
        }
    }
}

//функция открытия попапа и установки слушателя на нажатие escape
const openPopup = (popup) => {
    popup.classList.add('popup_opened') //класс содержит свойство видимости
    document.addEventListener('keydown', handleEscape)
}

//функция закрытия попапа
const closePopup = (popup) => {
    if (popup.classList.contains('popup_opened')) {
        popup.classList.remove('popup_opened')
        document.removeEventListener('keydown', handleEscape)
    }
}

// функция "openEditPopup" открывает окно профиля, сбрасывает состояние полей ввода, устанавливает значения
const openPopupEdit = () => {
    resetValidation(
        popupEdit,
        '.popup__input',
        submitEdit,
        inputErrorClass,
        errorClass
    )
    openPopup(popupEdit)
    nameInput.value = userName.textContent //при открытии записываем в значение то что на экране
    aboutInput.value = userAbout.textContent
    toggleButtonState([nameInput, aboutInput], submitEdit, inactiveButtonClass)
}

// обработчик формы для окна редактирования информации
const submitFormEdit = (evt) => {
    evt.preventDefault()
    userName.textContent = nameInput.value
    userAbout.textContent = aboutInput.value
    closePopup(popupEdit)
}

//цикл по всем popup для закрытия по клику
popupNodes.forEach((popup) => {
    popup.addEventListener('mousedown', (event) => {
        if (event.target === popup) {
            closePopup(popup)
        }
    })
})

const userTemplate = document.querySelector('#element').content
const userElements = document.querySelector('.elements')

//создание карточки на основе шаблона
const createCard = (inputsrc, inputtext) => {
    // Клонируем шаблон, наполняем его информацией из объекта data
    const userElement = userTemplate.querySelector('.element').cloneNode(true)
    const elementPhoto = userElement.querySelector('.element__photo')

    // наполняем содержимым
    elementPhoto.src = inputsrc
    elementPhoto.alt = inputtext
    userElement.querySelector('.element__text').textContent = inputtext

    //вешаем обработчики
    toggleLike(userElement.querySelector('.element__like')) // listener для лайка
    deletePhoto(userElement.querySelector('.element__trash')) // listener для удаления
    // openPhoto(elementPhoto) // listener для фоток
    openPhoto(elementPhoto, inputsrc, inputtext) // listener для фоток
    // Возвращаем получившуюся карточку
    return userElement
}

// рендер карточки
function renderCard(inputsrc, inputtext) {
    // Создаем карточку на основе данных
    const userElement = createCard(inputsrc, inputtext)
    // Помещаем ее в контейнер c фото
    userElements.prepend(userElement)
}

initialCards.forEach((card) => {
    renderCard(card.link, card.name)
})

// СЛУШАТЕЛИ
// универсальная функция добавления listener для кнопки лайка
function toggleLike(like) {
    like.addEventListener('click', function (evt) {
        // в переменной eventTarget окажется элемент
        const eventTarget = evt.target
        eventTarget.classList.toggle('element__like_active')
    })
}
//  функция добавления listener для кнопки корзины
function deletePhoto(trash) {
    trash.addEventListener('click', function (evt) {
        const eventTarget = evt.target
        evt.target.closest('.element').remove()
    })
}
//  функция добавления listener для фото
function openPhoto(photo, inputsrc, inputtext) {
    photo.addEventListener('click', () => {
        photoUrl.src = inputsrc
        photoUrl.alt = inputtext
        photoTitle.textContent = inputtext
        openPopup(popupView)
    })
}

// обработчик формы для загрузки фото
formAdd.addEventListener('submit', (evt) => {
    evt.preventDefault()
    renderCard(urlInput.value, titleInput.value)
    // evt.target.reset()
    closePopup(popupAdd)
})

//обработка нажатия на крестики
closeButtons.forEach((button) => {
    // находим 1 раз ближайший к крестику попап
    const popup = button.closest('.popup')
    // устанавливаем обработчик закрытия на крестик
    button.addEventListener('click', () => closePopup(popup))
})

//открытие окна редактирования информации
editButton.addEventListener('click', openPopupEdit)
//нажатие на кнопку сохранить в профиле
formEdit.addEventListener('submit', submitFormEdit)

//открытие окна для загрузки фото
addButton.addEventListener('click', () => {
    formAdd.reset()
    resetValidation(
        popupAdd,
        '.popup__input',
        submitAdd,
        inputErrorClass,
        errorClass
    )
    openPopup(popupAdd)
})
