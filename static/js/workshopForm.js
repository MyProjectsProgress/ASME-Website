const workshopForm = document.querySelector("#workshopForm");
const submitButton = document.getElementById('submit');

workshopForm.addEventListener('submit', async (workshop) => {

    workshop.preventDefault();

    const formData = new FormData(workshopForm);

    const body = formData;

    const requestObject = {
        url: '/api/v1/workshop',
        method: 'POST',
        data: body,
    };

    const nextPage = `/adminPanel`;

    try {
        await axiosRequest(requestObject, nextPage);
    } catch (error) {
        console.error(error.response.status);
        console.error(error.response.statusText);
        console.error(error.response.data);
    };
});
