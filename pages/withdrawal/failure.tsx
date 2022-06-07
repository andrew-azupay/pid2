import type { NextPage } from "next";
import styles from "../../styles/Home.module.css";

const Failure: NextPage = () => {
  return (
    <main className={styles.main}>
      <div>Withdrawal failed!</div>
    </main>
  );
};

export default Failure;
