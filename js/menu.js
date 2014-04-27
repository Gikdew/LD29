(function() {
    'use strict';

    function Menu() {
        this.titleTxt = null;
        this.startTxt = null;
        this.starfield = null;
        this.starfield2 = null;
        this.player;
    }

    Menu.prototype = {

        create: function() {
            this.player = new Worm1(this.game);

            var x = this.game.width / 2,
                y = this.game.height / 2;

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

            this.titleTxt = this.add.bitmapText(x, y - 180, 'minecraftia', 'Watter Worms');
            this.titleTxt.align = 'center';
            this.titleTxt.x = this.game.width / 2 - this.titleTxt.textWidth / 2;

            this.input.onDown.add(this.onDown, this);
            this.player.create();

        },

        update: function() {

            this.player.update();

        },
        render: function() {
            //this.game.debug.spriteInfo(this.player.sprite, 32, 32);
        },

        onDown: function() {
            this.game.state.start('game');
        }
    };

    window['ld29'] = window['ld29'] || {};
    window['ld29'].Menu = Menu;

}());