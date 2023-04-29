// добавили нужное свойство
//  const section = new Section({items: [], renderer: ()=>{}}, '.cards__list')
// section.renderItems()

export class Section {
    constructor({ items, renderer }, selector) {
        this._items = items
        this._renderer = renderer
        // this._container = document.querySelector(selector) //перенесла селектор в константы
        this._container = selector
    }
    //рисуем элементы
    renderItems() {
        this._items.forEach((item) => this._renderer(item))
    }
    // добавляем елемент в контейнер
    addItem(itemHtml) {
        this._container.prepend(itemHtml)
    }
}
