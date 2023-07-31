const workshopForm = document.querySelector("#workshopForm");
const submitButton = document.getElementById('submit');

workshopForm.addEventListener('submit', async (workshop) => {

    workshop.preventDefault(); // prevent default form submission

    const formData = new FormData(workshopForm);

    const body = formData

    const requestObject = {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        url: '/api/v1/workshop',
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
