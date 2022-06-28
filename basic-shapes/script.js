let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d"); //used for drawing


context.fillStyle = "blue"

// fillRect takes 4 parameters (x, y, width, height)
// context.fillRect(100,100,400,400)

context.beginPath(); //tell context to begin a new path
context.rect(100,100,400,400); // draw rectangle without filling it
context.lineWidth = 4
context.stroke(); //draw the outline of the shape


context.beginPath();
//the values used for arc are (x, y, r, sAngle, eAngle):
// x: x-coordinate for centre of circle
// y: y-coordinate for centre of circle
// r: radius
// sAngle: starting angle in radians (0 is 3 o'clock position)
// eAngle: ending angle in radians

context.arc(300, 300, 150, 0, Math.PI * 2);
context.stroke();
