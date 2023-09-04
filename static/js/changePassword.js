const currentPassword = document.querySelector("#currentPassword");
const newPassword = document.querySelector("#newPassword");
const confirmPassword = document.querySelector("#confirmPassword");
const submitButton = document.querySelector("#submit");

submitButton.addEventListener('click', async (event) => {

    event.preventDefault();

    const urlSearchParams = new URLSearchParams(window.location.search);

    const adminId = urlSearchParams.get('adminId');

    const body = {
        currentPassword: currentPassword.value,
        newPassword: newPassword.value,
        confirmPassword: confirmPassword.value
    }

    const requestObject = {
        url: `/api/v1/admin/changePassword/${adminId}`,
        method: 'PATCH',
        data: body
    };

    const nextPage = '/adminLogin';

    await axiosRequest(requestObject, nextPage);
});
