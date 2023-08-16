import styles from "./Shell.module.scss";

const Shell = ({ children }) => {
  return (
    <div className={styles["shell"]}>
      <main className={styles["main"]}>
        { children }
      </main>
    </div>
  );
};

export default Shell;
