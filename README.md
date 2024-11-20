# Скриншоты

Их можно посмотреть в папке `screenshots`.

# Запуск проекта

Установите postgres, node.js и poetry. Создайте базу данных в postgres. В файле .env укажите параметры подключения к
базе данных.

1. **Установка зависимостей**:
   Для установки зависимостей backend и frontend выполните команду:
   ```bash
   poetry install // в папке backend
   npm install // в папке frontend
   ```
2. **Запуск backend**:

   Сгенерируйте таблицы в базе данных:
    ```bash
    poetry run python setup_db.py
    ```
   Для запуска выполните команду:
    ```bash
    poetry run python run_app.py
    ```
3. **Запуск frontend**:
   Для запуска frontend выполните команду:
   ```bash
   npm run dev
   ```

   Админка доступна по адресу http://localhost:5173/admin.

# Анализ

1. **Создание веб-страницы**:
    - Веб-страница была создана с использованием React и TypeScript для фронтенда, а также FastAPI для бэкенда. Основные
      файлы фронтенда находятся в папке frontend, а бэкенда - в папке backend.

2. **Интерфейсы администратора и пользователя**:
    - Интерфейсы для администратора и пользователя были реализованы отдельно. Пользовательский интерфейс доступен по
      корневому пути, а административный интерфейс - по пути `/admin`. Основные файлы пользовательского интерфейса
      находятся в frontend/src/customer, а административного - в frontend/src/admin.

3. **Создание базы данных любимых книг**:
    - База данных была создана с использованием SQLAlchemy. Модели книг и их экземпляров находятся в файле
      books_models.py. Скрипт для инициализации базы данных и добавления книг находится в файле
      setup_db.py.

4. **Просмотр книг из библиотеки**:
    - Пользовательский интерфейс позволяет просматривать книги из библиотеки. Компонент для отображения библиотеки
      находится в файле LibraryScreen.tsx. Данные о книгах загружаются с помощью API-запросов к бэкенду.

5. **Сортировка книг**:
    - Реализована возможность сортировки книг по категории, автору и году написания. Компонент для фильтрации книг
      находится в файле LibraryFilters.tsx. Фильтры применяются к запросам на сервер, что позволяет получать
      отсортированные данные.

6. **Покупка и аренда книг**:
    - Пользовательский интерфейс позволяет покупать книги или арендовать их на 2 недели, месяц или 3 месяца. Компонент
      для покупки книг находится в файле PurchaseBookDialogTrigger.tsx. Логика обработки покупок и аренды реализована на
      бэкенде в файле books_customer_router.py.

7. **Административные функции**:
    - Администратор может управлять списком книг, изменять цены, статусы и доступность книг. Компоненты для создания и
      редактирования книг находятся в файле AdminCreateUpdateBookScreen.tsx. Логика обработки запросов на изменение
      данных реализована на бэкенде в файле books_admin_router.py.

8. **Напоминания об окончании срока аренды**:
    - Реализована функция напоминания пользователям об окончании срока аренды книг. Логика проверки срока аренды
      находится в файле books_customer_router.py в роуте /expires_soon. За ее отображение отвечает компонент
      ExpiresSoonList.tsx.