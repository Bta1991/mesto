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

// находим все крестики проекта по универсальному селектору
const closeButtons = document.querySelectorAll('.popup__close')

//выбор форм
const formAdd = document.forms['addForm']
const formEdit = document.forms['editForm']

const editButton = document.querySelector('.profile__edit') //выбираем кнопку редактирование
const addButton = document.querySelector('.profile__add-button') //выбираем кнопку добавить картинку

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

//функция добавления видимости
function openPopup(target) {
    target.classList.add('popup_opened') //класс содержит свойство видимости
}
//функция удаления видимости
function closePopup(target) {
    target.classList.remove('popup_opened')
}

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




//открытие и закрытие окна редактирования информации
editButton.addEventListener('click', function () {
    nameInput.value = userName.textContent //при открытии записываем в значение то что на экране
    aboutInput.value = userAbout.textContent
    openPopup(popupEdit)
})

// обработчик формы для окна редактирования информации
formEdit.addEventListener('submit', (evt) => {
    evt.preventDefault()
    userName.textContent = nameInput.value
    userAbout.textContent = aboutInput.value
    closePopup(popupEdit)
})

//открытие окна для загрузки фото
addButton.addEventListener('click', function () {
    openPopup(popupAdd)
})

// обработчик формы для загрузки фото
formAdd.addEventListener('submit', (evt) => {
    evt.preventDefault()
    renderCard(urlInput.value, titleInput.value)
    evt.target.reset()
    closePopup(popupAdd)
})

//обработка нажатия на крестики
closeButtons.forEach((button) => {
    // находим 1 раз ближайший к крестику попап
    const popup = button.closest('.popup')
    // устанавливаем обработчик закрытия на крестик
    button.addEventListener('click', () => closePopup(popup))
})
