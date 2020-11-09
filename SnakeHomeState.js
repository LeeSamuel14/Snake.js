var SnakeGame = SnakeGame || {};

SnakeGame.HomeState = {
    init: function(score){
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL ;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.score = score ? score : '0';
    },
    preload: function(){
        this.load.image('button', 'ship-wreck/assets/images/button-black.png');
    },
    create: function(){
        this.game.stage.backgroundColor = '#FFFFFF';
        this.button_Easy = this.game.add.button(this.game.width/2, this.game.height/4, 'button');
        this.button_Easy.anchor.setTo(0.5);
        var textStyle = { font: "25px Georgia", fill: "#000000", align: "center" };
        var textStyleSnake = { font: "40px Georgia", fill: "#000000", align: "center" };
        this.text_Snake = this.game.add.text(this.game.width/2, 60, 'SNAKE', textStyleSnake);
        this.text_Snake.anchor.setTo(0.5);

        this.text_Score = this.game.add.text(this.game.width/2, this.game.height - 30, 'HIGH SCORE: '+ this.score, textStyle);
        this.text_Score.anchor.setTo(0.5);

        this.text_Easy = this.game.add.text(this.game.width/2, this.game.height/4 +10, 'EASY', textStyle);
        this.text_Easy.anchor.setTo(0.5);
        this.button_Medium = this.game.add.button(this.game.width/2, this.game.height/2, 'button');
        this.button_Medium.anchor.setTo(0.5);
        this.text_Medium = this.game.add.text(this.game.width/2, this.game.height/2+10, 'MEDIUM', textStyle);
        this.text_Medium.anchor.setTo(0.5);
        this.button_Hard = this.game.add.button(this.game.width/2, this.game.height - this.game.height/4, 'button');
        this.button_Hard.anchor.setTo(0.5);
        this.text_Medium = this.game.add.text(this.game.width/2, this.game.height - this.game.height/4 + 10, 'HARD', textStyle);
        this.text_Medium.anchor.setTo(0.5);
        this.button_Easy.events.onInputDown.add(function(){
            this.startGame('Easy');
          }, this);
      
        this.button_Easy.events.onInputUp.add(function(){
            this.startGame('Easy');
        }, this);
    
        this.button_Easy.events.onInputOver.add(function(){
            this.startGame('Easy');
        }, this);
    
        this.button_Easy.events.onInputOut.add(function(){
            this.startGame('Easy');
        }, this);
        this.button_Medium.events.onInputDown.add(function(){
            this.startGame('Medium');
          }, this);
        
        this.button_Medium.events.onInputUp.add(function(){
            this.startGame('Medium');
        }, this);
        
        this.button_Medium.events.onInputOver.add(function(){
            this.startGame('Medium');
        }, this);
        
        this.button_Medium.events.onInputOut.add(function(){
            this.startGame('Medium');
        }, this);
        this.button_Hard.events.onInputDown.add(function(){
            this.startGame('Hard');
          }, this);
        
        this.button_Hard.events.onInputUp.add(function(){
            this.startGame('Hard');
        }, this);
        
        this.button_Hard.events.onInputOver.add(function(){
            this.startGame('Hard');
        }, this);
        
        this.button_Hard.events.onInputOut.add(function(){
            this.startGame('Hard');
        }, this);
    },
    startGame: function(difficulty){
            this.state.start('GameState', true, false, difficulty);
        
    }
};