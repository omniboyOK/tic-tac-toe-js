// ==============================================================================
// TA-TE-TI hecho con panda.js en Panda 2 # Por Omniboy
// ==============================================================================
game.module(
    'game.main'
)
.body(function() {
// ------------------------------------------------------------------------------
// Precarga de mis imagenes
// ------------------------------------------------------------------------------
game.addAsset('back.png');
game.addAsset('circle.png');
game.addAsset('cross.png');
game.addAsset('field.png');
game.addAsset('repeat.png');
// ==============================================================================
// Clase Main de mi juego
// ==============================================================================
game.createScene('Main', {
// Color de fondo para la escena
    backgroundColor: '#b2dcef',
// Mi constructor
    init: function() {
// Variable para saber si el jugador es X o O
        this.p1 = true;
// Propiedades de mi efecto parallax
        this.addParallax(0,'back.png', -50);
// Contenedor del juego
        var boardLayer = new game.Container();
// Agregamos nuestro stage a este container junto a sus objetos
        boardLayer.addTo(this.stage);
// Instanciamos las propiedades del tablero
        this.newBoard = new game.Board();
        },
// ------------------------------------------------------------------------------
// Agregamos nuestro objeto de fondo al stage
// ------------------------------------------------------------------------------
    addParallax: function(y, image, speed) {
        var parallax = new game.ParallaxSprite(image);
        parallax.position.y = y;
        parallax.speed.x = speed;
        parallax.addTo(this.stage);
        },
});
// ==============================================================================
// Clase del objeto que representara nuestro fondo
// ==============================================================================
game.createClass('ParallaxSprite', 'TilingSprite', {
    init: function() {
        this.speed = new game.Vector();
    },
// Actualiza la posicion de nuestra imagen segun la velocidad que definamos
    update: function() {
        this.tilePosition.x += this.speed.x * game.delta;
        this.tilePosition.y += this.speed.y * game.delta;
    },
});
// ==============================================================================
// Clase del Tablero
// ==============================================================================
game.createClass('Board', {
	init: function() {
// ------------------------------------------------------------------------------
// Dibujamos el boton reset en nuestro tablero
// ------------------------------------------------------------------------------
    this.button = new game.Button(550, 20);
// ------------------------------------------------------------------------------	    
// Dibujamos la posicion de cada casilla en la pantalla, nuestro tablero.
// ------------------------------------------------------------------------------
    this.fieldA1 = new game.Field(30,200);
    this.fieldA2 = new game.Field(258,200);
    this.fieldA3 = new game.Field(486,200);
    this.fieldB1 = new game.Field(30, 428);
    this.fieldB2 = new game.Field(258, 428);
    this.fieldB3 = new game.Field(486, 428);
    this.fieldC1 = new game.Field(30, 656);
    this.fieldC2 = new game.Field(258, 656);
    this.fieldC3 = new game.Field(486, 656);
// ------------------------------------------------------------------------------
// Variables para verificar fichas y casilleros ocupados
// ------------------------------------------------------------------------------
    var chess = "O";
    this.A1 = 0;
    this.A2 = 0;
    this.A3 = 0;
    this.B1 = 0;
    this.B2 = 0;
    this.B3 = 0;
    this.C1 = 0;
    this.C2 = 0;
    this.C3 = 0;
    },
});
// ==============================================================================	
// Clase de las Casillas
// ==============================================================================
game.createClass('Field',{
// ------------------------------------------------------------------------------
// Le paso las variables x,y a mi constructor para instanciarlo ya en posicion
// ------------------------------------------------------------------------------
    init: function(posx, posy) {
// ------------------------------------------------------------------------------
// La casilla tiene 3 frames, vacia, con O ó con X
// Segun su estado cambia su frame sin necesidad de crear otro objeto
// ------------------------------------------------------------------------------
        this.field = new game.Animation(
            ['field.png',
            'circle.png',
            'cross.png'])
// ------------------------------------------------------------------------------
// Variable interactive hace nuestra casilla interactiva con los input
// ------------------------------------------------------------------------------
        this.field.interactive = true;
        this.field.position.y = posy;
        this.field.position.x = posx;
        this.field.addTo(game.scene.stage);
        this.field.click = this.click.bind(this);
        this.selected = false;       
        },
// ------------------------------------------------------------------------------
// Funcion para reconocer los clicks del mouse en el objeto
// ------------------------------------------------------------------------------
    click: function(){
// ------------------------------------------------------------------------------
// En cada click a una casilla comprueba si esta ocupada
// Luego la ocupa segun el jugador y cambia de jugador
// ------------------------------------------------------------------------------
        if(this.selected)return;
        game.scene.p1 = !game.scene.p1;
// ------------------------------------------------------------------------------
        if ( !this.selected && game.scene.p1 )
            this.field.gotoFrame(1);
        else
            this.field.gotoFrame(2);
        
        this.selected = !this.selected;
        }
});
// ==============================================================================	
// Clase del Boton Reset
// ==============================================================================
game.createClass('Button',{
    // ------------------------------------------------------------------------------
    // Le paso las variables x,y a mi constructor para instanciarlo ya en posicion
    // ------------------------------------------------------------------------------
        init: function(posx, posy) {
            this.button = new game.Sprite('repeat.png');
    // ------------------------------------------------------------------------------
    // Variable interactive hace nuestra casilla interactiva con los input
    // ------------------------------------------------------------------------------
            this.button.interactive = true;
            this.button.position.y = posy;
            this.button.position.x = posx;
            this.button.addTo(game.scene.stage);
            this.button.click = this.click.bind(this);
    // ------------------------------------------------------------------------------       
        },
    // ------------------------------------------------------------------------------
    // Funcion para reconocer los clicks del mouse en el objeto
    // ------------------------------------------------------------------------------
        click: function(){
            game.system.setScene('Main');
            }
});
});