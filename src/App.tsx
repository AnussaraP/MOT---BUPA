import React, { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import {
  Button,
  Card,
  Container,
  Form,
  Toast,
  ToastContainer,
} from "react-bootstrap";

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [data, setData] = useState<any>();
  const [formErrors, setFormErrors] = useState<any>("");
  const [showError, setShowError] = useState(false);
  //input
  const handleInput = (value: string) => {
    setInputValue(value);
  };

  //submit
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    //fetch request
    const url =
      "http://localhost:3000/trade/vehicles/mot-tests?registration=" +
      inputValue;

    try {
      const response = await fetch(url, { method: "GET" });

      const resJSON = await response.json();

      if (resJSON.errorMessage) {
        throw new Error(resJSON.errorMessage);
      }

      const vehicleInfo = {
        Registration: resJSON[0].registration,
        Make: resJSON[0].make,
        Model: resJSON[0].model,
        Colour: resJSON[0].primaryColour,
        MOTExpiryDate: resJSON[0].motTests[0].expiryDate,
      };

      //object to array
      setData(vehicleInfo);
    } catch (error: any) {
      console.log({ error });
      setFormErrors(error.message);
      setShowError(true);
    }
  };

  return (
    <div>
      <NavBar />
      <Container className="p-3" />
      <Container className="p-5 mb-4 bg-light rounded-3">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Input your registration number</Form.Label>
            <Form.Control
              placeholder="Input registration number"
              type="text"
              required={true}
              onChange={(event) => handleInput(event.target.value)}
              value={inputValue}
            />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      </Container>
      {data && (
        <Container className="p-5 mb-4 bg-light rounded-3">
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" />
            <Card.Body>
              <Card.Title>Vehicle Information</Card.Title>
              <Card.Text>Registration: {data.Registration}</Card.Text>
              <Card.Text>Make: {data.Make}</Card.Text>
              <Card.Text>Model: {data.Model}</Card.Text>
              <Card.Text>Colour: {data.Colour}</Card.Text>
              <Card.Text> MOT Expiry Date: {data.MOTExpiryDate}</Card.Text>
            </Card.Body>
          </Card>
        </Container>
      )}

      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setShowError(false)}
          show={showError}
          className="d-inline-block m-1"
          bg="danger"
          delay={3000}
          autohide
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>{formErrors}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default App;
