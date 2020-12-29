import Phaser from "phaser";
import splash from "./assets/splash.jpg";

export default class Intro extends Phaser.Scene {

    constructor() {
        super({
            key: 'Intro'
        })
    }

    preload() {
        this.load.image('splash', splash);
    }

    create() {
        this.runIntro();
    }

    runIntro() {
        this.add.image(0, 0, 'splash')
            .setOrigin(0)
            .setInteractive({useHandCursor: true})
            .on("pointerup", () => {
                this.scene.start('Header')
                this.scene.launch('Level1');
            });
    }

}