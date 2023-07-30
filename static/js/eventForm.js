const eventForm = document.querySelector("#eventForm");
const Title = document.querySelector("#Title");
const date = document.querySelector("#dateInput");
const description = document.querySelector("#description");
const backgroundImage = document.querySelector("#backgroundImage");
const foregroundImage = document.querySelector("#foregroundImage");
const expired = document.querySelector("#expired");
const submitButton = document.querySelector("#submit");

submitButton.addEventListener("click", function (event) {
    event.preventDefault();

    const selectedDate = date.value;
    const isExpired = expired.checked;

    console.log("Selected Date:", selectedDate);
    console.log("Is Expired:", isExpired);

});