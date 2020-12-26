import background from "./assets/background.jpg";
import julieHead from "./assets/julie.png";
import julieBody from "./assets/body.png";
import star from "./assets/star.png";
import gun from "./assets/gun.png";
import nextLevelArrow from "./assets/right-arrow.png";

export default class Level1 extends Phaser.Scene {

    constructor() {
        super({
            key: 'Level1'
        })
    }

    preload() {
        this.load.image('background', background);
        this.load.image('julie', julieHead);
        this.load.image('body', julieBody);
        this.load.image('star', star);
        this.load.image('gun', gun);
        this.load.image('nextLevelArrow', nextLevelArrow);
    }

    create() {

        let Header = this.scene.get('Header');
        Header.setLevelText("Level 1");

        this.add.image(0, 50, 'background').setScale(0.7, 0.7).setOrigin(0);
        this.gun = this.add.sprite(300, 510, "gun")
            .setScale(0.2)
            .setInteractive({useHandCursor: true})
            .on("pointerup", () => {
                this.drawStarsAndStartShootingGame();
                this.gun.destroy();
            })
        this.drawJulie();
    }

    level1Win() {
        this.input.setDefaultCursor('default');
        //TODO: show happyPer
        this.add.image(700, 550, 'nextLevelArrow')
            .setScale(0.1)
            .setInteractive({useHandCursor: true})
            .on("pointerdown", () => {
                this.scene.start('Level2')
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
        this.stars = this.add.group();
        const numberOfStars = 2;
        let starsLeft = numberOfStars;
        for (let i = 0; i < numberOfStars; i++) {
            this.stars.create(100, 100 + (50 * i), 'star').setInteractive();
        }

        this.stars.children.iterate((child) => {
            this.tweens.add({
                targets: child,
                x: 600,
                duration: 3000,
                flipX: true,
                yoyo: true,
                repeat: -1,
                delay: Math.random() * 1000
            });
        });

        this.input.on('gameobjectdown', (pointer, gameObject) => {
            gameObject.destroy();
            starsLeft--;
            if (starsLeft === 0) {
                this.level1Win();
            }
        }, this);
    }


}
