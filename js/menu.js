(function() {
    'use strict';

    function Menu() {
        this.titleTxt = null;
        this.startTxt = null;
        this.starfield = null;
        this.starfield2 = null;
        this.player;
        this.delay = 3000;
    }

    Menu.prototype = {

        create: function() {
            //console.log(this.game.time.now);
            this.player = new Worm1(this.game);
            this.select = this.game.add.audio('select');

            var x = this.game.width / 2,
                y = this.game.height / 2;

            this.delay = this.game.time.now + 1000;

            this.starfield2 = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'background1');
            this.starfield2.fixedToCamera = true;
            this.starfield = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'background');
            this.starfield.fixedToCamera = true;
            var tween2 = this.game.add.tween(this.starfield2);
            tween2.to({
                alpha: 0
            }, 15000, Phaser.Easing.Linear.Out, true, 0, 10000000000, true);
            var tween1 = this.game.add.tween(this.starfield);
            tween1.to({
                alpha: 0
            }, 4000, Phaser.Easing.Linear.Out, true, 0, 10000000000, true);

            this.titleTxt = this.add.bitmapText(x, y - 180, 'minecraftia', 'WRIGGLE WORM', 50);
            this.titleTxt.align = 'center';
            this.titleTxt.x = this.game.width / 2 - this.titleTxt.textWidth / 2;

            if (this.getHighscore() == null) {
                this.titleTxt1 = this.add.bitmapText(x, y, 'minecraftia', '0', 50);
            } else {
                this.titleTxt1 = this.add.bitmapText(x, y, 'minecraftia', this.getHighscore().toString(), 50);
            }

            this.titleTxt1.align = 'center';
            this.titleTxt1.x = this.game.width / 2 - this.titleTxt1.textWidth / 2;

            this.titleTxt2 = this.add.bitmapText(x, y - 40, 'minecraftia', 'HighScore', 30);
            this.titleTxt2.align = 'center';
            this.titleTxt2.x = this.game.width / 2 - this.titleTxt2.textWidth / 2;

            //INPUT
            this.input.onDown.add(this.onDown, this);
            this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
            this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

            this.player.create();

            this.game.add.sprite(this.game.width / 2, 420, 'instructions').anchor.setTo(0.5, 0.5);

        },

        getHighscore: function() {
            return localStorage.getItem("highscoreWW");
        },

        update: function() {
            if (this.game.time.now > this.delay) {
                if (this.upKey.isDown || this.downKey.isDown || this.leftKey.isDown || this.rightKey.isDown) {
                    this.onDown();
                }
            }
            this.player.update();

        },
        render: function() {
            //this.game.debug.spriteInfo(this.player.sprite, 32, 32);
        },

        onDown: function() {
            this.game.state.start('game');
            this.select.play();
        }
    };

    window['ld29'] = window['ld29'] || {};
    window['ld29'].Menu = Menu;

}());