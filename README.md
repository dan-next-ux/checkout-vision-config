# Checkout Vision Config

A static checkout prototype for testing sign-in, delivery, payment, and order completion flows.

The project uses Next.js as a lightweight local server. Most screens are plain HTML pages with shared CSS, JavaScript, fonts, and image assets.

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
app/                 Next.js app shell
public/              Static files served by Next.js
scripts/             Shared prototype JavaScript
styles/              Shared CSS and brand variables
images/              Image and icon assets
fonts/               Local font assets
*/index.html         Individual prototype screens
next.config.js       Routes clean URLs to static HTML pages
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

Start a production server after building:

```bash
npm start
```

## Deployment

For a simple hosted prototype, push this project to GitHub and deploy it with Vercel. Vercel will detect the Next.js app and serve the static checkout pages through the routes configured in `next.config.js`.

GitHub Pages can also work for the static files, but absolute asset paths and clean page routes may need adjustment for a repository subpath.
