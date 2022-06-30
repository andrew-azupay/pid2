import type { NextApiRequest, NextApiResponse } from "next";
import { AuthsignalServer, UserActionState } from "@authsignal/node";
import { getServerConfig } from "../../config";

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  // TODO: replace with real value for your authenticated user
  const userId = "usr_123";

  const { secret } = getServerConfig();
  const authsignalServer = new AuthsignalServer({ secret });

  const { state, challengeUrl } = await authsignalServer.track({
    action: "withdrawal",
    userId,
    redirectUrl: "http://localhost:3000/api/finalize-withdrawal",
  });

  if (state === UserActionState.CHALLENGE_REQUIRED && challengeUrl) {
    // Redirect to the Authsignal Prebuilt MFA page to present a challenge
    res.redirect(challengeUrl);
  } else {
    // Proceed with the withdrawal...
    res.redirect("/withdrawal/success");
  }
}
