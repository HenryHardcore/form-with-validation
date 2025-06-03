const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors());


app.post('/submit', (req, res) => {
  const {
    firstName,
    lastName,
    birthDate,
    gender,
    email,
    password,
    confirmPassword,
    fruits
  } = req.body;

  const errors = {};

  
  if (!firstName || firstName.length < 2 || /[^A-Za-z]/.test(firstName)) {
    errors.firstName = "Invalid first name!";
  }

  if (!lastName || lastName.length < 2 || /[^A-Za-z]/.test(lastName)) {
    errors.lastName = "Invalid last name!";
  }

  if (!birthDate) {
    errors.birthDate = "Birth date is required!";
  } else {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    const dayDiff = today.getDate() - birth.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }
    if (age < 18) {
      errors.birthDate = "You have to be over 18!";
    }
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Invalid email!";
  }

  if (!password || password.length < 8 || !/\d/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.password = "Password must be at least 8 characters long, contain a number and a special character.";
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match!";
  }

  
  if (!gender) {
    errors.gender = "Please select a gender.";
  }

  
  if (!fruits || fruits.length === 0) {
    errors.fruits = "Please select at least one fruit!";
  }

  
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  
  res.status(200).json({ message: "Form submitted successfully!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});