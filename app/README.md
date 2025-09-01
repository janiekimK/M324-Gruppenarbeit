# App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 19.2.15.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Code Quality Tools

This project uses ESLint and Prettier to maintain code quality and consistency.

### ESLint
- **Purpose**: Code linting and error detection
- **Configuration**: `.eslintrc.json`
- **Rules**: Angular-specific rules with TypeScript support
- **Commands**:
  - `npm run lint` - Check for linting issues
  - `npm run lint:fix` - Automatically fix linting issues

### Prettier
- **Purpose**: Code formatting and style consistency
- **Configuration**: `.prettierrc`
- **Rules**: Opinionated formatting with minimal configuration
- **Commands**:
  - `npm run format` - Format all source files
  - `npm run format:check` - Check if files are properly formatted

### VS Code Integration
The `.vscode/settings.json` file configures VS Code to:
- Format code on save using Prettier
- Show ESLint errors and warnings
- Use Prettier as the default formatter for all supported file types

### EditorConfig
The `.editorconfig` file provides basic editor settings for consistent indentation and line endings across different editors and IDEs.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
