import { RedirectTokenPayload } from "@authsignal/node";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
import { authsignal } from "../../lib/authsignal";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // TODO: replace with real value for the authenticated user
  // const userId = "802514987654323";
  const userId = req.query.userId as string;
  const trackUrl = req.query.trackUrl as string;
  const token = req.query.token as string;

  const secret = process.env.AUTHSIGNAL_SECRET;
  const rootUrl = process.env.ROOT_URL;

  const redirectURL = (rootUrl?rootUrl:"http://localhost:3000");
  if (!secret) {
    throw new Error("AUTHSIGNAL_SECRET is not set");
  }

  jwt.verify(token, secret);

  const decodedToken = <RedirectTokenPayload>jwt.decode(token);
  const { idempotencyKey } = decodedToken.other;

  if (idempotencyKey) {
    const response = await authsignal.getAction({
      action: trackUrl,
      userId,
      idempotencyKey,
    });

    if (response?.state === "CHALLENGE_SUCCEEDED") {
      return res.redirect("/withdrawal/success?redirect="+ redirectURL);
    }
  }

  res.redirect("/withdrawal/failure");
}
