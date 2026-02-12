# TD Qualité Logiciel – Tests E2E Playwright

Ce projet contient une suite de tests end‑to‑end Playwright (POM + fixtures) pour l’application e‑commerce de démonstration.

## 1. Récupérer le projet

```bash
git clone git@github.com:KaaannnBoz/TD-QL-KaanBoz.git
```

## 2. Installer les dépendances

```bash
npm install
```

## 3. Configurer l’environnement local

Les tests utilisent une variable d’environnement `ENV` pour charger le bon fichier `.env` via `dotenv`.

1. Crée le dossier `env/` à la racine du projet s’il n’existe pas déjà.
2. Crée le fichier `env/.env.local` avec au minimum :

```dotenv
URL=https://techhubecommerce.lovable.app
```

Tu peux bien sûr mettre une autre URL (instance locale, autre environnement) tant que l’appli est accessible.

## 4. Installer les navigateurs Playwright (une seule fois)

```bash
npx playwright install
```

## 5. Lancer les tests

Les tests sont tous dans le dossier `tests/` (pas de sous‑dossiers par fonctionnalité). La configuration Playwright charge `env/.env.<ENV>`.

### Via la ligne de commande

Lancer tous les tests en mode CLI :

```bash
ENV=local npx playwright test
```

### En mode UI (Playwright Test Runner UI)

```bash
ENV=local npx playwright test --ui
```

## 6. Structure utile

- `tests/` : fichiers de tests (`*.spec.ts`) à la racine
- `tests/fixtures/fixtures.ts` : fixtures personnalisées + POM injectés dans les tests
- `tests/pages/` : classes Page Object (une page = une classe = un fichier)
- `playwright.config.ts` : configuration globale Playwright (browsers, reporter, etc.)
- `env/.env.local` : configuration d’URL pour l’environnement local

- Kaan BOZ.
