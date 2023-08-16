// utils
import { useState, useCallback } from "react";
import Head from "next/head";

// components and styles
import Shell from "../components/Shell";
import CesiumView from "../components/Cesium3DView";
import PageLoader from "../components/PageLoader";

import { Theme } from "@carbon/react";

const Satellites = ({ recentLaunches, token }) => {
  const [isLoading, setIsLoading] = useState(true);

  const setLoadingStatus = useCallback((status) => {
    setIsLoading(status);
  }, []);

  return (
    <Shell>
      <Head>
        <title>{isLoading ? 'Loading greatness...' : 'Yet another globe with space dots'}</title>
      </Head>

      <Theme theme={"g100"}>
        {
          isLoading ? 
          <PageLoader /> : null
        }

        <CesiumView
          token={token}
          recentLaunches={recentLaunches}
          setLoadingStatus={setLoadingStatus}
        />
      </Theme>
    </Shell>
  );
};

export default Satellites;
