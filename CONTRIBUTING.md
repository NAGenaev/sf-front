# Contributing

Thank you for your interest in StudioFinder Landing UI!

**Russian:** [CONTRIBUTING.ru.md](CONTRIBUTING.ru.md)

## How to contribute

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-change`
3. Make your changes and test locally:
   ```bash
   npm install
   npm run dev
   npm run build
   ```
4. Commit with a clear message
5. Open a pull request against `master`

## Guidelines

- Keep changes focused — one logical change per PR
- Match existing code style and naming
- Update translations in both `en` and `ru` when changing UI copy
- Do not commit `node_modules`, `dist`, or secrets

## Translations

All user-facing strings live in `src/i18n/translations.ts`. When adding or editing text, update both locales.

## Questions

Open a [GitHub Issue](https://github.com/NAGenaev/sf-front/issues) for bugs, ideas, or questions.
