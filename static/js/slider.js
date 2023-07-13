// Fetching Events data
fetch("../data/db.json")
  .then((res) => {
    return res.json();
  })

  .then((data) => {
    data.map((event) => {
      addslide(event);
    });

    swiper.update();
  });

let slider = document.getElementById("event-slider");
let event_pics = document.getElementById("event_pics");
let first_event = true;

function addslide(event) {
  let img_div = document.createElement("div");
  let item = document.createElement("div");
  let card = document.createElement("div");
  let content = document.createElement("div");
  let ctr = document.createElement("div");
  let btm = document.createElement("div");
  let overlay = document.createElement("div");

  let event_img = document.createElement("img");
  let background = document.createElement("img");
  let title = document.createElement("h1");
  let date = document.createElement("span");
  let description = document.createElement("p");
  let apply = document.createElement("button");

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
  btm.className = "event-slider__bottom";

  title.className = "event-slider__title";
  date.className = "event-slider__date";
  apply.className = "event-slider__apply";

  item.dataset.target = event.pic_id;
  img_div.id = event.pic_id;
  event_img.src = event.pic_src;
  background.src = event.background_src;

  let titleText = document.createTextNode(event.title);
  let dateText = document.createTextNode(event.date);
  let descriptionText = document.createTextNode(event.description);

  let applyText = document.createTextNode("Apply now");

  img_div.appendChild(event_img);

  title.appendChild(titleText);
  date.appendChild(dateText);
  description.appendChild(descriptionText);
  apply.appendChild(applyText);

  ctr.appendChild(description);
  btm.appendChild(apply);

  content.appendChild(title);
  content.appendChild(date);
  content.appendChild(ctr);
  content.appendChild(btm);

  card.appendChild(background);
  card.appendChild(overlay);
  card.appendChild(content);

  item.appendChild(card);

  event_pics.appendChild(img_div);
  slider.appendChild(item);
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