// utils
import { useState, useCallback } from "react";
import Head from "next/head";

// components and styles
import Layout from "@/components/shared/Layout";
import CesiumView from "@/components/satellites/CesiumView";
import PageLoader from "@/components/shared/PageLoader";

import { Theme } from "@carbon/react";

const Satellites = ({ recentLaunches, token }) => {
  const [isLoading, setIsLoading] = useState(true);

  const setLoadingStatus = useCallback((status) => {
    setIsLoading(status);
  }, []);

  return (
    <Layout>
      <Head>
        <title>Loading greatness...</title>
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
    </Layout>
  );
};

export default Satellites;
