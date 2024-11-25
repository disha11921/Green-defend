import { useState, useEffect } from "react";
import a from "../../data/labels.txt";
import b from "../../data/model.tflite";

export const DiseaseDetector = () => {
  const [model, setModel] = useState(null);
  const [labels, setLabels] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [detectedDisease, setDetectedDisease] = useState("");

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
    setUploadedImage(event.target.files[0]);
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

        // Update the detection result inside the main content area
        document.getElementById(
          "result-paragraph"
        ).innerText = `Detected Disease: ${diseaseLabel}`;

        // Set the uploaded image as background for the green square
        const greenSquare = document.getElementById("green-square");
        greenSquare.style.backgroundImage = `url(${URL.createObjectURL(
          uploadedImage
        )})`;
      } catch (error) {
        console.error("Error predicting:", error);
      }
    };
  };

  return (
    <div>
      {/* Image upload section */}
      <label className="mb-3">
        Select Image
        <input type="file" onChange={handleImageUpload} />
      </label>

      {/* Button to trigger detection */}
      <button onClick={detectDisease}>Detect Disease</button>
    </div>
  );
};
