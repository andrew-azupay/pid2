import type { NextApiRequest, NextApiResponse } from "next";
import { authsignal } from "../../lib";

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  // TODO: replace with real value for the authenticated user
  const userId = "usr_123";

  const { state, challengeUrl } = await authsignal.track({
    action: "withdrawal",
    userId,
    redirectUrl: "http://localhost:3000/api/finalize-withdrawal",
  });

  if (state === "CHALLENGE_REQUIRED" && challengeUrl) {
    res.redirect(challengeUrl);
  } else {
    res.redirect("/withdrawal/success");
  }
}
