import styles from "./PageLoader.module.scss";
import { Loading } from '@carbon/react';

const PageLoader = () => {
  return (
    <div
      className={styles["page-loader"] }
    >
      <Loading
        description="Active loading indicator" withOverlay={false}
      />
      {
        <p className={styles["loader-text"]}>
          {`Loading data & creating orbits`}
        </p>
      }
    </div>
  );
};

export default PageLoader;
