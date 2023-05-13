# Проект: Место

## Обзор
* Описание
* Технологии
* Ссылка на GitHub Pages
* Change log
* Список плагинов Webpack

**Описание**

Учебный проект Яндекс.Практикум, проектные работы 4-8, сайт "Место": интерактивая страница, куда можно добавлять фотографии, удалять их и ставить лайки.
Дизайн-макет для работы [ссылка на макет в Figma](https://www.figma.com/file/2cn9N9jSkmxD84oJik7xL7/JavaScript.-Sprint-4?node-id=0%3A1)

**Технологии**

Проект сделан по BEM Nest, адаптивная верстка CSS под мобильные устройства различных разрешений (320-1440px).
На Java Script реализована логика создания экземпляров классов, связывания их вместе и запуска веб-страницы с созданными элементами.

Из технологий можно отметить использование классов, модулей, полей для ввода текста, поп-апов с формами с кастомной валидацией форм, на кнопки и прочие действия настроены слушатели событий для обработки действий пользователей.

После импорта из вспомогательных файлов, создаются экземпляры классов для каждого элемента на веб-странице: секция с карточками, поп-апы и информация о пользователе а так же экземпляр класса для валидации форм.

Кроме того, используются ф-ции для обработки и отображения введенных данных пользователем в поля форм.

**Ссылка на GitHub Pages**

Проект доступен по ссылке:
[Место](https://bta1991.github.io/mesto/)

**Change log**
- 05.03.23 - Выполнена проектная работа 5, добавлен функционал добавления и удаления фото, предпросмотра фотографии
- 29.03.23 - Выполнена проектная работа 6, валидация форм
- 10.04.23 - Проектная 7, переход на классы и методы, использование модульной структуры JS
- 30.04.23 - Проектная работа 8: продолжение работ над переводом JS на ООП, большая часть функционала вынесена в классы, функционал JS разделен на отдельные файлы модули. Сделана настройка и сборка проекта webpack
- 08.05.23 - Проектная работа 9: добавлены новые елементы (редактирование аватара, счетчик лайков, попапы редактирования аватара и удаления элемента)
- 14.05.23 - Реализовано подключение API к серверу с данными, JSON запросы на основе которых отображаются данные на странице

---
**Плагины webpack**
+ webpack
+ webpack-cli
+ webpack-dev-server
+ @babel/core
+ @babel/preset-env
+ babel-loader
+ html-webpack-plugin
+ clean-webpack-plugin
+ css-loader
+ mini-css-extract-plugin
+ postcss-loader
+ autoprefixer
+ cssnano
+ gh-pages

+ core-js
