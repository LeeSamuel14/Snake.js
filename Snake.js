var SnakeGame = SnakeGame || {};
SnakeGame.Snake = function(game, speed){
    this.game = game;
    this.speed = speed;
    this.init();
};
SnakeGame.Snake.prototype.constructor = SnakeGame.Snake;

SnakeGame.Snake.prototype.update = function(){
        if( this.apple.x === this.snake.body.getChildAt(0).x && 
            this.apple.y === this.snake.body.getChildAt(0).y ){
            this.eatApple();
        }
        if(this.snake.body.getChildAt(0).x < 0 || 
            this.snake.body.getChildAt(0).x > this.game.width/2){
                this.game.state.start('HomeState', true, false, this.scoreText.text);
        }
        if(this.snake.body.getChildAt(0).y < 0 || 
            this.snake.body.getChildAt(0).y > this.game.width/2){
                this.game.state.start('HomeState', true, false, this.scoreText.text);
        }
        for(var i = 2; i < this.snake.body.length; i++){
            if(this.snake.body.getChildAt(0).x === this.snake.body.getChildAt(i).x && 
                this.snake.body.getChildAt(0).y === this.snake.body.getChildAt(i).y ){
                    this.game.state.start('HomeState', true, false, this.scoreText.text);
                }
        }
};

SnakeGame.Snake.prototype.init = function(){
    this.game.stage.backgroundColor = '#000000';
    this.gameTimer = this.game.time.create(false);
    this.snake = {};
    this.snake.bodyPiece_WIDTH = 10;
    this.snake.bodyPiece_LENGTH = 10;
    this.snake.body = this.game.add.group();
    this.snake.head = game.add.graphics(100, 100);
    this.snake.head.name = 'head';
    this.snake.body.add(this.snake.head);
    this.currentMovingPosition = 'right';
    this.game.time.events.loop(this.speed, this.moveSnakeHead ,this);
    this.game.time.events.loop(1, this.update ,this);
    console.log(this.game.time);
    this.applesEaten = 0;
    this.generateApple();
    this.initText();
    this.debugMethod();

};

SnakeGame.Snake.prototype.initText = function(){
    var textStyle = { font: "30px Georgia", fill: "#FFFFFF", align: "center" };
    this.scoreText = this.game.add.text(this.game.width/2, 25, '0', textStyle);
    this.scoreText.anchor.setTo(0.5);
};

SnakeGame.Snake.prototype.moveSnakeHead = function(){
    //console.log(this.apple.x, this.snake.body.getChildAt(0).x);
    var snakeHead = this.snake.body.getChildAt(0);
    switch(SnakeGame.GameState.currentMovingPosition){ 
        case 'up':
            snakeHead.y -= 5;
            break;
        case 'down':
            snakeHead.y += 5;
            break;
        case 'right':
            snakeHead.x += 5;
            break;
        case 'left':
            snakeHead.x -= 5;
            break;
    }
    this.moveSnakeBody();
    //this.gameTimer.add(Phaser.Timer.SECOND * 1 , this.moveSnakeHead, this);
    
};

SnakeGame.Snake.prototype.moveSnakeBody = function(){
    var copyBody = this.snake.body;
    for(var i = this.snake.body.length-1; i >0 ; i--){
        if(this.snake.body.getChildAt(i - 1)){
            var newPiece = this.snake.body.getChildAt(i);
            var oldPiece = copyBody.getChildAt(i - 1);
            newPiece.x = oldPiece.x;
            newPiece.y = oldPiece.y;
            //console.log(newPiece.name);
        }
    }
    this.drawSnake();
};

SnakeGame.Snake.prototype.drawSnake = function(){
    for(var i = 0; i < this.snake.body.length; i++){
        var bodyPiece = this.snake.body.getChildAt(i);
        bodyPiece.clear();
        bodyPiece.beginFill(0xC26DBC);
        bodyPiece.drawRect(bodyPiece.x , bodyPiece.y, this.snake.bodyPiece_WIDTH, this.snake.bodyPiece_LENGTH);
        bodyPiece.endFill();
   }
};

SnakeGame.Snake.prototype.growBody = function(x, y){
    var newBodyPiece = game.add.graphics(x, y);
    newBodyPiece.name = 'body';
    this.snake.body.add(newBodyPiece);
};

SnakeGame.Snake.prototype.generateApple = function(){
    var randomPosition = this.generateXYInWorldBounds();
    this.apple = game.add.graphics(randomPosition.x, randomPosition.y);
    this.apple.beginFill(0x00FF00);
    this.apple.drawRect(this.apple.x, this.apple.y, this.snake.bodyPiece_WIDTH, this.snake.bodyPiece_LENGTH);
    this.apple.endFill();
    console.log(this.apple);
    console.log(this.apple.x);
    console.log(this.apple.y);
    console.log(randomPosition.x);
    console.log(randomPosition.y);
};

SnakeGame.Snake.prototype.generateXYInWorldBounds = function(){
        var x = Math.floor( ( ( (Math.random()*this.game.width/2) ) /10) )*10;
        var y = Math.floor( ( ( (Math.random()*this.game.width/2) ) /10) )*10;
        if(x >= this.game.width/2 || y >= this.game.width/2){
            this.generateXYInWorldBounds();
        }
        //var y = Math.floor( (Math.random()*this.game.height) +1);
        //console.log(x);
        return {x, y};
};

SnakeGame.Snake.prototype.eatApple = function(){
    this.applesEaten++;
    this.scoreText.text = this.applesEaten * 10;
    var lastPiece = this.snake.body.getChildAt(this.snake.body.length-1);// + this.snake.bodyPiece_WIDTH
    this.growBody(lastPiece.x + this.snake.bodyPiece_WIDTH, lastPiece.y + this.snake.bodyPiece_LENGTH);
    //this.growBody(lastPiece.x + this.snake.bodyPiece_WIDTH, lastPiece.y + this.snake.bodyPiece_LENGTH);
    this.apple.clear();
    this.generateApple();
};
SnakeGame.Snake.prototype.debugMethod = function(x, y){
    /* this.testGraphicButton = this.game.add.graphics(this.game.width/2, this.game.height/2);
    this.testGraphicButton.beginFill(0xFFFFFF);
    this.testGraphicButton.drawRect(50, 50, 50, 50);
    this.testGraphicButton.endFill();
    this.testGraphicButton.events.onInputDown.add(function(){
        console.log('graphic button pressed');
      }, this);
    this.testGraphicButton.events.onInputUp.add(function(){
        console.log('graphic button pressed');
      }, this); */
    var positionX = 100;
    var positionY = 100;
    for(var i = 0; i < 5; i++){
      this.growBody(positionX, positionY);
      positionX -= 5;
    };

    for(var i = 0; i < 200; i++){
      //this.generateApple();
    };
};