import background_level3 from "./assets/background_level3.jpg";
import palmTree from "./assets/tree.png";
import axe from "./assets/axe.png";
import stone from "./assets/stone_100.png";
import stoneSmall from "./assets/stone20.png";
import balloon from "./assets/balloon.png";
import keyHint from "./assets/keyspng.png";
import walk_sprites from "./assets/julie_spritecheet.png";
import nextLevelArrowSheet from "./assets/next_level_arrows.png";

export default class Level4 extends Phaser.Scene {

    constructor() {
        super({
            key: 'Level4'
        })
        this.cursors = null;
        this.startCoordinates = {x: 50, y: 70};
    }

    preload() {
        this.load.image('background_level3', background_level3);
        this.load.image('axe', axe);
        this.load.image('stone', stone);
        this.load.image('stoneSmall', stoneSmall);
        this.load.image('palmTree', palmTree);
        this.load.image('balloon', balloon);
        this.load.image('keyHint', keyHint);
        this.load.spritesheet('julieSheet', walk_sprites, {frameWidth: 100, frameHeight: 100});
        this.load.spritesheet('nextLevelArrows', nextLevelArrowSheet, {frameWidth: 100, frameHeight: 75});
    }

    create() {
        this.header = this.scene.get('Header');
        this.header.setLevelText("Level 4");
        this.header.setHintText("Hint: Use arrow keys to move character");

        this.physics.world.setBoundsCollision(true, true, true, true);
        this.cursors = this.input.keyboard.createCursorKeys();

        this.add.image(0, 50, 'background_level3')
            .setOrigin(0).setScale(10);

        const platforms = this.physics.add.staticGroup();
        platforms.create(0, 50,).setOrigin(0).setScale(40, 0).setVisible(false).refreshBody();
        platforms.create(0, 250,).setOrigin(0).setScale(20, 0).setVisible(true).refreshBody();
        platforms.create(150, 450,).setOrigin(0).setScale(20, 0).setVisible(false).refreshBody();
        platforms.create(0, 640,).setOrigin(0).setScale(40, 0).setVisible(false).refreshBody();

        this.ladderGroup = this.physics.add.group();
        this.ladderGroup.add(this.physics.add.image(370, 190, 'stone'));



        //this.stone = this.add.sprite(370, 190, 'stone')
        this.character = this.physics.add.sprite(this.startCoordinates.x, this.startCoordinates.y, 'julieSheet')
            .setGravityY(450)
            .setBounce(0.2)
            .setSize(50, 100)
            .setOffset(25, 0)
            .setCollideWorldBounds(true);

        this.physics.add.overlap(this.character, this.ladderGroup);


        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('julieSheet', {frames: [0, 1, 2, 1]}),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{key: 'julieSheet', frame: 8}],
            frameRate: 20
        });


        this.anims.create({
            key: 'jump',
            frames: [{key: 'julieSheet', frame: 6}],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('julieSheet', {frames: [3, 4, 5, 4]}),
            frameRate: 8,
            repeat: -1
        });


        this.character.body.onWorldBounds = true;

        this.physics.add.collider(this.character, platforms);
        //  this.physics.add.existing(this.stone, true);
        // this.physics.add.collider(this.character, this.stone);


        this.physics.add.overlap(this.character, this.balloon, () => {
            this.level3Win();
        }, null, this);

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
                this.character.setVelocityY(-250);
                this.character.anims.play('jump');
            }
        }
        this.physics.world.wrap(this.character, 0);
    }

    level3Win() {
        //TODO: show happyPer
        this.character.disableBody().visible = false;
        this.add.image(70, 320, 'julieSheet', 7);
        this.balloon.setPosition(115, 290);

        this.anims.create({
            key: 'blinking_arrows',
            frames: this.anims.generateFrameNumbers('nextLevelArrows', {frames: [0, 1, 2]}),
            frameRate: 8,
            repeat: -1
        });
        this.add.sprite(700, 600, null)
            .play('blinking_arrows')
            .setInteractive({useHandCursor: true})
            .on("pointerdown", () => {
                this.scene.start('Level5')
            });
    }

}
