import React from "react";
import "./DiagnosisTips.css";
import { Accordion } from "react-bootstrap";
import { PlantDiseases } from "../../constants";
export default function DiagnosticTips() {
  return <Accordions content={PlantDiseases} />;
}

export function Accordions({ content }) {
  return (
    <>
      <Accordion>
        {content.map((value, index) => (
          <Accordion.Item eventKey={index} key={index}>
            <Accordion.Header>{value.question}</Accordion.Header>
            <Accordion.Body>{value.answer}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  );
}
