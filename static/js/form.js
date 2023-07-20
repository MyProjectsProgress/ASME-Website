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
const position = document.querySelector("#position");
const previousExperience = document.querySelector("#previous-experience");
const comment = document.querySelector("#comment");
const submitButton = document.querySelector("#submit");

submitButton.addEventListener('click', (event) => {

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
        position: position.value,
        previousExperience: previousExperience.value,
        comment: comment.value,
    }

    requestObject = {
        url: '/api/v1/form',
        method: 'POST',
        data: body,
    }

    const nextPage = './form-succession';

    axiosRequest(requestObject, nextPage);
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

    input.addEventListener("invalid", () => {
        input.style.border = "solid 2px var(--error-red)";
    });

}

function showError(field, message){
    let errorMessage = document.createElement("div");
    let errorSpan = document.createElement("span");
    let text = document.createTextNode(message);

    errorMessage.className = "error-message";
    errorSpan.appendChild(text);
    errorMessage.appendChild(errorSpan)

    field.insertAdjacentElement("afterend", errorMessage);
}

function clearErrors() {
    let messages = document.querySelectorAll(".error-message");
    
    messages.forEach((message) => {
        message.remove();
    });
}


// showError(email, "hello");    
// clearErrors();
