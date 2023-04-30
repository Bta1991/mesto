export class UserInfo {
    constructor(userName, userAbout) {
        this._userName = document.querySelector(userName)
        this._userAbout = document.querySelector(userAbout)
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
