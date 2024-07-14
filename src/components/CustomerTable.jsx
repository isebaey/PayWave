import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";

const CustomerTable = ({ customers, transactions, onSelectCustomer }) => {
  const [filterName, setFilterName] = useState("");
  const [filterAmount, setFilterAmount] = useState("");

  const handleNameChange = (e) => {
    setFilterName(e.target.value);
  };

  const handleAmountChange = (e) => {
    setFilterAmount(e.target.value);
  };

  const totalTransactionAmount = (customerId) => {
    return transactions
      .filter((transaction) => transaction.customer_id === customerId)
      .reduce((sum, transaction) => sum + transaction.amount, 0);
  };

  const filteredCustomers = customers.filter((customer) => {
    const nameMatch = customer.name
      .toLowerCase()
      .includes(filterName.toLowerCase());
    const amountMatch = filterAmount
      ? totalTransactionAmount(customer.id) >= parseFloat(filterAmount)
      : true;
    return nameMatch && amountMatch;
  });

  return (
    <div className="customer-table">
      <Form.Group className="mb-3">
        <Form.Control
          value={filterName}
          onChange={handleNameChange}
          placeholder="Filter by name"
          className="mb-2"
        />
        <Form.Control
          value={filterAmount}
          onChange={handleAmountChange}
          placeholder="Filter by amount"
          type="number"
          className="mb-2"
        />
      </Form.Group>
      <div className="customer-cards d-flex flex-wrap justify-content-center">
        {filteredCustomers.map((customer) => (
          <Card
            key={customer.id}
            className="m-2 customer-card shadow-sm"
            style={{ width: "18rem", borderRadius: "10px" }}
          >
            <Card.Body>
              <Card.Title className="text-success">{customer.name}</Card.Title>
              <Card.Text>
                <strong>Total Transaction Amount:</strong> $
                {totalTransactionAmount(customer.id).toFixed(2)}
              </Card.Text>
              <Button
                variant="success"
                onClick={() => onSelectCustomer(customer.id)}
                className="w-100"
              >
                View Transactions
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CustomerTable;
