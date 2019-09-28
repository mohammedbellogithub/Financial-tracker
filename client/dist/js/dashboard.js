const lead = document.querySelector(".welcome");
const totalDiv = document.querySelector(".total");
const alert = document.querySelector(".alert");
const itemDiv = document.querySelector(".item");
fetchAPI.get("/auth/signin/", ({ data, status }) => {
  if (status === 401) {
    location.href = "login.html";
  } else if (status === 200) {
    let res = data[0];
    localStorage.setItem("userId", res.user_id);
    lead.innerHTML = `Welcome ${res.full_name}`;

    fetchAPI.get("/users/item", ({ data, status }) => {
      if (status == 400) {
        showError(alert, data.errors[0].msg);
      } else if (status == 200) {
        let total = 0;
        if (data.length == 0) {
          const table = document.querySelector(".table");
          const tableDiv = document.querySelector(".table-div");
          table.hidden = true;
          tableDiv.innerHTML = `<p class = lead >No Items Available</p>`;
        } else {
          data.forEach(item => {
            total += item.price;
            totalDiv.innerHTML = total;
            itemDiv.innerHTML += `
          <tr >
          <td class="">${item.title}</td>
          <td class="">${item.price}</td>
          <td class="">${item.description}</td>
           <td class="">${formatDate(item.date_created)}</td>
        
          <td> <a  onClick ="getClickedId(event, '${
            item.item_id
          }', 'edit-items.html')" class="btn btn-primary my-3">Edit Item</a></td>
      </tr>  
              `;
          });
        }
        console.log(data);
      }
    });
  }
});
