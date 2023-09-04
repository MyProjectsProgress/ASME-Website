const email = document.querySelector("#email");
const password = document.querySelector("#password");
const forgetPasswordButton = document.querySelector("#forgetPassword");
const loginButton = document.querySelector('#loginButton');

// for the sake of logout
window.history.pushState({}, '', '/');

forgetPasswordButton.addEventListener('click', (event) => {
  event.preventDefault();
  window.location.href = '/forgetPassword';
});

loginButton.addEventListener('click', async (event) => {

  event.preventDefault();

  const nextPage = `/adminPanel`;

  const body = {
    email: email.value,
    password: password.value,
  };

  const requestObject = {
    url: '/api/v1/auth/adminLogin',
    method: 'POST',
    data: body,
  };

  axiosRequest(requestObject, nextPage).then((res) => {
    if (res.status || res.errors) {

      let errorMessage = document.createElement("div");
      let errorSpan = document.createElement("span");
      let text = document.createTextNode('Incorrect email or password');

      errorMessage.className = "error-message";
      errorSpan.appendChild(text);
      errorMessage.appendChild(errorSpan);

      let formError = document.getElementById("formError");

      while (formError.firstChild) {
        formError.removeChild(formError.firstChild);
      };

      formError.appendChild(errorMessage);
      formError.style.display = "block";

    } else {
      window.location.href = `/adminPanel`;
    };
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
      };
    });

    input.addEventListener("invalid", function () {
      input.style.border = "solid 2px rgba(211, 25, 15, 0.6)";
    });
  };
});
