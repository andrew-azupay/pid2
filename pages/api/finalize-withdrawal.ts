import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import {
  AuthsignalServer,
  UserActionState,
  RedirectTokenPayload,
} from "@authsignal/node";
import { getServerConfig } from "../../config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // TODO: replace with real value for your authenticated user
  const userId = "usr_123";

  const { secret } = getServerConfig();
  const authsignalServer = new AuthsignalServer({ secret });

  const token = req.query.token as string;

  jwt.verify(token, secret);

  const decodedToken = <RedirectTokenPayload>jwt.decode(token);
  const { idempotencyKey } = decodedToken.other;

  const actionResponse = await authsignalServer.getAction({
    action: "withdrawal",
    userId,
    idempotencyKey,
  });

  if (actionResponse?.state === UserActionState.CHALLENGE_SUCCEEDED) {
    res.redirect("/withdrawal/success");
  } else {
    res.redirect("/withdrawal/failure");
  }
}
