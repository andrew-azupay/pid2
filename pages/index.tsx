import type { InferGetServerSidePropsType, NextPage } from "next";
import { useRouter } from "next/router";
import { authsignal } from "../lib";

export const getServerSideProps = async () => {
  // TODO: replace with real value for your authenticated user
  const userId = "usr_123";

  const { isEnrolled, url: mfaUrl } = await authsignal.mfa({
    userId,
    redirectUrl: "http://localhost:3000",
  });

  return {
    props: {
      isEnrolled,
      mfaUrl,
    },
  };
};

type HomeProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Home: NextPage<HomeProps> = ({ isEnrolled, mfaUrl }) => {
  const router = useRouter();

  return (
    <main>
      <section>
        <h1>My Example App</h1>
        <button onClick={() => (window.location.href = mfaUrl)}>
          {isEnrolled ? "Manage MFA settings" : "Set up MFA"}
        </button>
        <button onClick={() => router.push("/api/withdraw")}>
          Withdraw funds
        </button>
      </section>
    </main>
  );
};

export default Home;
