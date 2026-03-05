const mainImage = document.getElementById("mainImage");
const thumbs = document.querySelectorAll(".thumb");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const zoomLens = document.getElementById("zoomLens");

let index = 0;

/* Thumbnail click */

thumbs.forEach((thumb, i) => {
  thumb.addEventListener("click", () => {
    index = i;

    mainImage.src = thumb.src;

    document.querySelector(".thumb.active")?.classList.remove("active");

    thumb.classList.add("active");
  });
});

let lastScroll = 0;
const header = document.getElementById("mainHeader");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    header.classList.remove("header-hide");
    return;
  }

  if (currentScroll > lastScroll) {
    /* scrolling down */
    header.classList.add("header-hide");
  } else {
    /* scrolling up */
    header.classList.remove("header-hide");
  }

  lastScroll = currentScroll;
});

/* Carousel navigation */

function showImage(i) {
  if (i < 0) index = thumbs.length - 1;
  else if (i >= thumbs.length) index = 0;
  else index = i;

  mainImage.src = thumbs[index].src;

  document.querySelector(".thumb.active")?.classList.remove("active");
  thumbs[index].classList.add("active");
}

prev.onclick = () => showImage(index - 1);
next.onclick = () => showImage(index + 1);

/* Zoom functionality */

mainImage.addEventListener("mousemove", function (e) {
  zoomLens.style.display = "block";

  zoomLens.style.backgroundImage = `url(${mainImage.src})`;

  const rect = mainImage.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  zoomLens.style.left = x - 60 + "px";
  zoomLens.style.top = y - 60 + "px";

  zoomLens.style.backgroundSize =
    mainImage.width * 2 + "px " + mainImage.height * 2 + "px";

  zoomLens.style.backgroundPosition = `-${x * 2 - 60}px -${y * 2 - 60}px`;
});

mainImage.addEventListener("mouseleave", () => {
  zoomLens.style.display = "none";
});

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const btn = item.querySelector(".faq-question");

  btn.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});

const track = document.querySelector(".applications-track");
const nextBtn = document.querySelector(".app-next");
const prevBtn = document.querySelector(".app-prev");

const cards = document.querySelectorAll(".application-card");

let i = 0;
const cardWidth = 340; // card + gap

// clone cards for infinite effect
cards.forEach((card) => {
  const clone = card.cloneNode(true);
  track.appendChild(clone);
});

nextBtn.addEventListener("click", () => {
  i++;

  track.style.transition = "transform 0.5s ease";
  track.style.transform = `translateX(-${i * cardWidth}px)`;

  if (i === cards.length) {
    setTimeout(() => {
      track.style.transition = "none";
      i = 0;
      track.style.transform = `translateX(0px)`;
    }, 500);
  }
});

prevBtn.addEventListener("click", () => {
  if (i === 0) {
    i = cards.length;
    track.style.transition = "none";
    track.style.transform = `translateX(-${i * cardWidth}px)`;
  }

  setTimeout(() => {
    i--;
    track.style.transition = "transform 0.5s ease";
    track.style.transform = `translateX(-${i * cardWidth}px)`;
  }, 10);
});

const tabs = document.querySelectorAll(".tab");

const data = {
  raw: {
    title: "High-Grade Raw Material Selection",
    desc: "Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness uniformity.",
    list: ["PE100 grade material", "Optimal molecular weight distribution"],
    img: "/images/cr1.jpg",
  },

  extrusion: {
    title: "Precision Extrusion Process",
    desc: "High performance extruders melt and shape the HDPE material into consistent pipe structures.",
    list: ["Uniform melt flow", "Advanced screw design"],
    img: "/images/cr2.jpg",
  },

  cooling: {
    title: "Controlled Cooling",
    desc: "Cooling tanks ensure dimensional stability and maintain structural integrity.",
    list: ["Water cooling system", "Temperature control"],
    img: "/images/cr3.jpg",
  },

  sizing: {
    title: "Accurate Pipe Sizing",
    desc: "Vacuum calibration ensures pipes meet strict dimensional standards.",
    list: ["Vacuum sizing tank", "Diameter precision"],
    img: "/images/cr1.jpg",
  },

  quality: {
    title: "Quality Control Testing",
    desc: "Pipes undergo multiple quality checks before approval.",
    list: ["Pressure testing", "Material inspection"],
    img: "/images/cr2.jpg",
  },

  marking: {
    title: "Pipe Marking",
    desc: "Automated systems mark pipes with necessary identification information.",
    list: ["Batch marking", "Specification labels"],
    img: "/images/cr3.jpg",
  },

  cutting: {
    title: "Precision Cutting",
    desc: "Automatic cutters ensure pipes are cut accurately to required lengths.",
    list: ["Automatic saw system", "Length precision"],
    img: "/images/cr1.jpg",
  },

  packaging: {
    title: "Secure Packaging",
    desc: "Final pipes are packaged carefully to prevent damage during transportation.",
    list: ["Protective wrapping", "Stacked packaging"],
    img: "/images/cr2.jpg",
  },
};

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelector(".tab.active").classList.remove("active");
    tab.classList.add("active");

    const key = tab.dataset.tab;

    document.getElementById("process-title").innerText = data[key].title;
    document.getElementById("process-desc").innerText = data[key].desc;

    const list = document.getElementById("process-list");
    list.innerHTML = "";

    data[key].list.forEach((item) => {
      const li = document.createElement("li");
      li.innerText = item;
      list.appendChild(li);
    });

    document.getElementById("process-image").src = data[key].img;
  });
});

const testimonialTrack = document.querySelector(".testimonial-track");

let scrollPosition = 0;

function autoScroll() {
  scrollPosition += 1;

  testimonialTrack.style.transform = `translateX(-${scrollPosition}px)`;

  if (scrollPosition > testimonialTrack.scrollWidth / 2) {
    scrollPosition = 0;
  }

  requestAnimationFrame(autoScroll);
}

autoScroll();
