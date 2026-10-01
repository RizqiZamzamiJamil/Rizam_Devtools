import type { AppProps } from "next/app";
import type { EmotionCache } from "@emotion/cache";
import Head from "next/head";
import { Poppins, JetBrains_Mono } from "next/font/google";
import { AppCacheProvider } from "@mui/material-nextjs/v15-pagesRouter";
import { CssBaseline, ThemeProvider, GlobalStyles } from "@mui/material";
import SiteLayout from "@/layouts/SiteLayout";
import { theme } from "@/utils/theme";
import { emotionCache } from "@/utils/emotionCache";
import "@/assets/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
const mono = JetBrains_Mono({ subsets: ["latin"], display: "swap" });

export default function App(props: AppProps & { emotionCache?: EmotionCache }) {
  const { Component, pageProps, router } = props;
  return (
    <AppCacheProvider
      {...props}
      emotionCache={props.emotionCache ?? emotionCache}
    >
      <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="application-name" content="DevTools" />
        <meta property="og:title" content="DevTools" />
        <meta property="og:site_name" content="DevTools" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://devtools.rizam.fun" />
        <meta
          property="og:description"
          content="JSON, JWT, Base64, UUID, timestamp, URL, hash, dan case converter di browser."
        />
        <meta
          property="og:image"
          content="https://devtools.rizam.fun/favicon.png"
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="DevTools" />
        <meta
          name="twitter:image"
          content="https://devtools.rizam.fun/favicon.png"
        />
        <meta name="theme-color" content="#101010" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            ":root": {
              "--font-poppins": poppins.style.fontFamily,
              "--font-mono": mono.style.fontFamily,
            },
          }}
        />
        <SiteLayout>
          <Component {...pageProps} key={router.asPath.split(/[?#]/)[0]} />
        </SiteLayout>
      </ThemeProvider>
    </AppCacheProvider>
  );
}
