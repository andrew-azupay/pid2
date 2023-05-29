import type { NextPage } from "next";

const Success: NextPage = () => {
    const rootUrl = "https://pid2.vercel.app";
  return (
    <main>
        <div><h2>Auth Challenge successful!</h2></div>
        <button
            onClick={async (e) => {
                e.preventDefault();
                    window.location.href = rootUrl;
            }}
        >
            Back to Main App
        </button>
    </main>
  );
};

export default Success;
