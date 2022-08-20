let counter1 = 0;
let counter2 = 1;
const sections = document.querySelectorAll("section");
const progress = document.querySelector(".progress h2");
const progressCounter = () => {
  progress.textContent = `${counter2}/${sections.length}`;
};

window.addEventListener("wheel", (e) => {
  const deltaY = e.deltaY > 0;

  if (deltaY) {
    counter1++;
    counter2++;
  } else {
    counter1--;
    counter2--;
  }

  //If last page at 5, reset counter and bring back page 1
  if (counter1 === 5) {
    Array.from(sections).forEach((section) => {
      section.style.left = "0";
    });

    counter1 = 0;
    counter2 = 1;

    //Update the progress header
    progressCounter();
    return;
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
    //Update the progress header
    progressCounter();
  }

  //Update the progress header
  progressCounter();
  //   If DeltaY is postive, scroll down the page using counter1, if negative scroll up page by using counter2
  document.querySelector(
    `.section-${deltaY ? counter1 : counter2}`
  ).style.left = `${deltaY ? "-100vw" : "0"}`;

  console.log(counter1, counter2);
});
