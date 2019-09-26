const fetchAPI = new FetchAPI();
// Show Error Div
function showError(alert, message) {
  alert.innerHTML = message;
  alert.hidden = false;
  setTimeout(() => {
    alert.hidden = true;
  }, 2000);
}

function formatDate(thedate) {
  const date = new Date(thedate);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return day + " " + monthNames[monthIndex] + " " + year;
}
// Get Id of Clicked Buttons
function getClickedId(event, clickedId, page) {
  event.preventDefault();
  if (!localStorage.token) {
    location.href = "login.html";
  } else {
    localStorage.setItem("clickedItem", clickedId);
    location.href = page;
  }
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("clickedProfile");
}

function deleteUser() {
  confirm("Are you sure you want do this?");
  fetchAPI.delete("/auth", ({ data, status }) => {
    logout();
  });
}
