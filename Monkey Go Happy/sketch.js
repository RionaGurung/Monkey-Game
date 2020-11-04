var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkey0,mon;

var ground;

var banana,banana0, bananaGroup;

var obstacle,obstacle0, obstacleGroup;

var score = 0;

var highScore = 0;

//to loadd images
function preload(){
  
  monkey0 = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  mon = loadImage("sprite_0.png");
  
  banana0 = loadImage("banana.png");
  
  obstacle0 = loadImage("obstacle.png");
  
}

function setup(){
  
  createCanvas(400,200);
  
  //to create monkey sprite
  monkey = createSprite(30,160,10,10);
  //to add animation
  monkey.addAnimation('monkey',monkey0);
  //size
  monkey.scale = 0.06;
  
  //to create ground sprite
  ground = createSprite(200,180,400,5);
  //speed of ground on X axis
  ground.velocityX = -2;
  
  //to create new groups
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
}

function draw(){
  
  //to make background white
  background("white");
  
  //colour of text
  fill("black");
  //style of text
  textFont("timesnewroman");
  //size of text
  textSize(12);
  //text displayed
  text("Score:"+score,260,20);
  text("High Score:"+highScore,100,20);
   
  //if gamestate is play
  if(gameState === PLAY){
    
    //to make infite ground
    groundd();
    
    //score by distance
    score = score + Math.round(getFrameRate()/60);
    
    //high score
    HI();
    
    //to jump
    jump();
    
    //to spawn bananas
    spawnBanana();
  
    //to spawn obstacles
    spawnObstacle();
    
    //if obstacle is touching monkey
    if(obstacleGroup.isTouching(monkey)){
    
      gameState = END;
      
     }
    
   }
  
    else if(gameState === END){
      
      //colour of text
      fill("black");
      //text style
      textFont("timesnewroman");
      //text size
      textSize(12);  
      //text displayed
      text("Game Over",170,80);
      text("Press R To Restart",155,120);
      
      //velocities of sprites
      ground.velocityX = 0;
      monkey.velocityX = 0;

      //to set velocity 
      bananaGroup.setVelocityXEach(0);
      obstacleGroup.setVelocityXEach(0);

      //to set lifetime
      bananaGroup.setLifetimeEach(-1);
      obstacleGroup.setLifetimeEach(-1);

      //to restart
      restart(); 
      
    }
  
  //to make monkey collide with ground
  monkey.collide(ground);
  
  //to create sprites
  drawSprites();
  
}

//custom function
function groundd(){
  
  if(ground.x > 100){
    
    ground.x = ground.width/2
    
  }
  
}

//custom function
function spawnBanana(){
  
  if(frameCount%80 === 0 ){
    
    banana = createSprite(400,200,10,10);
    banana.addImage('banana',banana0);
    banana.velocityX = -2;
    banana.scale = 0.05;
    banana.y = Math.round(random(40,160));
    banana.lifetime = 300;
    
    bananaGroup.add(banana);
    
  }
  
}

//custom function
function spawnObstacle(){
  
  if(frameCount%300 === 0){
    
    obstacle = createSprite(400,170,10,10);
    obstacle.addImage('rock',obstacle0);
    obstacle.velocityX = -2;
    obstacle.scale = 0.05;
    obstacle.lifetime = 300;
    
    obstacleGroup.add(obstacle);
    
  }
  
}

//custom function
function jump(){
  
  if(keyDown("space") && monkey.y>80){
    
    monkey.velocityY = -8;
    
  }
  
  monkey.velocityY = monkey.velocityY+0.7;
  
}

//custom function
function HI(){
  
  if(highScore<score){
    
    highScore=score;
  } 
  
}
 
//custom function
function restart(){
  
   if(gameState === END && keyDown("r")){
    
         gameState = PLAY;
         
         bananaGroup.destroyEach();
         obstacleGroup.destroyEach();
        
         score = 0;
        
      }
  
}  
  
  



