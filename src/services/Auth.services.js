const bcrypt = require("bcrypt");
const Patient = require("../models/Patient.models");
const Doctor = require("../models/Doctor.models");

exports.register = async (req, res) => {
  const userData = req.body;

  // Add validation for the required fields
  if (
    !userData.name ||
    !userData.dateOfBirth ||
    !userData.address ||
    !userData.phoneNumber ||
    !userData.password ||
    !userData.username ||
    !userData.userType
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Add validation for data types
  if (
    typeof userData.name !== "string" ||
    !Number.isNaN(Date.parse(userData.dateOfBirth)) || // Check if DateOfBirth is a valid datetime
    typeof userData.address !== "string" ||
    typeof userData.phoneNumber !== "string" ||
    typeof userData.password !== "string" ||
    typeof userData.username !== "string" ||
    typeof userData.userType !== "string"
  ) {
    return res.status(400).json({ error: "Invalid data types" });
  }

  try {
    // Hash the password before storing it
    const saltRounds = 10; // Adjust the number of salt rounds as needed
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    userData.password = hashedPassword;

    // Check the user type and store in the corresponding collection
    let user;
    if (userData.userType === "patient") {
      user = new Patient(userData);
    } else if (userData.userType === "doctor") {
      user = new Doctor(userData);
    } else {
      return res.status(400).json({ error: "Invalid user type" });
    }

    const savedUser = await user.save();
    return res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Could not create user" });
  }
};
