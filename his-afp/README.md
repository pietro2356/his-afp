# HisAfp

## 1. Installare PrimeNG

```shell
npm install primeng @primeuix/themes
```

## 2. Installare Prettier

```shell
npm install --save-dev prettier
```

## 3. Configurare Prettier

Creare un file `.prettierrc` nella radice del progetto con il seguente contenuto:

```json
{
  "tabWidth": 2,
  "useTabs": false,
  "singleQuote": true,
  "semi": true,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "trailingComma": "none",
  "printWidth": 100,
  "htmlWhitespaceSensitivity": "ignore",
  "endOfLine": "auto"
}
```

## 4. Aggiungere script di formattazione a `package.json`

Aggiungere i seguenti script alla sezione `scripts` del file `package.json`:

```json
{
  "format": "prettier --write \"src/**/*.{ts,html,css,scss,json}\"",
  "format:check": "prettier --check \"src/**/*.{ts,html,css,scss,json}\""
}
```
