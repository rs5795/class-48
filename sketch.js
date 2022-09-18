var bg, bgImg
var carmen,carmenImg
var ground
var obstacle, obstacleImg,obstacleImg2
var reward,rewardImg
var rand
var obstacleG,rewardsG
var gameState="play"
var bgImg2, carmenStillImg
function preload(){
  bgImg = loadAnimation("giphy.gif")
  carmenImg=loadAnimation("carmen.gif")
  obstacleImg=loadAnimation("fireball2.gif")
  obstacleImg2=loadAnimation("obstacle1.gif")
  rewardImg=loadAnimation("diamond.gif")
  bgImg2=loadAnimation("background.png")
  carmenStillImg=loadAnimation("carmen1.png")

}
function setup(){
  createCanvas(900,400) 
  bg = createSprite(450,200,900,400)
  bg.addAnimation("moving",bgImg)
  bg.addAnimation("still",bgImg2)
  bg.scale=1.9
  
  carmen=createSprite(90,220,20,20)
  carmen.addAnimation("running",carmenImg)
  carmen.addAnimation("notrunning",carmenStillImg)
  carmen.scale=0.5

  ground=createSprite(450,380,900,10)
  ground.visible=false

  obstacleG=createGroup()
  rewardsG=createGroup()
}
function draw(){ 
 background("blue") 
 
 if(gameState==="play"){
  if(keyDown("up")){
    carmen.velocityY=-10
  }
  carmen.velocityY=carmen.velocityY+0.8
  spawnObstacles()
  spawnRewards()

  if(obstacleG.isTouching(carmen)){
    gameState="end"
  }
 }
 else if(gameState==="end"){
  carmen.velocityY=0
  obstacleG.setVelocityXEach(0)
  rewardsG.setVelocityXEach(0)
  carmen.changeAnimation("notrunning")
  bg.changeAnimation("still")
 }


 carmen.collide(ground)
 
 
 drawSprites()
 fill("black")
 text("X"+mouseX+","+"Y"+mouseY,mouseX,mouseY);
  }
 //4/2
  function spawnObstacles(){
    if(frameCount%370===0){
    obstacle=createSprite(870,300,20,20)
    obstacle.velocityX=-2
    rand=Math.round(random(1,2))
    if(rand===1){
      obstacle.addAnimation("jumping",obstacleImg)
      obstacle.scale=0.5
    }
    else{
      obstacle.addAnimation('throwing',obstacleImg2)
    }
    
    obstacle.lifetime=500

    obstacleG.add(obstacle)
    
  
    }
  }

  function spawnRewards(){
    if(frameCount%550===0){
    reward=createSprite(870,200,20,20)
    reward.y=Math.round(random(160,220))
    reward.velocityX=-2
    reward.addAnimation("rewarding",rewardImg)
    reward.scale=0.2
    reward.lifetime=500

    rewardsG.add(reward)

    }
  }

