import cookie from "cookie";
import nextSession from "next-session";
const getSession = nextSession();

const handler = async (req: any, res: any) => {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  const session = await getSession(req, res);

  try {
    session.name = "";
    session.user = null;
    session.validated = false;
    let date = new Date();
    date.setTime(date.getTime() - 60 * 60000);
    res
      .status(200)
      .setHeader(
        "Set-Cookie",
        cookie.serialize("jwt", "", {
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
