import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <Header />
      </div>
      <h1>Verity Home</h1>
      <button onClick={() => navigate("/signUp")}>Sign Up</button>
      <button onClick={() => navigate("/signIn")}>Sign In</button>
    </div>
  );
};

export default HomePage;
