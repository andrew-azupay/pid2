import type { NextPage } from "next";

const Failure: NextPage = () => {
    const rootUrl = process.env.ROOT_URL?process.env.ROOT_URL:"http://localhost:3000";
    return (
        <main>
            <div><h2>Auth Challenge Failed!</h2></div>
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

export default Failure;
