import Constantes from '../constantes';

export default class Carga extends Phaser.Scene{

    private width: number;
    private height: number;

    //Barra de Carga
    private barraCarga: Phaser.GameObjects.Graphics;
    private barraProgreso: Phaser.GameObjects.Graphics;

    constructor(){
        super(Constantes.ESCENAS.CARGA);
    }

    preload(): void{
        this.cameras.main.setBackgroundColor('rgba(187,146,226,1)');
        this.creaBarras();
        
        //Listener mientras se cargan los assets
        this.load.on(
            'progress',
            function (value: number) {
              this.barraProgreso.clear();
              this.barraProgreso.fillStyle(0xFFD600, 1);
              this.barraProgreso.fillRect(
                this.cameras.main.width / 4,
                this.cameras.main.height / 2 - 16,
                (this.cameras.main.width / 2) * value,
                16
              );
            },
            this
        );

        //Listener cuando se hayan cargado todos los Assets  
        this.load.on('complete', function () {

            this.width = this.cameras.main.width;
            this.height = this.cameras.main.height;

            //Carga Fuente
            const fuenteJSON = this.cache.json.get(Constantes.FUENTES.JSON);
            this.cache.bitmapFont.add(Constantes.FUENTES.BITMAP, Phaser.GameObjects.RetroFont.Parse(this, fuenteJSON));

            const fuenteJSON2 = this.cache.json.get(Constantes.FUENTES.JSON2);
            this.cache.bitmapFont.add(Constantes.FUENTES.BITMAP2, Phaser.GameObjects.RetroFont.Parse(this, fuenteJSON2));

            //Cuando se completa la barra de carga, se oculta y aparece el botón de Inicio
            this.barraCarga.setAlpha(0);
            this.barraProgreso.setAlpha(0);

            //Botoón de Inicio
            const inicioTxt: Phaser.GameObjects.BitmapText = this.add.bitmapText( 0, 0, Constantes.FUENTES.BITMAP, Constantes.ESCENAS.INICIO, 50).setInteractive();
            inicioTxt.setX((this.width/2) - (inicioTxt.width/2));
            inicioTxt.setY((this.height/2) - (inicioTxt.height/2));
            
            inicioTxt.on('pointerdown', () => { 
                window.focus();
                //Carga Menú
                this.scene.start(Constantes.ESCENAS.MENU);
            });
            
            },
            this
        );

        this.cargaAssets();
    }

