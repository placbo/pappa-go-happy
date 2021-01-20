import background_level5 from "./assets/background_level5.jpg";
import balloon from "./assets/balloon.png";
import safe_closed from "./assets/safe.png";
import safe_opened from "./assets/safe_open.png";
import safe_button from "./assets/safe_button.png";
import poster1 from "./assets/poster1.png";
import poster2 from "./assets/poster2.png";
import poster1_teared from "./assets/poster1_teared.png";
import picture1 from "./assets/picture1.png";
import picture2 from "./assets/picture2.png";
import picture3 from "./assets/picture3.png";
import nextLevelArrowSheet from "./assets/next_level_arrows.png";

export default class Level5 extends Phaser.Scene {

    constructor() {
        super({
            key: 'Level5'
        })
        this.safeCombination = "5319";
        this.pressedCombination = "";
        this.keyPadGridText = [];
        this.keyPadGrid = [];

    }

    preload() {
        this.load.image('background_level5', background_level5);
        this.load.image('safe_button', safe_button);
        this.load.image('balloon', balloon);
        this.load.image('poster1', poster1);
        this.load.image('poster2', poster2);
        this.load.image('poster1_teared', poster1_teared);
        this.load.image('safe_closed', safe_closed);
        this.load.image('safe_opened', safe_opened);
        this.load.image('picture1', picture1);
        this.load.image('picture2', picture2);
        this.load.image('picture3', picture3);
        this.load.spritesheet('nextLevelArrows', nextLevelArrowSheet, {frameWidth: 100, frameHeight: 75});

    }

    pressDigit(number) {
        this.pressedCombination += number;
        console.log(this.pressedCombination);
        if (this.pressedCombination.endsWith(this.safeCombination)) this.openSafe();
    }

    drawKeyPads() {
        for (let x = 0; x < 3; x++) {
            this.keyPadGrid[x] = [];
            this.keyPadGridText[x] = [];
            for (let y = 0; y < 3; y++) {
                const sx = 355 + (x * 34);
                const sy = 265 + (y * 34);
                const value = x + 1 + (y * 3);
                const block = this.add.image(sx, sy, 'safe_button')
                    .setInteractive({useHandCursor: true})
                    .on('pointerover', () => {
                        block.setTint(0xbbbbbb);
                    })
                    .on('pointerout', () => {
                        block.clearTint();
                    })
                    .on('pointerup', () => {
                        this.pressDigit(value)
                        this.tweens.add({
                            targets: block,
                            scaleX: 0.5,
                            scaleY: 0.5,
                            yoyo: true,
                            duration: 50,
                        });
                    });
                //show text
                this.keyPadGrid[x][y] = block;
                this.keyPadGridText[x][y] = this.add.text(sx - 5, sy - 10, value)
                    .setFontSize(16)
                    .setFontFamily('Arial')
                    .setColor('#555555');

            }
        }
    }

    clearKeyPad() {
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                this.keyPadGrid[x][y].destroy();
                this.keyPadGridText[x][y].destroy();
            }
        }
    }

    create() {
        this.header = this.scene.get('Header');
        this.header.setLevelText("Level 5");
        this.add.image(0, 50, 'background_level5').setOrigin(0);


        this.add.image(10, 190, 'poster2').setOrigin(0)
        this.poster1 = this.add.image(670, 200, 'poster1').setOrigin(0)
            .setInteractive({useHandCursor: true})
            .on('pointerup', () => {
                this.poster1.destroy();
                this.add.image(647, 200, 'poster1_teared').setOrigin(0);
            });

        this.add.image(160, 250, 'picture3').setOrigin(0)
        this.add.image(475, 250, 'picture2').setOrigin(0)
        this.safe_closed = this.add.image(320, 230, 'safe_closed').setOrigin(0)
        this.drawKeyPads();
        this.wall_image = this.add.image(317, 227, 'picture1').setOrigin(0)
            .setInteractive({useHandCursor: true})
            .on('pointerup', () => {
                this.tweens.add({
                    targets: this.wall_image,
                    x: 1000,
                    y: -100,
                    duration: 500,
                    onComplete: () => {
                        this.wall_image.destroy();
                    }
                });
            });

    }

    openSafe() {
        this.safe_closed.destroy();
        this.clearKeyPad();
        this.add.image(275, 200, 'safe_opened').setOrigin(0).setDepth(10);
        this.balloon = this.add.image(370, 250, 'balloon').setOrigin(0).setDepth(10)
            .setInteractive({useHandCursor: true})
            .on('pointerup', () => {
                this.level5Win();
            });

    }


    level5Win() {
        //TODO: show happyPer
         this.balloon.setPosition(500, 450);
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
                this.scene.start('TheEnd')
            });
    }

}
