import Document, { Html, Head, Main, NextScript } from "next/document";

class AppDocument extends Document {
  static async getInitialProps(context) {
    const initialProps = await Document.getInitialProps(context);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/static/favicon.ico" type="image/x-icon" />
          <meta name="title" content="Yet another globe with space dots" />
          <meta
            name="description"
            content="Yet another browser-based 3d visualization of space objects."
          />
          <meta
            name="keywords"
            content="ssa, sda, dots, space, spess, sats"
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="Yet another globe with space dots"
          />
          <meta
            property="og:description"
            content="Yet another browser-based 3d visualization of space objects."
          />
          <meta
            property="twitter:title"
            content="Yet another globe with space dots"
          />
          <meta
            property="twitter:description"
            content="Yet another browser-based 3d visualization of space objects."
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  };
}

export default AppDocument;
