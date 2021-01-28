class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",man);
    car2 = createSprite(300,200);
    car2.addImage("car2",man);
    car3 = createSprite(500,200);
    car3.addImage("car3",man);
    car4 = createSprite(700,200);
    car4.addImage("car4",man);
    car1.scale = 0.5
    car2.scale = 0.5
    car3.scale = 0.5
    car4.scale = 0.5
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getCarsAtEnd(); //get Cars At End
    
    if(allPlayers !== undefined){
      background(rgb(1,135,0));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        x = displayWidth - allPlayers[plr].side; //y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
       // console.log(index, player.index)

       
        if (index === player.index){
          
          cars[index - 1].shapeColor = "red";
          camera.position.x = cars[index-1].x;
          camera.position.y = cars[index-1].y;
          //translate(mouseX,mouseY)
          rotate(mouseX)
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10 
      player.update();
      
    }
    if(keyIsDown(DOWN_ARROW) && player.index !== null){
      player.distance -=10 
      player.update();
    }
    if(keyIsDown(LEFT_ARROW) && player.index !== null){
      player.side +=10 
      player.update();
    }
    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.side -=10 
      player.update();
    }
    
   
    drawSprites();
  }

}
