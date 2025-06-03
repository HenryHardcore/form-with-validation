const today = new Date();






const firstName = document.getElementById("first-name");

const FNerror = document.querySelector(".error-FN");

function validateFirstName() {
  const value = firstName.value.trim();
  FNerror.textContent = "";
  firstName.style.borderBottom = "";

  if (!value) {
    FNerror.innerHTML = "First name is required"
  }
  else if (/[^A-Za-z]/.test(value)) {
    FNerror.innerHTML = 'Only letters are allowed.';
  } 
  else if (value.length < 2) {
    FNerror.innerHTML = 'First name must be at least two letters long.';
  }
  if (FNerror.textContent) {
    FNerror.style.color = "red";
    firstName.style.borderBottom = "1px solid rgb(255, 31, 42)";
    return false;
  }
  return true;
}

firstName.addEventListener("blur", validateFirstName);


const lastName = document.getElementById("last-name");

const LNerror = document.querySelector(".error-LN");

function validateLastName() {
  const value = lastName.value.trim();
  LNerror.textContent = "";
  lastName.style.borderBottom = "";

  if (!value) {
    LNerror.textContent = "Last name is required";
  }
  else if (/[^A-Za-z]/.test(value)) {
    LNerror.textContent = "Only letters are allowed.";
  } 
  else if (value.length < 2) {
    LNerror.textContent = "Last name must be at least two letters long.";
  }

  if (LNerror.textContent) {
    LNerror.style.color = "red";
    lastName.style.borderBottom = "1px solid rgb(255, 31, 42)";
    return false;
  }
  return true;
}

lastName.addEventListener("blur", validateLastName);


const birthDate = document.getElementById("birth-date")
const Daterror = document.querySelector(".error-date")

function validateBirthDate() {
  const value = birthDate.value;
  const birthDateValue = new Date(value);
  let age = today.getFullYear() - birthDateValue.getFullYear();
  const monthDiff = today.getMonth() - birthDateValue.getMonth();
  const dayDiff = today.getDate() - birthDateValue.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  Daterror.textContent = "";
  birthDate.style.borderBottom = "";

  if (!value) {
    Daterror.textContent = "Birth date is required";
  }
  else if (age < 18) {
    Daterror.textContent = "You have to be over 18 lil fella";
  }

  if (Daterror.textContent) {
    Daterror.style.color = "red";
    birthDate.style.borderBottom = "1px solid rgb(255, 31, 42)";
    return false;
  }
  return true;
}

birthDate.addEventListener("blur", validateBirthDate);


const emailInput = document.getElementById("email");
const emailError = document.querySelector(".error-email");

function validateEmail() {
  const value = emailInput.value.trim();
  emailError.textContent = "";
  emailInput.style.borderBottom = "";

  if (!value) {
    emailError.textContent = "Email is required.";
  } else {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      emailError.textContent = "Please enter a valid email address.";
    }
  }

  if (emailError.textContent) {
    emailError.style.color = "red";
    emailInput.style.borderBottom = "1px solid rgb(255, 31, 42)";
    return false;
  }
  return true;
}

emailInput.addEventListener("blur", validateEmail);

const passwordInput = document.getElementById("password");
const passwordError = document.querySelector(".error-password");

function validatePassword() {
  const value = passwordInput.value;
  passwordError.textContent = "";
  passwordInput.style.borderBottom = "";

  if (!value) {
    passwordError.textContent = "Password is required.";
  }
  else if (value.length < 8) {
    passwordError.textContent = "Password must be at least 8 characters long.";
  }
  else if (!/\d/.test(value)) {
    passwordError.textContent = "Password must contain at least one number.";
  }
  else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
    passwordError.textContent = "Password must contain at least one special character.";
  }

  if (passwordError.textContent) {
    passwordError.style.color = "red";
    passwordInput.style.borderBottom = "1px solid rgb(255, 31, 42)";
    return false;
  }
  return true;
}

passwordInput.addEventListener("blur", validatePassword);

const Cpassword = document.getElementById("Cpassword");
const CpasswordError = document.querySelector(".error-Cpassword")

function validateConfirmPassword() {
  const value = Cpassword.value;
  CpasswordError.textContent = "";
  Cpassword.style.borderBottom = "";

  if (value !== passwordInput.value) {
    CpasswordError.textContent = "Passwords do not match";
  }

  if (CpasswordError.textContent) {
    CpasswordError.style.color = "red";
    Cpassword.style.borderBottom = "1px solid rgb(255, 31, 42)";
    return false;
  }
  return true;
}

Cpassword.addEventListener("blur", validateConfirmPassword);

const allCheckbox = document.getElementById('all');
const fruitCheckboxes = document.querySelectorAll('.fruit');

allCheckbox.addEventListener('change', () => {
  fruitCheckboxes.forEach(checkbox => {
    checkbox.checked = allCheckbox.checked;
  });
});


const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault(); 
  
  const isFirstNameValid = validateFirstName();
  const isLastNameValid = validateLastName();
  const isBirthDateValid = validateBirthDate();
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  const isConfirmPasswordValid = validateConfirmPassword();

  if (
    !isFirstNameValid ||
    !isLastNameValid ||
    !isBirthDateValid ||
    !isEmailValid ||
    !isPasswordValid ||
    !isConfirmPasswordValid
  ) {
    alert("Please fix errors before submitting.");
    return;
  }

  const formData = {
    firstName: document.getElementById("first-name").value.trim(),
    lastName: document.getElementById("last-name").value.trim(),
    birthDate: document.getElementById("birth-date").value,
    gender: document.querySelector('input[name="gender"]:checked')?.value,
    fruits: Array.from(document.querySelectorAll(".fruit:checked")).map(cb => cb.value),
    email: document.getElementById("email").value.trim(),
    password: document.getElementById("password").value,
    confirmPassword: document.getElementById("Cpassword").value,
  };

  fetch("http://localhost:3000/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(data => {
        console.log("Server-side errors:", data.errors);
        alert("Server-side validation failed. Check console for details.");
      });
    }
    return response.json().then(result => {
      alert(result.message);
    });
  })
  .catch(err => {
    console.error("Error:", err);
    alert("Error submitting form.");
  });
});