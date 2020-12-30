import nextLevelArrow from "./assets/right-arrow.png";
import julieHead from "./assets/julie.png";

export default class Level3 extends Phaser.Scene {

    constructor() {
        super({
            key: 'Level3'
        })
        this.arrowAngle = 0;
    }

    preload() {
        this.load.image('nextLevelArrow', nextLevelArrow);
        this.load.image('julie', julieHead);
    }

    create() {
        this.physics.world.setBoundsCollision(true, true, true, true);

        this.character = this.physics.add.sprite(100, 150, 'julie')
            .setScale(0.2)
            .setGravityY(150)
            .setCollideWorldBounds(true)
        this.character.body.onWorldBounds = true;
        let won = false;

        this.physics.world.on("worldbounds", (body) => {
            if (body.gameObject === this.character) {
                body.gameObject.disableBody(true, true);
            }
        });

    }

    drawJulie() {
        this.julie = this.physics.add.sprite(130, 500, 'julie')
            .setScale(0.1)
            .setFlipX(true);
        //add animation on julie
        this.julie.scene.tweens.add({
            targets: this.julie,
            x: 700,
            angle: 1080,
            duration: 5000,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: true,
            flipX: true,
        });
    }


    level2Win() {
        //TODO: show happyPer
        this.add.image(700, 550, 'nextLevelArrow')
            .setScale(0.1)
            .setInteractive({useHandCursor: true})
            .on("pointerdown", () => {
                this.scene.start('TheEnd')
            });
    }

}
