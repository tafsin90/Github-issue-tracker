// login
document.getElementById("loginBtn").addEventListener("click", function (e) {
  e.preventDefault();

  const username = document.getElementById("user-input").value;
  const password = document.getElementById("pass-input").value;
  if (username === "admin" && password === "admin123") {
    window.location.href = "./home.html";
  } else {
    alert("Invalid credentials");
  }
});
