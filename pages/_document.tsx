import { Header } from "@/components/Header";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ja">
      <Head />
      <body>
        <Header />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
