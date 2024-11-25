import "./Diagnosis.css";
import diseases from "../../data/diseases_ar.json";
import { useState, useEffect, useRef } from "react";
import a from "../../data/labels.txt";
import b from "../../data/model.tflite";
import { Button } from "react-bootstrap";

export default function Diagnosis() {
  const [model, setModel] = useState(null);
  const [labels, setLabels] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [detectedDisease, setDetectedDisease] = useState("");
  const [diseaseDetails, setDiseaseDetails] = useState([]);
  const labelRef = useRef();
  // Function to load the model and labels
  const loadModel = async () => {
    try {
      const labelsResponse = await fetch(a);
      const labelsData = await labelsResponse.text();
      const labelsArray = labelsData.split("\n").map((label) => label.trim());
      setLabels(labelsArray);

      const loadedModel = await window.tflite.loadTFLiteModel(b);
      setModel(loadedModel);
      console.log("Model loaded successfully");
    } catch (error) {
      console.error("Error loading model:", error);
    }
  };

  useEffect(() => {
    loadModel();
  }, []);

  const handleImageUpload = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      setUploadedImage(imageFile);
      labelRef.current.classList.add("d-none");
      // Set the uploaded image as background for the green square
      const greenSquare = document.getElementById("diagnosisForm");
      greenSquare.style.backgroundImage = `url(${URL.createObjectURL(
        imageFile
      )})`;
    }
  };

  const detectDisease = async (e) => {
    e.preventDefault();
    if (!uploadedImage) {
      alert("Please upload an image first.");
      return;
    }

    if (!model) {
      alert("Model not yet loaded.");
      return;
    }
    labelRef.current.classList.add("opacity-0");
    // Preprocess the image to match the model's input shape
    const img = new Image();
    img.src = URL.createObjectURL(uploadedImage);
    img.onload = async () => {
      const tensor = window.tf.browser
        .fromPixels(img, 3)
        .resizeNearestNeighbor([224, 224]) // Resize to the required input size
        .toFloat()
        .div(window.tf.scalar(255))
        .expandDims();

      // Run the inference
      try {
        const predictions = await model.predict(tensor);
        const predictedClass = predictions.argMax(-1).dataSync()[0];
        const diseaseLabel = labels[predictedClass];
        setDetectedDisease(diseaseLabel);

        setDiseaseDetails(
          diseases.filter((value) => value.name === diseaseLabel)
        );
      } catch (error) {
        console.error("Error predicting:", error);
      }
    };
  };

  return (
    <>
      <div className="image" id="diagnosis">
        {/* Image square and content */}
        <div className="content">
          <form
            action=""
            id="diagnosisForm"
            className="diagnosisForm mx-auto"
            style={{
              backgroundImage: uploadedImage
                ? `url(${URL.createObjectURL(uploadedImage)})`
                : "linear-gradient(112.68deg,rgba(38, 111, 80, 0.6) 2.3%,rgba(85, 111, 117, 0.6) 98.55%)",
              backgroundSize: "cover",
            }}
          >
            {/* Image upload section */}
            <label className="mb-3" ref={labelRef}>
              Upload Image
              <input type="file" onChange={handleImageUpload} />
            </label>
          </form>
        </div>
        <div className="details text-center mt-3">
          {/* Button to trigger detection */}
          <Button variant="success" onClick={detectDisease} className="mb-3">
            Detect Disease
          </Button>
          {/* Paragraph and additional content */}
          <div className="result-div">
            {diseaseDetails && (
              <>
                <p
                  className="result-paragraph"
                  style={{ wordBreak: "break-all" }}
                >
                  اسم: {diseaseDetails[0]?.name}{" "}
                </p>
                <p className="result-paragraph">
                  الوصف: {diseaseDetails[0]?.description}{" "}
                </p>
                <p className="result-paragraph">
                  السبب: {diseaseDetails[0]?.cause}{" "}
                </p>
                <p className="result-paragraph">
                  كيفية المنع: {diseaseDetails[0]?.prevention}{" "}
                </p>
                <p className="result-paragraph">
                  طريقة العلاج: {diseaseDetails[0]?.treatment}{" "}
                </p>
              </>
            )}
          </div>
          <h3 className="fw-bold mb-3">
            تعرف على مرض نباتك وعالجه{" "}
            <span className="d-block">بالذكاء الاصطناعي</span>
          </h3>
          <button className="rounded-pill download-button">
            قم بتنزيل التطبيق وتمتع بتجربة مستخدم رائعة
          </button>
        </div>
      </div>
    </>
  );
}
