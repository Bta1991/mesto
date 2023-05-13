export default class Popup {
    constructor(popupSelector) {
        // конструктор принимает на вход селектор который записываем в приватное свойство
        this._popup = document.querySelector(popupSelector)
        this._handleEscClose = this._handleEscClose.bind(this)
    }

    open() {
        // при открытии добавляем
        this._popup.classList.add('popup_opened') // + класс для видимости попапа
        document.addEventListener('keydown', this._handleEscClose) // + слушатель нажатия на Esc
    }
    close() {
        // при закрытии убираем
        this._popup.classList.remove('popup_opened') // - класс для видимости попапа
        document.removeEventListener('keydown', this._handleEscClose) // - слушатель нажатия на Esc
    }

    _handleEscClose(evt) {
        //метод проверяет нажата ли клавиша Escape, и, если да, вызывает метод close.
        if (evt.key === 'Escape') {
            this.close()
        }
    }

    setEventListeners() {
        this._popup.addEventListener('mousedown', (evt) => {
            if (
                evt.target.classList.contains('popup__close') ||
                evt.target.classList.contains('popup_opened')
            ) {
                this.close()
            }
        })
    }
}
