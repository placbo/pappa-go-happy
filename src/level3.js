import nextLevelArrow from "./assets/right-arrow.png";
import julieHead from "./assets/julie.png";
import cloud from "./assets/cloud.png";

export default class Level3 extends Phaser.Scene {

    constructor() {
        super({
            key: 'Level3'
        })
        this.arrowAngle = 0;
        this.cursors = null;
    }

    preload() {
        this.load.image('nextLevelArrow', nextLevelArrow);
        this.load.image('julie', julieHead);
        this.load.image('cloud', cloud);
        this.load.image('nextLevelArrow', nextLevelArrow);

    }

    create() {
        this.physics.world.setBoundsCollision(true, true, true, true);
        this.cursors = this.input.keyboard.createCursorKeys();

        const platforms = this.physics.add.staticGroup();
        platforms.create(270, 380, 'cloud').setOrigin(0).refreshBody();

        this.character = this.physics.add.sprite(380, 150, 'julie')
            .setScale(0.2)
            .setGravityY(250)
            .setCollideWorldBounds(true)
        this.character.body.onWorldBounds = true;

        this.physics.add.collider(this.character, platforms);

        let won = false;

        this.physics.world.on("worldbounds", (body) => {
            if (body.gameObject === this.character) {
                this.character.setPosition(380, 150);
            }
        });

    }

    update() {
        if (this.cursors) {
            if (this.cursors.left.isDown) {
                this.character.setVelocityX(-160);
            } else if (this.cursors.right.isDown) {
                this.character.setVelocityX(160);
            } else {
                this.character.setVelocityX(0);
            }
        }
    }

    level3Win() {
        //TODO: show happyPer
        this.add.image(700, 550, 'nextLevelArrow')
            .setScale(0.1)
            .setInteractive({useHandCursor: true})
            .on("pointerdown", () => {
                this.scene.start('TheEnd')
            });
    }

}
