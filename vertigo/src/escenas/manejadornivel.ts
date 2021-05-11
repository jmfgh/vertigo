import Constantes from '../constantes';
import Jugador from '../gameobjects/jugador';
import Enemigos from '../gameobjects/enemigos';
import PlataformasMoviles from '../gameobjects/plataformasmoviles';
import Recolectables from '../gameobjects/recolectables';
import GestorBD from '../basedatos/gestorbd';

export default class ManejadorNivel extends Phaser.Scene {

    public width: number;
    public height: number;
    
    //Nivel
    protected nombreNivel: string;
    protected nombreFondoNivel: string;

    //Vidas y Puntuación
    public vidas: number;
    public puntuacion: number;

    //Mapa
    public mapaNivel : Phaser.Tilemaps.Tilemap;
    protected conjuntoPatrones: Phaser.Tilemaps.Tileset;
    protected capaPlataformasMapaNivel: Phaser.Tilemaps.TilemapLayer;
    protected imagenFondo: Phaser.GameObjects.TileSprite;    

    //Jugador
    public jugador: Jugador;  

    //Tiempo nivel
    protected segundos: number;        
    protected tiempoRestante: number; 
    protected tiempoAgotado: boolean;

    //Enemigos    
    protected grupoEnemigos: Enemigos[];

    //Plataformas móviles
    protected plataformasMovilesH: PlataformasMoviles;
    protected plataformasMovilesV: PlataformasMoviles;

    //Sonido
    protected bandasonoraNivel: Phaser.Sound.BaseSound;

    //Recolectables
    protected platanosGroup: Recolectables;
    protected pinasGroup: Recolectables;
    protected cerezasGroup: Recolectables;

    constructor(nivel: string){
        super(nivel);
        this.nombreNivel = nivel;              
    }    

     /**
     * Inicialización de la escena
     */
    init(): void{

        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;

        //Vidas y Puntuación
        this.vidas = 3;
        this.puntuacion = 0;

        //Tiempo nivel
        this.segundos = 1;
        this.tiempoRestante = 300;
        this.tiempoAgotado = false;

        //Con el sistema de registro global de variables
        //inicializamos las del juego                
        this.registry.set(Constantes.REGISTRO.VIDAS, this.vidas);        
        this.registry.set(Constantes.REGISTRO.PUNTUACION, this.puntuacion);                
        
        //Enemigos 
        this.grupoEnemigos = [];

    }

    /**
     * Método que completa el escenario y jugador
     * 
     * @param jsonMapa 
     * @param imagenScrolable 
     */
     creaEscenarioNivel(jsonMapa: string, imagenScrolable: string, plataformaMovilID: string, velocidadPlataformaMovil: number, nivel: string): void {
        
        this.creaBandasonora(nivel);

        this.creaMapaNivel(jsonMapa)

        this.crearFondoScrolable(imagenScrolable);

        this.creaAnimaciones();

        this.creaJugador();

        this.creaObjetoFinal();

        this.creaPlataformasMoviles(plataformaMovilID, velocidadPlataformaMovil);

    }

    creaBandasonora(nivel: string): void {

        let mibd: GestorBD = new GestorBD();

        //Muestra sonido si la configuración es ON
        if (mibd.datos.musica){

           //Carga sonido y lo ejecuta en loop
           this.bandasonoraNivel = this.sound.add(Constantes.SONIDOS.BANDASONORA + nivel, {loop:true, volume:0});
           this.bandasonoraNivel.play();

           //Fade IN Sonido
           this.tweens.add({
               targets: this.bandasonoraNivel,
               volume: 1,
               duration: 1500

           });
        }

   }

    /**
     * Método que crea el mapa en la escena con una capa de plataformas por defecto colisionable
     * @param jsonMapa fichero json del tilemap
     * @param imagenMapa imagen tileset del mapa
     */
    creaMapaNivel(jsonMapa: string, imagenMapa: string = Constantes.MAPAS.TILESET): void {
        //Crear Mapa Nivel
        this.mapaNivel = this.make.tilemap({ key: jsonMapa});
        //Los bordes del juego las dimensiones del mapa creado
        this.physics.world.bounds.setTo(0, 0, this.mapaNivel.widthInPixels, this.mapaNivel.heightInPixels);
        //imagen de conjunto de patrones asociada al mapa
        this.conjuntoPatrones = this.mapaNivel.addTilesetImage(imagenMapa);
        //Capa de plataformas
        this.capaPlataformasMapaNivel = this.mapaNivel.createLayer(Constantes.MAPAS.CAPAPLATAFORMAS, this.conjuntoPatrones);
        //Hacer que la capa que sea collisionable
        this.capaPlataformasMapaNivel.setCollisionByExclusion([-1]);
    }

