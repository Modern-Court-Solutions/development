import { fetchLogin } from "../../lib/loginApi";
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
    const response = await fetch("http://127.0.0.1:8000/user/token/", {
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

    res
      .status(200)
      .setHeader(
        "Set-Cookie",
        cookie.serialize("jwt", data.token, {
          path: "/api",
          httpOnly: true,
        })
      )
      .json({});
  } catch (err) {
    console.log(err);
    res.status(401).end();
  }
};

export default handleLogin;
