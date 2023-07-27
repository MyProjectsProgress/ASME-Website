const adminName = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");
const role = document.querySelector("#role")
const submit = document.querySelector('#submit');

submit.addEventListener('click', async (event) => {

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

    const currentURL = window.location.href;
    let refererSplit = currentURL.split('?');
    token = refererSplit[refererSplit.length - 1].split('=')[1];

    const nextPage = `./adminPanel?variable=${encodeURIComponent(token)}`;

    try {
        await axiosRequest(requestObject, nextPage, false);
    } catch (error) {
        console.error(error.response.status);
        console.error(error.response.statusText);
        console.error(error.response.data);
    }
});