export default class Section {
    constructor({ renderer }, selector) {
        this._renderer = renderer
        this._container = document.querySelector(selector)
    }
    //рисуем элементы
    renderItems(elements) {
        this._elements = elements
        this._elements.reverse().forEach((item) => {
            this._renderer(item)
        })
    }
    // добавляем елемент в контейнер
    addItem(element) {
        this._container.prepend(element)
    }
}
