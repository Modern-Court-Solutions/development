import cookie from "cookie";
import nextSession from "next-session";
const getSession = nextSession();

const LOGIN_URL = process.env.LOGIN_URL || "";
const EXPIREHOURS = process.env.EXPIREHOURS || 1;

const handler = async (req: any, res: any) => {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
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
    console.log(data);
    if (!data.token) {
      throw new Error();
    }
    session.name = "rob";
    session.user = userInfo;
    session.validated = true;
    let date = new Date();
    date.setTime(date.getTime() + 60 * +EXPIREHOURS * 60000);
    res
      .status(200)
      .setHeader(
        "Set-Cookie",
        cookie.serialize("jwt", data.token, {
          path: "/",
          httpOnly: true,
          expires: date,
        })
      )
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
