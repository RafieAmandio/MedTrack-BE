const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const serviceAccount = require('./env/serviceAccountKey.json');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Routes

// Connecting to Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const patientRef = db.collection('Patient');

// create /test route to test server
app.get('/test', (req, res) => {
  patientRef
    .get()
    .then((snapshot) => {
      const patients = [];
      snapshot.forEach((doc) => {
        patients.push(doc.data()); // Add each document's data to the array
      });
      res.json(patients); // Send the array as a JSON response
    })
    .catch((error) => {
      console.error('Error getting documents: ', error);
      res.status(500).send('Internal Server Error');
    });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
