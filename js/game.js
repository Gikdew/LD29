(function() {
    'use strict';

    function Game() {
        this.player = null;
        this.enemie = null;
        this.points = [];
        this.numOfPoints = 100;
        this.actualPoint;
        this.changePoint = 0;
        this.enemies = [];
        this.numOfEnemies = 13;

        this.starfield;
        this.starfield2;
        this.scoreText = null;
        this.timer;
        this.timer1;
        this.delay = 1500;
    }

    Game.prototype = {

        create: function() {
            this.restart();
            this.player = new Worm(this.game);
            this.score = 0;
            this.enemie = new Enemie(this.game);
            this.game.world.setBounds(-20, -20, 440, 540);
            this.starfield2 = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'background1');
            this.starfield2.fixedToCamera = true;
            this.starfield = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'background');
            this.starfield.fixedToCamera = true;
            this.delay = this.game.time.now + 1000;
            //SOUNDS
            this.hit = this.game.add.audio('hit');

            this.lifeBar = this.game.add.sprite(10, 10, 'lifebar');
            this.lifeBar.width = 400 - 20;
            var tween2 = this.game.add.tween(this.starfield2);
            tween2.to({
                alpha: 0
            }, 15000, Phaser.Easing.Linear.Out, true, 0, 10000000000, true);
            var tween1 = this.game.add.tween(this.starfield);
            tween1.to({
                alpha: 0
            }, 4000, Phaser.Easing.Linear.Out, true, 0, 10000000000, true);

            this.player.create();
            this.cursors = this.game.input.keyboard.createCursorKeys();
            this.game.time.advancedTiming = true;
            this.game.stage.backgroundColor = "#B8D0DE";

            for (var i = 0; i < this.numOfPoints; i++) {
                this.points[i] = new Phaser.Point(Math.random() * 20 + this.game.world.width, i * 10);
            }

            this.numOfEnemies = 13;
            for (var i = 0; i < this.numOfEnemies; i++) {
                this.enemies[i] = new Enemie(this.game);
                //console.log(this.points[i])
                this.enemies[i].create(this.points[Math.floor(Math.random() * this.numOfPoints)], Math.random() + 0.5);

            }
            this.starfield3 = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'flash');
            this.starfield3.fixedToCamera = true;
            this.starfield3.alpha = 0;

            this.timer = this.game.time.events;
            this.timer.start();
            this.timer.loop(100, this.socreTimer, this);

            this.timer1 = this.game.time.events;
            this.timer1.start();
            this.timer1.loop(7000, this.enemieTimer, this);

            this.scoreText = this.add.bitmapText(this.game.width / 2, 30, 'minecraftia', this.score.toString(),
                50);
            this.scoreText.align = 'center';
            this.scoreText.x = this.game.width / 2 - this.scoreText.textWidth / 2;

            this.lifeBar.alpha = 0;
            this.game.add.tween(this.lifeBar).to({
                alpha: 1
            }, this.TWEEN_START, Phaser.Easing.Linear.Out, true, 0, 0, true);

            this.scoreText.alpha = 0;
            this.game.add.tween(this.scoreText).to({
                alpha: 1
            }, this.TWEEN_START, Phaser.Easing.Linear.Out, true, 0, 0, true);

        },
        socreTimer: function() {
            //console.log(this.score);
            this.score += 1;
        },
        enemieTimer: function() {
            this.numOfEnemies++;
            this.enemies[this.numOfEnemies - 1] = new Enemie(this.game);
            this.enemies[this.numOfEnemies - 1].create(this.points[Math.floor(Math.random() * this.numOfPoints)], Math.random() + 0.5);
        },
        update: function() {
            //console.log(this.enemies.length);
            this.starfield3.alpha = 0;

            if (this.player.life >= 0) {
                this.lifeBar.width = this.player.life * 3.80;
                this.scoreText.setText(this.score.toString());

            } else {
                this.lifeBar.width = 0;
                this.player.die();
                this.saveHighScore();
                this.scoreText.setText("");
                for (var i = 0; i < this.numOfEnemies; i++) {
                    this.enemies[i].die();
                    this.enemies[i].tween = false;
                }
                this.player.tween = false;
            }

            if (this.game.time.now > this.changePoint) {
                this.changePoint = this.game.time.now + 10;
                this.actualPoint = this.points[Math.floor(Math.random() * this.numOfPoints)];
                //console.log(this.actualPoint);

            }
            this.player.update(this.cursors);
            //this.enemie.update(this.actualPoint);
            if (this.game.time.now > this.delay) {
                for (var i = 0; i < this.numOfEnemies; i++) {
                    this.enemies[i].update(this.actualPoint);
                    this.game.physics.arcade.collide(this.player.sprite, this.enemies[i].sprite, this.collisionHandler, null, this);
                    for (var j = 0; j < this.player.numSnakeSections; j++) {
                        this.game.physics.arcade.collide(this.player.snakeSection[j], this.enemies[i].sprite, this.collisionHandler,
                            null,
                            this);
                    }

                }
            }

            //COLLIDE WITH WORLD BOUNDS
            if (this.player.sprite.x < -5) {
                this.player.sprite.x = -1;
                this.starfield3.alpha = 1;
                this.player.alienOut();
                this.hit.play();
            }
            if (this.player.sprite.x > this.game.width + 5) {
                this.player.sprite.x = this.game.width + 1;
                this.starfield3.alpha = 1;
                this.player.alienOut();
                this.hit.play();
            }
            if (this.player.sprite.y < -5) {
                this.player.sprite.y = -1;
                this.starfield3.alpha = 1;
                this.player.alienOut();
                this.hit.play();
            }
            if (this.player.sprite.y > this.game.height + 5) {
                this.player.sprite.y = this.game.height + 1;
                this.starfield3.alpha = 1;
                this.player.alienOut();
                this.hit.play();
            }

        },

        onInputDown: function() {

        },
        collisionHandler: function() {
            this.starfield3.alpha = 1;
            this.player.life -= 2;
            this.hit.play();
            //console.log(this.player.life);
        },
        render: function() {
            /*for (var i = 0; i < this.numOfPoints; i++) {
                this.game.context.fillStyle = 'rgb(255,255,0)';
                this.game.context.fillRect(this.points[i].x, this.points[i].y, 4, 4);
            }*/

            //this.game.debug.text(this.time.fps, 32, 32);
            //this.game.debug.spriteInfo(this.player.sprite, 32, 50);
        },
        saveHighScore: function() {
            if (this.score > localStorage.getItem("highscoreWW")) {
                localStorage.setItem("highscoreWW", this.score);
                //console.log("HighScore!" + localStorage.getItem("highscore"));
                return true;
            }

        },
        getHighscore: function() {
            return localStorage.getItem("highscoreWW");
        },
        restart: function() {
            this.player = null;
            this.enemie = null;
            this.points = [];
            this.numOfPoints = 100;
            this.actualPoint;
            this.changePoint = 0;
            this.enemies = [];
            this.numOfEnemies = 13;

            this.starfield;
            this.starfield2;
            this.scoreText = null;
            this.timer;
            this.timer1;
        }

    };

    window['ld29'] = window['ld29'] || {};
    window['ld29'].Game = Game;

}());