var bg;
var song;
var analyzer;
var songPlaying = false;

function preload() {
  bg = loadImage("assets/smallPool.png");
  song = loadSound('./assets/01_Delivered.mp3');
  // song = new Tone.Player("assets/01_Delivered.mp3").toMaster();
}

function setup() {
  createCanvas(169, 169);
  analyzer = new p5.Amplitude();
  analyzer.setInput(song);
  
}

function mousePressed() {
  if ((mouseX > ((width * .33) + 8) && mouseX < (width * .67) && mouseY > (height * .33) && mouseY < (height * .67)) && song.isPlaying()) {
    song.pause();
    songPlaying = false;
  } else {
    song.play();
    songPlaying = true;
  };
}

function draw() {
  background(bg);
  var rms = analyzer.getLevel();
  strokeWeight(4);
  noFill();
  triangle((width * .33) + 8, height * .33, (width * .67) + 8, height / 2, (width * .33) + 8, height * .67);
}
