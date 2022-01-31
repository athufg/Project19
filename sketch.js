var racingCar,racingCarImg;
var gameOver,gameOverImg;
var backGround,backGroundImg;
var barricades,barricadesImg,barricadesGroup
var invisibleWall;
var gameState = "play"
var cube;

function preload() {
  racingCarImg = loadImage("download (2).png");
  backGroundImg = loadImage("download (4).png")
  barricadesImg = loadImage("download (3).png")
  gameOverImg = loadImage("background.jpg");
  racingBackMusic = loadSound("ThemeSong.mp3");
}


function setup() {
  createCanvas(windowWidth,windowHeight);
  
  
    racingBackMusic.loop();
  
    
  
    backGround = createSprite(300,300);
    backGround.addImage("backGround",backGroundImg)
    backGround.scale = 5;
    backGround.velocityX = -1;
  
   racingCar = createSprite(150,470,50,50);
   racingCar.addImage("racingCar", racingCarImg);
   racingCar.scale = 0.3;
  
   invisibleWall = createSprite(200,05,2000,50);
   invisibleWall.visible = false;
   invisibleWall.debug = true;
   
   barricadesGroup = new Group(); 
   
   gameOver = createSprite(300,300);
   gameOver.addImage("gameOver", gameOverImg)
   gameOver.scale = 1.2;
  gameOver.visible = false;
  
}
  

function draw() {
  background(0);
  
  if (gameState === "play") {
      
  
    
     racingCar.bounceOff(invisibleWall);

    
   
    if (backGround.x < 0){ 
      backGround.x = backGround.width/2;
    }
  
  racingCar.x = World.mouseX;
  racingCar.y = World.mouseY;
  
  if(barricadesGroup.isTouching(racingCar)){
    racingCar.destroy();
    gameState = "end";
}
  }
  
  if (gameState === "end"){
    gameOver.visible = true; 
    
    
  }
  
  spawnObstacles();
  
  drawSprites();
}

function spawnObstacles() {
  
  if(frameCount % 240 === 0){
    var barricades = createSprite(200,-50);
    barricades.addImage("barricades",barricadesImg)
    
    barricades.scale = 0.7;
    
    barricades.y =  Math.round(random(0,400));
    barricades.velocityX = -1;
    
    barricades.x =  Math.round(random(400,600));
    barricades.velocityX = -1;
    
    barricades.lifetime = 800;
    
    barricades.setCollider('rectangle',0,0,35,35)
    
    barricades.debug = true;
    
    barricadesGroup.add(barricades);
    
    if(gameState === "end"){
      barricades.destroy;
    }
  }
} 