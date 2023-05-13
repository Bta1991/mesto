import '../pages/index.css' //  импорт главного файла стилей для веб пак плагина

// импорт классов --------------------------------
import Api from '../components/Api.js' //импортируем класс API
import Card from '../components/Card.js' //импортируем класс создания елемента Card (.element)
import FormValidator from '../components/FormValidator.js' //импортируем класс валидации формы
import Section from '../components/Section.js' //импортируем класс создания секции
import PopupWithForm from '../components/PopupWithForm.js' // импортируем класс попап с формами
import PopupWithImage from '../components/PopupWithImage.js' // имспортируем класс попап с увеличеной фото
import PopupWithConfirmation from '../components/PopupWithConfirmation.js' // имспортируем класс попап с увеличеной фото
import UserInfo from '../components/UserInfo.js' // класс для отображения информации о пользователе

// импортируем константы
// import { initialCards } from '../utils/InitialCards.js' // первоначальные карточки
import {
    formAdd,
    formEdit,
    formAvatar,
    editButton,
    addButton,
    avatarButton,
    nameInput,
    aboutInput,
    formSelectors,
} from '../utils/Constants.js'

//API------------
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
    headers: {
        authorization: 'fc896ded-773b-41d7-8169-6e43a44c9f52',
        'Content-Type': 'application/json',
    },
})
// переменная ID пользователя
let userID

Promise.all([api.getUserInfo(), api.getInitialsCards()])
    .then(([data, item]) => {
        console.log(data)
        console.log(item)
        userID = data._id
        userInfo.setUserInfo(data.name, data.about)
        userInfo.setUserAvatar(data.avatar)
        section.renderItems(item)
    })
    .catch((err) => {
        console.log(err)
    })

// создадим экземпляр класса для данных о пользователе
const userInfo = new UserInfo({
    userNameSelector: '.profile__name',
    userAboutSelector: '.profile__subtitle',
    userAvatarSelector: '.profile__avatar',
})

// секция с карточками (элементами)
const section = new Section(
    {
        renderer: (item) => {
            const cardElement = createCard(item)
            section.addItem(cardElement)
        },
    },
    '.elements'
)

//создание карточки
function createCard(data) {
    const card = new Card(
        '#element',
        data,
        handleCardClick,
        handleLikeClick,
        handleDislikeClick,
        formDeletePopup,
        userID
    )
    return card.generateCard()
}

//фц-ция заполнения при открытии фото
const handleCardClick = (name, link) => {
    imageViewPopup.open({ name, link })
}

//фц-ция удаления фото

//фции лайков дизлайков
const handleLikeClick = (cardID, card) => {
    api.setLike(cardID)
        .then((res) => {
            console.log(res)
            card.checkLikesCount(res)
        })
        .catch((err) => {
            console.log(err)
        })
}
const handleDislikeClick = (cardID, card) => {
    api.deleteLike(cardID)
        .then((res) => {
            console.log(res)
            card.checkLikesCount(res)
        })
        .catch((err) => {
            console.log(err)
        })
}

// обьявим экземпляр попапа формы редактирования информации
// const formEditPopup = new PopupWithForm({
//     popupSelector: '.popup_edit',
//     handleFormSubmit: (data) => {
//         userInfo.setUserInfo(data)
//     },
// })
const formEditPopup = new PopupWithForm('.popup_edit', submitProfileForm)
// слушатели для popupEdit
formEditPopup.setEventListeners()

function submitProfileForm(inputValues) {
    userInfo.setUserInfo(inputValues.name, inputValues.about)
    api.setUserInfo(inputValues)
        .then(() => {
            formEditPopup.close()
            userInfo.setUserInfo(inputValues.name, inputValues.about)
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            formEditPopup.setLoading()
        })
}

// создадим экземпляр попапа открытия увеличенного изображения popupView
const imageViewPopup = new PopupWithImage('.popup_view')
// слушатели для popupView
imageViewPopup.setEventListeners()

// обьявим экземпляр попапа формы добавления
const formAddPopup = new PopupWithForm('.popup_add', handleFormSubmit)
//фция для поапа добавления
function handleFormSubmit(inputValues) {
    api.addCard(inputValues)
        .then((res) => {
            console.log(res)
            formAddPopup.close()
            section.addItem(createCard(res))
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            formAddPopup.setLoading()
        })
}
// слушатели для popupAdd
formAddPopup.setEventListeners()

// обьявим экземпляр попапа подверждения удаления
const formDeletePopup = new PopupWithConfirmation(
    '.popup_delete',
    handleDeleteSubmit
)
// слушатели для popupDelete
formDeletePopup.setEventListeners()

// функция для удаления карточки
function handleDeleteSubmit(card, cardID) {
    api.deleteCard(cardID)
        .then(() => {
            console.log(cardID)
            console.log(card)
            formDeletePopup.close()
            card.removeCard()
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            formDeletePopup.setLoading()
        })
}

//Попап формы смены аватара
const formAvatarPopup = new PopupWithForm('.popup_avatar', submitAvatarForm)

formAvatarPopup.setEventListeners()

function submitAvatarForm(inputValues) {
    api.setAvatar(inputValues)
        .then(() => {
            formAvatarPopup.close()
            userInfo.setUserAvatar(inputValues.avatar)
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            formAvatarPopup.setLoading()
        })
}

//КНОПКА открываем редактирование информации о себе
editButton.addEventListener('click', () => {
    const { user, about } = userInfo.getUserInfo()
    formEditPopup.open()
    nameInput.value = user
    aboutInput.value = about
    formEditValidate.resetValidation()
})
// КНОПКА открытие окна для загрузки фото
addButton.addEventListener('click', () => {
    formAddPopup.open()
    formAddValidate.resetValidation()
})
// КНОПКА замена аватара
avatarButton.addEventListener('click', () => {
    formAvatarPopup.open()
    formAvatarValidate.resetValidation()
})

// ВАЛИДАЦИЯ --------------------
// включаем валидацию форм единожды
const formEditValidate = new FormValidator(formSelectors, formEdit)
formEditValidate.enableValidation()
const formAddValidate = new FormValidator(formSelectors, formAdd)
formAddValidate.enableValidation()
const formAvatarValidate = new FormValidator(formSelectors, formAvatar)
formAvatarValidate.enableValidation()

// cohort-65
// fc896ded-773b-41d7-8169-6e43a44c9f52
