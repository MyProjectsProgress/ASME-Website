var inputs = document.querySelectorAll(".input");
const form = document.querySelector("#form");
const fullName = document.querySelector("#full-name");
const phoneNumber = document.querySelector("#phone-number");
const email = document.querySelector("#email");
const university = document.querySelector("#university");
const faculty = document.querySelector("#faculty");
const department = document.querySelector("#department");
const major = document.querySelector("#major");
const graduationYear = document.querySelector("#graduation-year");
const workshop = document.querySelector("#workshop");
const commentt = document.querySelector("#comment");
const submitButton = document.querySelector("#submit");

var errorMap = {
    name: fullName,
    phoneNumber: phoneNumber,
    email: email,
    university: university,
    faculty: faculty,
    department: department,
    graduationYear: graduationYear
};

submitButton.addEventListener('click', async (event) => {

    event.preventDefault();

    const body = {
        name: fullName.value,
        phoneNumber: phoneNumber.value,
        email: email.value,
        university: university.value,
        faculty: faculty.value,
        department: department.value,
        major: major.value,
        graduationYear: graduationYear.value,
        workshop: workshop.value,
        comment: commentt.value,
    }

    requestObject = {
        url: '/api/v1/participantForm',
        method: 'POST',
        data: body,
    }

    const nextPage = '/form-succession';

    await axiosRequest(requestObject, nextPage)
        .then((res) => {
            clearErrors();
            let previousError = "";
            res["errors"].map((error) => {
                if (previousError === errorMap[error.path]) {
                    // continue
                } else {
                    showError(errorMap[error.path], error.msg);
                }
                previousError = errorMap[error.path];
            });
        });
});

for (let input of inputs) {

    input.addEventListener("input", async () => {
        const formData = new FormData(form); // Get form data

        if (input.value !== "") {
            input.style.border = "solid 2px var(--light-blue)";
        }
        else {
            input.style.border = "solid 2px rgb(182, 182, 182)";
        }
    });
}

function showError(field, message) {
    let errorMessage = document.createElement("div");
    let errorSpan = document.createElement("span");
    let text = document.createTextNode(message);

    errorMessage.className = "error-message";
    errorSpan.appendChild(text);
    errorMessage.appendChild(errorSpan)

    field.insertAdjacentElement("afterend", errorMessage);
    field.style.border = "solid 2px var(--error-red)";
}

function clearErrors() {
    let messages = document.querySelectorAll(".error-message");
    messages.forEach((message) => {
        message.remove();
    });
}