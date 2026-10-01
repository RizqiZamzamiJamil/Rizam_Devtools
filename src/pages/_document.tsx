import {
  Html,
  Head,
  Main,
  NextScript,
  type DocumentContext,
  type DocumentProps,
} from "next/document";
import {
  DocumentHeadTags,
  documentGetInitialProps,
  createEmotionCache,
  type DocumentHeadTagsProps,
} from "@mui/material-nextjs/v15-pagesRouter";

export default function Document(props: DocumentProps & DocumentHeadTagsProps) {
  return (
    <Html lang="id">
      <Head>
        <DocumentHeadTags {...props} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

Document.getInitialProps = (context: DocumentContext) =>
  documentGetInitialProps(context, {
    emotionCache: createEmotionCache({ key: "mui", enableCssLayer: true }),
  });
