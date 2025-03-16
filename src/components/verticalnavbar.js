import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Vertical.css";
import { Link } from "react-router-dom";

const VerticalNavbar = () => {
  const navigate = useNavigate();
  return (
    <div className="vertical-navbar">
      <h2>Menu</h2>
      <Link to="/report-analysis">
      <button className="nav-button">Report Analysis</button></Link>
      <button className="nav-button">Ayurvedic Recommendations</button>
      <button className="nav-button">My Profile</button>
      <button onClick={() => navigate("/")} className="nav-button logout">Logout</button>
      
      
    </div>
  );
};

export default VerticalNavbar;