window.onload = function() {
    'use strict';

    var game, ns = window['ld29'];

    game = new Phaser.Game(400, 500, Phaser.CANVAS, 'ld29-game');
    game.state.add('boot', ns.Boot);
    game.state.add('preloader', ns.Preloader);
    game.state.add('menu', ns.Menu);
    game.state.add('game', ns.Game);

    game.state.start('boot');
};