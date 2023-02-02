import { NextApiRequest, NextApiResponse } from "next";
import { getData } from "../../../functions/getData";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.status(405).end();
    return;
  }

  const jwt = req.cookies.jwt;

  if (!jwt) {
    res.status(401).end();
    return;
  }
  const cases = await getData(`${process.env.DB_URL}/cases/?status=3`, jwt);

  res.status(200).json(cases);
};

export default handler;
