(function() {
    'use strict';

    function Preloader() {
        this.asset = null;
        this.ready = false;
    }

    Preloader.prototype = {

        preload: function() {
            this.asset = this.add.sprite(0, this.game.height / 2, 'preloader');
            this.asset.anchor.setTo(0.5, 0.5);
            this.game.stage.backgroundColor = "#267498";

            this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
            this.load.setPreloadSprite(this.asset);
            this.load.image('player', 'assets/player.png');

            this.game.load.audio('hit', ['assets/sounds/hit.mp3', 'assets/sounds/hit.ogg']);
            this.game.load.audio('highspeed', ['assets/sounds/highspeed.mp3', 'assets/sounds/highspeed.ogg']);
            this.game.load.audio('select', ['assets/sounds/select.mp3', 'assets/sounds/select.ogg']);

            //this.game.load.audio('music', ['assets/sounds/music.mp3', 'assets/sounds/music.ogg']);

            this.load.image('playerbody', 'assets/playerbody.png');
            this.load.image('enemie', 'assets/enemie.png');
            this.load.image('enemie1', 'assets/enemie1.png');
            this.load.image('enemie2', 'assets/enemie2.png');
            this.load.image('lifebar', 'assets/lifebar.png');
            this.load.image('instructions', 'assets/instructions.png');

            this.load.image('flash', 'assets/flash.png');

            this.load.bitmapFont('minecraftia', 'assets/font.png', 'assets/font.fnt');
            this.load.image('background', 'assets/color.png');
            this.load.image('background1', 'assets/color4.png');

        },

        create: function() {
            this.asset.cropEnabled = false;
        },

        update: function() {
            if ( !! this.ready) {
                this.game.state.start('menu');
            }
        },

        onLoadComplete: function() {
            this.ready = true;
        }
    };

    window['ld29'] = window['ld29'] || {};
    window['ld29'].Preloader = Preloader;

}());