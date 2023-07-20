const email = document.querySelector("#email");
const form = document.querySelector("#form");
const submitButton = document.querySelector("#submit");

submitButton.addEventListener('click', (event) => {

    event.preventDefault();

    const addEmailToURL = `verificationCode.html?variable=${encodeURIComponent(email.value)}`;
    window.location.href = addEmailToURL;

    const body = { email: email.value }

    const requestObject = {
        url: '/api/v1/auth/forgetPassword',
        method: 'POST',
        data: body
    };

    const nextPage = './verificationCode';

    axiosRequest(requestObject, nextPage);
});