import a from "../../data/labels.txt";
import b from "../../data/model.tflite";
let model;
let labels = [];
fetch(a)
  .then((response) => response.text())
  .then((data) => {
    labels = data.split("\n").map((label) => label.trim());
    console.log(data);
  });

window.tflite.loadTFLiteModel(b).then((loadedModel) => {
  model = loadedModel;
  console.log("Model loaded successfully");
});

export async function detectDisease() {
  const imageElement = document.getElementById("upload-image").files[0];
  if (!imageElement) {
    alert("Please upload an image first.");
    return;
  }

  const reader = new FileReader();
  reader.onload = async function (event) {
    const img = new Image();
    img.src = event.target.result;
    img.onload = async function () {
      // Preprocess the image to match the model's input shape
      const tensor = window.tf.browser
        .fromPixels(img)
        .resizeNearestNeighbor([224, 224]) // Resize to the required input size
        .toFloat()
        .expandDims();

      // Run the inference
      const predictions = await model.predict(tensor);
      const predictedClass = predictions.argMax(-1).dataSync()[0];
      const diseaseLabel = labels[predictedClass];

      // Display the result
      document.getElementById(
        "result"
      ).innerText = `Detected Disease: ${diseaseLabel}`;
    };
  };
  reader.readAsDataURL(imageElement);
}
