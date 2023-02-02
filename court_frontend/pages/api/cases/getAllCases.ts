import { NextApiRequest, NextApiResponse } from "next";
import { getData } from "../../../functions/getData";
import { getSession } from "../../../lib/get-session";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.status(405).end();
    return;
  }
  const session = await getSession(req, res);
  const cases = await getData(`${process.env.DB_URL}/cases/`, session.jwt);
  res.status(200).json({
    cases: cases.results,
    other: cases,
  });
};
