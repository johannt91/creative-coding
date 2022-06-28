const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const body = document.querySelector("body");
// const animateCanvas = document.querySelector(".animate");

const randSquare = () => {
  context.lineWidth = 4;
  let width = 60;
  let height = 60;
  let gap = 20;
  let x, y;

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      x = 100 + (width + gap) * i;
      y = 100 + (height + gap) * j;

      context.beginPath();
      context.rect(x, y, width, height);
      context.strokeStyle = "#c7c7c7";
      context.stroke();

      if (Math.random() > 0.5) {
        context.beginPath();
        context.rect(x + 8, y + 8, width - 16, height - 16);
        context.stroke();
      }
    }
  }
};

const clearContext = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  randSquare();
};

// const animated = () => {
//   setInterval(clearContext, 500);
// };

// animateCanvas.addEventListener("click", animated);
body.addEventListener("click", clearContext);
