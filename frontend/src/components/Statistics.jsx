// src/components/Statistics.js
import React from "react";
const Statistics = ({ stats }) => {
  return (
    <div className="statistics">
      <div className="stat-card">
        <h3>Total Sale Amount</h3>
        <p style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
          ${stats.totalSaleAmount || 0}
        </p>
      </div>
      <div className="stat-card">
        <h3>Total Sold Items</h3>
        <p style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
          {stats.totalSoldItems || 0}
        </p>
      </div>
      <div className="stat-card">
        <h3>Total Not Sold Items</h3>
        <p style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
          {stats.totalNotSoldItems || 0}
        </p>
      </div>
    </div>
  );
};
export default Statistics;
