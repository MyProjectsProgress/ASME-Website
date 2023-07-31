async function editRow(rowId, adminID) {

  var nameInput = document.getElementById("nameInput" + rowId);
  var role = document.getElementById("role" + rowId);
  var emailInput = document.getElementById("emailInput" + rowId);
  var newPasswordInput = document.getElementById("newPassword" + rowId);

  // fetching the admin data
  const requestObject = {
    url: `./admin/${adminID}`, // api/v1/admin/:id
    method: 'GET',
  };

  const nextPage = './form';

  axiosRequest(requestObject, nextPage, true, true).then((res) => {
    // Set placeholders for each input field
    nameInput.placeholder = res.data.name;
    role.placeholder = res.data.role;
    emailInput.placeholder = res.data.email;
    newPasswordInput.placeholder = "Enter new password";
  }).catch((error) => {
    console.error(error);
  });

  var editButton = document.getElementById("Edit" + rowId);
  var updateButton = document.getElementById("Update" + rowId);

  if (editButton.style.display === "none") {
    // User is currently editing the row, update the data

    // Update the row with the new data
    document.getElementById("nameLabel" + rowId).textContent = nameInput.value || document.getElementById("nameLabel" + rowId).textContent;
    document.getElementById("roleLabel" + rowId).textContent = role.value || document.getElementById("roleLabel" + rowId).textContent;
    document.getElementById("emailLabel" + rowId).textContent = emailInput.value || document.getElementById("emailLabel" + rowId).textContent;
    document.getElementById("passwordLabel" + rowId).textContent = "••••••••";

    // Hide the input fields and show the labels
    nameInput.style.display = "none";
    role.style.display = "none";
    emailInput.style.display = "none";
    newPasswordInput.style.display = "none";

    document.getElementById("nameLabel" + rowId).style.display = "block";
    document.getElementById("roleLabel" + rowId).style.display = "block";
    document.getElementById("emailLabel" + rowId).style.display = "block";
    document.getElementById("passwordLabel" + rowId).style.display = "block";

    // Show the Edit button and hide the Update button
    editButton.style.display = "inline-block";
    updateButton.style.display = "none";

  } else {
    // User wants to edit the row, enable the input fields

    // Show the labels and input fields
    nameInput.style.display = "inline-block";
    role.style.display = "inline-block";
    emailInput.style.display = "inline-block";
    newPasswordInput.style.display = "inline-block";

    document.getElementById("nameLabel" + rowId).style.display = "none";
    document.getElementById("roleLabel" + rowId).style.display = "none";
    document.getElementById("emailLabel" + rowId).style.display = "none";
    document.getElementById("passwordLabel" + rowId).style.display = "none";

    // Set the input field values to the old values by default
    nameInput.value = document.getElementById("nameLabel" + rowId).textContent;
    role.value = document.getElementById("roleLabel" + rowId).textContent;
    emailInput.value = document.getElementById("emailLabel" + rowId).textContent;

    // Clear the password fields
    newPasswordInput.value = "";

    // Show the Update button and hide the Edit button
    editButton.style.display = "none";
    updateButton.style.display = "inline-block";
  }
}

function deleteRow(rowId, adminID) {
  // Delete the specified row
  var row = document.getElementById("row" + rowId);
  row.parentNode.removeChild(row);

  const requestObject = {
    url: `/api/v1/admin/${adminID}`,
    method: 'DELETE'
  }

  const nextPage = './adminPanel';

  axiosRequest(requestObject, nextPage, false);
}

function searchAdmin() {
  // Perform a search based on the input value
  var input = document.getElementById("adminSearch");
  var filter = input.value.toUpperCase();
  var table = document.querySelector("table");
  var rows = table.getElementsByTagName("tr");

  for (var i = 0; i < rows.length; i++) {
    var idColumn = rows[i].getElementsByTagName("td")[0];

    if (idColumn) {
      var id = idColumn.textContent || idColumn.innerText;
      if (id.toUpperCase().indexOf(filter) > -1) {
        rows[i].style.display = "";
      } else {
        rows[i].style.display = "none";
      }
    }
  }
}

window.addEventListener("DOMContentLoaded", function () {

  axios.get('/api/v1/admin').then((res) => {
    const admins = res.data.data;
    admins.forEach((admin) => {
      addNewAdminRow(admin);
    });

  }).catch((error) => {
    console.log('Error Message:', error.message);
    console.log('Response Data:', error.response.data);
    console.log('Response Status:', error.response.status);
  });

  var adminInput = document.querySelectorAll(".adminInput");

  for (let input of adminInput) {
    input.addEventListener("input", function () {
      if (input.value !== "") {
        input.style.border = "solid 2px rgba(15, 90, 170, 0.7)";
      } else {
        input.style.border = "solid 2px rgb(182, 182, 182)";
      }
    });

    input.addEventListener("invalid", function () {
      input.style.border = "solid 2px rgba(211, 25, 15, 0.6)";
    });
  }
});

