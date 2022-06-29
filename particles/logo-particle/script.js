const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = []; // particle array contains particle objects. Each object will have info about size, colour, and coordinates

// mouse handler
const mouse = {
  x: null, // position on x axis
  y: null, // position on y axis
  radius: 50, // area around the mouse that interacts with particles
};

window.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

ctx.fillStyle = "white";
ctx.font = "75px Verdana";
ctx.fillText("<JT/>", 55, 120);
const textCoordinates = ctx.getImageData(0, 0, 300, 150);

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
    // Physics for particle movement
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    let maxDistance = mouse.radius;
    let force = (maxDistance - distance) / maxDistance; // slow down particles as they move further away from the mouse
    let directionX = forceDirectionX * force * this.density
    let directionY = forceDirectionY * force * this.density
    
    if (distance < mouse.radius) {
      this.x -= directionX * 5;
      this.y -= directionY * 5;
    } else {
      if(this.x !== this.baseX){
        let dx = this.x - this.baseX;
        this.x -= dx/15;
      }
      if(this.y !== this.baseY){
        let dy = this.y - this.baseY;
        this.y -= dy/15;
      }
    }
  }
}

const init = () => {
  particleArray = []; // in case particle array is not empty
  
  // for (let i = 0; i < 1000; i++) {
  //   let x = Math.random() * canvas.width;
  //   let y = Math.random() * canvas.height;
  //   particleArray.push(new Particle(x, y));
  // }

  for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
    for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
      if(textCoordinates.data[(y * 4 * textCoordinates.width + (x * 4) + 3)] > 128) {
        let positionX = x;
        let positionY = y;
        particleArray.push(new Particle(positionX * 4, positionY * 4));
      }
    }
  }
};
init();

const redraw = () => {

}

const redsizeCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}


const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear entire canvas between each animation
  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].draw(); // call custom draw method for each particle object inside of the array
    particleArray[i].update();
  }
  requestAnimationFrame(animate); // recursively call animation (animation loop)
};
animate();
