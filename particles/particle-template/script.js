const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = []; // particle array contains particle objects. Each object will have info about size, colour, and coordinates

// mouse handler
const mouse = {
  x: null, // position on x axis
  y: null, // position on y axis
  radius: 150, // area around the mouse that interacts with particles
};

window.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
  //   console.log(event)
});

ctx.fillStyle = "white";
ctx.font = "30px Verdana";
ctx.fillText("A", 0, 40);
const data = ctx.getImageData(0, 0, 100, 100);

class Particle {
  constructor(x, y) {
    // x and y are coordinates
    this.x = x;
    this.y = y;
    this.size = 1; // radius of particle
    this.baseX = this.x; // initial position of particle
    this.baseY = this.y;
    this.density = Math.random() * 30 + 1; // determines how heavy each particle is and how fast they move away from the mouse
  }
  draw() {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
  update() {
    // calculate distance between current mouse and particle position
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy); // each particle will always be aware of its distance from the mouse
    (distance < 100) ? this.size = 5 : this.size = 1
  }
}

const init = () => {
  particleArray = []; // in case particle array is not empty
  for (let i = 0; i < 1000; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    particleArray.push(new Particle(x, y));
  }
  //   particleArray.push(new Particle(40, 40));
  //   particleArray.push(new Particle(50, 80));
};
init();
console.log(particleArray);

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear entire canvas between each animation
  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].draw(); // call custom draw method for each particle object inside of the array
    particleArray[i].update();
  }
  requestAnimationFrame(animate); // recursively call animation (animation loop)
};

animate();
