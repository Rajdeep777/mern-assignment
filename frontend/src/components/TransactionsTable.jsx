// src/components/TransactionsTable.js
import React from "react";
const TransactionsTable = ({ transactions, page, setPage }) => {
  return (
    <div>
      <h2
        style={{ textAlign: "center", marginBottom: "1rem", color: "#2c3e50" }}
      >
        Transactions
      </h2>
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Date of Sale</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length ? (
            transactions.map((tx, index) => (
              <tr key={index}>
                <td>{tx.title}</td>
                <td>{tx.description}</td>
                <td>{tx.price}</td>
                <td>{new Date(tx.dateOfSale).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: "1rem" }}>
                No transactions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
      </div>
    </div>
  );
};
export default TransactionsTable;
