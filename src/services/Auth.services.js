const admin = require("../config/firebase");
const bcrypt = require("bcrypt");

const db = admin.firestore();
const usersCollection = db.collection("users");


exports.createUser = async (req, res) => {
  const userData = req.body;

  try {
    // Hash the password before storing it
    const saltRounds = 10; // Adjust the number of salt rounds as needed
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    userData.password = hashedPassword;

    const docRef = await usersCollection.add(userData);
    return res.status(201).json({ id: docRef.id });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Could not create user" });
  }
};
