const eventForm = document.getElementById('eventForm');
const submitButton = document.getElementById('submit');

eventForm.addEventListener('submit', async (event) => {

    event.preventDefault(); // Prevent default form submission

    // Create FormData object to collect form data, including selected files
    const formData = new FormData(eventForm);
    formData.append('expired', document.getElementById('expired').checked);

    const body = formData

    const requestObject = {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        url: '/api/v1/event',
        method: 'POST',
        data: body
    }

    const currentURL = window.location.href;
    let refererSplit = currentURL.split('?');
    token = refererSplit[refererSplit.length - 1].split('=')[1];

    const nextPage = `./adminPanel?variable=${encodeURIComponent(token)}`;

    try {
        await axiosRequest(requestObject, nextPage, false);
    } catch (error) {
        console.error(error.response.status);
        console.error(error.response.statusText);
        console.error(error.response.data);
    }
});






