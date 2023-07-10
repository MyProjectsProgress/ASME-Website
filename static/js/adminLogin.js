const email = document.querySelector("#email");
const password = document.querySelector("#password");
const forgetPasswordButton = document.querySelector("#forgetPassword")
const loginButton = document.querySelector('#loginButton');

forgetPasswordButton.addEventListener('click', (event) => {
  event.preventDefault();
  window.location.href = '../templates/forgetPassword.html';
});

loginButton.addEventListener('click', (event) => {

  event.preventDefault();

  axios.post(`/api/v1/auth/adminLogin`, {
    email: email.value,
    password: password.value,
  }).then((res) => {
    // redirect to admin page here
    // ex: window.location.href = '../templates/form-succession.html';
    const data = res.data
    console.log(data)
  }).catch((error) => {
    console.error(error.response.status);
    console.error(error.response.statusText);
    console.error(error.response.data);
  });
});

window.addEventListener("DOMContentLoaded", function () {
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