function showPasswordFields(rowId) {
  const changePasswordButton = document.getElementById(`ChangePassword${rowId}`);
  const currentPasswordInput = document.getElementById(`currentPassword${rowId}`);
  const newPasswordInput = document.getElementById(`newPassword${rowId}`);
  const confirmPasswordInput = document.getElementById(`confirmPassword${rowId}`);

  changePasswordButton.hidden = true;
  currentPasswordInput.style.display = "inline-block";
  newPasswordInput.style.display = "inline-block";
  confirmPasswordInput.style.display = "inline-block";
}

const addAdminButton = document.getElementById("addAdminButton");

addAdminButton.addEventListener("click", async () => {

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const token = urlParams.get('variable');

  const requestObject = {
    headers: {
      'Authorization': `Bearer ${token}`, // Include the token in the request headers
    },
    url: 'addAdmin', // api/v1/addAdmin
    method: 'GET',
  };

  axiosRequestToken(requestObject).then((token) => {
    const currentURL = window.location.href;
    let refererSplit = currentURL.split('?');
    token = refererSplit[refererSplit.length - 1].split('=')[1];
    const addBearerToeknToURL = `addAdmin?variable=${encodeURIComponent(token)}`;
    window.location.href = addBearerToeknToURL;
  }).catch((error) => {
    console.error(error.response.status);
    console.error(error.response.statusText);
    console.error(error.response.data);
  });

});

const addWorkshopButton = document.getElementById("addWorkshopButton");

addWorkshopButton.addEventListener("click", async () => {

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const token = urlParams.get('variable');

  const requestObject = {
    headers: {
      'Authorization': `Bearer ${token}`, // Include the token in the request headers
    },
    url: 'workshops', // api/v1/workshop
    method: 'GET',
  };

  axiosRequestToken(requestObject).then((token) => {
    const currentURL = window.location.href;
    let refererSplit = currentURL.split('?');
    token = refererSplit[refererSplit.length - 1].split('=')[1];
    const addBearerToeknToURL = `workshops?variable=${encodeURIComponent(token)}`;
    window.location.href = addBearerToeknToURL;
  }).catch((error) => {
    console.error(error.response.status);
    console.error(error.response.statusText);
    console.error(error.response.data);
  });
});

const addEventButton = document.getElementById("addEventButton");

addEventButton.addEventListener("click", async () => {

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const token = urlParams.get('variable');

  const requestObject = {
    headers: {
      'Authorization': `Bearer ${token}`, // Include the token in the request headers
    },
    url: 'events', // api/v1/event
    method: 'GET',
  };

  axiosRequestToken(requestObject).then((token) => {
    const currentURL = window.location.href;
    let refererSplit = currentURL.split('?');
    token = refererSplit[refererSplit.length - 1].split('=')[1];
    const addBearerToeknToURL = `events?variable=${encodeURIComponent(token)}`;
    window.location.href = addBearerToeknToURL;
  }).catch((error) => {
    console.error(error.response.status);
    console.error(error.response.statusText);
    console.error(error.response.data);
  });

});

let newAdminId = 0;

function addNewAdminRow(admin) {
  const tableBody = document.querySelector("tbody");
  const newRow = document.createElement("tr");
  newRow.setAttribute("id", "row" + newAdminId);

  const adminID = admin._id.toString();

  newRow.innerHTML = `
    <td>${newAdminId}</td>
    <td><label id="nameLabel${newAdminId}">${admin.name}</label><input type="text" id="nameInput${newAdminId}" style="display: none;" class="adminInput"></td>
    <td><label id="roleLabel${newAdminId}">${admin.role}</label><input type="text" id="role${newAdminId}" style="display: none;" class="adminInput"></td>
    <td><label id="emailLabel${newAdminId}">${admin.email}</label><input class="adminInput" type="email" id="emailInput${newAdminId}" pattern="[^\s@]+@[^\s@]+\.[^\s@]+" style="display: none;"></td>

      <div class="passwords">
        <input class="adminInput" type="password" id="currentPassword${newAdminId}" placeholder="Enter current password" style="display: none;">
        <input class="adminInput" type="password" id="newPassword${newAdminId}" placeholder="Enter new password" style="display: none;">
        <input class="adminInput" type="password" id="confirmPassword${newAdminId}" placeholder="Confirm password" style="display: none;">
      </div>
    </td>
    <td>
      <div class="btn">
        <button type="button" onclick="editRow(${newAdminId}, '${adminID}')" class="Edit" id="Edit${newAdminId}">Edit</button>
      </div>
      <div class="btn">
        <button type="button" onclick="editRow(${newAdminId}, '${adminID}')" class="Edit" id="Update${newAdminId}" hidden>Update</button>
      </div>
    </td>
    <td>
      <form method="POST" action="#">
        <div class="btn">
          <button type="button" value="" class="Delete" id="Delete${newAdminId}" onclick="deleteRow(${newAdminId}, '${adminID}')">Delete</button>
        </div>
      </form>
    </td>
  `;
  tableBody.insertBefore(newRow, tableBody.lastElementChild);
  newAdminId++;
}