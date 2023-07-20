const axiosRequest = async function axiosRequest(requestObject, nextPage, headers) {

    try {
        const res = await axios(requestObject, { headers });
        const token = res.data['token'];
        // const resConfigToken = res.config['Authorizaion'];
        // const token = res.config['Authorization'];
        // res.headers.Authorization = token;
        // axios.defaults.headers.common = {
        //     'Authorization': token
        // };
        // console.log(token)
        if (token) {
            return token; // Return token if logged in
        } else {
            // window.location.href = nextPage;
        }

    } catch (error) {
        console.error(error.response.status);
        console.error(error.response.statusText);
        console.error(error.response.data);
        throw error; // Throw the error for error handling in the calling code
    };
}