document.getElementById('next').onclick = function(){
    let lists = document.querySelectorAll('.item');
    document.getElementById('slide').appendChild(lists[0]);
}
document.getElementById('prev').onclick = function(){
    let lists = document.querySelectorAll('.item');
    document.getElementById('slide').prepend(lists[lists.length - 1]);
}


//--------------------------- Events and Workshops fetching

// Fetching Events data
fetch("../../data/db.json")
    .then((res) => {
        return res.json();
    })

    .then((data) => {
        data["events"].map((event) => {
            addEvent(event);
    });
        swiper.update();

        data["workshops"].map((workshop) => {
            addWorkshop(workshop);
        });
    });

let slider = document.getElementById("event-slider");
let event_pics = document.getElementById("event_pics");
let first_event = true;

let workshops_wrap = document.getElementById("workshops-wrap");

function addEvent(event) {
    let img_div = document.createElement("div");
    let item = document.createElement("div");
    let card = document.createElement("div");
    let content = document.createElement("div");
    let ctr = document.createElement("div");
    let overlay = document.createElement("div");

    let event_img = document.createElement("img");
    let background = document.createElement("img");
    let title = document.createElement("h1");
    let date = document.createElement("span");
    let description = document.createElement("p");

    item.className = "event-slider__item";
    item.classList.add("swiper-slide");
    card.className = "event-slider__card";
    content.className = "event-slider__content";

    img_div.className = "event-img__item";
    event_img.className = "event-img__img";
    background.className = "event-slider__cover";
    overlay.className = "event-slider__cover-overlay";

    if (first_event) {
        img_div.classList.add("active");
        first_event = false;
    }

    ctr.className = "event-ctr";
    title.className = "event-slider__title";
    date.className = "event-slider__date";

    item.dataset.target = event.pic_id;
    img_div.id = event.pic_id;
    event_img.src = event.pic_src;
    background.src = event.background_src;

    let titleText = document.createTextNode(event.title);
    let dateText = document.createTextNode(event.date);
    let descriptionText = document.createTextNode(event.description);

    img_div.appendChild(event_img);

    title.appendChild(titleText);
    date.appendChild(dateText);
    description.appendChild(descriptionText);
    ctr.appendChild(description);

    content.appendChild(title);
    content.appendChild(date);
    content.appendChild(ctr);

    if (event.application) {
        let btm = document.createElement("div");
        let apply = document.createElement("button");

        btm.className = "event-slider__bottom";
        apply.className = "event-slider__apply";
        let applyText = document.createTextNode("Apply now");

        apply.appendChild(applyText);
        btm.appendChild(apply);
        content.appendChild(btm);
    }

    card.appendChild(background);
    card.appendChild(overlay);
    card.appendChild(content);
    item.appendChild(card);

    event_pics.appendChild(img_div);
    slider.appendChild(item);
}

function addWorkshop(workshop){
    let card = document.createElement("div");
    let img_div = document.createElement("div");
    let description_div = document.createElement("div");
    let register = document.createElement("div");

    let workshop_img = document.createElement("img");
    let title = document.createElement("h3");
    let description = document.createElement("p");
    let register_btn = document.createElement("button");

    let titleText = document.createTextNode(workshop.title);
    let descriptionText = document.createTextNode(workshop.description);
    let registerText = document.createTextNode("Register");

    workshop_img.src = workshop.img_src;
    title.appendChild(titleText);
    description.appendChild(descriptionText);
    register_btn.appendChild(registerText);

    card.className = "workshops-card";
    img_div.className = "workshop-image";
    description_div.className = "workshop-description";
    register.className = "register-btn";
    title.className = "workshop-title";

    img_div.appendChild(workshop_img);
    description_div.appendChild(description);
    register.appendChild(register_btn);

    card.appendChild(img_div);
    card.appendChild(title);
    card.appendChild(description_div);
    card.appendChild(register);

    workshops_wrap.appendChild(card);
}

// --------------------------------------------------------------

// Swiper Functions
var swiper = new Swiper(".event-slider", {
    spaceBetween: 30,
    effect: "fade",

    loop: false,
    navigation: {
        nextEl: ".next",
        prevEl: ".prev",
    },

    autoplay: {
        delay: 5000,
    },

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },

    on: {
        init: function () {
        var index = this.activeIndex;

        var target = $(".event-slider__item").eq(index).data("target");

        $(".event-img__item").removeClass("active");
        $(".event-img__item#" + target).addClass("active");
        },
    },
    });

swiper.on("slideChange", function () {
    var index = this.activeIndex;

    var target = $(".event-slider__item").eq(index).data("target");

    $(".event-img__item").removeClass("active");
    $(".event-img__item#" + target).addClass("active");

    if (swiper.isEnd) {
        $(".prev").removeClass("disabled");
        $(".next").addClass("disabled");
    } else {
        $(".next").removeClass("disabled");
    }

    if (swiper.isBeginning) {
        $(".prev").addClass("disabled");
    } else {
        $(".prev").removeClass("disabled");
    }
});
console.log('a7a')
// Get the button element
const aboutButton = document.getElementById('aboutButton');

// Check if the button has been hovered before
const hasBeenHovered = localStorage.getItem('hasBeenHovered');

// Add the "hovered" class if it hasn't been hovered before
if (!hasBeenHovered) {
   aboutButton.addEventListener('mouseover', function () {
      aboutButton.classList.add('hovered');
   });

   // Set the flag in local storage to remember the hover state
   localStorage.setItem('hasBeenHovered', true);
}


// navbar actions


var home = document.getElementById("Home");
var Events = document.getElementById("Events");
var Workshops = document.getElementById("Workshops");
var about = document.getElementById("About");

home.onclick = function () {
    home.setAttribute("Class", "active");
    Events.setAttribute("Class", "");
    Workshops.setAttribute("Class", "");
    about.setAttribute("Class", "");

}
Events.onclick = function () {
    home.setAttribute("Class", "");
    Events.setAttribute("Class", "active");
    Workshops.setAttribute("Class", "");
    about.setAttribute("Class", "");

}
Workshops.onclick = function () {
    home.setAttribute("Class", "");
    Events.setAttribute("Class", "");
    Workshops.setAttribute("Class", "active");
    about.setAttribute("Class", "");

}
about.onclick = function () {
    home.setAttribute("Class", "");
    Events.setAttribute("Class", "");
    Workshops.setAttribute("Class", "");
    about.setAttribute("Class", "active");

}



