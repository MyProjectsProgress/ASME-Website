const adminName = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");
const role = document.querySelector("#role")
const submit = document.querySelector('#submit');

submit.addEventListener('click', (event) => {

    event.preventDefault();

    const body = {
        name: adminName.value,
        email: email.value,
        password: password.value,
        passwordConfirm: confirmPassword.value,
        role: role.value,
    }

    const requestObject = {
        url: '/api/v1/admin',
        method: 'POST',
        data: body
    }

    const nextPage = './adminPanel';

    axiosRequest(requestObject, nextPage, false);

});