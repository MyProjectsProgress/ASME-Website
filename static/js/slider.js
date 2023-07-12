// Fetching Events data
fetch("../data/db.json")
  .then((res) => {
    return res.json();
  })

  .then((data) => {
    setEvents(data);
  });

function setEvents(events){

  let event_pics = document.getElementById("event_pics");
  let slider = document.getElementById("event-slider");
  let db_pics = "";
  let event_elements = "";

  events.map((event) => {

    db_pics += `
      <div class="event-img__item" id="${event.pic_id}">
        <img src="${event.pic_src}" alt="" class="event-img__img">
      </div>
    `;

    // event_elements += `
    //               <div class="event-slider__item swiper-slide" data-target="${event.pic_id}">
    //                 <div class="event-slider__card">
    //                   <img src="${event.background_src}" alt="" class="event-slider__cover">
    //                   <div class="event-slider__cover-overlay"></div>
                        
    //                   <div class="event-slider__content">
    //                     <h1 class="event-slider__title">${event.title}</h1>
    //                     <span class="event-slider__date">${event.date}</span>

    //                     <div class="event-ctr">
    //                       <p>${event.description}</p>
    //                     </div>

    //                     <div class="event-slider__bottom">
    //                         <button class="event-slider__apply"> Apply now </button>
    //                     </div>

    //                   </div>
    //                 </div>
    //               </div>
    // `;
  });

  event_pics.innerHTML = db_pics;
  // slider.innerHTML = event_elements;
  ;
}

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

      // console.log(target);

      $(".event-img__item").removeClass("active");
      $(".event-img__item#" + target).addClass("active");
    },
  },
});

swiper.on("slideChange", function () {
  var index = this.activeIndex;

  var target = $(".event-slider__item").eq(index).data("target");

  // console.log(target);

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


// add event main pic
// let img_div = document.createElement("div");
// img_div.className = "event-img__item";
// img_div.id = event.pic_id;

// let event_img = document.createElement("img");
// event_img.src = event.pic_src;
// event_img.className = "event-img__img";

// img_div.appendChild(event_img);
// event_pics.appendChild(img_div);