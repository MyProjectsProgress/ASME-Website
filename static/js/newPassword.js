const email = document.querySelector("#email");
const password = document.querySelector("#password");
const submitButton = document.querySelector("#submit");

submitButton.addEventListener('click', async (event) => {

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

    const nextPage = '/adminLogin';

    await axiosRequest(requestObject, nextPage);
});
