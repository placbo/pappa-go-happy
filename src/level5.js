import nextLevelArrow from "./assets/right-arrow.png";
import background_level5 from "./assets/background_level5.png";
import stone from "./assets/stone_100.png";
import stoneSmall from "./assets/stone20.png";
import balloon from "./assets/balloon.png";
import safe_closed from "./assets/safe_closed.png";
import safe_opened from "./assets/safe_opened.png";
import poster1 from "./assets/poster1.png";
import poster2 from "./assets/poster2.png";
import wall_image from "./assets/wall_image.png";

export default class Level5 extends Phaser.Scene {

    constructor() {
        super({
            key: 'Level5'
        })
    }

    preload() {
        this.load.image('background_level5', background_level5);
        this.load.image('stone', stone);
        this.load.image('stoneSmall', stoneSmall);
        this.load.image('nextLevelArrow', nextLevelArrow);
        this.load.image('balloon', balloon);
        this.load.image('poster1', poster1);
        this.load.image('poster2', poster2);
        this.load.image('safe_closed', safe_closed);
        this.load.image('safe_opened', safe_opened);
        this.load.image('wall_image', wall_image);
    }

    pressDigit(number) {
        console.log(number);
    }

    create() {
        this.header = this.scene.get('Header');
        this.header.setLevelText("Level 5");
        this.add.image(0, 50, 'background_level5').setOrigin(0);

        this.keyPadGrid = []

        for (let x = 0; x < 3; x++) {
            this.keyPadGrid[x] = [];
            for (let y = 0; y < 3; y++) {
                const sx = 300 + (x * 36);
                const sy = 200 + (y * 36);
                const value = x + 1 + (y * 3);
                const block = this.add.image(sx, sy, 'stoneSmall')
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
                this.hintText = this.add.text(sx, sy, value)
                    .setFontSize(16)
                    .setFontFamily('Arial')
                    .setColor('#aa4444');

            }
        }
        console.log(this.keyPadGrid);

        this.poster1 = this.add.image(650, 300, 'poster1').setOrigin(0)
            .setInteractive({useHandCursor: true})
            .on('pointerup', () => {
                this.poster1.destroy();
                this.add.image(650, 300, 'poster2').setOrigin(0);
            });

        this.wall_image = this.add.image(350, 200, 'wall_image').setOrigin(0)
            .setInteractive({useHandCursor: true})
            .on('pointerup', () => {
                this.wall_image.destroy();
                this.safe_closed = this.add.image(350, 200, 'safe_closed').setOrigin(0)
                    .setInteractive({useHandCursor: true})
                    .on('pointerup', () => {
                        this.safe_closed.destroy();
                        this.add.image(300, 200, 'safe_opened').setOrigin(0);
                        this.balloon = this.add.image(300, 200, 'balloon').setOrigin(0)
                            .setInteractive({useHandCursor: true})
                            .on('pointerup', () => {
                                this.level5Win();
                            });
                    });
            });

    }


    level5Win() {
        //TODO: show happyPer
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
                this.scene.start('TheEnd')
            });
    }

}
