import background_level2 from "./assets/background_level2.jpg";
import julie from "./assets/julie-body_100.png";
import arrow from "./assets/arrow.png";
import nextLevelArrowSheet from "./assets/next_level_arrows.png";
import cupid from "./assets/cupid_200.png";
import cloud from "./assets/cloud.png";
import iverBored from "./assets/iverbored.png";
import happyCouple from "./assets/JulieIver.png";
import heart_sprites from "./assets/heart-sprite.png";
import Phaser from "phaser";
import per_sad from "./assets/per-sad.png";
import per_happy from "./assets/per-happy.png";


export default class Level2 extends Phaser.Scene {

    constructor() {
        super({
            key: 'Level2'
        })
        this.arrowAngle = 0;
    }

    preload() {
        this.load.image('background_level2', background_level2);
        this.load.image('julie', julie);
        this.load.image('arrow', arrow);
        this.load.image('cupid', cupid);
        this.load.image('cloud', cloud);
        this.load.image('iverBored', iverBored);
        this.load.image('happyCouple', happyCouple);
        this.load.image('per_sad', per_sad);
        this.load.image('per_happy', per_happy);
        this.load.spritesheet('heartSheet', heart_sprites, {frameWidth: 100, frameHeight: 100});
        this.load.spritesheet('nextLevelArrows', nextLevelArrowSheet, {frameWidth: 100, frameHeight: 75});
    }

    create() {
        this.physics.world.setBoundsCollision(true, true, true, true);
        let Header = this.scene.get('Header');
        Header.setLevelText("Level 2");
        Header.setHintText("Hint: Click on things");

        this.drawHappyCouple();
        this.add.image(0, 50, 'background_level2')
            .setOrigin(0);
        this.drawJulie();
        this.drawIverBored();
        this.drawCupid();
        this.sad_per = this.add.image(600, 420, 'per_sad')
            .setOrigin(0)
            .setDepth(2);
        this.cloud = this.add.sprite(570, 80, 'cloud')
            .setOrigin(0)
            .setInteractive({useHandCursor: true});
        this.arrow = this.physics.add.sprite(700, 150, 'arrow')
            .setScale(0.15)
            .setAngle(this.arrowAngle)
            .setGravityY(50)
            .setCollideWorldBounds(true)
            .disableBody(true, true);
        this.arrow.body.onWorldBounds = true;
        let won = false;
        let readyForNewArrow = true;

        this.physics.world.on("worldbounds", (body) => {
            if (body.gameObject === this.arrow) {
                body.gameObject.disableBody(true, true);
                readyForNewArrow = true;
            }
        });

        this.cloud.on('pointerup', (pointer) => {
            this.tweens.add({
                targets: this.cloud,
                x: 1000,
                y: -100,
                duration: 500,
                onComplete: () => {
                    this.cloud.destroy();
                }
            });
            this.cupid.on('pointerdown', (pointer) => {
                if (!won && readyForNewArrow) {
                    readyForNewArrow = false;
                    this.arrow.enableBody(true, 650, 150, true, true)
                        .setAngle(this.arrowAngle)
                        .setAngularAcceleration(-10);
                    this.physics.velocityFromAngle(this.arrowAngle + 160, 150, this.arrow.body.velocity);
                    this.physics.add.collider(this.arrow, this.julie, (noe) => {
                        this.julie.destroy();
                        this.arrow.destroy();
                        this.cupid.destroy();
                        this.iverBored.destroy();
                        this.drawHappyCouple();
                        this.level2Win();
                        won = true;
                    }, null, this);
                }
            });
        });
    }

    drawJulie() {
        this.julie = this.physics.add.sprite(130, 500, 'julie')
            .setFlipX(true);
        //add animation on julie
        this.julie.scene.tweens.add({
            targets: this.julie,
            x: 600,
            angle: 1080,
            duration: 5000,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: true,
            flipX: true,
        });
    }

    drawIverBored() {
        this.iverBored = this.add.image(100, 550, 'iverBored')
    }

    drawHappyCouple() {
        this.anims.create({
            key: 'heart_pump',
            frames: this.anims.generateFrameNumbers('heartSheet', {frames: [0, 1, 2, 1]}),
            frameRate: 6,
            repeat: -1
        });
        this.add.image(200, 500, 'happyCouple');
        this.add.sprite(200, 380, null).play('heart_pump');
    }

    drawCupid() {
        this.cupid = this.add.sprite(650, 150, 'cupid')
            .setOrigin(0.2)
            .setAngle(20)
            .setScale(0.65)
            .setInteractive({useHandCursor: true});

        //Add animation on cupid
        this.tweens.add({
            targets: this.cupid,
            angle: -60,
            duration: 2000,
            yoyo: true,
            ease: 'Sine.easeInOut',
            repeat: -1,
            delay: Math.random() * 1000,
            onUpdate: (tween) => {
                //this.cupid.setAngle(tween.getValue());
                this.arrowAngle = tween.getValue();
            }
        });
    }

    level2Win() {
        this.sad_per.destroy();
        this.add.image(460, 420, 'per_happy')
            .setOrigin(0)
            .setDepth(2);
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
                this.scene.start('Level3')
            });
    }

}
