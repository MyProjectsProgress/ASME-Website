const email = document.querySelector("#email");
const form = document.querySelector("#form");
const submitButton = document.querySelector("#submit");

submitButton.addEventListener('click', (event) => {

    event.preventDefault();

    const url = `verificationCode.html?variable=${encodeURIComponent(email.value)}`;
    window.location.href = url;

    axios.post(`/api/v1/auth/forgetPassword`, {
        email: email.value
    }).then((res) => {

        const data = res.data
        console.log(data)
        window.location.href = '../templates/verificationCode.html';

    }).catch((error) => {
        console.error(error.response.status);
        console.error(error.response.statusText);
        console.error(error.response.data);
    });
});