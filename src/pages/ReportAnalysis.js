import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import VerticalNavbar from "../components/verticalnavbar";
import HorizontalNavbar from "../components/horizontalnavbar";
import "../styles/ReportAnalysis.css";

const ReportAnalysis = () => {
  // Sample blood test data for jaundice
  const vitals = [
    { name: "Haemoglobin", value: 9, normalMin: 13, normalMax: 17 },
    { name: "Bilirubin", value: 3.2, normalMin: 0.1, normalMax: 1.2 },
    { name: "RBC Count", value: 3.8, normalMin: 4.7, normalMax: 6.1 },
    { name: "WBC Count", value: 6.5, normalMin: 4, normalMax: 11 },
    { name: "Platelet Count", value: 250, normalMin: 150, normalMax: 450 },
  ];

  // Function to determine bar width and color
  const getBarStyles = (value, normalMin, normalMax) => {
    const percentage = ((value - normalMin) / (normalMax - normalMin)) * 100;
    const barWidth = Math.max(percentage, 10); // Ensuring visibility even if low
    const color = value < normalMin ? "#FF4C4C" : "#00C49F"; // Red if low, Green if normal
    return { width: `${barWidth}%`, backgroundColor: color };
  };

  // Test Result Data (Example: 20% Positive, 80% Negative)
  const testResultsData = [
    { name: "Negative", value: 80, color: "#28a745" }, // Green for Negative
    { name: "Positive", value: 20, color: "#dc3545" }, // Red for Positive
  ];

  return (
    <div className="report-analysis-container">
      <VerticalNavbar />
      <div className="report-analysis-main">
        <HorizontalNavbar heading="Your Report Analysis is here!" />

        <div className="report-analysis-content">
          <h2>Blood Test Report for Jaundice</h2>
          <div className="vitals-container">
            {vitals.map((vital, index) => (
              <div key={index} className="vital-bar">
                <div className="vital-name">{vital.name}</div>
                <div className="bar-background">
                  <div className="bar-fill" style={getBarStyles(vital.value, vital.normalMin, vital.normalMax)}>
                    {vital.value}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Test Result Percentage Chart */}
          <div className="test-result-chart">
            <h3>Test Result Percentage</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={testResultsData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {testResultsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportAnalysis;
