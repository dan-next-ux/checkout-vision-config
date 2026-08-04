import "./globals.css";

export const metadata = {
  title: "Checkout Vision Config",
  description: "Configurable checkout journey prototype"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
