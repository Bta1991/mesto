// КОНСТАНТЫ---------------------------------------------------
// обьект с селекторами форм
export const formSelectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__error_visible',
}
//выбор popup
export const popupEdit = document.querySelector('.popup_edit')
export const popupAdd = document.querySelector('.popup_add')
export const popupView = document.querySelector('.popup_view')

// контейнер с карточками
export const cardsContainer = document.querySelector('.elements')

//выбор форм
export const formAdd = document.forms['addForm']
export const formEdit = document.forms['editForm']

export const editButton = document.querySelector('.profile__edit') //выбираем кнопку редактирование
export const addButton = document.querySelector('.profile__add-button') //выбираем кнопку добавить картинку

// Находим поля формы релдактирования информации о себе в DOM
export const nameInput = formEdit.querySelector('.popup__input_data_name') // выбираем елемент имя
export const aboutInput = formEdit.querySelector('.popup__input_data_about') // выбираем елемент о себе

// переменные Имени и О себе
export const userName = document.querySelector('.profile__name')
export const userAbout = document.querySelector('.profile__subtitle')
