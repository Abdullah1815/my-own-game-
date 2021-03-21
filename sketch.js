var canvas;
var cars, car1, car2, car3, car4,car5,robber;
var cop , cop_img;
var track, car1_img, car2_img, car3_img, car4_img,car5_img,robber_img;
var coin_img;
var carcrash,coinsound,copsound;
var gameOverImg,gameOver,reset,resetImg;
var PLAY=1;
var END=0;
var gameState=PLAY
var carGroup,coinGroup,copsGroup;
var coinScore = 0;
var SurvivalTime = 0;

function preload()
{
  track_img = loadImage("image/track.jpg");
  car1_img = loadImage("image/car1.png");
  car2_img = loadImage("image/car2.png");
  car3_img = loadImage("image/car3.png");
  car4_img = loadImage("image/car4.png");
  car5_img = loadImage("image/car5.png");
  robber_img = loadImage("image/theft.png");
  coin_img= loadImage("image/coins.png");
  gameOverImg= loadImage("image/gameover.png");
  resetImg= loadImage("image/reset.png");
  cop_img= loadImage("image/cop.png");

  carcrash = loadSound("sound/carcrash.mp3");
  coinsound= loadSound("sound/coinsound.mp3");
  copsound= loadSound("sound/copsound.mp3");
 
}

function setup(){
  canvas = createCanvas(displayWidth-30,displayHeight-20);

  carGroup =new Group();
  coinGroup =new Group();
  copsGroup =new Group();

  track=createSprite(1000,1000,2000,2000);
  track.addImage("track",track_img);

  robber=createSprite(1000,550,50,50);
  robber.addImage("theft",robber_img);

  gameOver = createSprite(displayWidth/2 + 50,displayHeight/7);
  gameOver.addImage("gameOver",gameOverImg);
  gameOver.scale= 0.7;
  gameOver.visible = false;

  reset = createSprite(displayWidth/2 +50,displayHeight/3);
  reset.addImage("reset",resetImg);
  reset.scale= 0.4;
  reset.visible = false;

}


function draw()
{  
  background("lightblue");
  stroke("Black");
  textSize(20);
  text("Coins Collected: "+ coinScore,displayWidth-1600,50);

  text("Survival Time: "+ SurvivalTime,displayWidth-400,50);

if(gameState===PLAY)
{
  track.velocityY = 3;
  SurvivalTime =SurvivalTime + Math.round(frameRate()/60);
  if(track.y > 3000)
  {
    track.y= 1000;
  }

  if(keyDown("LEFT_ARROW"))
  {
    robber.x= robber.x-2;
  }

  if(keyDown("RIGHT_ARROW"))
  {
    robber.x= robber.x+2;
  }

  Spawncars();
  Spawncoins();
  spawnCops();
  if(coinGroup.isTouching(robber))
  {
    coinsound.play();
    coinGroup.destroyEach();
    coinScore = coinScore + 100;

  }
  if(carGroup.isTouching(robber))
  {
    gameState = END;
    carcrash.play();
  }

  if(copsGroup.isTouching(robber))
  {
    copsound.play();
    gameState = END;
    //stroke("Red");
    //textSize(30);
    //text("Robber Got Caught!!!",displayWidth/2,displayHeight/2);
  }


}
else if (gameState === END)
{
  stop();

  gameOver.visible = true;
  reset.visible = true;

  if(mousePressedOver(reset))
  {
    resetgame();
  }

}
  
  drawSprites();
  
}
function Spawncoins()
{
if(frameCount % 250 ===0){
  var randX=random(800,1200);
  var coins = createSprite(randX,100,50,50);
  coins.addImage("coin",coin_img);
  coins.scale=0.2;
  coins.velocityY=2; 
  coins.lifeTime = 400;
  coinGroup.add(coins);
  
}
}
//create function
function Spawncars()
{
  if(frameCount % 200 ===0)
  {
    var randX=random(800,1200);
    var cars = createSprite(randX,100,50,50)
    cars.velocityY=4;
    var randcar =Math.round(random(1,5));
    switch(randcar)
    {
      case 1 : cars.addImage(car1_img);
      break;
      case 2 : cars.addImage(car2_img);
      cars.scale = 0.23;
      break;
      case 3 : cars.addImage(car3_img);
      cars.scale = 0.23;
      break;
      case 4 : cars.addImage(car4_img);
      cars.scale = 0.05;
      break; 
      case 5 : cars.addImage(car5_img);
      break;
      
    }
    cars.lifeTime = 400;
    carGroup.add(cars);
  }
}

function spawnCops()
{
  if(frameCount % 500 ===0)
  {
    var randX=random(800,1200);
    var cops = createSprite(randX,displayHeight-20,50,50);
    copsound.play();
    cops.velocityY=-4;
    cops.addImage("cops",cop_img);
    cops.scale=0.3;
    copsGroup.add(cops);
  }
}

function stop()
{
  track.velocityY = 0;
  carGroup.setVelocityYEach(0);
  coinGroup.setVelocityYEach(0);
  copsGroup.setVelocityYEach(0);

  coinGroup.setLifetimeEach(-1);
  copsGroup.setLifetimeEach(-1);
  carGroup.setLifetimeEach(-1);
}

function resetgame()
{
  gameState = PLAY;
  carGroup.destroyEach();
  coinGroup.destroyEach();
  SurvivalTime = 0;
  coinScore= 0;
  gameOver.visible = false;
  reset.visible = false;
}

