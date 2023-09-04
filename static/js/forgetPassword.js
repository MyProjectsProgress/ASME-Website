const email = document.querySelector("#email");
const form = document.querySelector("#form");
const submitButton = document.querySelector("#submit");

submitButton.addEventListener('click', async (event) => {

    event.preventDefault();

    window.location.href = `/verificationCode`;

    const body = { email: email.value };

    const requestObject = {
        url: '/api/v1/auth/forgetPassword',
        method: 'POST',
        data: body,
    };

    const nextPage = '/verificationCode';

    await axiosRequest(requestObject, nextPage);
});