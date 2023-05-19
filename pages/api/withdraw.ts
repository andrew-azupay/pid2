import type { NextApiRequest, NextApiResponse } from "next";
import { authsignal } from "../../lib/authsignal";

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  // TODO: replace with real value for the authenticated user
  const userId = "802514987654323";

  const { state, url: challengeUrl } = await authsignal.track({
    action: "withdrawal",
    userId,
    redirectUrl: "http://localhost:3000/api/finalize-withdrawal",
  });

  if (state !== "CHALLENGE_REQUIRED") {
    // Proceed with withdrawal...
  }

  res.send({ state, challengeUrl });
}
