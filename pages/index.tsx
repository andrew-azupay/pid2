import type { InferGetServerSidePropsType, NextPage } from "next";
import { useRouter } from "next/router";
import { authsignal } from "../lib/authsignal";

export const getServerSideProps = async () => {
  // TODO: replace with real value for your authenticated user
  const userId = "usr_123";

  const { isEnrolled } = await authsignal.getUser({
    userId,
  });

  return {
    props: {
      isEnrolled,
    },
  };
};

type HomeProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Home: NextPage<HomeProps> = ({ isEnrolled }) => {
  const router = useRouter();

  return (
    <main>
      <section>
        <h1>My Example App</h1>
        <button
          onClick={async (e) => {
            e.preventDefault();

            const { mfaUrl } = await fetch("/api/mfa", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ isEnrolled }),
            }).then((res) => res.json());

            window.location.href = mfaUrl;
          }}
        >
          {isEnrolled ? "Manage MFA settings" : "Set up MFA"}
        </button>
        <button
          onClick={async (e) => {
            e.preventDefault();

            const { state, challengeUrl } = await fetch("/api/withdraw", {
              method: "POST",
            }).then((res) => res.json());

            if (state === "CHALLENGE_REQUIRED") {
              window.location.href = challengeUrl;
            } else {
              router.push("/withdrawal/success");
            }
          }}
        >
          Withdraw funds
        </button>
      </section>
    </main>
  );
};

export default Home;
