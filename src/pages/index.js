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
import {
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

//ждем выполнение обоих методов api
Promise.all([api.getUserInfo(), api.getInitialsCards()])
    .then(([data, item]) => {
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
        '#card',
        data,
        handleCardClick,
        handleLikeClick,
        handleDislikeClick,
        userID,
        handleDeleteClick
    )

    return card.generateCard()
}

//фц-ция заполнения при открытии фото
const handleCardClick = (name, link) => {
    imageViewPopup.open({ name, link })
}

//фц-ция клик на корзину
function handleDeleteClick(card) {
    const handleConfirm = () => {
        api.deleteCard(card._cardID)
            .then(() => {
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
    formDeletePopup.setSubmitAction(handleConfirm)
    formDeletePopup.open()
}

//фции лайков дизлайков
const handleLikeClick = (cardID, card) => {
    api.setLike(cardID)
        .then((res) => {
            card.checkLikesCount(res)
        })
        .catch((err) => {
            console.log(err)
        })
}
const handleDislikeClick = (cardID, card) => {
    api.deleteLike(cardID)
        .then((res) => {
            card.checkLikesCount(res)
        })
        .catch((err) => {
            console.log(err)
        })
}

// обьявим экземпляр попапа формы редактирования информации
const formEditPopup = new PopupWithForm('.popup_editForm', submitProfileForm)
// слушатели для popupEdit
formEditPopup.setEventListeners()

function submitProfileForm(inputValues) {
    userInfo.setUserInfo(inputValues.user, inputValues.about)
    return api.setUserInfo(inputValues).then(() => {
        userInfo.setUserInfo(inputValues.user, inputValues.about)
    })
}

// создадим экземпляр попапа открытия увеличенного изображения popupView
const imageViewPopup = new PopupWithImage('.popup_view')
// слушатели для popupView
imageViewPopup.setEventListeners()

// обьявим экземпляр попапа формы добавления
const formAddPopup = new PopupWithForm('.popup_addForm', handleFormSubmit)
//фция для поапа добавления
function handleFormSubmit(inputValues) {
    return api.addCard(inputValues).then((res) => {
        section.addItem(createCard(res))
    })
}
// слушатели для popupAdd
formAddPopup.setEventListeners()

// обьявим экземпляр попапа подверждения удаления
const formDeletePopup = new PopupWithConfirmation('.popup_deleteForm')
// слушатели для popupDelete
formDeletePopup.setEventListeners()


//Попап формы смены аватара
const formAvatarPopup = new PopupWithForm('.popup_avatarForm', submitAvatarForm)

formAvatarPopup.setEventListeners()

function submitAvatarForm(inputValues) {
    return api.setAvatar(inputValues).then(() => {
        userInfo.setUserAvatar(inputValues.avatar)
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
const formEditValidate = new FormValidator(formSelectors, 'editForm')
formEditValidate.enableValidation()
const formAddValidate = new FormValidator(formSelectors, 'addForm')
formAddValidate.enableValidation()
const formAvatarValidate = new FormValidator(formSelectors, 'avatarForm')
formAvatarValidate.enableValidation()
