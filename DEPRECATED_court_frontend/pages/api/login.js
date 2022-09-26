import cookie from "cookie";

const LOGIN_URL = process.env.LOGIN_URL;

const handleLogin = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
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
    console.log("data", data);

    if (!data.token) {
      throw new Error();
    }

    res
      .status(200)
      .setHeader(
        "Set-Cookie",
        cookie.serialize("jwt", data.token, {
          path: "/api",
          httpOnly: true,
        })
      )
      .json({ stat: "ok" });
  } catch (err) {
    res.status(401).end();
    return false;
  }
};

export default handleLogin;
