define( [

	"dat/gui/GUI"

], function( GUI ) {

	var gui = new GUI();

	var options = {
		tileSize: 80,
		color: "#4fb0ca",
		randomColor: true
	};

	gui.add( options, "tileSize", 20, 200 ).name( "Tile Size" );
	gui.addColor( options, "color" ).name( "Color" );
	gui.add( options, "randomColor" ).name( "Random Color" );

	return options;

} );