import Phaser from 'phaser';
import background from './assets/background.jpg';
import julieHead from './assets/julie.png';
import julieBody from './assets/body.png';
import star from './assets/star.png';


class MyScene extends Phaser.Scene {


    constructor(config) {
        super(config);
        this.timeLeft = 10;
        this.score = 0;
    }

    preload() {
        this.load.image('background', background);
        this.load.image('julie', julieHead);
        this.load.image('body', julieBody);
        this.load.image('star', star);
    }


    create() {
        this.time.addEvent({
            delay: 1000, callback: () => {
                this.timeLeft -= 1; // One second
                this.timerText.setText(this.timeLeft);
                if (this.timeLeft === 0) {
                    this.gameOver();
                    this.time.removeAllEvents();
                }
            }, callbackScope: this, loop: true
        });
        this.input.setDefaultCursor('cell');
        this.drawLevel1();
        this.drawHeader();
    }

    updateScore() {
        this.scoreText.setText(`Score: ${this.score}`);
    }

    gameOver() {
        this.add.text(100, 100, "Game Over!", {
            fontFamily: "Arial Black",
            fontSize: 100,
            color: "#00ff00"
        }).setStroke('#de77ae', 4);
    }

    gameWin() {
        this.add.text(100, 100, "You win!", {
            fontFamily: "Arial Black",
            fontSize: 100,
            color: "#ffff00"
        }).setStroke('#de77ae', 4);
    }

    drawJulie() {
        const julieHead = this.add.image(620, 270, 'julie').setScale(0.5, 0.5).setOrigin(0.5, 1);
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
        let body = this.add.image(600, 400, 'body');
        body.setScale(1.5, 1.5);
    }

    drawStars() {
        const star1 = this.add.sprite(100, 100, "star");
        const star2 = this.add.sprite(100, 150, "star");
        this.tweens.add({
            x: 600,
            targets: [star1,star2],
            duration: 3000,
            yoyo: true,
            repeat: -1
        })
        star1.setInteractive().on('pointerdown',  () =>{
            star1.destroy();
            this.score++;
            this.updateScore();
        });
        star2.setInteractive().on('pointerdown', () => {
            star2.destroy();
            this.score++;
            this.updateScore();
        });
    }

    update(time, delta) {
        if (this.score >= 2) {
            this.gameWin();
        }
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

        this.timerText = this.add.text(750, 10, this.timeLeft, {
            fontFamily: "Arial Black",
            fontSize: 24,
            color: "#c51b7d",
            align: 'center'
        }).setStroke('#de77ae', 4);
    }

    drawLevel1() {
        let background = this.add.image(400, 300, 'background');
        background.setScale(0.7, 0.7);
        this.drawJulie();
        this.drawStars();
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

