const email = document.querySelector("#email");
const form = document.querySelector("#form");
const submitButton = document.querySelector("#submit");

submitButton.addEventListener('click', (event) => {

    event.preventDefault();

    const addEmailToURL = `verificationCode.html?variable=${encodeURIComponent(email.value)}`;
    window.location.href = addEmailToURL;

    const requestObject = { email: email.value }

    const url = `/api/v1/auth/forgetPassword`;

    const nextPage = '../templates/verificationCode.html';

    axiosRequest(url, requestObject, nextPage);
});