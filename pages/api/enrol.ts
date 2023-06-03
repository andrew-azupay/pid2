import { NextApiRequest, NextApiResponse } from "next";
import { authsignal } from "../../lib/authsignal";

export default async function mfa(req: NextApiRequest, res: NextApiResponse) {
  // TODO: replace with real value for the authenticated user
  // const userId = "802514987654323";

  const { userId, isEnrolled } = req.body;

  const trackResponse = await authsignal.track({
    action: isEnrolled ? "manageSettings" : "enroll",
    userId,
    redirectToSettings: isEnrolled,
  });
  console.log("Track:", trackResponse);
  res.send({ token: trackResponse.token });
}
