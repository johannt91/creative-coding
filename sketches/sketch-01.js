const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [1080, 1080],
};

const degToRad = (degrees) => {
  return (degrees / 180) * Math.PI;
};

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
    const randomRange = (max, min) => {
      return Math.random() * (max - min) + min
    }

    for (let i = 0; i < num; i++) {
      const slice = degToRad(360 / num);
      const angle = slice * i;

      x = cx + radius * Math.sin(angle)
      y = cy + radius * Math.cos(angle)

      context.save();
      // context.translate(cx, cy); a double translate call can be made by removing the cx & cy variables from x & y
      context.translate(x, y);
      context.rotate(-angle);
      context.scale(randomRange(3, 1), 1)

      context.beginPath();
      context.rect(-w * 0.5, -h * 0.5, w, h);
      context.fill();
      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
