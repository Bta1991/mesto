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
const popupEdit = document.querySelector('.popup_edit')
const popupAdd = document.querySelector('.popup_add')
const popupView = document.querySelector('.popup_view')

//выберем кнопки закрыть
const closeEdit = popupEdit.querySelector('.popup__close')
const closeAdd = popupAdd.querySelector('.popup__close')
const closeView = popupView.querySelector('.popup__close')

//выбор форм
const formAdd = popupAdd.querySelector('.popup__form')
const formEdit = popupEdit.querySelector('.popup__form')

const editButton = document.querySelector('.profile__edit') //выбираем кнопку редактирование
const addButton = document.querySelector('.profile__add-button') //выбираем кнопку добавить картинку
//нажали на просмотр фото

// Находим поля формы релдактирования информации о себе в DOM
let nameInput = formEdit.querySelector('.popup__input_data_name') // выбираем елемент имя
let aboutInput = formEdit.querySelector('.popup__input_data_about') // выбираем елемент о себе

// переменные Имени и О себе
let userName = document.querySelector('.profile__name')
let userAbout = document.querySelector('.profile__subtitle')

// Находим поля формы добавления фото
let urlInput = formAdd.querySelector('.popup__input_data_url') // выбираем елемент имя
let titleInput = formAdd.querySelector('.popup__input_data_title') // выбираем елемент о себе

//функция изменения видимости
function togglePopup(target) {
    target.classList.toggle('popup_opened') //класс содержит свойство видимости
}

const userTemplate = document.querySelector('#element').content
const userElements = document.querySelector('.elements')

function addPhoto(inputsrc, inputtext) {
    // клонируем содержимое тега template
    const userElement = userTemplate.querySelector('.element').cloneNode(true)

    // наполняем содержимым
    userElement.querySelector('.element__photo').src = inputsrc
    userElement.querySelector('.element__text').textContent = inputtext

    likeListener(userElement.querySelector('.element__like')) // listener для лайка
    trashListener(userElement.querySelector('.element__trash')) // listener для удаления
    photoListener(userElement.querySelector('.element__photo')) // listener для фоток
    // отображаем на странице
    userElements.insertBefore(userElement, userElements.firstChild)
}

// обработчики и инициализация страницы----------------------------------------------------------------
initialCards.forEach((card) => {
    addPhoto(card.link, card.name)
})

// универсальная функция добавления listener для кнопки лайка
function likeListener(like) {
    like.addEventListener('click', function (evt) {
        // в переменной eventTarget окажется элемент
        const eventTarget = evt.target
        eventTarget.classList.toggle('element__like_active')
    })
}
//  функция добавления listener для кнопки корзины
function trashListener(trash) {
    trash.addEventListener('click', function (evt) {
        // в переменной eventTarget окажется элемент
        const eventTarget = evt.target
        const parent = eventTarget.parentNode.parentNode
        parent.remove()
    })
}
//  функция добавления listener для фото
function photoListener(photo) {
    photo.addEventListener('click', function (evt) {
        // в переменной eventTarget окажется элемент
        const eventTarget = evt.target
        togglePopup(popupView)
    })
}

//открытие и закрытие окна редактирования информации
editButton.addEventListener('click', function () {
    nameInput.value = userName.textContent //при открытии записываем в значение то что на экране
    aboutInput.value = userAbout.textContent
    togglePopup(popupEdit)
})
closeEdit.addEventListener('click', function () {
    togglePopup(popupEdit)
})
// обработчик формы для окна редактирования информации
formEdit.addEventListener('submit', function handleFormSubmit(evt) {
    evt.preventDefault()
    userName.textContent = nameInput.value
    userAbout.textContent = aboutInput.value
    togglePopup(popupEdit)
})

//открытие закрытие окна добавления картинки
addButton.addEventListener('click', function () {
    togglePopup(popupAdd)
})
closeAdd.addEventListener('click', function () {
    togglePopup(popupAdd)
})
// обработчик формы для загрузки фото
formAdd.addEventListener('submit', function handleFormSubmit(evt) {
    evt.preventDefault()
    addPhoto(urlInput.value, titleInput.value)
    evt.target.reset()
    togglePopup(popupAdd)
})

//открытие закрытие превью фото
closeView.addEventListener('click', function () {
    togglePopup(popupView)
})
