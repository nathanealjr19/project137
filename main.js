status = "";
objects = [];

function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(380, 380);
  video.hide();
}

function start() {
  objectDetector = ml5.objectDetector("cocossd", modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
  object_name = document.getElementById("name_of_objects").value;
}

function modelLoaded() {
  console.log("model Loaded!");
  status = true;
}

function gotResults(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}

function draw() {
  image(video, 0, 0,380,380)
  if (status != "") {
    objectDetector.detect(video, gotResults);
  
  for (i = 0; i < objects.length; i++) {
    document.getElementById("status").innerHTML = "Object Detected"
    fill("#ff0000")
    percent = floor(objects[i].confidence * 100);
    text(
      objects[i].label + " " + percent + "%",
      objects[i].x + 15,
      objects[i].x + 15
    );
    noFill();
    stroke("FF0000");
    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    if(objects[i].label == object_name){
      video.stop()
      objectDetector.detect(gotResults)
      document.getElementById("status_objects").innerHTML = object_name + "Found"
      synth = window.speechSynthesis
      utterThis = new SpeechSynthesisUtterance(object_name + "Found")
      syth.speak(utterThis)
    }
    else{
      document.getElementById("status_objects").innerHTML = object_name + "Not Found"
    }
  }
}
}
