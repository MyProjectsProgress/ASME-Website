
const axiosRequest = function axiosRequest(url, requestObject, nextPage) {

    return axios.post(url, requestObject)
        .then((res) => {
            // Redirect to admin page here
            window.location.href = nextPage;
            const data = res.data;
            console.log(data);
            return data; // Return the response data if needed
        })
        .catch((error) => {
            console.error(error.response.status);
            console.error(error.response.statusText);
            console.error(error.response.data);
            throw error; // Throw the error for error handling in the calling code
        });
}

module.exports = axiosRequest;