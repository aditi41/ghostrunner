var tower, towerImage;
var ghost, ghostImage;
var door, doorImage, doorGroup;
var climber, climberImage, climberGroup;
var invisibleblockGroup;
var gameState = "play";



function preload(){
  
  towerImage = loadImage("tower.png");
  ghostImage = loadImage("ghost-standing.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  
}

function setup(){
  
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage("tower",towerImage);
  tower.velocityY = 1;
  
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImage);
  ghost.scale = 0.5;
  
  doorGroup = new Group();
  invisibleblockGroup = new Group();
  climberGroup = new Group();
  
}

function draw(){
  
  background (0);

  if(gameState === "play"){
  
  if(keyDown("space")){
    
    ghost.velocityY = -2;
    
  }
  
  if(keyDown("right")){
    
    ghost.x = ghost.x+3;
    
  }
  
  if(keyDown("left")){
    
    ghost.x = ghost.x-3;
    
  }
  
  ghost.velocityY = ghost.velocityY+0.8;
  
  if(tower.y>400){
    
    tower.y = 300;
    
  } 
    
   drawSprites(); 
    
   spawndoors(); 
    
  }
    
  
  
  if(climberGroup.isTouching(ghost)){
    
    ghost.velocityY = 0;
    
  }
  
  if(invisibleblockGroup.isTouching(ghost)||ghost.y>600){
    
    ghost.destroy();
    gameState = "end";
    
  }
  
  
  
  if(gameState === "end"){
    
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("GAME OVER",250,100);
    
  }
  
  
  
  
  
}

function spawndoors(){
  
  if(frameCount %240 === 0){
  
  door = createSprite(200,-50);
  
  climber = createSprite(200,10);
    
  var invisibleblock = createSprite(200,15);
  
  invisibleblock.width =  climber.width;
   
  invisibleblock.height = 2;  
    
  door.x = Math.round(random(120,400));  
    
  climber.x = door.x;
  invisibleblock.x = door.x;
    
  door.addImage(doorImage);  
  climber.addImage(climberImage);  
    
  door.velocityY = 1;  
  climber.velocityY = 1;    
  invisibleblock.velocityY = 1; 
     
  ghost.depth = door.depth;
  ghost.depth = ghost.depth+1; 
    
    
  door.lifetime = 700;
  climber.lifetime = 700;  
  invisibleblock.lifetime = 700;  
    
  invisibleblockGroup.add(invisibleblock);  
  climberGroup.add(climber);
  doorGroup.add(door);
    
  invisibleblock.debug = true;  
  }
  
}



