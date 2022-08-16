import { RedirectTokenPayload } from "@authsignal/node";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
import { authsignal } from "../../lib/authsignal";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // TODO: replace with real value for the authenticated user
  const userId = "usr_123";

  const token = req.query.token as string;

  const secret = process.env.AUTHSIGNAL_SECRET;

  if (!secret) {
    throw new Error("AUTHSIGNAL_SECRET is not set");
  }

  jwt.verify(token, secret);

  const decodedToken = <RedirectTokenPayload>jwt.decode(token);
  const { idempotencyKey } = decodedToken.other;

  if (idempotencyKey) {
    const response = await authsignal.getAction({
      action: "withdrawal",
      userId,
      idempotencyKey,
    });

    if (response?.state === "CHALLENGE_SUCCEEDED") {
      return res.redirect("/withdrawal/success");
    }
  }

  res.redirect("/withdrawal/failure");
}
