import Phaser from "phaser";


export default class Header extends Phaser.Scene {
    constructor() {
        super({
            key: 'Header'
        })
        // this.timeLeft = 100;
        // this.enableCountdown = false;
        // this.score = 0;
        this.levelText = null;
    }

    preload() {
    }

    create() {
        const graphics = this.add.graphics();
        graphics.fillStyle(0x333333, 1);
        graphics.fillRect(0, 0, 800, 50);
        this.levelText = this.add.text(350, 10, "")
            .setFontSize(24)
            .setFontFamily('Arial')
            .setColor('#fff900')
            .setFontStyle('bold italic');


        // this.scoreText = this.add.text(10, 10, "", {
        //     fontFamily: "Arial Black",
        //     fontSize: 24,
        //     color: "#c51b7d",
        //     align: 'center'
        // }).setStroke('#de77ae', 4);
        // this.updateScore();
        // this.timerText = this.add.text(650, 10, "Time left: " + this.timeLeft, {
        //     fontFamily: "Arial Black",
        //     fontSize: 24,
        //     color: "#c51b7d",
        //     align: 'center'
        // }).setStroke('#de77ae', 4);

    }

    setLevelText(per) {
        this.levelText.setText(per);
    }


    // startCountDownTimer() {
    //     if (this.enableCountdown) {
    //         this.time.addEvent({
    //             delay: 1000, callback: () => {
    //                 this.timeLeft -= 1; // One second
    //                 this.timerText.setText("Time left: " + this.timeLeft);
    //                 if (this.timeLeft === 0) {
    //                     this.gameOver();
    //                     this.time.removeAllEvents();
    //                 }
    //             }, callbackScope: this, loop: true
    //         });
    //     }
    //
    // }

    // updateScore() {
    //     this.scoreText.setText(`Score: ${this.score}`);
    // }

    // gameOver() {
    //     this.input.setDefaultCursor('default');
    //     this.add.rectangle(0, 0, 800, 600, Phaser.Display.Color.HexStringToColor('#ffffff').color)
    //         .setOrigin(0,0);
    //     this.add.text(100, 100, "You suck!", {
    //         fontFamily: "Arial Black",
    //         fontSize: 100,
    //         color: "#00ff00"
    //     }).setStroke('#de77ae', 4);
    // }


}
