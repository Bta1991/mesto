export default class Api {
    constructor(data) {
        this._baseUrl = data.baseUrl
        this._headers = data.headers
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка подключения: ${res.status}`)
    }

    getInitialsCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
        }).then(this._checkResponse)
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
        }).then(this._checkResponse)
    }

    setUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.user,
                about: data.about,
            }),
        }).then(this._checkResponse)
    }

    setAvatar(link) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: link.avatar,
            }),
        }).then(this._checkResponse)
    }

    addCard(card) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: card.name,
                link: card.link,
            }),
        }).then(this._checkResponse)
    }

    deleteCard(cardID) {
        return fetch(`${this._baseUrl}/cards/${cardID}`, {
            method: 'DELETE',
            headers: this._headers,
        }).then(this._checkResponse)
    }

    setLike(cardID) {
        return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
            method: 'PUT',
            headers: this._headers,
        }).then(this._checkResponse)
    }

    deleteLike(cardID) {
        return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        }).then(this._checkResponse)
    }
}
