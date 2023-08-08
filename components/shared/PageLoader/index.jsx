import styles from "./index.module.scss";
import { Loading } from '@carbon/react';

const PageLoader = ({ isActive, text }) => {
  return (
    <div
      className={isActive ? styles["page-loader"] : ""}
    >
      <Loading
        description="Active loading indicator" withOverlay={false}
      />
      {
        text && isActive &&
        <p className={styles["loader-text"]}>
          {text}
        </p>
      }
    </div>
  );
};

export default PageLoader;
