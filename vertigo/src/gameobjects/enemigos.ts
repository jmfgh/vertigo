import ManejadorNivel from '../escenas/manejadornivel';
import Constantes from '../constantes';

export default class Enemigos extends Phaser.Physics.Arcade.Group {

    private escena: ManejadorNivel;
    private velocidad: number;
    private ancho: number;
    private alto: number;
    private offsetX: number;
    private offsetY: number;

    constructor(escena: ManejadorNivel, nombreObjeto: string, idObjeto: string, animObjeto: string, velocidad: number, ancho: number, alto: number, offsetX: number, offsetY: number){
        
        super(escena.physics.world, escena);  
        
        this.escena = escena;
        this.velocidad=velocidad;
                        
        //Añade los objetos de los enemigos desde el array de sprites obtenidos del mapa al grupo        
        this.addMultiple(this.escena.mapaNivel.createFromObjects(nombreObjeto, {name: idObjeto}));

        //Añade física a todos los enemigos
        this.escena.physics.world.enable(this.children.entries);

        //Crea animaciones de enemigos
        this.escena.anims.create({
            key: animObjeto,
            frames: idObjeto,
            frameRate: 15,
            repeat: -1
        });

        this.children.entries.map((enemigo: any) => {
            enemigo.body.setCollideWorldBounds(true);  
            enemigo.body.setSize(ancho, alto);
            enemigo.body.setOffset(offsetX, offsetY);               
            enemigo.play(animObjeto);
            this.mueveEnemigo((Phaser.Math.Between(0, 1) ? 'izda' : 'dcha'), enemigo);
        });

    }

    mueveEnemigo(direccion: string, enemigo: any) {        
        if (direccion === 'izda') {
            enemigo.body.setVelocityX(this.velocidad*-1);
            enemigo.flipX=false; 
        } else if (direccion === 'dcha') {
            enemigo.body.setVelocityX(this.velocidad);
            enemigo.flipX=true;
        }
    }

    public update(): void {
        
        this.children.entries.map((enemigo: any) => {
            if(enemigo.body.velocity.x === 0) {
                this.mueveEnemigo((Phaser.Math.Between(0, 1) ? 'izda' : 'dcha'), enemigo);
            }
            if (enemigo.body.blocked.right) {
                this.mueveEnemigo('izda', enemigo);                              
            } else if (enemigo.body.blocked.left) {
                this.mueveEnemigo('dcha', enemigo);                
            }
        });
        
    }

}