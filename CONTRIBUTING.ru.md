# Участие в проекте

Спасибо за интерес к StudioFinder Landing UI!

**English:** [CONTRIBUTING.md](CONTRIBUTING.md)

## Как внести вклад

1. Сделайте fork репозитория
2. Создайте ветку: `git checkout -b feature/my-change`
3. Внесите изменения и проверьте локально:
   ```bash
   npm install
   npm run dev
   npm run build
   ```
4. Сделайте commit с понятным сообщением
5. Откройте pull request в `master`

## Рекомендации

- Один логический change на PR
- Следуйте стилю и именованию в проекте
- При изменении текстов обновляйте оба языка в `src/i18n/translations.ts`
- Не коммитьте `node_modules`, `dist` и секреты

## Переводы

Все пользовательские строки — в `src/i18n/translations.ts`. Редактируйте `en` и `ru` одновременно.

## Вопросы

Создайте [GitHub Issue](https://github.com/NAGenaev/sf-front/issues) для багов, идей и вопросов.
