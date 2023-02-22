let editButton = document.querySelector('.profile__edit'); //выбираем кнопку редактирование
let closeEdit = document.querySelector('.popup__close'); //выбираем кнопку закрыть popup

let elementPopup = document.querySelector('.popup'); //выбор самого popup для добавления и удаления класса popup_opened

// переменные Имени и О себе
let userName = document.querySelector('.profile__name');
let userAbout = document.querySelector('.profile__subtitle');
// форма ввода
let formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__input_data_name'); // выбираем елемент имя
let aboutInput = formElement.querySelector('.popup__input_data_about');  // выбираем елемент о себе


//открываем попап и вносим данные в форму с экрана
function openPopup() {
  nameInput.value = userName.textContent;
  aboutInput.value = userAbout.textContent;
  elementPopup.classList.add('popup_opened'); //класс содержит свойство видимости
}
//закрытие popup
function closePopup() {
  elementPopup.classList.remove('popup_opened'); //класс содержит свойство видимости
}

// Обработчик «отправки» формы
function handleFormSubmit (evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userAbout.textContent = aboutInput.value ;
  closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
//открытие окна редактирования
editButton.addEventListener('click', openPopup);
//закрытие окна
closeEdit.addEventListener('click', closePopup);


//здесь долждна быть обработка нажатия на Лайк
// let LikeButton = document.querySelectorAll('.element_like');
// function addLike(){
// LikeButton.classList.toggle('like_active');
// }

// LikeButton.addEventListener('click', addLike);