const today = new Date();

const month = (today.getMonth() + 1).toString();
const day = today.getDate().toString();
const year = today.getFullYear().toString();


const formattedMonth = month.padStart(2, '0'); 
const formattedDay = day.padStart(2, '0');     


const mmddyyyy = `${formattedMonth}${formattedDay}${year}`;




const firstName = document.getElementById("first-name");

const FNerror = document.querySelector(".error-FN");

firstName.addEventListener("blur", () => {
  const value = firstName.value.trim();
  FNerror.innerHTML = "";
  firstName.style.borderBottom = "";

  if (!value) {
    FNerror.innerHTML = "First name is required"
    firstName.style.borderBottom = "1px solid rgb(255, 31, 42)";
  }
  else if (/[^A-Za-z]/.test(value)) {
    FNerror.innerHTML = 'Only letters are allowed.';
    firstName.style.borderBottom = "1px solid rgb(255, 31, 42)";
  } 
  else if (value.length < 2) {
    FNerror.innerHTML = 'First name must be at least two letters long.';
    firstName.style.borderBottom = "1px solid rgb(255, 31, 42)";
  }
  FNerror.style.color = 'red';

})


const lastName = document.getElementById("last-name");

const LNerror = document.querySelector(".error-LN");

lastName.addEventListener("blur", () => {
  const value = lastName.value.trim();
  LNerror.innerHTML = "";
  lastName.style.borderBottom = "";

  if (!value) {
    LNerror.innerHTML = "First name is required"
    lastName.style.borderBottom = "1px solid rgb(255, 31, 42)";
  }
  else if (/[^A-Za-z]/.test(value)) {
    LNerror.innerHTML = 'Only letters are allowed.';
    lastName.style.borderBottom = "1px solid rgb(255, 31, 42)";
  } 
  else if (value.length < 2) {
    LNerror.innerHTML = 'First name must be at least two letters long.';
    lastName.style.borderBottom = "1px solid rgb(255, 31, 42)";
  }
  LNerror.style.color = 'red';

})


const birthDate = document.getElementById("birth-date")
const Daterror = document.querySelector(".error-date")

birthDate.addEventListener("blur", () => {
  const value = birthDate.value
  Daterror.innerHTML = "";
  birthDate.style.borderBottom = "";
  if (!value) {
    Daterror.innerHTML = "Birth date is required"
    birthDate.style.borderBottom = "1px solid rgb(255, 31, 42)";
  }
  
  Daterror.style.color = 'red';
})