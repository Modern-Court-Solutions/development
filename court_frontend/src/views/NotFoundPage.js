import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  let navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      setTimeout(() => {
        navigate("/");
      }, 5000);
    }
  }, [token, navigate]);

  return (
    <div>
      <h3>404 page not found</h3>
      <p>We are sorry but the page you are looking for does not exist.</p>
      <h3>We'll reroute you to the Dashboard in 5 seconds</h3>
    </div>
  );
};

export default NotFoundPage;
