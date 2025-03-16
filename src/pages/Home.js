import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css"; // Import CSS

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <img src="/logo.jpeg" width="300" />
      <h1 className="home-title">Ayusure</h1>
      <h2>AI-Powered Medical Report Analysis with Ayurveda & Insurance Integration</h2>
      <button className="home-button" onClick={() => navigate("/dashboard")}>
        Login
      </button>
    </div>
  );
};

export default Home;
