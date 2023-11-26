const faceapi = require("face-api.js");
const { Canvas, Image, ImageData } = require("canvas");
const { readImage, createCanvas, getContext2dOrThrow } = require("./canvas");

async function loadFaceApiModel() {
  await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
  await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
}

async function compareFaces(file1, file2) {
  await loadFaceApiModel();

  const image1 = await readImage(file1);
  const image2 = await readImage(file2);

  const canvas1 = createCanvas(image1.width, image1.height);
  const ctx1 = getContext2dOrThrow(canvas1);
  ctx1.drawImage(image1, 0, 0, image1.width, image1.height);

  const canvas2 = createCanvas(image2.width, image2.height);
  const ctx2 = getContext2dOrThrow(canvas2);
  ctx2.drawImage(image2, 0, 0, image2.width, image2.height);

  const descriptor1 = await faceapi.allFacesSsdMobilenetv1(canvas1);
  const descriptor2 = await faceapi.allFacesSsdMobilenetv1(canvas2);

  if (!descriptor1.length || !descriptor2.length) {
    throw new Error("No faces detected");
  }

  const distance = faceapi.utils.round(
    faceapi.utils.computeMeanDistance(
      descriptor1[0].descriptor,
      descriptor2[0].descriptor
    )
  );

  return distance <= 0.6;
}

module.exports = {
  compareFaces,
};
