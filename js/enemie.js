var Enemie = function(game) {
    this.game = game;
    this.numSnakeSections = 10;
    this.snakeSection = [];
    this.snakeSpacer = 2;
    this.snakePath = [];
    this.scaleCounter = 1;
    this.wobble = 0;
    this.bulletTime = 150;
    this.targetAngle = 0;
    this.sprite = null;
    this.tween = true;
    this.TWEEN_START = 1000;
};

Enemie.prototype = {
    preload: function() {

    },
    create: function(p, rnd) {
        this.rnd = Math.random() * 0.5 + 0.5;
        var rand = Math.random();
        if (rand < 0.3) {
            this.sprite = this.game.add.sprite(p.x, p.y, 'enemie');
        } else if (rand > 0.6) {
            this.sprite = this.game.add.sprite(p.x, p.y, 'enemie1');
        } else {
            this.sprite = this.game.add.sprite(p.x, p.y, 'enemie2');
        }
        this.sprite.alpha = 0;
        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.smoothed = false;
        this.sprite.anchor.setTo(0.5, 0.5);
        //this.sprite.body.collideWorldBounds = true;

        this.SPEED = 300; // missile speed pixels/second
        this.TURN_RATE = 10; // turn rate in degrees/frame

        for (var i = 0; i <= this.numSnakeSections * this.snakeSpacer; i++) {
            this.snakePath[i] = new Phaser.Point(this.sprite.x, this.sprite.y);
        }
        for (var i = 1; i <= this.numSnakeSections - 1; i++) {
            this.scaleCounter -= 0.060;
            if (rand < 0.3) {
                this.snakeSection[i] = this.game.add.sprite(this.sprite.x, this.sprite.y,
                    'enemie');
            } else if (rand > 0.6) {
                this.snakeSection[i] = this.game.add.sprite(this.sprite.x, this.sprite.y,
                    'enemie1');
            } else {
                this.snakeSection[i] = this.game.add.sprite(this.sprite.x, this.sprite.y,
                    'enemie2');
            }

            this.snakeSection[i].smoothed = true;
            this.snakeSection[i].scale.setTo(this.scaleCounter);
            this.snakeSection[i].anchor.setTo(0.5, 0.5);
        }
        this.sprite.angle = 0;
        this.WOBBLE_LIMIT = 200 * rnd; // degrees
        this.WOBBLE_SPEED = 200; // milliseconds
        this.wobble = this.WOBBLE_LIMIT;
        this.game.add.tween(this)
            .to({
                    wobble: -this.WOBBLE_LIMIT
                },
                this.WOBBLE_SPEED * rnd, Phaser.Easing.Sinusoidal.InOut, true, 100,
                Number.POSITIVE_INFINITY, true
        );

    },
    update: function(p) {

        //this.sprite.body.velocity.x = (-this.sprite.x + point.x) * 1;
        //this.sprite.body.velocity.y = (-this.sprite.y + point.y) * 1;

        //this.sprite.body.velocity.setTo(100 + this.wobble, 100);
        var part = this.snakePath.pop();

        part.setTo(this.sprite.x, this.sprite.y);

        this.snakePath.unshift(part);

        if (this.sprite.x < 0 - 10) {
            this.resetEnemie(p);
        }

        for (var i = 1; i <= this.numSnakeSections - 1; i++) {
            this.snakeSection[i].bringToTop();
            this.snakeSection[i].x = (this.snakePath[i * this.snakeSpacer]).x;
            this.snakeSection[i].y = (this.snakePath[i * this.snakeSpacer]).y;
        }

        this.sprite.body.velocity.copyFrom(this.game.physics.arcade.velocityFromAngle(this.sprite.angle, -200 * this.rnd));
        this.sprite.body.angularVelocity = this.wobble;
    },
    resetEnemie: function(p) {
        this.sprite.x = p.x;

        this.rnd = Math.random() * 0.5 + 0.5;
        this.sprite.y = p.y;
    },
    die: function() {
        if (this.tween) {
            this.game.add.tween(this.sprite.scale).to({
                x: 0,
                y: 0
            }, this.TWEEN_START, Phaser.Easing.Sinusoidal.Out, true, 0, 0, true);
            for (var i = 1; i < this.numSnakeSections; i++) {
                this.game.add.tween(this.snakeSection[i].scale).to({
                    x: 0,
                    y: 0
                }, this.TWEEN_START, Phaser.Easing.Sinusoidal.Out, true, 0, 0, true);
            }
        }
    }

};