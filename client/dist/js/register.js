const password = document.getElementById("password");
const alert = document.querySelector(".alert");
const form = document.querySelector("form");

document.getElementById("sumbit").addEventListener("click", e => {
  e.preventDefault();
  const formData = new FormData(form);
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const comfirmPassword = formData.get("confirm-password");
  if (password !== comfirmPassword) {
    showError(alert, "Please check your passwords");
    console.log("Check Password");
  } else {
    const body = {
      name,
      email,
      password
    };
    console.log(body);
    fetchAPI.post("/auth/signup", body, ({ data, status }) => {
      if (status === 400) {
        const responseErr = data.errors[0].msg;
        showError(alert, responseErr);
      } else if (status === 200) {
        localStorage.setItem("token", data.token);
        location.href = "dashboard.html";
      }
    });
  }
});
