// --------------------------------------------------------------Get Admins-------------------------------------------

window.addEventListener("DOMContentLoaded", function () {

  axios.get('/api/v1/admin').then((res) => {
    const admins = res.data.data;
    admins.forEach((admin) => {
      addNewAdminRow(admin);
    });

  }).catch((error) => {
    window.location.href = '/errorPage';
  });

  var adminInput = document.querySelectorAll(".adminInput");

  for (let input of adminInput) {
    input.addEventListener("input", function () {
      if (input.value !== "") {
        input.style.border = "solid 2px rgba(15, 90, 170, 0.7)";
      } else {
        input.style.border = "solid 2px rgb(182, 182, 182)";
      };
    });

    input.addEventListener("invalid", function () {
      input.style.border = "solid 2px rgba(211, 25, 15, 0.6)";
    });
  };
});

// --------------------------------------------------------------Admins UI-------------------------------------------

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
    <td class="change-password-cell">
    <a href="/changePassword?adminId=${admin._id}" class="change-password-link">
    <button class="change-password-button">
        <i class="fas fa-key"></i> 
    </button>
</a>
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
};

// --------------------------------------------------------------Edit Admin-------------------------------------------

async function editRow(rowId, adminID) {

  const nameInput = document.getElementById("nameInput" + rowId);
  const role = document.getElementById("role" + rowId);
  const emailInput = document.getElementById("emailInput" + rowId);

  const editButton = document.getElementById("Edit" + rowId);
  const updateButton = document.getElementById("Update" + rowId);
  const lastCol = document.getElementById("lastcol");

  const adminContainer = document.querySelector(".admin-container");

  // User is currently editing the row, update the data
  if (editButton.style.display === "none") {
    adminContainer.classList.remove("editing");

    // Update the row with the new data
    document.getElementById("nameLabel" + rowId).textContent = nameInput.value || document.getElementById("nameLabel" + rowId).textContent;
    document.getElementById("roleLabel" + rowId).textContent = role.value || document.getElementById("roleLabel" + rowId).textContent;
    document.getElementById("emailLabel" + rowId).textContent = emailInput.value || document.getElementById("emailLabel" + rowId).textContent;

    const body = {
      name: nameInput.value,
      role: role.value,
      email: emailInput.value,
    };

    const requestObject = {
      url: `api/v1/admin/${adminID}`,
      method: 'PATCH',
      data: body,
    };

    const nextPage = `/adminPanel`;

    axiosRequest(requestObject, nextPage).then((res) => {
      // pass
    }).catch((error) => {
      console.error(error);
    });

    // Hide the input fields and show the labels
    nameInput.style.display = "none";
    role.style.display = "none";
    emailInput.style.display = "none";
    passwordInput.style.display = "none"; // Hide the password field

    document.getElementById("nameLabel" + rowId).style.display = "block";
    document.getElementById("roleLabel" + rowId).style.display = "block";
    document.getElementById("emailLabel" + rowId).style.display = "block";

    lastCol.removeAttribute("hidden");

    // Show the Edit button and hide the Update button
    editButton.style.display = "inline-block";
    updateButton.style.display = "none";
  } else {
    // User wants to edit the row, enable the input fields
    adminContainer.classList.add("editing");

    // Show the labels and input fields
    nameInput.style.display = "inline-block";
    role.style.display = "inline-block";
    emailInput.style.display = "inline-block";
    lastCol.setAttribute("hidden", "");

    document.getElementById("nameLabel" + rowId).style.display = "none";
    document.getElementById("roleLabel" + rowId).style.display = "none";
    document.getElementById("emailLabel" + rowId).style.display = "none";

    // Set the input field values to the old values by default
    nameInput.value = document.getElementById("nameLabel" + rowId).textContent;
    role.value = document.getElementById("roleLabel" + rowId).textContent;
    emailInput.value = document.getElementById("emailLabel" + rowId).textContent;

    // Show the Update button and hide the Edit button
    editButton.style.display = "none";
    updateButton.style.display = "inline-block";
  }
}


// --------------------------------------------------------------Delete Admin-------------------------------------------

function deleteRow(rowId, adminID) {

  const userConfirmed = confirm('Are you sure you want to perform this action?');

  if (userConfirmed) {

    // Delete the specified row
    var row = document.getElementById("row" + rowId);
    row.parentNode.removeChild(row);

    const requestObject = {
      url: `/api/v1/admin/${adminID}`,
      method: 'DELETE',
    }

    const nextPage = `/adminPanel`;

    axiosRequest(requestObject, nextPage);
  };
};


// --------------------------------------------------------------Add Admin-------------------------------------------

const addAdminButton = document.getElementById("addAdminButton");

addAdminButton.addEventListener("click", async () => {

  const nextPage = `/addAdmin`;

  const requestObject = {
    url: 'addAdmin',
    method: 'GET',
  };

  axiosRequest(requestObject, nextPage);

});

// --------------------------------------------------------------Add Workshop-------------------------------------------

const addWorkshopButton = document.getElementById("addWorkshopButton");

addWorkshopButton.addEventListener("click", async () => {

  const nextPage = `/workshops`;

  const requestObject = {
    url: 'workshops',
    method: 'GET',
  };

  axiosRequest(requestObject, nextPage);

});

// --------------------------------------------------------------Add Event-------------------------------------------

const addEventButton = document.getElementById("addEventButton");

addEventButton.addEventListener("click", async () => {

  const nextPage = `/events`;

  const requestObject = {
    url: 'events',
    method: 'GET',
  };

  axiosRequest(requestObject, nextPage);
});

// --------------------------------------------------------------Logout Button-------------------------------------------

const logoutButton = document.querySelector('#logout');

logoutButton.addEventListener('click', async (event) => {

  event.preventDefault();

  axios.get('/api/v1/auth/adminLogout').then((res) => {

    window.history.pushState({}, '', '/');
    window.location.href = '/adminLogin';

  }).catch((error) => {
    window.location.href = '/errorPage';
  });
});