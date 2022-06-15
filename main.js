song="";
leftWristX=0;
rightWristX=0;
leftWristY=0;
rightWristY=0;
scoreRightWrist=0;
scoreLeftWrist=0;
function preload(){
    song=loadSound("music.mp3");

}

function setup(){
    canvas= createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on("pose",gotPoses);
}
function modelLoaded(){
    console.log("poseNet is Initialized");
}
function gotPoses(results){
if(results.lenght>0){
    console.log(results);
    scoreLeftWrist=results[0].pose.keypoints[9].score;
    scoreRightWrist=results[0].pose.keypoints[10].score;
    leftWristX=results[0].pose.leftWrist.x;
    rightWristX=results[0].pose.rightWrist.x;
    leftWristY=results[0].pose.leftWrist.y;
    rightWristY=results[0].pose.rightWrist.y;
}
}
function draw(){
    image(video,0,0,600,500);
    if(scoreLeftWrist>0.2){
        circle(leftWristX,leftWristY,20);
        number_left=Number(leftWristY);
        remove_decimals=floor(number_left);
        volume=remove_decimals/500;
    document.getElementById("volume").innerHTML="volume= "+volume;
song.setVolume(volume);
}
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
