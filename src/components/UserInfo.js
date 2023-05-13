export default class UserInfo {
    constructor({ userNameSelector, userAboutSelector, userAvatarSelector} ) {
        this._userName = document.querySelector(userNameSelector)
        this._userAbout = document.querySelector(userAboutSelector)
        this._userAvatar = document.querySelector(userAvatarSelector)
    }

    getUserInfo() {
        return {
            user: this._userName.textContent,
            about: this._userAbout.textContent,
            avatar: this._userAvatar.src,
        }
    }

    setUserInfo(name, about) {
        this._userName.textContent = name
        this._userAbout.textContent = about
    }

    setUserAvatar(avatar) {
        this._userAvatar.src = avatar
    }
}
