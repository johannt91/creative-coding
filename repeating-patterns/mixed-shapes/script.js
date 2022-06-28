const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

context.lineWidth = 4;

// square
context.beginPath();
context.rect(60, 60, 150, 150);
context.stroke();

// circle
context.beginPath();
context.arc(135, 135, 50, 0, Math.PI * 2);
context.stroke();

// triangle
context.beginPath();
context.moveTo(100, 175);
context.lineTo(135, 85);
context.stroke();
