const adminName = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");
const role = document.querySelector("#role")
const submit = document.querySelector('#submit');

submit.addEventListener('click', async (event) => {

    event.preventDefault();

    const body = {
        name: adminName.value,
        email: email.value,
        password: password.value,
        passwordConfirm: confirmPassword.value,
        role: role.value,
    };

    const requestObject = {
        url: '/api/v1/admin',
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
    }
});

// hashing password in the frontend
/*
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jsSHA/2.0.2/sha.js"></script>
    if (password.value != confirmPassword.value) {

        alert("Passowrd and confirmation password don't match");
        window.location.href = window.location.href;
        return;
    }

    const hashedPasswordObject = new jsSHA("SHA-512", "TEXT", { numRounds: 12 });
    hashedPasswordObject.update(password.value);
    const hashedPassword = hashedPasswordObject.getHash("HEX");

    console.log(hashedPassword)
*/