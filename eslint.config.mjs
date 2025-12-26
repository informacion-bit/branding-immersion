import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname, // Define la base para buscar configuraciones
});

const eslintConfig = [
  {
    // Configuración general
    files: ["**/*.{js,jsx,ts,tsx}"], // Aplica a todos los archivos JavaScript y TypeScript
    ignores: ["node_modules/", ".next/", "out/"], // Ignora carpetas generadas automáticamente
    languageOptions: {
      parser: "@typescript-eslint/parser", // Usa el parser de TypeScript
      parserOptions: {
        ecmaVersion: 2022, // Soporta las últimas características de ECMAScript
        sourceType: "module", // Habilita módulos ES6
        ecmaFeatures: {
          jsx: true, // Soporta JSX
        },
      },
    },
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"), // Plugin para TS
      react: require("eslint-plugin-react"), // Plugin para React
      "react-hooks": require("eslint-plugin-react-hooks"), // Reglas de hooks de React
    },
    rules: {
      "react/react-in-jsx-scope": "off", // No necesario en Next.js
      "react/prop-types": "off", // No necesario con TypeScript
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // Ignora variables con _
      "react-hooks/rules-of-hooks": "error", // Verifica reglas de hooks
      "react-hooks/exhaustive-deps": "warn", // Advierte sobre dependencias de efectos
    },
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"), // Extiende configuraciones básicas de Next.js
];

export default eslintConfig;