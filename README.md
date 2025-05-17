# User Management App — Angular + Ng-Zorro

Приложение для управления пользователями. Реализовано с использованием Angular Standalone API, Ng-Zorro UI и реактивных форм. 

##  Возможности

* Список пользователей с пагинацией и фильтром
* Создание / редактирование пользователя
* Валидация форм с Reactive Forms
* Подтверждение удаления
* Отображение деталей пользователя
* Юнит-тесты для компонентов и сервисов (Karma + Jasmine). Реализованы не все тесты.

##  Технологии

* Angular 17+
* Standalone Components API
* Ng-Zorro UI Kit
* TypeScript
* Karma + Jasmine

## 🚀 Запуск приложения

```bash
npm install
ng serve
```

По умолчанию открывается [http://localhost:4200](http://localhost:4200)

## 🎓 Запуск тестов

```bash
ng test
```


## 📄 Структура

```
src/
├── app/
│   ├── users/
│   │   ├── user-list/
│   │   ├── user-form/
│   │   └── user-detail/
│   ├── services/user.service.ts
│   ├── app.component.ts
│   └── app.routes.ts
    └── ...
```

## 👤 Автор

*Автор: Семён Кондауров, Frontent-developer*
