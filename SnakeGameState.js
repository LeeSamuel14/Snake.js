var SnakeGame = SnakeGame || {};
SnakeGame.GameState = {
    init: function() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        console.log(SnakeGame);
    },
    create: function() { 
        this.init();
        this.initControls();
        this.currentMovingPosition = 'right';
    },
    update: function(){
        
    },
    init: function(){
        SnakeGame.Snake.snakeObject = new SnakeGame.Snake(this.game);
    },
    initControls: function(){
        this.inputCursorKeys = this.game.input.keyboard.createCursorKeys(); 
        this.inputCursorKeys.up.onUp.add( function(){
            this.keyPress('up');
        },  this);
        this.inputCursorKeys.down.onUp.add( function(){
            this.keyPress('down');
        },  this);
        this.inputCursorKeys.right.onUp.add( function(){
            this.keyPress('right');
        },  this);
        this.inputCursorKeys.left.onUp.add( function(){
            this.keyPress('left');
        },  this);
    },
    keyPress: function(position){
        this.currentMovingPosition = position;
    }
};

