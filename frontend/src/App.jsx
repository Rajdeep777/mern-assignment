// src/App.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import TransactionsTable from "./components/TransactionsTable";
import Statistics from "./components/Statistics";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import "./App.css";
const App = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [selectedMonth, setSelectedMonth] = useState("March");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  // Data states for combined API response
  const [combinedData, setCombinedData] = useState({
    transactions: [],
    statistics: {},
    barChart: [],
    pieChart: [],
  });
  const fetchCombinedData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/combined`, {
        params: { month: selectedMonth, search, page, perPage: 10 },
      });
      setCombinedData(res.data);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };
  // Fetch data when month, search, or page changes
  useEffect(() => {
    fetchCombinedData();
  }, [selectedMonth, search, page]);
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    setPage(1); // reset pagination when month changes
  };
  return (
    <div className="container">
      <h1>Transactions Dashboard</h1>
      {/* Header Controls */}
      <div className="controls">
        <div className="dropdown">
          <label htmlFor="monthSelect">Select Month:</label>
          <select
            id="monthSelect"
            value={selectedMonth}
            onChange={handleMonthChange}
          >
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </div>
      {/* Transactions Table */}
      <TransactionsTable
        transactions={combinedData.transactions}
        page={page}
        setPage={setPage}
      />
      {/* Statistics */}
      <Statistics stats={combinedData.statistics} />
      {/* Charts */}
      <div className="charts-container">
        <div className="chart-card">
          <BarChart data={combinedData.barChart} />
        </div>
        <div className="chart-card">
          <PieChart data={combinedData.pieChart} />
        </div>
      </div>
    </div>
  );
};
export default App;
