const form = document.querySelector("form");
const alert = document.querySelector(".alert");
const title = document.getElementById("title");
const price = document.getElementById("price");
const decription = document.getElementById("description");

fetchAPI.get(`/users/item/${localStorage.clickedItem}`, ({ data, status }) => {
  if (status == 400) {
    showError(alert, data.errors.msg);
  } else if (status == 200) {
    let res = data[0];
    title.value = res.title;
    price.value = res.price;
    description.value = res.description;
  }
});

form.addEventListener("submit", event => {
  event.preventDefault();
  formData = new FormData(form);
  const title = formData.get("title");
  const price = formData.get("price");
  const description = formData.get("description");

  const item = {
    title,
    price,
    description,
    date: Date.now()
  };

  fetchAPI.put("/users/item", item, ({ data, status }) => {
    if (status === 400) {
      showError(alert, data.errors[0].msg);
    } else if (status === 401) {
      checkToken(data.msg);
    } else if (status === 200) {
      console.log("I got here");
      window.location.href = "dashboard.html";
    }
  });
});
