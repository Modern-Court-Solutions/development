import cookie from "cookie";
import { setCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import nextSession from "next-session";
const getSession = nextSession();

const LOGIN_URL = process.env.LOGIN_URL || "";
const EXPIREHOURS = process.env.EXPIREHOURS || 1;
const LOGIN_USER_VALIDATION_URL = process.env.LOGIN_USER_VALIDATION_URL || "";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  let expireTime = new Date(Date.now() + 60 * +EXPIREHOURS * 60000);
  let userName = "";

  const session = await getSession(req, res);
  const { email, password } = req.body;
  const userInfo = { email: email, password: password };
  try {
    const response = await fetch(LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    if (!response.ok) {
      throw new Error();
    }
    const data = await response.json();
    if (!data.token) {
      throw new Error();
    }
    try {
      const response = await fetch(
        `${LOGIN_USER_VALIDATION_URL}?email=${userInfo?.email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${data.token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error();
      }
      const userStatus = await response.json();
      if (userStatus[0].name) {
        userName = userStatus[0].name;
      }
    } catch (error) {
      console.log(error);
      res.status(500).end();
      return;
    }
    session.user = userInfo;
    session.validated = true;
    setCookie("server-key", "value", { req, res, maxAge: 60 * 60 * 24 });

    console.log(data.token);
    res
      .status(200)
      .setHeader("Set-Cookie", [
        cookie.serialize("jwt", data.token, {
          path: "/",
          httpOnly: true,
          expires: expireTime,
        }),
        cookie.serialize("userName", userName, {
          path: "/",
          httpOnly: true,
          expires: expireTime,
        }),
      ])
      .json({ stat: "ok" });
  } catch (err) {
    res.status(401).end();
    return false;
  }
};
export const config = {
  api: {
    externalResolver: true,
  },
};
export default handler;
