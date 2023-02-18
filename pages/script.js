
let EditButton = document.querySelector('.profile__edit'); //выбираем кнопку редактирование
let CloseEdit = document.querySelector('.popup__close'); //выбираем кнопку закрыть popup

let popup = document.querySelector('.popup'); //выбор самого popup для добавления и удаления класса popup_opened


// переменные Имени и О себе
let userName = document.querySelector('.profile__name');
let userAbout = document.querySelector('.profile__subtitle');

let formElement = document.querySelector('.popup__form'); // переменная формы ввода
// Находим поля формы в DOM
let nameInput = formElement.querySelector("[id='name']"); // выбираем елемент input по id name
let aboutInput = formElement.querySelector("[id='about']");  // выбираем елемент input по id about
nameInput.value = userName.textContent;
aboutInput.value = userAbout.textContent;

//обработка открытия и закрытия popup
function togglePopup() {
  popup.classList.toggle('popup_opened'); //класс содержит свойство видимости
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault();
     userName.textContent = nameInput.value;
    userAbout.textContent = aboutInput.value ;
    togglePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
EditButton.addEventListener('click', togglePopup);
CloseEdit.addEventListener('click', togglePopup);


//здесь долждна быть обработка нажатия на Лайк
// let LikeButton = document.querySelectorAll('.element_like');
// function addLike(){
// LikeButton.classList.toggle('like_active');
// }

// LikeButton.addEventListener('click', addLike);

