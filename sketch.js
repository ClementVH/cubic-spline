/// <reference path="./p5.global-mode.d.ts" />

let spline;
let nbControlPoints = 5;

let editing = false;
let pointEditing = -1;

const xs = [0.0, 0.2, 0.3, 0.4, 1.0];
const ys = [0.0, 0.3, 0.6, 0.2, 1.0];

const list = document.getElementById('list');

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

function fromMouseX(x) {
  return x / 500;
}

function fromMouseY(y) {
  return (500 - y) / 500;
}

function mouseInRange(index) {
  const x = getX(xs[index]);
  const y = getY(ys[index]);

  const distance = Math.sqrt(Math.pow((x - mouseX), 2) + Math.pow((y - mouseY), 2));
  return distance <= 10;
}

function setEditControlPoint(index) {
  editing = true;
  pointEditing = index;
}

function updateControlPoint() {
  const newX = fromMouseX(mouseX);
  const newY = fromMouseY(mouseY);
  xs[pointEditing] = newX;
  ys[pointEditing] = newY;
}

function drawControlPoints() {
  for (let i = 0; i < nbControlPoints; i++) {
    ellipse(getX(xs[i]), getY(ys[i]), 10, 10);
    text(i, getX(xs[i]), getY(ys[i]) - 10);
  }
}

function drawSpline() {
  for (let i = 0; i < 500; i++) {
    const x = i * 0.002;
    const y = spline.at(x);
    point(getX(x), getY(y));
  }
}

function updateList() {
  if (list.childElementCount !== nbControlPoints) {
    list.innerHTML = "";

    for (let i = 0; i < nbControlPoints; i++) {
      const li = createElement('li', xs[i] + ', ' + ys[i])
      li.parent(list);
    }
  } else {
    const children = list.childNodes;

    children.forEach((child, i) => {
      child.innerHTML = xs[i].toFixed(2) + ', ' + ys[i].toFixed(2);
    });
  }
}

function draw() {
  background(255, 255, 255);

  spline = new Spline(xs, ys);

  if (mouseIsPressed) {
    for (let i = 0; i < nbControlPoints && !editing; i++) {
      if (mouseInRange(i)) {
        setEditControlPoint(i);
        break;
      }
    }

    if (editing) {
      updateControlPoint();
    }
  }

  drawControlPoints();
  drawSpline();
  updateList();
}

function addControlPoint() {
  let index = -1;
  const x = fromMouseX(mouseX);
  for (let i = 0; i < xs.length; i++) {
    if (x < xs[i]) {
      index = i;
      break;
    }
  }

  xs.splice(index, 0, x);
  ys.splice(index, 0, fromMouseY(mouseY));
  nbControlPoints++;
}

function mouseClicked() {
  for (let i = 0; i < nbControlPoints; i++) {
    if (mouseInRange(i)) {
      return;
    }
  }

  if (!editing) {
    addControlPoint();
  }
}

function mouseReleased() {
  editing = false;
}