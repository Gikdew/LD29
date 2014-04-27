Worm = function(game) {
    this.game = game;
    this.numSnakeSections = 10;
    this.snakeSection = [];
    this.snakeSpacer = 1;
    this.snakePath = [];
    this.scaleCounter = 1;
    this.wobble;
    this.bulletTime = 150;
    this.life = 100;
    this.traces = [];
    this.TWEEN_START = 1000;
    this.tween = true;

    this.canClick = true;
}
Worm.prototype = {
    preload: function() {

    },
    create: function() {

        this.highSpeed = this.game.add.audio('highspeed');
        this.sprite = this.game.add.sprite(0, 0, 'playerbody');
        this.sprite.alpha = 0;
        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.smoothed = true;
        this.sprite.anchor.setTo(0.6, 0.5);
        this.sprite.body.collideWorldBounds = true;
        this.sprite.angle = -45 - 90;

        for (var i = 0; i <= this.numSnakeSections * this.snakeSpacer; i++) {
            this.snakePath[i] = new Phaser.Point(this.sprite.x, this.sprite.y);
        }
        for (var i = 1; i <= this.numSnakeSections - 1; i++) {
            this.scaleCounter -= 0.060;
            this.snakeSection[i] = this.game.add.sprite(this.sprite.x, this.sprite.y,
                'playerbody');
            this.snakeSection[i].smoothed = true;
            this.snakeSection[i].scale.setTo(this.scaleCounter);
            this.snakeSection[i].anchor.setTo(0.5, 0.5);
        }

        /*this.bullets = this.game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

        for (var i = 0; i < 20; i++) {
            var b = this.bullets.create(0, 0, 'bullet');
            b.scale.set(0.5);
            b.name = 'bullet' + i;
            b.anchor.setTo(0.5, 0.5);
            b.exists = false;
            b.visible = false;
            b.checkWorldBounds = true;
            b.events.onOutOfBounds.add(this.resetBullet, this);
        }*/

    },
    update: function(cursors) {

        this.sprite.body.angularVelocity = 0;

        var part = this.snakePath.pop();

        part.setTo(this.sprite.x, this.sprite.y);

        this.snakePath.unshift(part);

        for (var i = 1; i <= this.numSnakeSections - 1; i++) {
            this.snakeSection[i].bringToTop();
            this.snakeSection[i].x = (this.snakePath[i * this.snakeSpacer]).x;
            this.snakeSection[i].y = (this.snakePath[i * this.snakeSpacer]).y;
        }

        this.sprite.body.velocity.copyFrom(this.game.physics.arcade.velocityFromAngle(this.sprite.angle, -140));
        if (cursors.up.isDown) {
            if (this.canClick) {
                this.highSpeed.play();
                this.canClick = false;
            }

            this.sprite.body.velocity.copyFrom(this.game.physics.arcade.velocityFromAngle(this.sprite.angle, -260));

            //this.fireBullet();

        } else {
            this.canClick = true;
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.sprite.body.angularVelocity = -350;
        }
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.sprite.body.angularVelocity = 350;
        }

    },
    fireBullet: function() {
        if (this.game.time.now > this.bulletTime) {
            this.bullet = this.bullets.getFirstExists(false);

            if (this.bullet) {

                this.bullet.angle = this.sprite.angle;
                this.bullet.reset(this.sprite.x, this.sprite.y);
                this.bullet.body.velocity.copyFrom(this.game.physics.arcade.velocityFromAngle(this.sprite.angle, 600));
                this.bulletTime = this.game.time.now + 150;
            }
        }

    },
    resetBullet: function(bullet) {

        bullet.kill();

    },
    alienOut: function() {
        //console.log("OUT");
        this.life -= 0.5;
    },
    die: function() {
        if (this.tween) {
            this.tween = this.game.add.tween(this.sprite.scale);
            this.tween.to({
                x: 0,
                y: 0
            }, this.TWEEN_START, Phaser.Easing.Sinusoidal.Out, true, 0, 0, true);
            this.tween.onComplete.add(function() {
                this.game.state.start('menu', false, false);
            }, this);

            for (var i = 1; i < this.numSnakeSections; i++) {
                this.game.add.tween(this.snakeSection[i].scale).to({
                    x: 0,
                    y: 0
                }, this.TWEEN_START, Phaser.Easing.Sinusoidal.Out, true, 0, 0, true);
            }
        }
    }
}