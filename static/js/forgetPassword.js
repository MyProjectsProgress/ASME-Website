const email = document.querySelector("#email");
const form = document.querySelector("#form");
const submitButton = document.querySelector("#submit");

submitButton.addEventListener('click', (event) => {

    event.preventDefault();

    axios.post(`/api/v1/auth/forgetPassword`, {
        email: email.value
    }).then((res) => {

        const data = res.data
        console.log(data)
        window.location.href = '../templates/Vcodepage.html';

    }).catch((error) => {
        console.error(error.response.status);
        console.error(error.response.statusText);
        console.error(error.response.data);
    });
});