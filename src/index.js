import Phaser from 'phaser';
import background from './assets/background.jpg';
import julieHead from './assets/julie.png';
import julieBody from './assets/body.png';
import star from './assets/star.png';
import splash from './assets/splash.png';
import gun from './assets/gun.png';
import nextLevelArrow from './assets/right-arrow.png';


class MyScene extends Phaser.Scene {

    constructor(config) {
        super(config);
        this.timeLeft = 10;
        this.score = 0;
        this.stars = [];
    }

    preload() {
        this.load.image('background', background);
        this.load.image('julie', julieHead);
        this.load.image('body', julieBody);
        this.load.image('star', star);
        this.load.image('splash', splash);
        this.load.image('gun', gun);
        this.load.image('nextLevelArrow', nextLevelArrow);
    }

    create() {
        this.runIntro();
    }

    runIntro() {
        this.splashScreen = this.add.image(400, 300, 'splash')
            .setInteractive({useHandCursor: true})
            .on("pointerup", () => {
                this.splashScreen.destroy();
                this.startLevel1();
            });
    }

    updateScore() {
        this.scoreText.setText(`Score: ${this.score}`);
    }

    /*****************  LEVEL 1 **********************/

    startLevel1() {
        this.add.image(400, 300, 'background').setScale(0.7, 0.7);
        this.drawHeader();
        this.gun = this.add.sprite(300, 510, "gun")
            .setScale(0.2)
            .setInteractive({useHandCursor: true})
            .on("pointerup", () => {
                this.drawStarsAndStartShootingGame();
                this.gun.destroy();
            })
        this.drawJulie();
    }

    level1Fail() {
        this.input.setDefaultCursor('default');
        this.add.text(100, 100, "You suck!", {
            fontFamily: "Arial Black",
            fontSize: 100,
            color: "#00ff00"
        }).setStroke('#de77ae', 4);
        //TODO: destroy stars
        //TODO: show restart level

    }

    level1Win() {
        this.time.removeAllEvents();
        this.input.setDefaultCursor('default');
        this.add.text(100, 100, "You dit it, sjø!", {
            fontFamily: "Arial Black",
            fontSize: 100,
            color: "#ffff00"
        }).setStroke('#de77ae', 4);
        //TODO: show happyPer
        this.nextLevelIcon = this.add.image(700, 550, 'nextLevelArrow')
            .setScale(0.1)
            .setInteractive({useHandCursor: true})
            .on("pointerdown", () => {
                this.startLevel2();
                this.nextLevelIcon.destroy();
                //todo ? destroy all level1-stuff?
            });
    }

    drawJulie() {
        this.add.image(650, 500, 'body').setScale(0.5);
        const julieHead = this.add.image(650, 470, 'julie').setScale(0.3).setOrigin(0.5, 1);
        this.tweens.addCounter({
            from: 1,
            to: 10,
            duration: 1000,
            yoyo: true,
            repeat: -1,
            onUpdate: (tween) => {
                julieHead.setAngle(tween.getValue());
            }
        });
    }

    drawStarsAndStartShootingGame() {
        this.input.setDefaultCursor('cell');

        this.timerText = this.add.text(650, 10, "Time left: " + this.timeLeft, {
            fontFamily: "Arial Black",
            fontSize: 24,
            color: "#c51b7d",
            align: 'center'
        }).setStroke('#de77ae', 4);
        this.time.addEvent({
            delay: 1000, callback: () => {
                this.timeLeft -= 1; // One second
                this.timerText.setText("Time left: " + this.timeLeft);
                if (this.timeLeft === 0) {
                    this.level1Fail();
                    this.time.removeAllEvents();
                }
            }, callbackScope: this, loop: true
        });

        const numberOfStars = 1;
        let starsLeft = numberOfStars;
        for (let i = 0; i < numberOfStars; i++) {
            this.stars.push(this.add.sprite(100, 100 + (50 * i), "star").setInteractive());
        }
        this.tweens.add({
            x: 600,
            targets: this.stars,
            duration: 3000,
            flipX: true,
            yoyo: true,
            repeat: -1,
            delay: function (target, key, value, targetIndex) {
                return targetIndex * Math.random() * 1000;
            }
        })
        this.input.on('gameobjectdown', (pointer, gameObject) => {
            gameObject.destroy();
            this.score++;
            this.updateScore();
            starsLeft--;
            if (starsLeft === 0) {
                this.level1Win();
            }
        }, this);
    }

    drawHeader() {
        const graphics = this.add.graphics();
        graphics.fillStyle(0x440044, 1);
        graphics.fillRect(0, 0, 800, 50);
        this.scoreText = this.add.text(10, 10, "", {
            fontFamily: "Arial Black",
            fontSize: 24,
            color: "#c51b7d",
            align: 'center'
        }).setStroke('#de77ae', 4);
        this.updateScore();
    }


    /*****************  LEVEL 2 **********************/

    startLevel2() {
        let background = this.add.image(400, 300, 'background');
        background.setScale(0.4, 0.4).setFlipX(true);
        console.log("level2");
        this.add.text(200, 200, "Level 2", {
            fontFamily: "Arial Black",
            fontSize: 150,
            color: "#00ff00"
        }).setStroke('#de77ae', 4);
    }

}


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
    scene: [MyScene]
};

const game = new Phaser.Game(config);

