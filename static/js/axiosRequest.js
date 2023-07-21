const axiosRequest = async function axiosRequest(requestObject, nextPage) {

    try {
        const res = await axios(requestObject);
        const token = res.data['token'];

        if (token) {
            return token;
        } else {
            window.location.href = nextPage;
        };

    } catch (error) {
        console.log(requestObject);
        console.error(error.response.status);
        console.error(error.response.statusText);
        console.error(error.response.data);
        return error.response.data;
    };
};