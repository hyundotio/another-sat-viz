import React from "react";

import "@/styles/global.scss";
import "@/styles/app.scss";
import "@/styles/satellites.scss";

const App = ({ Component, pageProps }) => {
  return (
    <Component {...pageProps} />
  );
};

export default App;
