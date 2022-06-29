const canvasSketch = require("canvas-sketch");

//========== Utils ==========//
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [1080, 1080],
};

// const degToRad = (degrees) => {
//   return (degrees / 180) * Math.PI;
// };

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    context.fillStyle = "#000";

    const cx = width * 0.5;
    const cy = height * 0.5;
    const w = width * 0.01; //calc 30% of width
    const h = height * 0.1; // calc 30% of height
    let x, y

    const num = 12;
    const radius = width * 0.3
    // const randomRange = (min, max) => {
    //   return Math.random() * (max - min) + min
    // }

    for (let i = 0; i < num; i++) {
      const slice = math.degToRad(360 / num);
      const angle = slice * i;

      x = cx + radius * Math.sin(angle)
      y = cy + radius * Math.cos(angle)

      context.save();
      // context.translate(cx, cy); a double translate call can be made by removing the cx & cy variables from x & y
      context.translate(x, y);
      context.rotate(-angle);
      context.scale(random.range(1, 3), random.range(0.5, 3))

      context.beginPath();
      context.rect(-w * 0.5, random.range(0, -h * 0.5), w, h);
      context.fill();
      context.restore();

      context.save();
      context.translate(cx, cy);
      context.rotate(-angle);

      context.lineWidth = random.range(3, 15)

      context.beginPath();
      context.arc(0, 0, radius * random.range(0.3, 5), slice * random.range(-0.3, 7), slice * random.range(3, 5))
      context.stroke();
      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
