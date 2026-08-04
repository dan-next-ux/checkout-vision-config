# Checkout Vision Config

A static checkout prototype for testing sign-in, delivery, payment, and order completion flows.

The project uses Next.js as a lightweight configurator shell and static export tool. Most checkout screens are plain HTML pages with shared CSS, JavaScript, fonts, and image assets served from `public/`.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the local development server:

```bash
npm run dev
```

Open the prototype at:

```text
http://localhost:3000
```

## Main Pages

- `/signin-register` - sign in and registration entry point
- `/enter-otp` - one-time passcode screen
- `/your-details` - customer details screen
- `/delivery` - delivery details screen
- `/payment` - payment options and order summary
- `/payment-loading` - payment processing state
- `/order-complete` - order confirmation screen
- `/single-page` - combined checkout view

## Project Structure

```text
app/                 Next.js configurator shell
public/              Static prototype pages and assets
scripts/             Shared prototype JavaScript
styles/              Shared CSS and brand variables
images/              Image and icon assets
fonts/               Local font assets
*/index.html         Individual prototype screens
next.config.js       Static export and GitHub Pages base path config
.github/workflows/   GitHub Pages deployment workflow
```

## Useful Commands

Check the shared JavaScript for syntax errors:

```bash
node --check scripts/script.js
```

Create a production build:

```bash
npm run build
```

Build for a GitHub Pages repository path:

```bash
NEXT_PUBLIC_BASE_PATH=/your-repo-name npm run build
```

## Deployment

This project is configured for GitHub Pages static export.

1. Push the repo to GitHub.
2. In GitHub, open **Settings > Pages**.
3. Set **Build and deployment > Source** to **GitHub Actions**.
4. Push to `main` or run the workflow manually.

The workflow builds the static site into `out/` and deploys that folder to GitHub Pages. It automatically sets `NEXT_PUBLIC_BASE_PATH` to the repository name so the app works at:

```text
https://your-username.github.io/your-repo-name/
```

Prototype pages are available at paths like:

```text
https://your-username.github.io/your-repo-name/signin-register/
```
