var towerImg, tower;
var doorImg, doors, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost = createSprite(200,200,50,50)
  ghost.scale = 0.3
  ghost.addImage("ghost", ghostImg)
  doorsGroup = new Group()
  climbersGroup = new Group()
  invisibleBlockGroup = new Group()
}

function draw() {
  background(200);
  if (gameState === "play")
  {
  if(tower.y > 400){
      tower.y = 300
    }
  if(keyDown("left_arrow"))
  {
    ghost.x = ghost.x -3
  }
  if(keyDown("right_arrow"))
  {
    ghost.x = ghost.x +3
  }
  if(keyDown("space"))
  {
   ghost.velocityY = -5
  }
  ghost.velocityY = ghost.velocityY +0.8
  if (climbersGroup.isTouching(ghost))
  {
    ghost.velocityY = 0
  }
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600)
  {
    ghost.destroy()
    gameState = "END"
  }


  spawnDoors()
  drawSprites()
  }
if (gameState === "END")
  {
    stroke("black")
    fill("yellow")
    textSize(40)
    text("GAME OVER", 230, 250)
  }
}

function spawnDoors()
{
if (frameCount % 240 === 0)
  {
    var doors = createSprite(200,-50)
    var climber = createSprite(200, 10)
    var invisibleBlock = createSprite(200, 15)
    invisibleBlock.width = climber.width
    invisibleBlock.height = 2

    doors.x = Math.round(random(120, 400))
    climber.x = doors.x
    invisibleBlock.x = doors.x
    
    invisibleBlock.velocityY = 1;
    doors.velocityY = 1;
    climber.velocityY = 1;

   ghost.depth = doors.depth
    ghost.depth +=1

    invisibleBlock.lifetime = 800
    climber.lifetime = 800
    doors.lifetime = 800

    climber.addImage(climberImg)
    doors.addImage(doorImg)

    doorsGroup.add(doors)
    climbersGroup.add(climber)
    invisibleBlockGroup.add(invisibleBlock)
   
  }


}