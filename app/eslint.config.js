const js = require('@eslint/js');
const typescript = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');
const angular = require('@angular-eslint/eslint-plugin');
const angularTemplate = require('@angular-eslint/eslint-plugin-template');
const angularTemplateParser = require('@angular-eslint/template-parser');
const prettier = require('eslint-plugin-prettier');

module.exports = [
  js.configs.recommended,
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      '.angular/**',
      '*.min.js',
      '*.min.css',
      'package-lock.json',
      'yarn.lock',
      '.vscode/**',
      '.idea/**',
      '.DS_Store',
      'Thumbs.db',
      'src/environments/**',
      'src/index.html'
    ]
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
        describe: 'readonly',
        beforeEach: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        HTMLElement: 'readonly'
      }
    },
    plugins: {
      '@typescript-eslint': typescript,
      '@angular-eslint': angular,
      prettier: prettier
    },
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase'
        }
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case'
        }
      ],
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
      'prettier/prettier': 'error'
    }
  },
  {
    files: ['**/*.component.html'],
    plugins: {
      '@angular-eslint': angular,
      '@angular-eslint/template': angularTemplate,
      prettier: prettier
    },
    languageOptions: {
      parser: angularTemplateParser
    },
    rules: {
      'prettier/prettier': 'error'
    }
  },
  {
    files: ['eslint.config.js'],
    languageOptions: {
      globals: {
        require: 'readonly',
        module: 'readonly',
        exports: 'readonly'
      }
    }
  }
];
