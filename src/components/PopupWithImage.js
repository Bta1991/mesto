import Popup from '../components/Popup.js'

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._popupImage = this._popup.querySelector('.popup__image')
        this._popupTitle = this._popup.querySelector(
            '.popup__photo-title'
        )
    }

    open(item) {
        super.open()
        this._popupImage.src = item.link
        this._popupImage.alt = item.name
        this._popupTitle.textContent = item.name
    }
}
