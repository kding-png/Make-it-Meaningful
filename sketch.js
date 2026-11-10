// Window pattern inspired by the windows on everyday buildings.
// Red + black ink on white, uncoated 170 gsm paper.
// Press R for a new random pattern with overlapping windows.
// Press S to save the picture. Press E to export Riso layers.

let blackInk;
let redInk;
let windows = [];

function setup() {
  createCanvas(800, 800).parent('artwork');
  pixelDensity(1);
  blackInk = new Riso('BLACK');
  redInk = new Riso('BRIGHTRED');
  makePattern();
  noLoop();
}

function makePattern() {
  windows = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      // p5.js random() gives each window new properties.
      windows.push({
        x: 70 + col * 94 + random(-35, 35),
        y: 70 + row * 94 + random(-35, 35),
        angle: random(-0.25, 0.25),
        red: random() < 0.35,
        dots: random() < 0.4
      });
    }
  }
}

function draw() {
  background(255);
  clearRiso();

  // Draw the random windows saved in the array.
  for (let i = 0; i < windows.length; i++) {
      let w = windows[i];
      let ink = blackInk;
      if (w.red) {
        ink = redInk;
      }

      ink.push();
      ink.translate(w.x, w.y);
      ink.rotate(w.angle);
      ink.noFill();
      ink.stroke(255);
      ink.strokeWeight(4);

      // One square and two lines make a window.
      ink.rect(-45, -45, 90, 90);
      ink.line(-45, 0, 45, 0);
      ink.line(0, -45, 0, 45);

      // A few small black dots make a gray texture.
      if (w.dots && !w.red) {
        ink.noStroke();
        ink.fill(255);
        for (let a = -36; a <= 36; a += 8) {
          for (let b = -36; b <= 36; b += 8) {
            ink.circle(a, b, 1.5);
          }
        }
      }
      ink.pop();
  }

  drawRiso();
}

function keyPressed() {
  if (key == 'r' || key == 'R') {
    makePattern();
    redraw();
  }
  if (key == 's' || key == 'S') {
    saveCanvas('window-pattern', 'png');
  }
  if (key == 'e' || key == 'E') {
    exportRiso();
  }
}
