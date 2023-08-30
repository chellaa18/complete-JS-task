const hideLog = () => {
    if (window.localStorage.getItem("loggedUser") === null) {
      document.getElementById("dashBody").style.display = "none";
      document.getElementById('footer').style.display = "none";
      const h2 = document.createElement("h2");
      h2.setAttribute("id", "lgHead");
      h2.style.color = "Red";
      h2.innerHTML = "You Are Not Logged In!";
      document.body.appendChild(h2);
      const btn = document.createElement("BUTTON");
      btn.setAttribute("id", "logIn");
      btn.setAttribute("class", "nav-button")
      btn.innerHTML = "Log in";
      document.body.appendChild(btn);
      document.getElementById("logIn").addEventListener("click", () => {
        
        window.location.href = "/login.html";
      });
    }
  };
  

let existUsers = JSON.parse(localStorage.getItem("users"));
let loggeduser = JSON.parse(localStorage.getItem("loggedUser"));
let welcomename = loggeduser.username;
let userMobile = loggeduser.mobile;
let userMail = loggeduser.email;
document.getElementById('userN').innerHTML = `Welcome "${welcomename}"`;
document.getElementById('userMobile').innerHTML = `Mobile: ${userMobile}`;
document.getElementById('userMail').innerHTML = `Mail Id: ${userMail}`;


document.getElementById("dashLog").addEventListener("click",()=>{
    window.localStorage.removeItem("loggedUser");
    window.location.href = "/login.html";
})

let products = JSON.parse(localStorage.getItem("products"));
const productCount = products.length;
document.getElementById("count").innerHTML = productCount;

