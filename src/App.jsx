import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomerTable from "./components/CustomerTable";
import TransactionGraph from "./components/TransactionGraph";
import { Container, Row, Col, Nav, Tab, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import TransactionHistory from "./components/TransactionHistory"; // New Component

function App() {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedCustomerTransactions, setSelectedCustomerTransactions] =
    useState([]);
  const [viewAllTransactions, setViewAllTransactions] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://gist.githubusercontent.com/isebaey/403a9cbf548a9391a870071454e77dde/raw/56fb59510ff341f904c2d20d389885e596b26262/data.json"
      );
      setCustomers(response.data.customers);
      setTransactions(response.data.transactions);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const selectCustomer = (customerId) => {
    const customerTransactions = transactions.filter(
      (transaction) => transaction.customer_id === customerId
    );
    setSelectedCustomerTransactions(customerTransactions);
    setViewAllTransactions(false); // Hide all transactions view
  };

  return (
    <Container className="App bg-light p-4" fluid>
      <Card className="text-center bg-transparent border mb-4">
        <Card.Body>
          <Card.Title className="text-success">
            <b>PayWave</b> App Dashboard
          </Card.Title>
          <Card.Text>
            Analyze customer transactions visually and efficiently.
          </Card.Text>
        </Card.Body>
      </Card>
      <Row>
        <Col md={4} className="customer-column">
          <CustomerTable
            customers={customers}
            transactions={transactions}
            onSelectCustomer={selectCustomer}
          />
        </Col>
        <Col md={8}>
          <Tab.Container defaultActiveKey="line">
            <Nav variant="tabs" className="mb-4">
              <Nav.Item>
                <Nav.Link
                  eventKey="line"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  Line Chart
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="bar"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  Bar Chart
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="line">
                <TransactionGraph
                  transactions={selectedCustomerTransactions}
                  type="line"
                />
              </Tab.Pane>
              <Tab.Pane eventKey="bar">
                <TransactionGraph
                  transactions={selectedCustomerTransactions}
                  type="bar"
                />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
          <Button
            variant="success"
            onClick={() => setViewAllTransactions(true)}
            className="w-100 mt-3"
          >
            View All Transactions
          </Button>
          {viewAllTransactions && (
            <TransactionHistory transactions={selectedCustomerTransactions} />
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
