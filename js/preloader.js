(function() {
    'use strict';

    function Preloader() {
        this.asset = null;
        this.ready = false;
    }

    Preloader.prototype = {

        preload: function() {
            this.asset = this.add.sprite(320, 240, 'preloader');
            this.asset.anchor.setTo(0.5, 0.5);

            this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
            this.load.setPreloadSprite(this.asset);
            this.load.image('player', 'assets/player.png');

            this.load.image('playerbody', 'assets/playerbody.png');
            this.load.image('trace', 'assets/trace.png');
            this.load.image('bullet', 'assets/bullet1.png');
            this.load.image('enemie', 'assets/enemie.png');
            this.load.image('enemie1', 'assets/enemie1.png');
            this.load.image('enemie2', 'assets/enemie2.png');

            this.load.bitmapFont('minecraftia', 'assets/minecraftia.png', 'assets/minecraftia.xml');
            this.load.image('background', 'assets/color.png');
            this.load.image('background1', 'assets/color4.png');
        },

        create: function() {
            this.asset.cropEnabled = false;
        },

        update: function() {
            if ( !! this.ready) {
                this.game.state.start('game');
            }
        },

        onLoadComplete: function() {
            this.ready = true;
        }
    };

    window['ld29'] = window['ld29'] || {};
    window['ld29'].Preloader = Preloader;

}());