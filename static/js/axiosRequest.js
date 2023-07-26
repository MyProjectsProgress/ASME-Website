const axiosRequest = async function axiosRequest(requestObject, nextPage, flag, getData) {

    try {
        const res = await axios(requestObject);
        const token = res.data['token'];
        // console.log(token)

        if (flag) {
            // return token;
        } else {
            window.location.href = nextPage;
        };

        if (getData) {
            return res.data;
        }

    } catch (error) {
        // console.log(requestObject);
        console.error(error.response.status);
        console.error(error.response.statusText);
        console.error(error.response.data);
        return error.response.data;
    };
};