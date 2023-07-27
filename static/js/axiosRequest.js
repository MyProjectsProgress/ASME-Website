const axiosRequest = async function axiosRequest(requestObject, nextPage, returnResponse) {

    try {
        const res = await axios(requestObject);

        if (returnResponse) {
            return res.data;
        } else {
            window.location.href = nextPage;
            return;
        };

    } catch (error) {
        console.error(error.response.status);
        console.error(error.response.statusText);
        console.error(error.response.data);
        return error.response.data;
    };
};

const axiosRequestToken = async function axiosRequest(requestObject) {

    try {
        const res = await axios(requestObject);
        const token = res.data['token'];
        console.log(token)
        return token;

    } catch (error) {
        console.error(error.response.status);
        console.error(error.response.statusText);
        console.error(error.response.data);
        return error.response.data;
    };
};

module.exports = {
    axiosRequest,
    axiosRequestToken,
}