import Intro from './intro';
import Header from './header';
import Level1 from './level1';
import Level2 from './level2';
import Level3 from './level3';
import TheEnd from './theEnd';


const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 650,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0},
            // debug: true,
            // debugShowBody: true,
            // debugShowStaticBody: true,
            // debugShowVelocity: true,
            // debugVelocityColor: 0xffff00,
            // debugBodyColor: 0x0000ff,
            // debugStaticBodyColor: 0xffffff
        }
    },
    scene: [ Intro, Header, Level1, Level2, Level3,TheEnd]
};

const game = new Phaser.Game(config);

