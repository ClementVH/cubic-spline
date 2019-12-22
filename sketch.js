/// <reference path="./p5.global-mode.d.ts" />

let spline;
let nbControlPoints = 5;

const xs = [0.0, 0.2, 0.3, 0.4, 1.0];
const ys = [0.0, 0.3, 0.6, 0.2, 1.0];

function setup() {
  var canvas = createCanvas(500, 500);
  canvas.parent('sketch-holder');

  frameRate(24);

  // new a Spline object
  spline = new Spline(xs, ys);
}

function getX(x) {
  return x * 500;
}

function getY(y) {
  return 500 - y * 500;
}

function draw() {
  background(255, 255, 255);

  spline = new Spline(xs, ys);

  if (mouseIsPressed) {
    for (let i = 0; i < nbControlPoints; i++) {
      if (mouseX > getX(xs[i]) - 10 && mouseX < getX(xs[i] + 10)) {
        if (mouseY > getY(ys[i]) - 10 && mouseY < getY(ys[i]) + 10) {
          xs[i] = mouseX / 500;
          ys[i] = (500 - mouseY) / 500;
        }
      }
    }
  }

  for (let i = 0; i < nbControlPoints; i++) {
    ellipse(getX(xs[i]), getY(ys[i]), 10, 10);
  }

  for (let i = 0; i < 500; i++) {
    const x = i * 0.002;
    const y = spline.at(x);
    point(getX(x), getY(y));
  }
}