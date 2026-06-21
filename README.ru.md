# StudioFinder Landing UI

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

Open-source лендинг для агрегатора фотостудий. Бесплатно использовать, форкать и адаптировать под свои проекты.

**English documentation:** [README.md](README.md)

## Превью

| Светлая тема | Тёмная тема |
| --- | --- |
| ![StudioFinder — светлая тема](docs/scr_en_main_wh.png) | ![StudioFinder — тёмная тема](docs/scr_en_main_dark.png) |

## Возможности

- Анимированный hero с WebGL-шейдером (Three.js / React Three Fiber)
- Светлая и тёмная темы с плавным переключением
- Интерфейс на английском и русском (i18n)
- Анимации при скролле (Framer Motion)
- Адаптивная вёрстка для desktop и mobile
- Монохромная дизайн-система на Tailwind CSS
- Editorial-типографика (Cormorant Garamond)
- Встроенный масштаб UI 80% (как zoom в браузере, без поломки shader-фона)

## Быстрый старт

**Требования:** Node.js 18+, npm 9+

```bash
git clone https://github.com/NAGenaev/sf-front.git
cd sf-front
npm install
npm run dev
```

Dev-сервер: http://127.0.0.1:5173/

## Команды

| Команда | Описание |
| --- | --- |
| `npm run dev` | Запуск dev-сервера |
| `npm run build` | Проверка типов и production-сборка |
| `npm run preview` | Локальный просмотр сборки |

Результат сборки — в папке `dist/`.

## Структура проекта

```
sf-front/
├── docs/                 # Скриншоты и материалы для документации
├── public/               # Статические файлы (favicon)
├── src/
│   ├── i18n/             # Переводы (EN / RU) и провайдер языка
│   ├── lib/              # Утилиты
│   ├── pic/              # Демо-фото студий (webp)
│   ├── newdis.tsx        # Основной компонент лендинга
│   ├── App.tsx
│   └── index.css         # Токены темы, масштаб UI, глобальные стили
├── LICENSE
└── README.ru.md
```

## Кастомизация

| Что менять | Где |
| --- | --- |
| Тексты и брендинг | `src/i18n/translations.ts` |
| Цвета и тема | CSS-переменные в `src/index.css` (`:root` / `.dark`) |
| Масштаб UI (по умолчанию 80%) | `--ui-scale` в `src/index.css` |
| Hero и секции | `src/newdis.tsx` |
| Демо-изображения | Файлы в `src/pic/` |

Shader-фон hero использует отдельный слой `ui-scale-cancel`, чтобы WebGL оставался на весь экран, пока остальная страница масштабируется.

## Стек

- React 18, TypeScript, Vite 7
- Tailwind CSS, tailwind-merge, clsx
- Framer Motion, Lucide React
- Three.js, React Three Fiber

## Лицензия

MIT © 2026 [GENAEV NIKITA ANDREEVICH (NAGenaev)](https://github.com/NAGenaev)

Свободное использование в личных и коммерческих проектах. Указание авторства приветствуется, но не обязательно.

Полный текст — в [LICENSE](LICENSE).

## Участие в проекте

Issues и pull request'ы приветствуются: баги, переводы, улучшения UI.

См. [CONTRIBUTING.ru.md](CONTRIBUTING.ru.md).
