const express = require("express");
const cors = require("cors");
const authRoutes = require("./src/routes/Auth.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CORS_ORIGINS.split(", "),
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// Routes used in the app
app.use("/auth", authRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
