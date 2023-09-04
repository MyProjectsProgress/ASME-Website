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

    await axiosRequest(requestObject, nextPage).then((res) => {

        if (res.status || res.errors) {

            let errorMessage = document.createElement("div");
            let errorSpan = document.createElement("span");
            let text = document.createTextNode(res.errors[0].msg);

            errorMessage.className = "error-message";
            errorSpan.appendChild(text);
            errorMessage.appendChild(errorSpan);

            let formError = document.getElementById("formError");

            while (formError.firstChild) {
                formError.removeChild(formError.firstChild);
            };

            formError.appendChild(errorMessage);
            formError.style.display = "block";
        };
    });
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