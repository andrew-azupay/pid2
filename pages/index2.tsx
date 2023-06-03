import type {InferGetServerSidePropsType, NextPage} from "next";
import {useRouter} from "next/router";
import { Authsignal } from "@authsignal/browser";

import Head from 'next/head';
import {string} from "prop-types";

// type HomeProps = InferGetServerSidePropsType<typeof getServerSideProps>;

// const Home: NextPage<HomeProps> = ({ isEnrolled }) => {
//  const router = useRouter();
export default function Contact() {



    let asUser = {};
    const rootUrl = "https://pid2.vercel.app";
    // @ts-ignore
    const submitContact = async (event) => {
        event.preventDefault();
        const userId = event.target.username.value;
        const res = await fetch("/api/checkUser?userId=" + userId, {
            body: JSON.stringify({
                name: name,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        });
        const result = await res.json();
        alert(`User is enrolled: ${result.isEnrolled}`);
        asUser = {
            "userId": userId,
            "enrolled": result.isEnrolled
        };

    };

    const checkAndRedirect: (e: React.MouseEvent<HTMLButtonElement>, trackUrl: String) => Promise<any> = async (e:React.MouseEvent<HTMLButtonElement>, trackUrl:String) => {
        e.preventDefault();

        const {state, challengeUrl} = await fetch("/api/withdraw", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({...asUser,
                "trackUrl": trackUrl}),
        }).then((res) => res.json());
        alert(`Challenge Status: ${state}`);
        if (state !== 'ALLOW') {
            return challengeUrl;
        } else {
            return rootUrl + "/withdrawal/success";
        }
    }

    return (
        <main>
            <section>
                <div className='flex items-center justify-center min-h-screen'>
                <h1>PID2 Auth POC2</h1>
                <form onSubmit={submitContact}>
                    <label htmlFor="name" className="mb-2 italic">User Id</label>
                    <input type="text" name="username" id="username" autoComplete="username webauthn"/>
                    <button type="submit">Check User</button>
                    <button
                        onClick={async (e) => {
                            e.preventDefault();
                            const authsignal = new Authsignal({ cookieDomain: "localhost", cookieName: "azupayAuth", baseUrl: "https://au.signal.authsignal.com/v1", tenantId: "PID2"});

                            const {token} = await fetch("/api/enrol", {
                                method: "POST",
                                headers: {"Content-Type": "application/json"},
                                body: JSON.stringify(asUser),
                            }).then((res) => res.json());

                            await authsignal.passkey.signUp({ token: token});
                            // window.location.href = mfaUrl;
                        }}
                    >
                        {"Manage Auth settings for User"}
                    </button>
                    <button
                        onClick={async (e) => {
                            const newUrl = await checkAndRedirect(e, "lowRisk1");
                            window.location.href = newUrl;
                        }}
                    >
                        Low Risk1
                    </button>
                    <button
                        onClick={async (e) => {
                            const newUrl = await checkAndRedirect(e, "lowRisk2");
                            window.location.href = newUrl;
                        }}
                    >
                        Low Risk2
                    </button>
                    <button
                        onClick={async (e) => {
                            const newUrl = await checkAndRedirect(e, "mediumRisk1");
                            window.location.href = newUrl;
                        }}
                    >
                        Medium Risk1
                    </button>
                    <button
                        onClick={async (e) => {
                            const newUrl = await checkAndRedirect(e, "mediumRisk2");
                            window.location.href = newUrl;
                        }}
                    >
                        Medium Risk2
                    </button>
                    <button
                        onClick={async (e) => {
                            e.preventDefault();

                            const {state, challengeUrl} = await fetch("/api/withdraw", {
                                method: "POST",
                                headers: {"Content-Type": "application/json"},
                                body: JSON.stringify({...asUser,
                                    "trackUrl": "highRisk1"}),
                            }).then((res) => res.json());
                            alert(`Challenge Status: ${state}`);
                            if (state !== 'ALLOW') {
                                window.location.href = challengeUrl;
                            }
                        }}
                    >
                        High Risk1
                    </button>
                    <button
                        onClick={async (e) => {
                            const newUrl = await checkAndRedirect(e, "highRisk1");
                            window.location.href = newUrl;
                        }}
                    >
                        High Risk2
                    </button>
                </form>
                </div>
            </section>
        </main>
    );
};

// export default Home;
