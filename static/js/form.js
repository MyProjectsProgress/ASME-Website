var inputs = document.querySelectorAll(".input");

for (let input of inputs){

    input.addEventListener("input", () => {
        if(input.value !== ""){
            input.style.border = "solid 2px rgba(15, 90, 170,0.7)";
        }

        else{
            input.style.border = "solid 2px rgb(182, 182, 182)";
        }
    });

    input.addEventListener("invalid", () => {
        input.style.border = "solid 2px rgba(211, 25, 15, 0.6)";
    });
    
}

