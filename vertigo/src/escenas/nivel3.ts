import Constantes from '../constantes';
import ManejadorNivel from './manejadornivel';

export default class Nivel3 extends ManejadorNivel
{
    constructor () {
        super(Constantes.ESCENAS.NIVEL3);              
    }

    create (): void {    
        
        const cielo = this.add.image(0, 0, Constantes.FONDOS.CIELO).setOrigin(0,0).setDepth(0).setScale(1);

        this.creaEscenarioNivel(Constantes.MAPAS.NIVEL3.TILEMAPJSON, Constantes.FONDOS.NIVEL3,Constantes.PLATAFORMAMOVIL.NIVEL3.ID, Constantes.PLATAFORMAMOVIL.NIVEL3.VELOCIDAD, Constantes.MAPAS.NIVEL3.CANCION);

        this.creaEnemigos([Constantes.ENEMIGOS.FUEGO, Constantes.ENEMIGOS.GHOST, Constantes.ENEMIGOS.ROCA]);

        this.creaRecolectables([Constantes.RECOLECTABLES.ORO, Constantes.RECOLECTABLES.JOYA, Constantes.RECOLECTABLES.CORAZON]);

    }


}