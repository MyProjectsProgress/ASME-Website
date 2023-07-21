const axiosRequest = async function axiosRequest(requestObject, nextPage) {

    try {
        const res = await axios(requestObject);
        const token = res.data['token'];
        console.log(requestObject);
        // const resConfigToken = res.config['Authorizaion'];
        // const token = res.config['Authorization'];
        // res.headers.Authorization = token;
        // axios.defaults.headers.common = {
        //     'Authorization': token
        // };
        // console.log(token)
        if (token) {
            return token;
        } else {
            window.location.href = nextPage;
        }

    } catch (error) {
        console.log(requestObject);
        console.error(error.response.status);
        console.error(error.response.statusText);
        console.error(error.response.data);
        return error.response.data; // Throw the error for error handling in the calling code
    };
}