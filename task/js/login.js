
const login = document.getElementById("loginform");
login.addEventListener("submit", (e) => {
  e.preventDefault();
  let email = document.getElementById('email').value;
  let userpassword = document.getElementById("pwd").value;
  let existUsers = JSON.parse(localStorage.getItem("users"));
 
  existUsers.filter((obj) => {
    if(email === ""){
      document.getElementById("err").innerHTML = "Please Enter Your Email";
      return false;
    }
    if(userpassword === ""){
      document.getElementById("err").innerHTML = "Please Enter Your Password";
      return false;
    }
    if (obj.email === email && obj.password === userpassword) {
      getUser(email);
      window.location.href = "/dashboard.html";
      document.getElementById("err").style.display = "none";
    } else {
      document.getElementById("err").innerHTML = "Invalid User!";
    }
  });

FormData.reset
});


function getUser(data){
  let existUsers = JSON.parse(localStorage.getItem("users"));
 
 existUsers.forEach(user => {
  if(data === user.email){
    
  let loggeduser = {
    email: document.getElementById('email').value,
    password: document.getElementById("pwd").value,
   username: user.username,
   mobile: user.mobile
  };
  window.localStorage.setItem("loggedUser", JSON.stringify(loggeduser));
  }
 }); 
}

const hideLog = () => {
  if (window.localStorage.getItem("loggedUser") !== null) {
    login.style.display = "none";
    const h2 = document.createElement("h2");
    h2.setAttribute("id", "lgHead");
    h2.innerHTML = "You Are already Logged in!";
    document.body.appendChild(h2);
    const btn = document.createElement("BUTTON");
    btn.setAttribute("id", "logout");
    btn.innerHTML = "Log out";
    document.body.appendChild(btn);
    document.getElementById("logout").addEventListener("click", () => {
      window.localStorage.removeItem("loggedUser");
      window.location.href = "/login.html";
    });
  }
};

