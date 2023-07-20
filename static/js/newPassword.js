const email = document.querySelector("#email");
const password = document.querySelector("#password");
const submitButton = document.querySelector("#submit");

submitButton.addEventListener('click', (event) => {

    event.preventDefault();

    const body = {
        email: email.value,
        newPassword: password.value,
    }

    const requestObject = {
        url: '/api/v1/auth/resetPassword',
        method: 'PUT',
        data: body
    };

    const nextPage = './adminPanel';

    axiosRequest(requestObject, nextPage);

    // axios.put(`/api/v1/auth/resetPassword`, {
    //     email: email.value,
    //     newPassword: password.value,
    // }).then((res) => {

    //     window.location.href = './adminPanel';
    //     const data = res.data
    //     console.log(data)

    // }).catch((error) => {
    //     console.error(error.response.status);
    //     console.error(error.response.statusText);
    //     console.error(error.response.data);
    // });
});
