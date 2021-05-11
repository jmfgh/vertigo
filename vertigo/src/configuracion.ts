import Carga from './escenas/carga';
import Menu from './escenas/menu';
import Ajustes from './escenas/ajustes';
import Controles from './escenas/controles';
import Creditos from './escenas/creditos';
import SeleccionNivel from './escenas/seleccionnivel';
import HUD from './escenas/hud';
import Nivel1 from './escenas/nivel1';
import Nivel2 from './escenas/nivel2';
import Nivel3 from './escenas/nivel3';
import Nivel4 from './escenas/nivel4';
import FinNivel from './escenas/finnivel';


const Configuracion = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600
    }, 
    scene: [Carga, Menu, Nivel1, Nivel2, Nivel3, Nivel4, HUD, Ajustes, Controles, Creditos, SeleccionNivel, FinNivel],    
    pixelArt: true,    
    audio:{
        disableWebAudio: true
    }, 
    physics:{
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: false,
            TILE_BIAS: 32
        }
    }
};

export default Configuracion;