
let EditButton = document.querySelector('.profile__edit');
let CloseEdit = document.querySelector('.popup__close');
let popup = document.querySelector('.popup');

function togglePopup() {
  popup.classList.toggle('popup_opened');
}

EditButton.addEventListener('click', togglePopup);
CloseEdit.addEventListener('click', togglePopup);


// let LikeButton = document.querySelectorAll('.element_like');
// function addLike(){
// LikeButton.classList.toggle('like_active');
// }

// LikeButton.addEventListener('click', addLike);


// // Находим форму в DOM
// let formElement = // Воспользуйтесь методом querySelector()
// // Находим поля формы в DOM
// let nameInput = // Воспользуйтесь инструментом .querySelector()
// let jobInput = // Воспользуйтесь инструментом .querySelector()

// // Обработчик «отправки» формы, хотя пока
// // она никуда отправляться не будет
// function handleFormSubmit (evt) {
//     evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
//                                                 // Так мы можем определить свою логику отправки.
//                                                 // О том, как это делать, расскажем позже.

//     // Получите значение полей jobInput и nameInput из свойства value

//     // Выберите элементы, куда должны быть вставлены значения полей

//     // Вставьте новые значения с помощью textContent
// }

// // Прикрепляем обработчик к форме:
// // он будет следить за событием “submit” - «отправка»
// formElement.addEventListener('submit', handleFormSubmit);
