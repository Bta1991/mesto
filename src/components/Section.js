export class Section {
    constructor({ items, renderer }, selector) {
        this._items = items
        this._renderer = renderer
        this._container = document.querySelector(selector)
    }
    //рисуем элементы
    renderItems() {
        // т.к. параметр функции совпадает можно не использовать промежуточную функцию
        this._items.forEach(this._renderer)
    }
    // добавляем елемент в контейнер
    addItem(itemHtml) {
        this._container.prepend(itemHtml)
    }
}
