const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");
const role = document.querySelector("#role")
const submit = document.querySelector('#submit');

submit.addEventListener('click', (event) => {

    event.preventDefault();

    const requestObject = {
        email: email.value,
        password: password.value,
        passwordConfirm: confirmPassword.value,
        role: role.value,
    }

    const url = `/api/v1/admin`;

    const nextPage = '../templates/adminPanel.html';

    axiosRequest(url, requestObject, nextPage);

});