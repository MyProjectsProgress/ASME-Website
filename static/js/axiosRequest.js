const axiosRequest = async function axiosRequest(requestObject, nextPage) {

    try {
        const res = await axios(requestObject);
        window.location.href = nextPage;
        return;

    } catch (error) {
        console.error(error.response.status);
        console.error(error.response.statusText);
        console.error(error.response.data);
        return error.response.data;
    };
};

module.exports = {
    axiosRequest,
};