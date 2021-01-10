import Phaser from "phaser";
import splashOld from "./assets/splash_old.png";

export default class TheEnd extends Phaser.Scene {

    constructor() {
        super({
            key: 'TheEnd'
        })
    }

    preload() {
        this.load.image('splashOld', splashOld);
    }

    create() {
        let Header = this.scene.get('Header');
        Header.setLevelText("THE END");
        this.add.image(0, 50, 'splashOld')
            .setOrigin(0)
    }

}