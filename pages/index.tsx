import type { InferGetServerSidePropsType, NextPage } from "next";
import { useEffect, useState } from "react";
import { AuthsignalServer } from "@authsignal/node";
import { AuthsignalBrowser } from "@authsignal/browser";
import { getServerConfig, getBrowserConfig } from "../config";
import styles from "../styles/Home.module.css";

export const getServerSideProps = async () => {
  const { secret } = getServerConfig();
  const authsignalServer = new AuthsignalServer({ secret });

  // TODO: replace with real value for your authenticated user
  const userId = "usr_123";

  const { isEnrolled, url } = await authsignalServer.mfa({
    userId,
    redirectUrl: "http://localhost:3000",
  });

  return {
    props: {
      isEnrolled,
      url,
    },
  };
};

type HomeProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Home: NextPage<HomeProps> = ({ isEnrolled, url }) => {
  const { mfa } = useAuthsignal();

  return (
    <main className={styles.main}>
      <div className={styles.buttons}>
        <div
          className={styles.button}
          onClick={() => {
            mfa?.({ url });
          }}
        >
          {isEnrolled ? "Manage MFA settings" : "Set up MFA"}
        </div>
        <a href="/api/withdraw">
          <div className={styles.button}>Withdraw funds</div>
        </a>
      </div>
    </main>
  );
};

export default Home;

const useAuthsignal = () => {
  const [browserClient, setBrowserClient] = useState<AuthsignalBrowser>();

  // Initialize the Authsignal browser client in a useEffect hook
  // This is because it requires the document and can't be done server-side
  useEffect(() => {
    const { publishableKey } = getBrowserConfig();
    setBrowserClient(new AuthsignalBrowser({ publishableKey }));
  }, []);

  return {
    mfa: browserClient?.mfa,
  };
};