    /**
     * Método que crea el fondo con una imagen de tipo scrolable vertical
     * @param imagenScrolable 
     */
    crearFondoScrolable(imagenScrolable: string): void {
        //Crear Fondo
        this.imagenFondo = this.add.tileSprite(0,0, this.mapaNivel.widthInPixels, this.mapaNivel.heightInPixels,imagenScrolable).setOrigin(0,0).setDepth(-1);
        this.nombreFondoNivel = imagenScrolable;
    }
    
    /**
     * Crea todas las posibles animaciones producidas en el nivel
     * Son globales al juego, una vez creadas no se vuelven a crear y se pueden usar en cualquier nivel
     */
    creaAnimaciones(){        
        this.anims.create({
            key: Constantes.JUGADOR.ANIMACION.ESPERA, 
            frames: this.anims.generateFrameNames(Constantes.JUGADOR.ID,{
                prefix:Constantes.JUGADOR.ANIMACION.ESPERA + '-',
                end:35 }), 
            frameRate:20, 
            repeat: -1
        });
        this.anims.create({
            key: Constantes.JUGADOR.ANIMACION.CORRER, 
            frames: this.anims.generateFrameNames(Constantes.JUGADOR.ID,{
                prefix:Constantes.JUGADOR.ANIMACION.CORRER + '-',
                end:11 
            }), 
            frameRate:20, 
            repeat: -1
        });
        //crea la animacion de explosión        
        this.anims.create({
            key: Constantes.ENEMIGOS.EXPLOSION.ANIM,
            frames: Constantes.ENEMIGOS.EXPLOSION.ID,
            frameRate: 15,
            repeat: 0
        });
        //Crea animación Objetofinal
        this.anims.create({
            key: Constantes.RECOLECTABLES.FINAL.ANIM,
            frames: Constantes.RECOLECTABLES.FINAL.ID,
            frameRate: 15,
            repeat: -1
        });

    }

    /**
     * Crea el objeto Jugador y lo posiciona en el mapa
     */
    creaJugador(): void{
        //Obtiene posición del jugador del mapa y crea jugador con esa posición
        this.mapaNivel.findObject(Constantes.JUGADOR.ID, (d: any) => {           
            this.jugador = new Jugador({
                escena: this, 
                x:d.x,
                y:d.y, 
                textura: Constantes.JUGADOR.ID
            });            
        });        
        
        //Las cámaras siguen al jugador
        this.cameras.main.setBounds(0, 0, this.mapaNivel.widthInPixels, this.mapaNivel.heightInPixels);
        this.cameras.main.startFollow(this.jugador);

        //Se crea colisión entre el jugador y la capa de plataformas
        this.physics.add.collider(this.jugador, this.capaPlataformasMapaNivel);        
    }

    /**
     * Crea objeto para el final del mapa
     */
    creaObjetoFinal(){
        //Crea un sprite con posición final 
        let objetofinal: any = this.mapaNivel.createFromObjects(Constantes.MAPAS.POSICIONFINAL, {name: Constantes.MAPAS.POSICIONFINAL})[0];                
        this.physics.world.enable(objetofinal);
        objetofinal.body.setAllowGravity(false);
        objetofinal.body.setImmovable(true); 

        objetofinal.body.setSize(37,64);
        objetofinal.body.setOffset(15,0);

        objetofinal.play(Constantes.RECOLECTABLES.FINAL.ANIM);

        //Collisión para final del nivel
        this.physics.add.collider(this.jugador, objetofinal, () =>this.finalizaNivel());

    }

