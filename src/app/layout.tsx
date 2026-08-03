import type { Metadata } from "next";
import {
  JetBrains_Mono,
  Poppins,
} from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://devtools.rizam.fun"),
  title: "Rizam DevTools",
  description:
    "Developer toolbox client-side untuk JSON, JWT, Base64, UUID, timestamp, URL, hash, dan case converter.",
  applicationName: "Rizam DevTools",
  authors: [{ name: "Rizam" }],
  creator: "Rizam",
  openGraph: {
    title: "Rizam DevTools",
    description:
      "Kotak perkakas digital untuk pekerjaan kecil developer, berjalan lokal di browser.",
    url: "https://devtools.rizam.fun",
    siteName: "Rizam DevTools",
    images: [
      {
        url: "/brand-logo.png",
        width: 306,
        height: 333,
        alt: "Rizam DevTools",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Rizam DevTools",
    description:
      "JSON formatter, JWT decoder, Base64, UUID, timestamp, URL parser, hash, dan case converter.",
    images: ["/brand-logo.png"],
  },
  icons: {
    icon: "/brand-mark.png",
    apple: "/brand-mark.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${poppins.variable} ${jetBrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
