document.getElementById('next').onclick = function () {
    let lists = document.querySelectorAll('.item');
    document.getElementById('slide').appendChild(lists[0]);
}
document.getElementById('prev').onclick = function () {
    let lists = document.querySelectorAll('.item');
    document.getElementById('slide').prepend(lists[lists.length - 1]);
}

//--------------------------- Events fetching data
axios.get('/api/v1/event').then((res) => {

    const events = res.data.data;

    events.reverse();

    events.map((event) => {
        const date = event.date;
        event.date = date.split('T')[0];
        addEvent(event);
        swiper.update();
    });

}).catch((error) => {
    console.log(error);
});

//--------------------------- Workshops fetching data
axios.get('/api/v1/workshop').then((res) => {

    const workshops = res.data.data;

    workshops.map((workshop) => {
        addWorkshop(workshop);
    });

}).catch((error) => {
    console.log(error);
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

    item.dataset.target = event._id;
    img_div.id = event._id;
    event_img.src = event.foregroundImage;
    background.src = event.backgroundImage;

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

    // if (!(event.expired)) {
    //     let btm = document.createElement("div");
    //     let apply = document.createElement("button");

    //     btm.className = "event-slider__bottom";
    //     apply.className = "event-slider__apply";
    //     let applyText = document.createTextNode("Apply now");

    //     apply.appendChild(applyText);
    //     btm.appendChild(apply);
    //     content.appendChild(btm);
    // }

    card.appendChild(background);
    card.appendChild(overlay);
    card.appendChild(content);
    item.appendChild(card);
    event_pics.appendChild(img_div);
    slider.appendChild(item);
}

function addWorkshop(workshop) {

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
    let registerText = document.createTextNode("Join now");

    workshop_img.src = workshop.image;
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

    register_btn.addEventListener("click", function () {
        window.location.href = "https://asme-cusb.onrender.com/api/v1/participantForm";
    });

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
    };

    if (swiper.isBeginning) {
        $(".prev").addClass("disabled");
    } else {
        $(".prev").removeClass("disabled");
    };
});


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

// numbers counter 
const counts = document.querySelectorAll('.count');
const speed = 300;

counts.forEach((counter) => {
    function upDate() {
        const target = Number(counter.getAttribute('data-target'));
        const count = Number(counter.innerText);
        const inc = target / speed;
        if (count < target) {
            counter.innerText = Math.floor(inc + count);
            setTimeout(upDate, 15);
        } else {
            counter.innerText = target;
        };
    };
    upDate();
});


// Partners section
const imageNames = [
    '1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png', '10.png', '11.png', '12.png', '13.png', '14.png',
    '15.png', '16.png', '17.png', '18.png', '19.png', '20.png', '21.png', '22.png', '23.png', '24.png', '25.png', '26.png', '27.png',
    '28.png', '29.png', '30.png', '31.png', '32.png', '33.png', '34.png', '35.png', '36.png', '37.png'
];

const swiperWrapper = document.getElementById('partner-slider');

imageNames.forEach(imageName => {

    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');

    const image = document.createElement('img');
    image.src = `/partners/${imageName}`;
    image.alt = 'Image';

    slide.appendChild(image);
    swiperWrapper.appendChild(slide);
});

const swiper2 = new Swiper(".customer-logos-slider", {
    // slidesPerView: 4,
    // spaceBetween: 25,
    slidesPerView: 5,
    grid: {
        rows: 3,
    },
    mousewheel: {
        forceToAxis: true,
    },
    loop: true,
    autoplay: {
        delay: 1500,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});
