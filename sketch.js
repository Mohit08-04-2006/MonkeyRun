var END = 0;
var PLAY = 1;
var gameState = PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var survivalTime = 0;
var bananasGroup;
var obstaclesGroup;
var background2, background_img;

function preload(){
  // Adding animation and images
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  background_img = loadImage("backgroundImage0.png");
  
}

function setup() {
  // Creating Canvas
  createCanvas(600,400);
  
  // Creating sprites
  
   background2 = createSprite(0,0,600,400);
   background2.addImage(background_img);
  background2.scale = 2.5;
  background2.velocityX = -6;
  
  ground = createSprite(300,300,600,10);
  ground.shapeColor="green";
  
  monkey = createSprite(40,260,30,40);
 monkey.addAnimation("running",monkey_running);
 monkey.scale = 0.12;
  
  bananasGroup = new Group();
  obstaclesGroup = new Group();
  
  
}

function draw() {
background("skyblue");
  
   if (background2.x < 0){
      background2.x = background2.width;
    }
  
  //Adding score
  textSize(20);
  fill("black");
 text("survivalTime : "+ survivalTime,330,20);
  
  // Adding Game States
  if (gameState == PLAY){
    spawnObstacles();
  spawnBananas();
    
    
    
     if (obstaclesGroup.isTouching(monkey)){
    gameState = END;
  }
    
  }
  else if (gameState == END){
      obstacle.velocityX = 0;
      bananasGroup.setVelocityXEach(0);
      bananasGroup.setLifetimeEach(-1);
      obstaclesGroup.setLifetimeEach(-1);
      background2.velocityX = 0;
    
    if (keyDown("enter")){
      bananasGroup.setLifetimeEach(0);
      obstaclesGroup.setLifetimeEach(0);
       background2.velocityX = -6;
      gameState = PLAY;
      survivalTime = 0;
    }
  }
 
  if (bananasGroup.isTouching(monkey)){
    survivalTime = survivalTime+1;
    bananasGroup.destroyEach();
  }
  
  // Jumping Monkey
  if (keyDown("space") && monkey.collide(ground)){
    monkey.velocityY = -15;
  }
  
   monkey.setCollider("rectangle",0,210,200,100);
  
  // Adding Gravity
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  
  drawSprites();
}

function spawnObstacles(){
  // Creating obstacles
  if (frameCount% 100 == 0){
  obstacle = createSprite(550,260,30,40);
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.2;
  obstacle.velocityX = -6;
  obstacle.lifetime = 90;
  obstaclesGroup.add(obstacle);
  }
}

function spawnBananas(){
  if (frameCount% 40 == 0){
    var r = Math.round(random(80,200));
  // Creating Bananas
  banana = createSprite(550,r,30,40);
  banana.addImage(bananaImage);
  banana.scale = 0.1;
  banana.velocityX = -6;
  banana.lifetime = 90;
  bananasGroup.add(banana);
  }
  
}