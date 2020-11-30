var trex, trexCollided, ground, invground, rand, cactus1, cactusGroup, cloudGroup, gameOver, restart;
var highScore=0;
var gameState=1;
var score=0;
var PLAY=1;
var END=0;
var cloudImage, cactusImage1, cactusImage2, cactusImage3, cactusImage4, cactusImage5, cactusImage6, groundImage, trexImage, gameOverImage, restartImage, checkPointSound, dieSound, jumpSound;

function preload(){
  trexImage=loadAnimation('trex1.png','trex3.png','trex4.png');
  trexCollided=loadImage('trex_collided.png');
  groundImage=loadImage('ground2.png');
  cloudImage=loadImage('cloud.png');
  cactusImage1=loadImage('obstacle1.png');
  cactusImage2=loadImage('obstacle2.png');
  cactusImage3=loadImage('obstacle3.png');
  cactusImage4=loadImage('obstacle4.png');
  cactusImage5=loadImage('obstacle5.png');
  cactusImage6=loadImage('obstacle6.png');
  gameOverImage=loadImage('gameOver.png');
  restartImage=loadImage('restart.png');
  checkPointSound=loadSound('checkPoint.mp3')
  dieSound=loadSound('die.mp3');
  jumpSound=loadSound('jump.mp3');
 }
function setup(){
  createCanvas(800,400);
  trex = createSprite(200,340);
  trex.addAnimation('running',trexImage)
  trex.addAnimation('trexcollided', trexCollided)
  trex.scale=0.7
  ground = createSprite(200,380,400,20);
  ground.addImage("ground2",groundImage);
  ground.x = ground.width /2;
  invground = createSprite(200,400,400,20);
  invground.visible=false;
  cactusGroup=new Group();
  cloudGroup=new Group();
  gameOver = createSprite(200,200,20,20);
  gameOver.addImage("gameOver",gameOverImage);
  gameOver.visible=false;
  gameOver.scale=0.6;
  restart = createSprite(200,250,20,20);
  restart.addImage("restart", restartImage);
  restart.visible=false;
  restart.scale=0.5;
}
function draw(){
  background(160);
  ground.depth=trex.depth-1
  trex.collide(invground)


  fill("white");
  textSize(15); 
  text("score: "+score,310,30);
  if(score%100===0 && score>0){
    checkPointSound.play();
  }

  if (gameState===1){
    if(highScore===0){
      fill(165);
    }
    text("HI:"+highScore,220,30);
      ground.velocityX=-4
    if(World.frameCount%10===0)
    {
      score++;
    }
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if(keyDown("space") && Math.floor(trex.y)===362){
       trex.velocityY = -12 ;  
        //add gravity
      jumpSound.play(); 
    }

    trex.velocityY = trex.velocityY + 0.7;
    spawnClouds();
    spawnCactus();
  }
  if(gameState===0){
    trex.velocityY=0; 
    ground.velocityX=0;
    cactusGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    cactusGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    gameOver.visible=true;
    restart.visible=true;
    trex.changeAnimation('trexcollided',trexCollided);
    
    if(highScore<score){
      highScore=score;
    }
      fill("white");
      text("HI:"+highScore,220,30);
    dieSound.play();
  }
  trex.setCollider("circle",0,0,40)
  if(trex.isTouching(cactusGroup) && gameState===1)
  {
    gameState=0;
    
  }
  if(mousePressedOver(restart) && gameState===0)
  {
    gameState=1;
    gameOver.visible=false;
    restart.visible=false;
    cactusGroup.destroyEach();
    cloudGroup.destroyEach();
    trex.changeAnimation('running',trexImage)
    score=0;
    cactusGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
  }
  
  drawSprites();
  
}
function spawnClouds(){

  if(World.frameCount%100===0)
  {
  cloud=createSprite(800,200,10,10);
  cloud.addImage("cloud",cloudImage);
  rand=random(100,300);
  cloud.velocityX=-3;
  cloud.y=rand;
  //console.log(cloud.depth);
  trex.depth=cloud.depth+1;
  cloud.lifetime=270;
  cloudGroup.add(cloud);
  }

}
function spawnCactus(){
  if(World.frameCount%75===0)
  {
    cactus1=createSprite(800,370);
    var rand1=Math.round(random(1,6));
    //console.log(rand1);
    cactus1.velocityX=-(4+World.frameCount/100);
    //cactus1.addImage("obstacle"+rand1); 
    switch(rand1){
      case 1:cactus1.addImage("obstacle1",cactusImage1);
        break;
      case 2:cactus1.addImage("obstacle2",cactusImage2);
        break;
      case 3:cactus1.addImage("obstacle3",cactusImage3);
        break;
      case 4:cactus1.addImage("obstacle4",cactusImage4);
        break;
      case 5:cactus1.addImage("obstacle5",cactusImage5);
        break;
      case 6:cactus1.addImage("obstacle6",cactusImage6);
        break;
    }
    cactus1.scale=0.5;
    cactus1.lifetime=150;
    cactusGroup.add(cactus1);
    
  }
}