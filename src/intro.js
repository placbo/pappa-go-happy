import Phaser from "phaser";
import splash from "./assets/splash.png";

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
        this.add.image(400, 300, 'splash')
            .setScale(0.78)
            .setInteractive({useHandCursor: true})
            .on("pointerup", () => {
                this.scene.start('Header')
                this.scene.launch('Level2');
            });
    }

}