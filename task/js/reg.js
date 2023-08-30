const date = document.getElementById("date");
let today = new Date();
let day = today.getDate();                                                                                             
let month = today.getMonth() + 1;
let year = today.getFullYear();
date.value = `${day}/${month}/${year}`;


let email = document.getElementById("email");
let emailValue = document.getElementById("email").value;
email.addEventListener("keyup", (e) => {
  e.preventDefault();
  email.value = email.value.toUpperCase();
});

const accounts = JSON.parse(localStorage.getItem("users")) || [];


const validateform = () => {
  let username = document.getElementById("uname").value;
  let firstname = document.getElementById("fname").value;
  let lastname = document.getElementById("lname").value;
  let emailValue = document.getElementById("email").value;
  let password = document.getElementById("pwd").value;
  let confirmpassword = document.getElementById("cnfrmpwd").value;
  let mobileNum = document.getElementById("mobil").value;
  let todayDate = document.getElementById("date").value;
  let gender = document.querySelector('input[name="gender"]:checked').value;

  if (!/^[a-zA-Z]*$/g.test(username)) {
    alert("Username invalid characters");
    return false;
  }
  if (!/^[a-zA-Z]*$/g.test(firstname)) {
    alert("Firstname invalid characters");
    return false;
  }
  if (!/^[a-zA-Z]*$/g.test(lastname)) {
    alert("lastaname invalid characters");
    return false;
  }
  if (!/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/g.test(emailValue)) {
    alert("invalid mail characters");
    return false;
  }
  if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g.test(password)) {
    alert(
      "password shoud be Minimum eight characters, at least one letter and one number and one Special character!"
    );
    return false;
  }
  if (password !== confirmpassword) {
    alert("password & confirm password should be same");
  }
  if (mobileNum.length == 0) {
    alert("mobile number should be filled out");
    return false;
  }
  if (mobileNum.length < 10) {
    alert("mobile number should be in 10 digit");
    return false;
  }
  if (!/^([^.0-]\d+|\d)*$/g.test(mobileNum)) {
    alert("mobile number should be a positive integer");
    return false;
  }
  if (mobileNum.length > 10) {
    alert("mobile number should not exceeded 10 digits");
    return false;
  } else {
    return true;
  }
};

const form = document.getElementById("registrationform");
form.addEventListener("submit", (e) => {
    e.preventDefault();
  
    if (validateform()) {
      let email = document.getElementById("email").value;
      if (isEmailAlreadyExists(email)) {
        alert("Email is already exists.");
        return;
      }
      let formData = {
        username: document.getElementById("uname").value,
        firstname: document.getElementById("fname").value,
        lastname: document.getElementById("lname").value,
        email: document.getElementById("email").value.toLowerCase(),
        password: document.getElementById("pwd").value,
        confirmpassword: document.getElementById("cnfrmpwd").value,
        mobile: document.getElementById("mobil").value,
        RegisterDate: document.getElementById("date").value,
        gender:document.querySelector('input[name="gender"]:checked').value
      };
      accounts.push(formData);
      console.log(accounts);
      localStorage.setItem("users", JSON.stringify(accounts));
      window.location.href = '/login.html';
     
      form.reset();
    }
  });

  function isEmailAlreadyExists(email) {
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    return existingUsers.some(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
  }
  