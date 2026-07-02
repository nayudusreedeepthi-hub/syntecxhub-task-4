// REGISTER
function registerUser(e) {
  e.preventDefault();

  let username = document.getElementById("username").value.trim();
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();

  let msg = document.getElementById("msg");

  if (password.length < 6) {
    msg.innerText = "Password must be at least 6 characters";
    msg.className = "error";
    return;
  }

  let user = { username, email, password };

  localStorage.setItem("user", JSON.stringify(user));

  msg.innerText = "Registered Successfully!";
  msg.className = "success";

  setTimeout(() => {
    window.location.href = "login.html";
  }, 1500);
}


// LOGIN
function loginUser(e) {
  e.preventDefault();

  let email = document.getElementById("loginEmail").value.trim();
  let password = document.getElementById("loginPassword").value.trim();

  let msg = document.getElementById("msg");

  let storedUser = JSON.parse(localStorage.getItem("user"));

  if (!storedUser) {
    msg.innerText = "No user found. Please register first.";
    return;
  }

  if (email === storedUser.email && password === storedUser.password) {
    localStorage.setItem("loggedIn", "true");

    window.location.href = "dashboard.html";
  } else {
    msg.innerText = "Invalid email or password";
  }
}


// SHOW/HIDE PASSWORD
function togglePassword() {
  let pass = document.getElementById("loginPassword");
  pass.type = pass.type === "password" ? "text" : "password";
}


// LOGOUT
function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "login.html";
}


// SESSION CHECK
if (window.location.pathname.includes("dashboard.html")) {
  let isLoggedIn = localStorage.getItem("loggedIn");

  if (!isLoggedIn) {
    window.location.href = "login.html";
  } else {
    let user = JSON.parse(localStorage.getItem("user"));
    document.getElementById("welcome").innerText = "Hi, " + user.username;
  }
}
// LOAD CART COUNT ON PAGE LOAD
window.onload = function () {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cartCount").innerText = cart.length;
};


// ADD TO CART FUNCTION
function addToCart(productName) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push(productName);

  localStorage.setItem("cart", JSON.stringify(cart));

  document.getElementById("cartCount").innerText = cart.length;

  alert(productName + " added to cart!");
}