import nextLevelArrow from "./assets/right-arrow.png";
import julieHead from "./assets/julie.png";
import cliff from "./assets/cliff.png";
import palmTree from "./assets/palmtree.png";
import axe from "./assets/axe.png";
import stone from "./assets/stone.png";
import balloon from "./assets/balloon.png";
import keyHint from "./assets/keyspng.png";

export default class Level3 extends Phaser.Scene {

    constructor() {
        super({
            key: 'Level3'
        })
        this.arrowAngle = 0;
        this.cursors = null;
        this.startCoordinates = {x: 600, y: 250};
    }

    preload() {
        this.load.image('nextLevelArrow', nextLevelArrow);
        this.load.image('julie', julieHead);
        this.load.image('cliff', cliff);
        this.load.image('axe', axe);
        this.load.image('stone', stone);
        this.load.image('palmTree', palmTree);
        this.load.image('nextLevelArrow', nextLevelArrow);
        this.load.image('balloon', balloon);
        this.load.image('keyHint', keyHint);

    }

    create() {

        //todo show keyboard-hints
        let Header = this.scene.get('Header');
        Header.setLevelText("Level 3");
        const graphics = this.add.graphics();
        graphics.fillGradientStyle(0x00ffff, 0x00ff00, 0x0000ff, 0xffff00, 1);
        graphics.fillRect(0, 50, 800, 650);

        this.physics.world.setBoundsCollision(false, false, true, true);
        this.cursors = this.input.keyboard.createCursorKeys();

        const platforms = this.physics.add.staticGroup();
        platforms.create(500, 350, 'cliff').setOrigin(0).refreshBody();
        platforms.create(-60, 350, 'cliff').setOrigin(0).setFlipX(true).refreshBody();

        this.balloon = this.add.image(120, 330, 'balloon');
        this.axe = this.add.sprite(750, 330, 'axe')
            .setInteractive({useHandCursor: true});
        this.keyhint = this.add.image(700, 80, 'keyHint')
            .setOrigin(0)
            .setScale(0.3);
        this.character = this.physics.add.sprite(this.startCoordinates.x, this.startCoordinates.y, 'julie')
            .setScale(0.2)
            .setGravityY(250)
            .setCollideWorldBounds(true);
        this.tree = this.physics.add.sprite(490, 235, 'palmTree')
            .setScale(0.9)
            .setCollideWorldBounds(true);
        this.stone = this.add.sprite(750, 330, 'stone')
            .setScale(0.5)
            .setInteractive({useHandCursor: true})
            .on('pointerup', (pointer) => {
                this.axe.on('pointerup', (pointer) => {
                    this.input.on('pointermove', function (pointer) {
                        this.axe.setDepth(1).setPosition(pointer.x, pointer.y).disableInteractive();
                    }, this);
                    this.tree
                        .setInteractive({useHandCursor: true})
                        .on('pointerup', (pointer) => {
                            this.tree.setGravityY(400).setGravityX(-200).setAngularAcceleration(-200);
                            this.axe.destroy();
                        })
                })
                this.tweens.add({
                    targets: this.stone,
                    x: 1000,
                    y: -100,
                    duration: 500,
                    onComplete: () => {
                        this.stone.destroy();
                    }
                });
            })


        this.tree.body.onWorldBounds = true;
        this.character.body.onWorldBounds = true;
        this.physics.add.existing(this.stone, true);
        this.physics.add.existing(this.balloon, true);
        this.physics.add.collider(this.character, platforms);
        this.physics.add.collider(this.character, this.stone);
        this.physics.add.overlap(this.character, this.balloon, () => {
            this.level3Win();
        }, null, this);

        //handle objects falling into the abyss
        this.physics.world.on("worldbounds", (body) => {
            if (body.gameObject === this.character) {
                this.character.setPosition(this.startCoordinates.x, this.startCoordinates.y);
            }
            if (body.gameObject === this.tree) {
                this.tree.disableBody(true);
                this.tree.scene.tweens.add({
                    targets: this.tree,
                    alpha: 0,
                    duration: 1000,
                    ease: 'Power2'
                });
            }
        });

    }

    update() {
        if (this.cursors) {
            if (this.cursors.left.isDown) {
                this.character.setVelocityX(-160);
                this.keyhint.destroy();
            } else if (this.cursors.right.isDown) {
                this.character.setVelocityX(160);
                this.keyhint.destroy();
            } else {
                this.character.setVelocityX(0);
            }
        }
        this.physics.world.wrap(this.character, 0);
    }

    level3Win() {
        //TODO: show happyPer
        //TODO: show julie with balloon
        this.character.disableBody();
        console.log('win');
        this.add.image(700, 550, 'nextLevelArrow')
            .setScale(0.1)
            .setInteractive({useHandCursor: true})
            .on("pointerdown", () => {
                this.scene.start('TheEnd')
            });
    }

}
