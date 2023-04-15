// ИМПОРТ-----------------------------------------------------
import { initialCards } from './Constants.js' //импортируем константы для карточки
import { Card } from './Card.js' //импортируем класс создания елемента Card (.element)
import { FormValidator } from './FormValidator.js' //импортируем класс валидации формы

// КОНСТАНТЫ---------------------------------------------------
//выбор popup
const popupNodes = document.querySelectorAll('.popup')
const popupEdit = document.querySelector('.popup_edit')
const popupAdd = document.querySelector('.popup_add')
const popupView = document.querySelector('.popup_view')

// находим все крестики проекта по универсальному селектору
const closeButtons = document.querySelectorAll('.popup__close')

// контейнер с карточками
const userElements = document.querySelector('.elements')

//выбор переменных в окне просмотра фото
const photoUrl = popupView.querySelector('.popup__image')
const photoTitle = popupView.querySelector('.popup__photo-title')

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

// Находим поля формы релдактирования информации о себе в DOM
const nameInput = formEdit.querySelector('.popup__input_data_name') // выбираем елемент имя
const aboutInput = formEdit.querySelector('.popup__input_data_about') // выбираем елемент о себе

// переменные Имени и О себе
const userName = document.querySelector('.profile__name')
const userAbout = document.querySelector('.profile__subtitle')

// Находим поля формы добавления фото
const urlInput = formAdd.querySelector('.popup__input_data_url') // выбираем елемент имя
const titleInput = formAdd.querySelector('.popup__input_data_title') // выбираем елемент о себе

// обьект с селекторами форм
const formSelectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__error_visible',
}

// ФУНКЦИИ-----------------------------------------------------
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

// функция открывает окно профиля, сбрасывает состояние полей ввода, устанавливает значения
const openPopupEdit = () => {
    openPopup(popupEdit)
    nameInput.value = userName.textContent //при открытии записываем в значение то что на экране
    aboutInput.value = userAbout.textContent
    const formEditValidate = new FormValidator(formSelectors, formEdit)
    formEditValidate.enableValidation()
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

// заполняет содержимое элементов всплывающего окна c фото
function setPopupImage(item) {
    photoUrl.src = item.closest('.element').querySelector('.element__photo').src
    photoUrl.alt = item
        .closest('.element')
        .querySelector('.element__text').textContent
    photoTitle.textContent = item
        .closest('.element')
        .querySelector('.element__text').textContent
}

//создание карточки
const createCard = (inputsrc, inputtext) => {
    const cardProperties = {
        link: inputsrc,
        name: inputtext,
    }

    const card = new Card('#element', cardProperties)
    const cardElement = card.generateCard()

    cardElement
        .querySelector('.element__photo')
        .addEventListener('click', (evt) => {
            setPopupImage(evt.target)
            openPopup(popupView)
        })

    userElements.prepend(cardElement)
}

initialCards.forEach((card) => {
    createCard(card.link, card.name)
})

// СЛУШАТЕЛИ ------------------------------------------------

// обработчик формы для загрузки фото
formAdd.addEventListener('submit', (evt) => {
    evt.preventDefault()
    createCard(urlInput.value, titleInput.value)
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
    const formAddValidate = new FormValidator(formSelectors, formAdd)
    formAddValidate.enableValidation()
    openPopup(popupAdd)
})
