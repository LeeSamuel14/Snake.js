var SnakeGame = SnakeGame || {};
SnakeGame.GameState = {
    init: function(difficulty) {
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL ;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.speed = 100;
        switch(difficulty){
            case 'Easy':
                this.speed = 200;
                break;
            case 'Medium':
                this.speed = 100;
                break;
            case 'Hard':
                this.speed = 50;
                break;
        }
    },
    preload: function(){
        this.load.image('arrow', 'ship-wreck/assets/images/white-arrow.png');
    }, 
    create: function() { 
        this.initSnake();
        this.initControls();
        this.initMobileControls();
        this.currentMovingPosition = 'right';
    },
    update: function(){
    },
    initSnake: function(){
        SnakeGame.Snake.snakeObject = new SnakeGame.Snake(this.game, this.speed);
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
    initMobileControls: function(){
        //this.arrow_up = this.game.add.sprite(this.game.width/2,  this.game.height - 100, 'arrow');
        this.arrow_up = this.game.add.button(this.game.width/2, this.game.height - 100, 'arrow');
        this.arrow_up.anchor.setTo(0.5);
        this.arrow_up.angle = -90;
        
        this.arrow_up.events.onInputDown.add(function(){
            this.keyPress('up');
          }, this);
      
        this.arrow_up.events.onInputUp.add(function(){
        this.keyPress('up');
        }, this);
    
        this.arrow_up.events.onInputOver.add(function(){
        this.keyPress('up');
        }, this);
    
        this.arrow_up.events.onInputOut.add(function(){
        this.keyPress('up');
        }, this);

        this.arrow_down = this.game.add.button(this.game.width/2-5,  this.game.height - 30, 'arrow');
        this.arrow_down.anchor.setTo(0.5);
        this.arrow_down.angle = 90;

        this.arrow_down.events.onInputDown.add(function(){
            this.keyPress('down');
          }, this);
        
        this.arrow_down.events.onInputUp.add(function(){
        this.keyPress('down');
        }, this);
        
        this.arrow_down.events.onInputOver.add(function(){
        this.keyPress('down');
        }, this);
        
        this.arrow_down.events.onInputOut.add(function(){
        this.keyPress('down');
        }, this);

        this.arrow_right = this.game.add.button(this.game.width - 90,  this.game.height - 60, 'arrow');
        this.arrow_right.anchor.setTo(0.5);

        this.arrow_right.events.onInputDown.add(function(){
            this.keyPress('right');
          }, this);
        
        this.arrow_right.events.onInputUp.add(function(){
        this.keyPress('right');
        }, this);
        
        this.arrow_right.events.onInputOver.add(function(){
        this.keyPress('right');
        }, this);
        
        this.arrow_right.events.onInputOut.add(function(){
        this.keyPress('right');
        }, this);

        this.arrow_left = this.game.add.button(90,  this.game.height - 60 - 5, 'arrow');
        this.arrow_left.anchor.setTo(0.5);
        this.arrow_left.angle = 180;

        this.arrow_left.events.onInputDown.add(function(){
            this.keyPress('left');
          }, this);
        
        this.arrow_left.events.onInputUp.add(function(){
        this.keyPress('left');
        }, this);
        
        this.arrow_left.events.onInputOver.add(function(){
        this.keyPress('left');
        }, this);
        
        this.arrow_left.events.onInputOut.add(function(){
        this.keyPress('left');
        }, this);
    },
    keyPress: function(position){
        var canTurn = true;
        if(position === 'left' && this.currentMovingPosition === 'right'){
            canTurn = false;
        }
        if(position === 'right' && this.currentMovingPosition === 'left'){
            canTurn = false;
        }
        if(position === 'up' && this.currentMovingPosition === 'down'){
            canTurn = false;
        }
        if(position === 'down' && this.currentMovingPosition === 'up'){
            canTurn = false;
        }
        if(canTurn){
            this.currentMovingPosition = position;
        }
        
    },
    resize: function(){
        console.log('reszing');
    }
};

