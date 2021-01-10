import nextLevelArrow from "./assets/right-arrow.png";
import background_level3 from "./assets/background_level3.jpg";
import julie from "./assets/julie-body_100.png";
import palmTree from "./assets/tree.png";
import axe from "./assets/axe.png";
import stone from "./assets/stone_100.png";
import stoneSmall from "./assets/stone20.png";
import balloon from "./assets/balloon.png";
import keyHint from "./assets/keyspng.png";
import walk_sprites from "./assets/julie_spritecheet.png";

export default class Level3 extends Phaser.Scene {

    constructor() {
        super({
            key: 'Level3'
        })
        this.arrowAngle = 0;
        this.cursors = null;
        this.startCoordinates = {x: 600, y: 290};
    }

    preload() {
        this.load.image('background_level3', background_level3);
        this.load.image('nextLevelArrow', nextLevelArrow);
        // this.load.image('julie', julie);
        this.load.image('axe', axe);
        this.load.image('stone', stone);
        this.load.image('stoneSmall', stoneSmall);
        this.load.image('palmTree', palmTree);
        this.load.image('nextLevelArrow', nextLevelArrow);
        this.load.image('balloon', balloon);
        this.load.image('keyHint', keyHint);
        this.load.spritesheet('julie', walk_sprites, {frameWidth: 100, frameHeight: 100});
    }

    create() {
        //todo show keyboard-hints
        this.header = this.scene.get('Header');
        this.header.setLevelText("Level 3");
        this.header.setHintText("Hint: Use arrow keys to move character");

        this.physics.world.setBoundsCollision(false, false, true, true);
        this.cursors = this.input.keyboard.createCursorKeys();

        this.add.image(0, 50, 'background_level3')
            .setOrigin(0);


        const platforms = this.physics.add.staticGroup();
        platforms.create(500, 370,).setOrigin(0).setScale(10, 0).setVisible(false).refreshBody();
        platforms.create(0, 370,).setOrigin(0).setScale(6, 0).setVisible(false).refreshBody();


        this.add.image(120, 360, 'stoneSmall');
        this.balloon = this.add.image(120, 320, 'balloon');
        this.axe = this.add.sprite(750, 330, 'axe')
            .setInteractive({useHandCursor: true});
        this.character = this.physics.add.sprite(this.startCoordinates.x, this.startCoordinates.y, 'julie2')
            .setGravityY(350)
            .setBounce(0.2)
            .setSize(50, 100)
            .setOffset(25, 0)
            .setCollideWorldBounds(true);
        this.tree = this.physics.add.sprite(490, 245, 'palmTree')
            .setCollideWorldBounds(true);
        this.stone = this.add.sprite(770, 330, 'stone')
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

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('julie', {frames: [0, 1, 2, 1]}),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{key: 'julie', frame: 8}],
            frameRate: 20
        });


        this.anims.create({
            key: 'jump',
            frames: [{key: 'julie', frame: 6}],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('julie', {frames: [3, 4, 5, 4]}),
            frameRate: 8,
            repeat: -1
        });


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
                this.character.setPosition(this.startCoordinates.x, this.startCoordinates.y).setVelocity(0);
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
            if (this.character.body.touching.down) {
                if (this.cursors.left.isDown) {
                    this.character.setVelocityX(-160);
                    this.header.setHintText("");
                    this.character.anims.play('left', true);
                } else if (this.cursors.right.isDown) {
                    this.character.setVelocityX(160);
                    this.header.setHintText("");
                    this.character.anims.play('right', true);
                } else {
                    this.character.setVelocityX(0);
                    this.character.anims.play('turn');
                }
            }


            if (Phaser.Input.Keyboard.JustDown(this.cursors.up) && this.character.body.touching.down) {
                this.character.setVelocityY(-150);
                this.character.anims.play('jump');
            }
        }
        this.physics.world.wrap(this.character, 0);
    }

    level3Win() {
        //TODO: show happyPer
        this.character.disableBody().visible = false;
        this.add.image(70, 320, 'julie', 7);
        this.balloon.setPosition(115, 290);
        this.add.image(700, 550, 'nextLevelArrow')
            .setScale(0.1)
            .setInteractive({useHandCursor: true})
            .on("pointerdown", () => {
                this.scene.start('TheEnd')
            });
    }

}
