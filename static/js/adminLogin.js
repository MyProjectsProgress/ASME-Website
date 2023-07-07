window.addEventListener("DOMContentLoaded", function () {
    var adminInput = document.querySelectorAll(".adminInput");
  
    for (let input of adminInput) {
      input.addEventListener("input", function () {
        if (input.value !== "") {
          input.style.border = "solid 2px rgba(15, 90, 170, 0.7)";
        } else {
          input.style.border = "solid 2px rgb(182, 182, 182)";
        }
      });
  
      input.addEventListener("invalid", function () {
        input.style.border = "solid 2px rgba(211, 25, 15, 0.6)";
      });
    }
  });
  