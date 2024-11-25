import React from "react";
import "./CropInformation.css";
import { Accordions } from "../DiagnosisTips/DiagnosisTips";
import { CropsInformationArray } from "../../constants";
export default function CropInformation() {
  return (
    <>
      <Accordions content={CropsInformationArray} />
    </>
  );
}
