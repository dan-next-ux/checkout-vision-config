const checkoutPages = [
  "delivery",
  "enter-otp",
  "order-complete",
  "payment",
  "payment-loading",
  "signin-register",
  "single-page",
  "your-details"
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  async rewrites() {
    return checkoutPages.flatMap((page) => [
      {
        source: `/${page}`,
        destination: `/${page}/index.html`
      },
      {
        source: `/${page}/`,
        destination: `/${page}/index.html`
      }
    ]);
  }
};

module.exports = nextConfig;
