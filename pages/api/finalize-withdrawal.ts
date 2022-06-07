import type { NextApiRequest, NextApiResponse } from "next";
import { AuthsignalServer, UserActionState } from "@authsignal/node";
import { getServerConfig } from "../../config";

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  // TODO: replace with real values for your authenticated user / idempotency key
  const userId = "usr_123";
  const idempotencyKey = "ik_123";

  const { secret } = getServerConfig();
  const authsignalServer = new AuthsignalServer({ secret });

  const { state } = await authsignalServer.getAction({
    action: "withdrawal",
    userId,
    idempotencyKey,
  });

  if (state === UserActionState.CHALLENGE_SUCCEEDED) {
    res.redirect("/withdrawal/success");
  } else {
    res.redirect("/withdrawal/failure");
  }
}
