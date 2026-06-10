const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch(
      "https://blog-platform-with-comments-c1dm.onrender.com/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    alert(data.message);

    if (data.success) {
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      window.location.href = "index.html";
    }
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
});