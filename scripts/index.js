let EditButton = document.querySelector('.profile__edit'); //выбираем кнопку редактирование
let CloseEdit = document.querySelector('.popup__close'); //выбираем кнопку закрыть popup

let popup = document.querySelector('.popup'); //выбор самого popup для добавления и удаления класса popup_opened

// переменные Имени и О себе
let userName = document.querySelector('.profile__name');
let userAbout = document.querySelector('.profile__subtitle');
// форма ввода
let formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__input_data_name'); // выбираем елемент имя
let aboutInput = formElement.querySelector('.popup__input_data_about');  // выбираем елемент о себе

//обработка видимости popup
function togglePopup() {
  popup.classList.toggle('popup_opened'); //класс содержит свойство видимости
}

//открываем попап и вносим данные в форму с экрана
function openPopup() {
  nameInput.value = userName.textContent;
  aboutInput.value = userAbout.textContent;
  togglePopup();
}

// Обработчик «отправки» формы
function handleFormSubmit (evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userAbout.textContent = aboutInput.value ;
  togglePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
//открытие окна редактирования
EditButton.addEventListener('click', openPopup);
//закрытие окна
CloseEdit.addEventListener('click', togglePopup);


