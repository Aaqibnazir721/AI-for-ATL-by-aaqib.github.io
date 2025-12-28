document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const username = document.querySelector('input[type="text"]').value;
  const password = document.querySelector('input[type="password"]').value;

  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    const result = await response.json();

    if (result.success) {
      window.location.href = "/index.html";
    } else {
      alert("Wrong username or password");
    }
  } catch (error) {
    alert("Server error");
  }
});