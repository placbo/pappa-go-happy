import background from "./assets/background.jpg";
import julieHead from "./assets/julie.png";
import julieBody from "./assets/body.png";
import star from "./assets/star.png";
import nextLevelArrow from "./assets/right-arrow.png";
import cupid from "./assets/cupid.png";
import cloud from "./assets/cloud.png";
import sadMan from "./assets/sad_man.png";
import happyCouple from "./assets/happy_couple.png";

export default class Level2 extends Phaser.Scene {

    constructor() {
        super({
            key: 'Level2'
        })
        this.arrowAngle = 0;
    }

    preload() {
        this.load.image('background', background);
        this.load.image('julie', julieHead);
        this.load.image('body', julieBody);
        this.load.image('star', star);
        this.load.image('nextLevelArrow', nextLevelArrow);
        this.load.image('cupid', cupid);
        this.load.image('cloud', cloud);
        this.load.image('sadMan', sadMan);
        this.load.image('happyCouple', happyCouple);
    }

    create() {
        this.physics.world.setBoundsCollision(true, true, true, true);
        let Header = this.scene.get('Header');
        Header.setLevelText("Level 2");

        this.add.image(0, 50, 'background')
            .setScale(0.8, 0.8)
            .setFlipX(true)
            .setOrigin(0);
        this.drawJulie();
        this.drawSadIver();
        this.drawCupid();
        this.cloud = this.add.sprite(700, 150, 'cloud')
            .setScale(0.5).setInteractive({useHandCursor: true});
        this.arrow = this.physics.add.sprite(700, 150, 'julie')
            .setScale(0.2)
            .setAngle(this.arrowAngle)
            .setGravityY(40)
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
                x: -100,
                y: -100,
                duration: 500,
                onComplete: () => {
                    this.cloud.destroy();
                }
            });
            this.cupid.on('pointerdown', (pointer) => {
                if (!won && readyForNewArrow) {
                    readyForNewArrow = false;
                    this.arrow.enableBody(true, 700, 150, true, true).setAngle(this.arrowAngle);
                    this.physics.velocityFromAngle(this.arrowAngle + 180, 200, this.arrow.body.velocity);
                    this.physics.add.collider(this.arrow, this.julie, (noe) => {
                        console.log("HIT!", noe)
                        this.julie.destroy();
                        this.arrow.destroy();
                        this.cupid.destroy();
                        this.iver.destroy();
                        this.drawHappyCouple();
                        //this.arrow.disableBody(true,true);
                        this.level2Win();
                        won = true;
                    }, null, this);
                }
            });
        });
    }

    drawJulie() {
        this.julie = this.physics.add.sprite(100, 400, 'julie')
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

    drawSadIver() {
        this.iver = this.add.image(100, 500, 'sadMan')
            .setScale(0.1);

    }

    drawHappyCouple() {
        this.add.image(100, 500, 'happyCouple')
            .setScale(0.1);

    }

    drawCupid() {
        this.cupid = this.add.sprite(700, 150, 'cupid')
            .setScale(0.05)
            .setAngle(280)
            .setOrigin(0.2).setInteractive({useHandCursor: true});

        //Add animation on cupid
        this.tweens.addCounter({
            targets: this.cupid,
            from: 280,
            to: 350,
            duration: 2000,
            yoyo: true,
            ease: 'Sine.easeInOut',
            repeat: -1,
            delay: Math.random() * 1000,
            onUpdate: (tween) => {
                this.cupid.setAngle(tween.getValue());
                this.arrowAngle = tween.getValue();
            }
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
