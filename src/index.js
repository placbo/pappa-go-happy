import Phaser from 'phaser';
import background from './assets/background.jpg';
import julieHead from './assets/julie.png';
import julieBody from './assets/body.png';
import star from './assets/star.png';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            debug: false

        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

function preload() {
    this.load.image('background', background);
    this.load.image('julie', julieHead);
    this.load.image('body', julieBody);
    this.load.image('star', star);
}

function create() {
    let background = this.add.image(400, 300, 'background');
    background.setScale(0.7, 0.7);
    let body = this.add.image(600, 400, 'body');
    body.setScale(1.5, 1.5);
    const julie = this.add.image(620, 270, 'julie').setScale(0.5, 0.5).setOrigin(0.5, 1);
    const sprite = this.add.sprite(400, 300, 'julie').setScale(0.3);
    let star = this.add.image(100, 100, "star");
    this.tweens.add({
        x: 600,
        targets: star,
        duration: 3000,
        yoyo: true,
        repeat: -1
    })
    this.tweens.addCounter({
        from: 1,
        to: 10,
        duration: 1000,
        yoyo: true,
        repeat: -1,
        onUpdate: function (tween) {
            julie.setAngle(tween.getValue());
        }
    });
    sprite.setInteractive();
    sprite.on('pointerover', function () {
        sprite.setTint('0x00ff00');
    });
    sprite.on('pointerout', function () {
        sprite.clearTint();
    });
}

function update() {
}

const game = new Phaser.Game(config);
game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

