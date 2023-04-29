// импорт классов --------------------------------
import { Card } from '../components/Card.js' //импортируем класс создания елемента Card (.element)
import { FormValidator } from '../components/FormValidator.js' //импортируем класс валидации формы
import { Section } from '../components/Section.js' //импортируем класс создания секции
import { PopupWithForm } from '../components/PopupWithForm.js' // импортируем класс попап с формами
import { PopupWithImage } from '../components/PopupWithImage.js' // имспортируем класс попап с увеличеной фото
import { UserInfo } from '../components/UserInfo.js' // класс для отображения информации о пользователе

// импортируем константы
import { initialCards } from '../utils/InitialCards.js' // первоначальные карточки
import {
    popupEdit,
    popupAdd,
    popupView,
    cardsContainer,
    formAdd,
    formEdit,
    editButton,
    addButton,
    nameInput,
    aboutInput,
    userName,
    userAbout,
    formSelectors,
} from '../utils/Constants.js'

//--------------------------------

// создадим экземпляр попапа открытия увеличенного изображения popupView
const imageViewPopup = new PopupWithImage(popupView)
// создадим экземпляр класса для данных о пользователе
const userInfo = new UserInfo(userName, userAbout)
// создадим экземпляр попапа для редактирования информации
const formEditPopup = new PopupWithForm({
    popupSelector: popupEdit,
    handleFormSubmit: (data) => {
        userInfo.setUserInfo(data)
    },
})

const formAddPopup = new PopupWithForm({
    popupSelector: popupAdd,
    handleFormSubmit: (data) => {
        cards.addItem(createCard(data))
        // cards.addItem(createCard({ name: titleInput.value, link: urlInput.value }))
    },
})
//создание карточки
const createCard = (item) => {
    const card = new Card({
        templateSelector: '#element',
        data: item,
        handleCardClick: () => {
            //фц-ция заполнения при открытии фото
            imageViewPopup.open(item)
        },
    })
    const cardElement = card.generateCard()

    return cardElement
}

// рендер создания карточек из массива начальных
const cards = new Section(
    {
        items: initialCards,
        renderer: (item) => {
            cards.addItem(createCard(item))
        },
    },
    cardsContainer
)

cards.renderItems() //рендерим карточки

//открываем редактирование информации о себе
editButton.addEventListener('click', () => {
    const { name, about } = userInfo.getUserInfo()
    formEditPopup.open()
    nameInput.value = name
    aboutInput.value = about
    formEditValidate.resetValidation()
})
// //открытие окна для загрузки фото
addButton.addEventListener('click', () => {
    formAddPopup.open()
    formAddValidate.resetValidation()
})

// ВАЛИДАЦИЯ --------------------
// включаем валидацию форм единожды
const formEditValidate = new FormValidator(formSelectors, formEdit)
formEditValidate.enableValidation()
const formAddValidate = new FormValidator(formSelectors, formAdd)
formAddValidate.enableValidation()

// СЛУШАТЕЛИ --------------------
// слушатели для popupView
imageViewPopup.setEventListeners()
// слушатели для popupEdit
formEditPopup.setEventListeners()
// слушатели для popupAdd
formAddPopup.setEventListeners()