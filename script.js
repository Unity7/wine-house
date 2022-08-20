//counter used to keep track of pages going right
let counter1 = 0;
//counter used to keep track of pages going left
let counter2 = 1;
//boolean to keep track of the first and last pages
let bool = true;

const sections = document.querySelectorAll("section");
const progress = document.querySelector(".progress h2");
const circles = document.querySelectorAll(".circle");
const menu = document.querySelector(".menu");
const section1wrapper = document.querySelector(".section-1-wrapper");
const section5wrapper = document.querySelector(".section-5-wrapper");

section1wrapper.style.transform = "scale(1)";

//function that changes the pages based on the sections Array
const pageController = () => {
  bool = true;
  if (counter1 === 5) {
    Array.from(sections).forEach((section) => {
      section.style.left = "0";
    });
    counter1 = 0;
    counter2 = 1;
    section1wrapper.style.transform = "scale(1)";
    section5wrapper.style.transform = "scale(1.5)";
    progressCounter();
    bool = false;
  }

  if (counter1 === -1) {
    Array.from(sections).forEach((section) => {
      if (section.classList[0] === "section-5") {
        return;
      }
      section.style.left = "-100vw";
    });
    counter1 = 4;
    counter2 = 5;
    section1wrapper.style.transform = "scale(1.5)";
    section5wrapper.style.transform = "scale(1)";
    progressCounter();
    bool = false;
  }
  progressCounter();
  return bool;
};

//function to update the header and circles of progressbar
const progressCounter = () => {
  //change the text of h2 element to correpsond with the page it's on
  progress.textContent = `${counter2}/${sections.length}`;

  //change all circles to transparent
  Array.from(circles).forEach((circle) => {
    circle.style.backgroundColor = "transparent";
  });

  //change current page's circle to gray
  document.querySelector(`.circle-${counter2}`).style.backgroundColor = "#ddd";
};

//Counter keeping track of the page based on the mousewheel scroll
window.addEventListener("wheel", (e) => {
  const deltaY = e.deltaY > 0;

  if (deltaY) {
    counter1++;
    counter2++;
  } else {
    counter1--;
    counter2--;
  }

  pageController();
  //Update the progress header
  progressCounter();

  //Scroll mousewheel to navigate website: If DeltaY is postive, scroll down the page using counter1, if negative scroll up page by using counter2
  if (bool) {
    document.querySelector(
      `.section-${deltaY ? counter1 : counter2}`
    ).style.left = `${deltaY ? "-100vw" : "0"}`;

    document.querySelector(
      `.section-${deltaY ? counter1 : counter2}-wrapper`
    ).style.transform = `scale(${deltaY ? "1.5" : "1"})`;

    document.querySelector(
      `.section-${deltaY ? counter1 + 1 : counter2 + 1}-wrapper`
    ).style.transform = `scale(${deltaY ? "1" : "1.5"})`;
  }
});

//Left button click to navigate the website
document.querySelector(".left-btn").addEventListener("click", () => {
  counter1--;
  counter2--;
  pageController() &&
    (document.querySelector(`.section-${counter2}`).style.left = "0");

  if (bool) {
    document.querySelector(`.section-${counter2}-wrapper`).style.transform =
      "scale(1)";
    document.querySelector(`.section-${counter2 + 1}-wrapper`).style.transform =
      "scale(1.5)";
  }
});
//Right button click to navigate the website
document.querySelector(".right-btn").addEventListener("click", () => {
  counter1++;
  counter2++;
  pageController() &&
    (document.querySelector(`.section-${counter1}`).style.left = "-100vw");

  if (bool) {
    document.querySelector(`.section-${counter2}-wrapper`).style.transform =
      "scale(1)";
    document.querySelector(`.section-${counter1}-wrapper`).style.transform =
      "scale(1.5)";
  }
});

//Section 3 Grapes image scaled higher when mouse is over
document.querySelector(".grapes-img").addEventListener("mouseover", () => {
  document.querySelector(".section-3-wrapper").style.opacity = ".5";
});

document.querySelector(".grapes-img").addEventListener("mouseout", () => {
  document.querySelector(".section-3-wrapper").style.opacity = "1";
});

menu.addEventListener("click", () => {
  document.querySelector(".navbar").classList.toggle("change");
});
