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

export const editButton = document.querySelector('.profile__edit') //выбираем кнопку редактирование
export const addButton = document.querySelector('.profile__add-button') //выбираем кнопку добавить картинку
export const avatarButton = document.querySelector('.profile__avatar-edit') //кнопка редактировать аватар

// Находим поля формы релдактирования информации о себе в DOM
export const formEdit = document.forms['editForm']
export const nameInput = formEdit.querySelector('.popup__input_data_user') // выбираем елемент имя
export const aboutInput = formEdit.querySelector('.popup__input_data_about') // выбираем елемент о себе
