var SnakeGame = SnakeGame || {};
SnakeGame.Snake = function(game){
    this.game = game;
    this.init();
};
SnakeGame.Snake.prototype.constructor = SnakeGame.Snake;

SnakeGame.Snake.prototype.init = function(){
    this.gameTimer = this.game.time.create(false);
    this.snake = {};
    this.snake.bodyPiece_WIDTH = 10;
    this.snake.bodyPiece_LENGTH = 10;
    this.snake.body = this.game.add.group();
    this.snake.head = game.add.graphics(100, 100);
    this.snake.head.name = 'head';
    this.snake.body.add(this.snake.head);
    this.currentMovingPosition = 'right';
    this.game.time.events.loop(150, this.moveSnakeHead ,this);
    this.debugMethod();

};

SnakeGame.Snake.prototype.moveSnakeHead = function(){
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
        }
    }
    this.drawSnake();
};

SnakeGame.Snake.prototype.drawSnake = function(){
    for(var i = 0; i < this.snake.body.length; i++){
        var bodyPiece = this.snake.body.getChildAt(i);
        bodyPiece.clear();
        bodyPiece.beginFill(0xFFFFFF);
        bodyPiece.drawRect(bodyPiece.x , bodyPiece.y, this.snake.bodyPiece_WIDTH, this.snake.bodyPiece_LENGTH);
        bodyPiece.endFill();
   }
};

SnakeGame.Snake.prototype.growBody = function(x, y){
    var newBodyPiece = game.add.graphics(x, y);
    newBodyPiece.name = 'body';
    this.snake.body.add(newBodyPiece);
};

SnakeGame.Snake.prototype.debugMethod = function(x, y){
    var positionX = 100;
    var positionY = 100;
    for(var i = 0; i < 20; i++){
      this.growBody(positionX, positionY);
      positionX -= 5;
    };
};