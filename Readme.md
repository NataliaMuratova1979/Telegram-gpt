my-telegram-app/
├── public/                        // Статические файлы (иконки, изображения)
│   └── index.html
├── src/                           // Основная папка исходников
│   ├── assets/                    // Медиа и стили (если есть)
│   ├── components/                // Переиспользуемые компоненты
│   │   ├── Button.jsx
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── ...                    // Другие компоненты
│   ├── pages/                     // Страницы приложения
│   │   ├── Home.jsx
│   │   ├── Profile.jsx
│   │   ├── Settings.jsx
│   │   └── ...                    // Другие страницы
│   ├── layouts/                   // Общие макеты (например, шапка и подвал)
│   │   └── MainLayout.jsx
│   ├── services/                  // Логика API, взаимодействие с Telegram API
│   │   └── telegramApi.js
│   ├── utils/                     // Прочие утилиты и хелперы
│   │   └── helpers.js
│   ├── App.jsx                    // Корневой компонент
│   ├── main.jsx                   // Точка входа
│   └── vite.config.js             // Конфигурация Vite
├── index.html                     // Основной HTML-файл
├── package.json
└── README.md

1. Скачиваем шрифты, помещаем их в папку public/fonts.
2. Создаем папку app/styles, где размещаем css fonts, reset, typography, variables
3. Создаем папку shared. Внутри папки:
- assets (icons, images, logo)
- hooks
- lib/constants
- ui (компоненты по мелочи)
