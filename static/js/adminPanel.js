

function editRow(rowId) {



  var nameInput = document.getElementById("nameInput" + rowId);
  var phoneInput = document.getElementById("phoneInput" + rowId);
  var emailInput = document.getElementById("emailInput" + rowId);
  var currentPasswordInput = document.getElementById("currentPassword" + rowId);
  var newPasswordInput = document.getElementById("newPassword" + rowId);
  var confirmPasswordInput = document.getElementById("confirmPassword" + rowId);

  var editButton = document.getElementById("Edit" + rowId);
  var updateButton = document.getElementById("Update" + rowId);

  if (editButton.style.display === "none") {
    // User is currently editing the row, update the data

    // Check if the password fields have been modified
    var currentPassword = currentPasswordInput.value;
    var newPassword = newPasswordInput.value;
    var confirmPassword = confirmPasswordInput.value;

    if (newPassword !== confirmPassword) {
      // Passwords do not match, show an error message or take appropriate action
      alert("New passwords do not match!");
      return;
    }

    if (newPassword === "") {
      // New password field is empty, set the value to the old password
      newPassword = currentPassword;
    }

    // Update the row with the new data
    document.getElementById("nameLabel" + rowId).textContent = nameInput.value || document.getElementById("nameLabel" + rowId).textContent;
    document.getElementById("phoneLabel" + rowId).textContent = phoneInput.value || document.getElementById("phoneLabel" + rowId).textContent;
    document.getElementById("emailLabel" + rowId).textContent = emailInput.value || document.getElementById("emailLabel" + rowId).textContent;
    document.getElementById("passwordLabel" + rowId).textContent = "••••••••";

    // Hide the input fields and show the labels
    nameInput.style.display = "none";
    phoneInput.style.display = "none";
    emailInput.style.display = "none";
    currentPasswordInput.style.display = "none";
    newPasswordInput.style.display = "none";
    confirmPasswordInput.style.display = "none";

    document.getElementById("nameLabel" + rowId).style.display = "block";
    document.getElementById("phoneLabel" + rowId).style.display = "block";
    document.getElementById("emailLabel" + rowId).style.display = "block";
    document.getElementById("passwordLabel" + rowId).style.display = "block";

    // Show the Edit button and hide the Update button
    editButton.style.display = "inline-block";
    updateButton.style.display = "none";
  } else {
    // User wants to edit the row, enable the input fields

    // Show the labels and input fields
    nameInput.style.display = "inline-block";
    phoneInput.style.display = "inline-block";
    emailInput.style.display = "inline-block";
    currentPasswordInput.style.display = "inline-block";
    newPasswordInput.style.display = "inline-block";
    confirmPasswordInput.style.display = "inline-block";

    document.getElementById("nameLabel" + rowId).style.display = "none";
    document.getElementById("phoneLabel" + rowId).style.display = "none";
    document.getElementById("emailLabel" + rowId).style.display = "none";
    document.getElementById("passwordLabel" + rowId).style.display = "none";

    // Set the input field values to the old values by default
    nameInput.value = document.getElementById("nameLabel" + rowId).textContent;
    phoneInput.value = document.getElementById("phoneLabel" + rowId).textContent;
    emailInput.value = document.getElementById("emailLabel" + rowId).textContent;
    currentPasswordInput.value = document.getElementById("passwordLabel" + rowId).textContent;
    // Clear the password fields
    // currentPasswordInput.value = "";
    newPasswordInput.value = "";
    confirmPasswordInput.value = "";

    // Show the Update button and hide the Edit button
    editButton.style.display = "none";
    updateButton.style.display = "inline-block";
  }
}

function deleteRow(rowId) {
  // Delete the specified row
  var row = document.getElementById("row" + rowId);
  row.parentNode.removeChild(row);
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

    admins.map((admin) => {

      const {
        email,
        password,
        role,
      } = admin;

      console.log(email)
      console.log(password)
      console.log(role)
    })

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

addAdminButton.addEventListener("click", () => {

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const token = urlParams.get('variable');

  const requestObject = {
    headers: {
      'Authorization': `Bearer ${token}`, // Include the token in the request headers
    },
    url: 'form', // api/v1/form
    method: 'GET',
  };

  const nextPage = './form';

  axiosRequest(requestObject, nextPage).then((token) => {
    console.log(axios.defaults.headers.common['Authorization'])
  }).catch((error) => {
    console.log(axios.defaults.headers.common['Authorization'])
    console.error(error);
  });

});