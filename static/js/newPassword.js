const email = document.querySelector("#email");
const password = document.querySelector("#password");
const submitButton = document.querySelector("#submit");

submitButton.addEventListener('click', (event) => {

    event.preventDefault();

    axios.put(`/api/v1/auth/resetPassword`, {
        email: email.value,
        newPassword: password.value,
    }).then((res) => {
        // render the amdin page here
        // ex: window.location.href = '../templates/form-succession.html';
        const data = res.data
        console.log(data)

    }).catch((error) => {
        console.error(error.response.status);
        console.error(error.response.statusText);
        console.error(error.response.data);
    });
});
