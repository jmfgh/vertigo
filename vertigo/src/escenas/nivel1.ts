import Constantes from '../constantes';
import ManejadorNivel from './manejadornivel';

export default class Nivel1 extends ManejadorNivel
{
    constructor () {
        super(Constantes.ESCENAS.NIVEL1);              
    }

    create (): void {               
        this.creaEscenarioNivel(Constantes.MAPAS.NIVEL1.TILEMAPJSON, Constantes.FONDOS.NIVEL1, Constantes.PLATAFORMAMOVIL.NIVEL1.ID, Constantes.PLATAFORMAMOVIL.NIVEL1.VELOCIDAD, Constantes.MAPAS.NIVEL1.CANCION);

        this.creaEnemigos([Constantes.ENEMIGOS.CAMALEON, Constantes.ENEMIGOS.RINO, Constantes.ENEMIGOS.MOSQUITO]);

        this.creaRecolectables([Constantes.RECOLECTABLES.ORO, Constantes.RECOLECTABLES.JOYA, Constantes.RECOLECTABLES.CORAZON]);

    }

}