    /**
     * Finaliza nivel parando la música, y las dos escenas HUD y la del Nivel
     * Se dirige al nivel de FIN y le manda información de si es gameover o no.
     * Se calcula la puntuación en función del tiempo restante.
     */
         finalizaNivel(esWin: boolean = true): void{          
        
            this.sound.stopAll();
            this.scene.stop(this.nombreNivel);
            this.scene.stop(Constantes.ESCENAS.HUD);            
            this.scene.start(Constantes.ESCENAS.FINNIVEL, {
                esWin: esWin, 
                nombreNivel: this.nombreNivel, 
                nombreFondoNivel: this.nombreFondoNivel,
                puntuacion: this.puntuacion + this.tiempoRestante
            });
            
        }

    /**
     * Crea grupos de enemigos y los configura para que colisionen con el mapa y con el jugador
     */
    creaEnemigos(enemigosConfig: any[]): void{
        enemigosConfig.forEach(enemigosConfig => {
            let enemigos: Enemigos =  new Enemigos(this, Constantes.MAPAS.ENEMIGOS, enemigosConfig.ID, enemigosConfig.ANIM, enemigosConfig.VELOCIDAD, enemigosConfig.ANCHO, enemigosConfig.ALTO, enemigosConfig.OFFSETX, enemigosConfig.OFFSETY );
        
            this.physics.add.collider(enemigos, this.capaPlataformasMapaNivel);    
            this.physics.add.overlap(this.jugador, enemigos, this.jugador.enemigoToca, null, this);
            
            //Añade los enemigos al array
            this.grupoEnemigos.push(enemigos);

        });
    }

    /**
     * Crea plataformas móviles en movimiento verticales y horizontales
     */
     creaPlataformasMoviles(plataformaMovilID: string, velocidadPlataformaMovil: number): void{
        this.plataformasMovilesH = new PlataformasMoviles(this, Constantes.MAPAS.PLATAFORMASMOVILES,plataformaMovilID, velocidadPlataformaMovil, true);
        this.plataformasMovilesV = new PlataformasMoviles(this, Constantes.MAPAS.PLATAFORMASMOVILES, plataformaMovilID, velocidadPlataformaMovil, false);

        this.physics.add.collider(this.jugador, [this.plataformasMovilesH,this.plataformasMovilesV] );
        this.physics.add.collider(this.capaPlataformasMapaNivel, [this.plataformasMovilesH,this.plataformasMovilesV]);    

    }


    /**
    * Crea grupos de recolectables y los configura para que colisionen con el jugador.
    * El nombre de la capa del mapa se tiene que llamar 'recolectables'
    */
    creaRecolectables(recolectablesConfig: any[]): void{
        recolectablesConfig.forEach(enemigosConfig => {
            let recolectables  = new Recolectables(this,Constantes.MAPAS.RECOLECTABLES, enemigosConfig.ID, enemigosConfig.ANIM);
            this.physics.add.overlap(this.jugador, recolectables, this.jugador.recolecta, null, this);

        });
    }

    update(time: number, delta: number): void{
        
        //Movimiento scroll del fondo 
        this.imagenFondo.tilePositionY -= 0.4 ;

        //Actualiza Manejador del jugador
        this.jugador.update();
        this.grupoEnemigos.forEach(enemigos => {
            enemigos.update();
        });
        this.plataformasMovilesH.update();
        this.plataformasMovilesV.update();

        //Gestión del tiempo
        //Resta segundos empleados en cada Level  
        if ((this.segundos != Math.floor(Math.abs(time / 1000)) ) && !this.tiempoAgotado ) {
            this.segundos = Math.floor(Math.abs(time / 1000));
            this.tiempoRestante--;                     

            let minutos: number = Math.floor(this.tiempoRestante / 60);                
            let segundos: number = Math.floor(this.tiempoRestante - (minutos * 60));                

            let textoReloj: string = Phaser.Utils.String.Pad(minutos,2,'0',1) + ":" + Phaser.Utils.String.Pad(segundos,2,'0',1);
            this.registry.set(Constantes.REGISTRO.RELOJ, textoReloj);
            this.events.emit(Constantes.EVENTOS.RELOJ);
            
            if (this.tiempoRestante == 0){ //Game over si se acaba el tiempo                  
                this.tiempoAgotado = true;                                  
            }            
        }

        //Volver a menú
        if (this.vidas === 0 || this.tiempoAgotado ) this.finalizaNivel(false);

    }
}