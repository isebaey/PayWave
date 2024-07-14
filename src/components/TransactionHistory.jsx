import React from "react";
import { Table } from "react-bootstrap";

const TransactionHistory = ({ transactions }) => {
  if (!transactions.length) {
    return <p>No transactions available.</p>;
  }

  return (
    <div className="border rounded p-3 bg-white shadow-sm mt-4">
      <h2 className="text-center text-success">Transaction History</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{new Date(transaction.date).toLocaleDateString()}</td>
              <td>${transaction.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TransactionHistory;
