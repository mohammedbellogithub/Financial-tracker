const email = document.getElementById("email");
const password = document.getElementById("password");
const alert = document.querySelector(".alert");

document.getElementById("sumbit").addEventListener("click", e => {
  e.preventDefault();

  const body = {
    email: email.value,
    password: password.value
  };

  fetchAPI.post("/auth/signin", body, ({ data, status }) => {
    if (status === 400) {
      const responseErr = data.msg ? data.msg : data.errors[0].msg;
      showError(alert, responseErr);
    } else if (status === 200) {
      localStorage.setItem("token", data.token);
      location.href = "dashboard.html";
    }
  });
});
