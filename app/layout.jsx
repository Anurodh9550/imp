import "./globals.css";

export const metadata = {
  title: "IMPAL Food | Purity. Trust. Quality.",
  description:
    "At IMPAL, we bring you the finest daily essentials directly from the heart of India's richest agricultural hubs — Premium Sugar & Authentic Poha, packed with utmost care, hygiene, and transparency.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
