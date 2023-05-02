export class UserInfo {
    constructor(userNameSelector, userAboutSelector) {
        this._userName = document.querySelector(userNameSelector)
        this._userAbout = document.querySelector(userAboutSelector)
    }

    getUserInfo() {
        return {
            name: this._userName.textContent,
            about: this._userAbout.textContent,
        }
    }

    setUserInfo(data) {
        this._userName.textContent = data.name
        this._userAbout.textContent = data.about
    }
}
