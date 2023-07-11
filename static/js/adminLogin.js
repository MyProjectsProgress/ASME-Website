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

  const requestObject = {
    email: email.value,
    password: password.value,
  }

  const url = `/api/v1/auth/adminLogin`;

  const nextPage = '../templates/form-succession.html';

  axiosRequest(url, requestObject, nextPage);

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
