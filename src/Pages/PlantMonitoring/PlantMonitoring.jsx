import React from "react";
import { Accordions } from "../DiagnosisTips/DiagnosisTips";
import "./PlantMonitoring.css";
import { PlantMonitoringArray } from "../../constants";
export default function PlantMonitoring() {
  return <Accordions content={PlantMonitoringArray} />;
}
