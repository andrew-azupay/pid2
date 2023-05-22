import { NextApiRequest, NextApiResponse } from "next";
import { authsignal } from "../../lib/authsignal";

export default async function checkUser(req: NextApiRequest, res: NextApiResponse) {
  // TODO: replace with real value for the authenticated user
  // const userId = "802514987654323";
  const userId = req.query.userId as string;
  console.log("userId: " + userId);

  const { isEnrolled } = await authsignal.getUser({
    userId,
  });
  console.log("checkUser: " + isEnrolled);
  res.send({ isEnrolled });
}
