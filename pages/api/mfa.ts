import { NextApiRequest, NextApiResponse } from "next";
import { authsignal } from "../../lib/authsignal";

export default async function mfa(req: NextApiRequest, res: NextApiResponse) {
  // TODO: replace with real value for the authenticated user
  const userId = "usr_123";

  const { isEnrolled } = req.body;

  const { url: mfaUrl } = await authsignal.track({
    action: isEnrolled ? "manageSettings" : "enroll",
    userId,
    redirectToSettings: isEnrolled,
  });

  res.send({ mfaUrl });
}