    cargaAssets() {

        this.load.path = 'assets/';

        //Carga los assets del juego
        this.load.image(Constantes.MENU.TITULO, 'vertigo.png'); 

        //HUD
        this.load.image(Constantes.HUD.VIDAS, 'imagenes/objetos/vidas.png');
        this.load.image(Constantes.HUD.PUNTOS, 'imagenes/objetos/puntos.png');

        //Mapas
        this.load.tilemapTiledJSON(Constantes.MAPAS.NIVEL1.TILEMAPJSON, 'niveles/nivel1.json');
        this.load.tilemapTiledJSON(Constantes.MAPAS.NIVEL2.TILEMAPJSON, 'niveles/nivel2.json');
        this.load.tilemapTiledJSON(Constantes.MAPAS.NIVEL3.TILEMAPJSON, 'niveles/nivel3.json');
        this.load.tilemapTiledJSON(Constantes.MAPAS.NIVEL4.TILEMAPJSON, 'niveles/nivel4.json');
  
        this.load.image(Constantes.MAPAS.TILESET, 'niveles/nivelestileset.png');
        
        //Fondo
        this.load.image(Constantes.FONDOS.MENU, 'imagenes/fondos/Menu.png');
        this.load.image(Constantes.FONDOS.NIVEL1, 'imagenes/fondos/Jungla.png');
        this.load.image(Constantes.FONDOS.NIVEL2, 'imagenes/fondos/Hielo.png');     
        this.load.image(Constantes.FONDOS.NIVEL3, 'imagenes/fondos/Ruinas.png');   
        this.load.image(Constantes.FONDOS.NIVEL4, 'imagenes/fondos/Ciudad.png');      
        this.load.image(Constantes.FONDOS.CIELO, 'imagenes/fondos/Cielo.png');
        this.load.image(Constantes.FONDOS.EDIFICIO, 'imagenes/fondos/Edificio.png');  
  
        //Fuentes                
        this.load.json(Constantes.FUENTES.JSON, 'fuentes/fuente.json');
        this.load.image(Constantes.FUENTES.IMAGEN, 'fuentes/imagenFuente.png');
        this.load.json(Constantes.FUENTES.JSON2, 'fuentes/fuente2.json');
        this.load.image(Constantes.FUENTES.IMAGEN2, 'fuentes/imagenFuente2.png');

        //Jugador
        this.load.atlas(Constantes.JUGADOR.ID, 'imagenes/jugador/goji.png', 'imagenes/jugador/goji.json');
        this.load.image(Constantes.OBJETOS.MUERTO, 'imagenes/objetos/muerto.png');
        this.load.image(Constantes.OBJETOS.GANA, 'imagenes/objetos/gana.png');
    
        //ObjetoFinal
        this.load.spritesheet(Constantes.RECOLECTABLES.FINAL.ID, 'imagenes/objetos/final.png', { frameWidth: 64, frameHeight: 64 });
    
        //Enemigos
        this.load.spritesheet(Constantes.ENEMIGOS.CAMALEON.ID, 'imagenes/enemigos/camaleon.png', { frameWidth: 42, frameHeight: 38 });
        this.load.spritesheet(Constantes.ENEMIGOS.RINO.ID, 'imagenes/enemigos/rino.png', { frameWidth: 52, frameHeight: 34 });
        this.load.spritesheet(Constantes.ENEMIGOS.MOSQUITO.ID, 'imagenes/enemigos/mosquito.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet(Constantes.ENEMIGOS.OGRO.ID, 'imagenes/enemigos/ogro.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet(Constantes.ENEMIGOS.OSO.ID, 'imagenes/enemigos/oso.png', { frameWidth: 48, frameHeight: 32 });
        this.load.spritesheet(Constantes.ENEMIGOS.PIG.ID, 'imagenes/enemigos/pig.png', { frameWidth: 36, frameHeight: 30 });
        this.load.spritesheet(Constantes.ENEMIGOS.FUEGO.ID, 'imagenes/enemigos/fuego.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet(Constantes.ENEMIGOS.GHOST.ID, 'imagenes/enemigos/ghost.png', { frameWidth: 44, frameHeight: 30 });
        this.load.spritesheet(Constantes.ENEMIGOS.ROCA.ID, 'imagenes/enemigos/roca.png', { frameWidth: 38, frameHeight: 34 });
        this.load.spritesheet(Constantes.ENEMIGOS.BIRD.ID, 'imagenes/enemigos/bird.png', { frameWidth: 40, frameHeight: 48 });
        this.load.spritesheet(Constantes.ENEMIGOS.PLANTA.ID, 'imagenes/enemigos/planta.png', { frameWidth: 44, frameHeight: 42 });
        this.load.spritesheet(Constantes.ENEMIGOS.SLIME.ID, 'imagenes/enemigos/slime.png', { frameWidth: 44, frameHeight: 30 });
        
        //Explosión
        this.load.spritesheet(Constantes.ENEMIGOS.EXPLOSION.ID, 'imagenes/enemigos/explosion.png', { frameWidth: 112, frameHeight: 128 });

        //Plataformas móviles
        this.load.image(Constantes.PLATAFORMAMOVIL.NIVEL1.ID, 'imagenes/objetos/platformamovil.png');
        this.load.image(Constantes.PLATAFORMAMOVIL.NIVEL2.ID, 'imagenes/objetos/platformamovil2.png');
        this.load.image(Constantes.PLATAFORMAMOVIL.NIVEL3.ID, 'imagenes/objetos/platformamovil3.png');
        this.load.image(Constantes.PLATAFORMAMOVIL.NIVEL4.ID, 'imagenes/objetos/platformamovil4.png');
      
        //Sonidos
        this.load.audio(Constantes.SONIDOS.EFECTOS.SALTAR, 'sonidos/efectos/saltar.ogg');
        this.load.audio(Constantes.SONIDOS.EFECTOS.CAERSOBREENEMIGO, 'sonidos/efectos/caersobre.ogg');
        this.load.audio(Constantes.SONIDOS.EFECTOS.QUITARVIDA, 'sonidos/efectos/vida.ogg');
        this.load.audio(Constantes.SONIDOS.EFECTOS.RECOLECTAR, 'sonidos/efectos/recolectar.ogg'); 
        this.load.audio(Constantes.SONIDOS.EFECTOS.RECUPERA, 'sonidos/efectos/recupera.ogg'); 
        this.load.audio(Constantes.SONIDOS.EFECTOS.OPCION, 'sonidos/efectos/opcion.ogg'); 
        this.load.audio(Constantes.SONIDOS.EFECTOS.GAMEOVER, 'sonidos/efectos/gameover.ogg'); 
        this.load.audio(Constantes.SONIDOS.EFECTOS.WIN, 'sonidos/efectos/win.ogg'); 
        for (let i=0; i<=4; i++)
            this.load.audio(Constantes.SONIDOS.BANDASONORA + i, `sonidos/bandasonora/cartoongame${i}.ogg`);
        
        //Recolectables
        this.load.spritesheet(Constantes.RECOLECTABLES.ORO.ID, 'imagenes/objetos/oro.png', {frameWidth:16, frameHeight:16});
        this.load.spritesheet(Constantes.RECOLECTABLES.JOYA.ID, 'imagenes/objetos/joya.png', {frameWidth:18, frameHeight:14});
        this.load.spritesheet(Constantes.RECOLECTABLES.CORAZON.ID, 'imagenes/objetos/corazon.png', {frameWidth:18, frameHeight:14});

        //Ajustes
        this.load.image(Constantes.AJUSTES.SONIDOON, 'imagenes/objetos/sonidoon.png');  
        this.load.image(Constantes.AJUSTES.SONIDOOFF, 'imagenes/objetos/sonidooff.png');  
        
        //CONTROLES (Para pantallas táctiles)
        this.load.image(Constantes.CONTROL.SALTO, 'imagenes/control/controlSalto.png');        
        this.load.image(Constantes.CONTROL.DERECHA, 'imagenes/control/controlDcha.png');
        this.load.image(Constantes.CONTROL.IZQUIERDA, 'imagenes/control/controlIzda.png');      

    }

    //Método que crea las barras de progreso
    private creaBarras(): void {
        this.barraCarga = this.add.graphics();
        this.barraCarga.fillStyle(0xFFFFFF, 1);
        this.barraCarga.fillRect(
          this.cameras.main.width / 4 - 2,
          this.cameras.main.height / 2 - 18,
          this.cameras.main.width / 2 + 4,
          20
        );
        this.barraProgreso = this.add.graphics();
    }

    create(){
        //Carga ajustes iniciales
        this.registry.set(Constantes.REGISTRO.MUSICA, Constantes.AJUSTES.SONIDOON);
        this.registry.set(Constantes.REGISTRO.EFECTOS, Constantes.AJUSTES.SONIDOON);
  
    }
}