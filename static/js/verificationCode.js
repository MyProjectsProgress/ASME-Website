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

const resendCode = document.querySelector("#resendCode");

resendCode.addEventListener('click', (event) => {

  event.preventDefault();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const email = urlParams.get('variable');

  const body = { email: email }

  const requestObject = {
    url: '/api/v1/auth/forgetPassword',
    method: 'POST',
    data: body
  };

  const nextPage = './verificationCode';

  axiosRequest(url, requestObject, nextPage);

});

let resetCode = '';

function handleInput(event) {
  const value = event.target.value;
  let index = parseInt(event.target.id.slice(-1)) - 1;

  if (value === '') {
    let chars = resetCode.split('');
    chars[index] = ' ';
    resetCode = chars.join('');
  };
};

function addPinNumber(first, last) {
  if (first.value.length) {
    let index = parseInt(first.id.slice(-1)) - 1;
    const input = document.querySelector(`#${last}`).value;
    let chars = resetCode.split('');
    chars[index] = input;
    resetCode = chars.join('');
  };

  if (last === 'input6') {

    const body = { resetCode: resetCode }

    const requestObject = {
      url: '/api/v1/auth/verifyResetCode',
      method: 'POST',
      data: body
    };

    const nextPage = './newPassword';

    axiosRequest(requestObject, nextPage);
  };
};

function Validation(event) {
  const input = event.target;
  const value = input.value;
  const validNumber = /^[0-9]$/;
  if (!validNumber.test(value)) {
    input.value = '';
  };
};

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
      };
    };
  });
});