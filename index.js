const express = require("express");
const cors = require("cors");
const authRoutes = require("./src/routes/Auth.routes");

const app = express();

const { createTransport } = require("nodemailer");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

async function sendEmail(toEmail) {
  await transporter.sendMail({
    from: "info@smarthomeguardian.com",
    to: toEmail,
    subject: "There is Someone Outside",
    html: `
      Testing
      `,
  });
}

async function load(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

const faceapi = require("face-api.js");
const { Canvas, Image, ImageData, loadImage } = require("canvas");
const fs = require("fs");
const path = require("path");

faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

async function renderFace(image, x, y, width, height) {
  const canvas = new Canvas(width, height);
  const context = canvas.getContext("2d");

  context.drawImage(image, x, y, width, height, 0, 0, width, height);

  const buffer = canvas.toBuffer("image/jpeg");
  fs.writeFileSync("output.jpg", buffer);
}

async function detectAndCompareFaces(idCardImagePath, selfieImagePath) {
  const modelsPath = path.resolve(__dirname, "src/models");

  await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelsPath);
  await faceapi.nets.tinyFaceDetector.loadFromDisk(modelsPath);
  await faceapi.nets.faceLandmark68Net.loadFromDisk(modelsPath);
  await faceapi.nets.faceRecognitionNet.loadFromDisk(modelsPath);
  await faceapi.nets.faceExpressionNet.loadFromDisk(modelsPath);

  const idCardImage = await load("./brad-pitt.jpg");
  const selfieImage = await load("./download.jpg");

  const idCardFacedetection = await faceapi
    .detectSingleFace(idCardImage, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks()
    .withFaceDescriptor();

  const selfieFacedetection = await faceapi
    .detectSingleFace(selfieImage, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks()
    .withFaceDescriptor();

  if (idCardFacedetection) {
    const { x, y, width, height } = idCardFacedetection.detection.box;
    await renderFace(idCardImage, x, y, width, height);
  }

  if (selfieFacedetection) {
    const { x, y, width, height } = selfieFacedetection.detection.box;
    await renderFace(selfieImage, x, y, width, height);
  }

  if (idCardFacedetection && selfieFacedetection) {
    const distance = faceapi.euclideanDistance(
      idCardFacedetection.descriptor,
      selfieFacedetection.descriptor
    );
    console.log("Euclidean Distance:", distance);
  }
}

const idCardImagePath = path.resolve(__dirname, "brad-pitt.jpg");
const selfieImagePath = path.resolve(__dirname, "download.jpg");
detectAndCompareFaces(idCardImagePath, selfieImagePath);

const transporter = createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: "rafieamandio@gmail.com",
    pass: "EBR4mdYO6sgCNkay",
  },
});

sendEmail("rafieamandio@gmail.com");
// Routes used in the app
app.use("/auth", authRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
