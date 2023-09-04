const eventForm = document.getElementById('eventForm');
const submitButton = document.getElementById('submit');

eventForm.addEventListener('submit', async (event) => {

    event.preventDefault();

    // Create FormData object to collect form data, including selected files
    const formData = new FormData(eventForm);
    formData.append('expired', document.getElementById('expired').checked);

    const body = formData;

    const requestObject = {
        url: '/api/v1/event',
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