function Validation(event) {
  const input = event.target;
  const value = input.value;
  const validNumber = /^[0-9]$/;

  if (!validNumber.test(value)) {
    input.value = '';
  }


}
var fields = document.getElementsByClassName('square-input')
console.log(fields)
Array.from(fields).forEach(function (fields) {
  fields.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13 || fields.value.length == 1) {
      // Focus on the next sibling
      fields.nextElementSibling.focus()
    }
  });
});