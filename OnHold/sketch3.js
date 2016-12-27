var bg;
var song;
var analyzer;
var fft;
var songPlaying = false;
var yoff = 0.0;
var c;
var tri;

var x1 = -20.73;
var y1 = -28.73
var x2 = 36.73;
var y2 = 0;
var x3 = -20.73
var y3 = 28.73;

function preload() {
  song = loadSound('./assets/02_OnHold.mp3');
}

function setup() {
  c = createCanvas(200, 170);
  c.position(windowWidth / 2 - width / 2, windowHeight / 2 - height / 2);
  ellipseMode(CENTER);
  analyzer = new p5.Amplitude();
  fft = new p5.FFT();
  angleMode(DEGREES);
}

function draw() {
  background(255);
  var rms = analyzer.getLevel();

  //waveform 
  // adapted from http://p5js.org/reference/#/p5.FFT
  var waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(255, 0, 0); 
  strokeWeight(2);
  for (var i = 0; i < waveform.length; i++) {
    var a = map(i, 0, waveform.length, 0, width);
    var b = map(waveform[i], -1, 1, height * .33, height * .67);
    vertex(a, b);
  }
  endShape();


  // perlinNoiseLine 
  // adapted from http://p5js.org/examples/examples/Math_Noise_Wave.php
  fill(255, 0, 255);
  beginShape();
  var xoff = 0;
  for (var x = 0; x <= width; x += 4) {
    var y = map(noise(xoff, yoff), 0, 1, 80, 120);
    vertex(x, y);
    xoff += 0.05;
  }
  yoff += 0.01;
  endShape(CLOSE);


  //playhead 
  fill(255, 153, 0);
  translate(width / 2, (height / 2));
  if (songPlaying) {
    rotate(-90);
  }
  tri = triangle(x1, y1 - (rms * 15), x2 + (rms * 15), y2, x3, y3 + (rms * 15));
}

function mousePressed() {
  if (song.isPlaying()) {
    song.pause();
    songPlaying = false;
  } else {
    song.play();
    songPlaying = true;
  }
}
