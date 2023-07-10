
let resetCode = '';

const input1 = document.getElementById('input1');
const input2 = document.getElementById('input2');
const input3 = document.getElementById('input3');
const input4 = document.getElementById('input4');
const input5 = document.getElementById('input5');
const input6 = document.getElementById('input6');

input1.addEventListener('input', handleInput);
input2.addEventListener('input', handleInput);
input3.addEventListener('input', handleInput);
input4.addEventListener('input', handleInput);
input5.addEventListener('input', handleInput);
input6.addEventListener('input', handleInput);

function handleInput(event) {
  const value = event.target.value;
  let index = parseInt(event.target.id.slice(-1)) - 1;

  if (value === '') {
    let chars = resetCode.split('');
    chars[index] = ' ';
    resetCode = chars.join('');
  }
}

function addPinNumber(first, last) {
  if (first.value.length) {
    let index = parseInt(first.id.slice(-1)) - 1;
    const input = document.querySelector(`#${last}`).value;
    let chars = resetCode.split('');
    chars[index] = input;
    resetCode = chars.join('');
  }

  if (last === 'input6') {
    axios.post(`/api/v1/auth/verifyResetCode`, {
      resetCode: resetCode
    }).then((res) => {

      window.location.href = '../templates/newPassword.html';

    }).catch((error) => {
      console.error(error.response.status);
      console.error(error.response.statusText);
      console.error(error.response.data);
    });
  }
}

function Validation(event) {
  const input = event.target;
  const value = input.value;
  const validNumber = /^[0-9]$/;
  if (!validNumber.test(value)) {
    input.value = '';
  }
}

var fields = document.getElementsByClassName('square-input');

Array.from(fields).forEach(function (fields) {

  fields.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13 || fields.value.length == 1) {
      // Focus on the next sibling
      try {
        fields.nextElementSibling.focus();
      }
      catch {
        //pass
      }
    }
  });
});