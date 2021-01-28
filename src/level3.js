import background_level3 from "./assets/background_level3.jpg";
import stone_small from "./assets/stone20.png";
import walk_sprites from "./assets/julie_spritecheet.png";
import dino1 from "./assets/dino1.png";
import dino2 from "./assets/dino2.png";
import oscar_glow from "./assets/oscar_glow.png";
import nextLevelArrowSheet from "./assets/next_level_arrows.png";
import balloon from "./assets/balloon.png";
import platform from "./assets/platform.png";

export default class Level3 extends Phaser.Scene {

    constructor() {
        super({
            key: 'Level3'
        })
        this.cursors = null;
        this.startCoordinates = {x: 750, y: 550};
    }

    preload() {
        this.load.image('background_level3', background_level3);
        this.load.image('stone_small', stone_small);
        this.load.image('dino1', dino1);
        this.load.image('dino2', dino2);
        this.load.image('oscar', oscar_glow);
        this.load.spritesheet('julieSheet', walk_sprites, {frameWidth: 100, frameHeight: 100});
        this.load.spritesheet('nextLevelArrows', nextLevelArrowSheet, {frameWidth: 100, frameHeight: 75});
        this.load.image('balloon', balloon);
        this.load.image('platform', platform);
    }

    create() {
        this.header = this.scene.get('Header');
        this.header.setLevelText("Level 3");
        this.header.setHintText("Hint: Use arrow keys to move character");

        this.physics.world.setBoundsCollision(true, true, true, true);
        this.cursors = this.input.keyboard.createCursorKeys();

        this.add.image(0, 50, 'background_level3')
            .setOrigin(0).setScale(3);

        const platforms = this.physics.add.staticGroup();
        platforms.create(0, 200, "platform").setOrigin(0).refreshBody();
        platforms.create(-200, 360, "platform").setOrigin(0).refreshBody();
        platforms.create(200, 500, "platform").setOrigin(0).refreshBody();
        platforms.create(0, 645, "platform").setOrigin(0).refreshBody();

        this.balloon = this.add.image(50, 300, 'balloon');

        this.character = this.physics.add.sprite(this.startCoordinates.x, this.startCoordinates.y, 'julieSheet')
            .setGravityY(450)
            .setScale(0.6)
            .setBounce(0.2)
            .setSize(50, 100)
            .setOffset(25, 0)
            .setCollideWorldBounds(true);

        this.add.sprite(400, 128, 'oscar').setScale(0.4);
        this.stone1 = this.add.sprite(400, 350, 'stone_small');
        this.stone2 = this.add.sprite(370, 490, 'stone_small');
        this.stone3 = this.add.sprite(600, 635, 'stone_small');
        this.physics.add.existing(this.stone1, true);
        this.physics.add.existing(this.stone2, true);
        this.physics.add.existing(this.stone3, true);

        this.physics.add.collider(this.character, this.stone1);
        this.physics.add.collider(this.character, this.stone2);
        this.physics.add.collider(this.character, this.stone3);

        this.dinos = this.physics.add.group();
        this.dinos.create(150, 290, 'dino1').setScale(0.4).setVelocityX(Phaser.Math.Between(100, 150));
        this.dinos.create(650, 450, 'dino1').setScale(0.4).setVelocityX(Phaser.Math.Between(100, 150));
        this.dinos.create(150, 540, 'dino2').setScale(0.5).setVelocityX(Phaser.Math.Between(100, 150));
        this.dinos.children.iterate((child) => {
            child.setBounceY(0)
                .setBounceX(1)
                .setGravityY(450)
                .setCollideWorldBounds(true);
            this.physics.add.collider(child, this.stone1);
            this.physics.add.collider(child, this.stone2);
            this.physics.add.collider(child, this.stone3);
            this.physics.add.collider(child, this.character, () => {
                this.character.setPosition(this.startCoordinates.x, this.startCoordinates.y);
            });
            this.physics.add.collider(child, platforms);
        });

        this.character.body.onWorldBounds = true;
        this.physics.add.existing(this.balloon, true);
        this.physics.add.overlap(this.character, this.balloon, () => {
            this.level3Win();
        }, null, this);
        this.physics.add.collider(this.character, platforms);


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




    }

    update() {
        if (this.cursors) {
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

            if (this.cursors.up.isDown && this.character.body.touching.down) {
                this.character.setVelocityY(-380);
                this.character.anims.play('jump');
            }
        }
        this.physics.world.wrap(this.character, 0);
    }

    level3Win() {
        this.character.disableBody().visible = false;
        this.add.image(90, 328, 'julieSheet', 7).setScale(0.65);
        this.balloon.setPosition(118, 290).setScale(0.8);

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
                this.scene.start('Level4')
            });
    }

}
