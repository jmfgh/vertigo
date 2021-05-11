import Constantes from '../constantes';
import ManejadorNivel from './manejadornivel';

export default class Nivel4 extends ManejadorNivel
{
    constructor () {
        super(Constantes.ESCENAS.NIVEL4);            
    }

    create (): void {       
        
        const edificio = this.add.image(-36, -50, Constantes.FONDOS.EDIFICIO).setOrigin(0,0).setDepth(0).setScale(1);

        this.creaEscenarioNivel(Constantes.MAPAS.NIVEL4.TILEMAPJSON, Constantes.FONDOS.NIVEL4, Constantes.PLATAFORMAMOVIL.NIVEL4.ID, Constantes.PLATAFORMAMOVIL.NIVEL4.VELOCIDAD, Constantes.MAPAS.NIVEL4.CANCION);

        this.creaEnemigos([Constantes.ENEMIGOS.BIRD, Constantes.ENEMIGOS.PLANTA, Constantes.ENEMIGOS.SLIME]);

        this.creaRecolectables([Constantes.RECOLECTABLES.ORO, Constantes.RECOLECTABLES.JOYA, Constantes.RECOLECTABLES.CORAZON]);

    }

}