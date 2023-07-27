const email = document.querySelector("#email");
const password = document.querySelector("#password");
const forgetPasswordButton = document.querySelector("#forgetPassword");
const loginButton = document.querySelector('#loginButton');

forgetPasswordButton.addEventListener('click', (event) => {
  event.preventDefault();
  window.location.href = './forgetPassword';
});

loginButton.addEventListener('click', async (event) => {

  event.preventDefault();

  const body = {
    email: email.value,
    password: password.value,
  };

  const requestObject = {
    url: '/api/v1/auth/adminLogin',
    method: 'POST',
    data: body,
  };

  axiosRequestToken(requestObject).then((token) => {
    const addBearerToeknToURL = `../adminPanel?variable=${encodeURIComponent(token)}`;
    window.location.href = addBearerToeknToURL;
  })
    .catch((error) => {
      console.error(error);
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
