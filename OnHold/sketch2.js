var bg;
var song;
var analyzer;
var fft;
var songPlaying = false;
var yoff = 0.0;
var c;

function preload() {
  song = loadSound('./assets/01_Delivered.mp3');
}

function setup() {
  c = createCanvas(169, 169);
  c.position(windowWidth / 2 - width / 2, windowHeight / 2 - height / 2);
  ellipseMode(CENTER);
  analyzer = new p5.Amplitude();
  fft = new p5.FFT();
}

function draw() {
  background(255);
  var rms = analyzer.getLevel();

  //waveform
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
  tri =  triangle(((width * .33) + 8), (height * .33) - rms * 15, ((width * .67) + 8) + rms * 15, (height / 2), ((width * .33) + 8) + rms, (height * .67) + rms * 15);

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