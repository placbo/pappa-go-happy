import background_level1 from "./assets/background_level1.jpg";
import booth from "./assets/booth.png";
import target from "./assets/target.png";
import gun from "./assets/gun.png";
import nextLevelArrowSheet from "./assets/next_level_arrows.png";

export default class Level1 extends Phaser.Scene {

    constructor() {
        super({
            key: 'Level1'
        })
    }

    preload() {
        this.load.image('background_level1', background_level1);
        this.load.image('booth', booth);
        this.load.image('target', target);
        this.load.image('gun', gun);
        this.load.spritesheet('nextLevelArrows', nextLevelArrowSheet, {frameWidth: 100, frameHeight: 75});
    }

    create() {
        let Header = this.scene.get('Header');
        Header.setLevelText("Level 1");
        this.add.image(0, 50, 'background_level1')
            .setOrigin(0);
        this.add.image(0, 50, 'booth')
            .setOrigin(0)
            .setDepth(1);
        this.gun = this.add.sprite(300, 610, "gun")
            .setScale(0.2)
            .setAngle(-30)
            .setInteractive({useHandCursor: true})
            .on("pointerup", () => {
                this.drawTargetsAndStartShootingGame();
                this.gun.destroy();
            })
    }

    level1Win() {
        this.input.setDefaultCursor('default');
        //TODO: show happyPer
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
                this.scene.start('Level2')
            });
    }

    drawTargetsAndStartShootingGame() {
        this.input.setDefaultCursor('cell');
        this.targets = this.add.group();
        const numberOfTargets = 3;
        let targetsLeft = numberOfTargets;
        for (let i = 0; i < numberOfTargets; i++) {
            this.targets.create(120, 300 + (63 * i), 'target').setInteractive();
        }

        this.targets.children.iterate((child) => {
            this.tweens.add({
                targets: child,
                x: 660,
                duration: 3000,
                flipX: true,
                yoyo: true,
                repeat: -1,
                delay: Math.random() * 1000
            });
        });

        this.input.on('gameobjectdown', (pointer, gameObject) => {
            gameObject.destroy();
            targetsLeft--;
            if (targetsLeft === 0) {
                this.level1Win();
            }
        }, this);
    }


}
