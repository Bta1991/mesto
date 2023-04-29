import { Popup } from '../components/Popup.js'

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._popupImage = this._popupSelector.querySelector('.popup__image')
        this._popupTitle = this._popupSelector.querySelector(
            '.popup__photo-title'
        )
    }

    open(item) {
        super.open()
        this._popupImage.src = item.picurl
        this._popupImage.alt = item.picname
        this._popupTitle.textContent = item.picname
    }
}
