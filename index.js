const express = require("express");
const cors = require("cors");
const authRoutes = require("./src/routes/Auth.routes");
const db = require("./src/config/db");
const dotenv = require("dotenv");
const app = express();

dotenv.config();
db.connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// Routes used in the app
app.use("/auth", authRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
