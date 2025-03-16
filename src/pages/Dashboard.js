import React, { useState, useRef } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useNavigate } from "react-router-dom";
import VerticalNavbar from "../components/verticalnavbar";
import HorizontalNavbar from "../components/horizontalnavbar";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [reports, setReports] = useState([
    { id: 1, name: "Health_Report_01.pdf", date: "March 15, 2025", type: "Health" },
    { id: 2, name: "Wellness_Check_02.pdf", date: "March 10, 2025", type: "Wellness" },
  ]);

  // Reference for hidden file input
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click(); // Open file selection dialog
  };

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const newReport = {
        id: reports.length + 1,
        name: file.name,
        date: new Date().toLocaleDateString(),
        type: "General",
      };
      setReports([...reports, newReport]);
    }
  };

  // Pie chart data (percentage of different report types)
  const reportTypeData = [
    { name: "Health", value: reports.filter(r => r.type === "Health").length },
    { name: "Wellness", value: reports.filter(r => r.type === "Wellness").length },
    { name: "General", value: reports.filter(r => r.type === "General").length },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  // Histogram chart data (reports over time)
  const reportHistogramData = reports.map((r, index) => ({
    name: `Report ${index + 1}`,
    Count: 1,
  }));

  return (
    <div className="dashboard-container">
      <VerticalNavbar />
      <div className="dashboard-main">
        <HorizontalNavbar />
        <div className="dashboard-content">
          <div className="dashboard-grid">
            {/* Left Section (Upload & Reports) */}
            <div className="left-section">
              {/* Upload Section */}
              <div className="uploadreport">
                <h2>Upload your report</h2>

                {/* Hidden file input */}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  style={{ display: "none" }} 
                  onChange={handleFileChange} 
                />
                
                <button className="upload-btn" onClick={handleUploadClick}>Upload</button>
                <button className="analyze-btn" onClick={() => window.location.href='/report-analysis'}>Analyze Report</button>
              </div>

              {/* My Reports Section */}
              <div className="my-reports">
                <h2>My Previous Reports</h2>
                <ul>
                  {reports.map((report) => (
                    <li key={report.id} className="report-item">
                      {report.name} - <span>{report.date}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Section (Charts) */}
            <div className="right-section">
              <div className="chart-box">
                <h3>Report Type Distribution</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={reportTypeData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                      {reportTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-box">
                <h3>Reports Uploaded Over Time</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={reportHistogramData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="Count" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
