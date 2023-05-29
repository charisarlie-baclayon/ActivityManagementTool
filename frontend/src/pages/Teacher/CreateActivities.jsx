import React, { useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import "./css/CreateActivities.css";

export const CreateActivities = () => {
  const [active, setActive] = useState(1);
  const items = [];

  const handlePaginationClick = (number) => {
    setActive(number);
  };

  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => handlePaginationClick(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <>
      <div className="custom-button">
        <Button> Add Custom</Button>
      </div>
      <div className="template-activities-container">
        <h2> Ideation Templates</h2>
        <Accordion flush>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Ideation Template #1</Accordion.Header>
            <Accordion.Body>Template Sample Description Here</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Ideation Template #2</Accordion.Header>
            <Accordion.Body>Template Sample Description Here</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Ideation Template #3</Accordion.Header>
            <Accordion.Body>Template Sample Description Here</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
      <div className="template-activities-container">
        <h2> Pre Incubation Templates</h2>
        <Accordion flush>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Pre Incubation Item #1</Accordion.Header>
            <Accordion.Body>Template Sample Description Here</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Pre Incubation Item #2</Accordion.Header>
            <Accordion.Body>Template Sample Description Here</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Pre Incubation Item #3</Accordion.Header>
            <Accordion.Body>Template Sample Description Here</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
      <Pagination size="sm">{items}</Pagination>
    </>
  );
};
