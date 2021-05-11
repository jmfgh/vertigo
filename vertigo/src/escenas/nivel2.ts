import Constantes from '../constantes';
import ManejadorNivel from './manejadornivel';

export default class Nivel2 extends ManejadorNivel
{
    constructor () {
        super(Constantes.ESCENAS.NIVEL2);              
    }

    create (): void {               
        this.creaEscenarioNivel(Constantes.MAPAS.NIVEL2.TILEMAPJSON, Constantes.FONDOS.NIVEL2,Constantes.PLATAFORMAMOVIL.NIVEL2.ID, Constantes.PLATAFORMAMOVIL.NIVEL2.VELOCIDAD, Constantes.MAPAS.NIVEL2.CANCION);

        this.creaEnemigos([Constantes.ENEMIGOS.OSO, Constantes.ENEMIGOS.OGRO, Constantes.ENEMIGOS.PIG]);

        this.creaRecolectables([Constantes.RECOLECTABLES.ORO, Constantes.RECOLECTABLES.JOYA, Constantes.RECOLECTABLES.CORAZON]);

    }


}