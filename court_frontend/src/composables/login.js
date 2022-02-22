const login = (data, setErrors, setLoading) => {
  const user = {
    email: data.get("email"),
    password: data.get("password"),
  };
  setLoading(true);
  setTimeout(() => {
    fetch("http://127.0.0.1:8000/user/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (!res.ok) {
          localStorage.clear();
          setErrors(true);
          setLoading(false);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.token) {
          console.log("here");
          localStorage.clear();
          localStorage.setItem("token", data.token);
          console.log(data);
          window.location.replace("http://localhost:3000/");
          setLoading(false);
        } else {
          localStorage.clear();
          setErrors(true);
          setLoading(false);
        }
      })
      .catch((err) => {
        localStorage.clear();
        setErrors(true);
        setLoading(false);
      });
  }, 1000);
};
export default login;
