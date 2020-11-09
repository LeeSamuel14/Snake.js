var SnakeGame = SnakeGame || {};
this.game = new Phaser.Game(400, 600, Phaser.AUTO);

this.game.state.add('HomeState', SnakeGame.HomeState);
this.game.state.add('GameState', SnakeGame.GameState);

this.game.state.start('HomeState');