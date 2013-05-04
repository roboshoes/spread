define( [

	"spread/config/options",
	"spread/config/orientation",
	"spread/utils/color",
	"spread/Tile"

], function( options, orientation, color, Tile ) {

	return function( container, size, position ) {

		var width = Math.ceil( size.width / options.tileSize );
		var height = Math.ceil( size.height / options.tileSize );
		var tiles = [];
		var onComplete = null;
		var completeCount = 0;
		var tileColor = options.randomColor ? color() : options.color;

		function init() {
			fillScreen();
			snowball();
		}

		// ------
		// PUBLIC
		// ------

		this.onComplete = function( closure ) {
			onComplete = closure
		}

		this.getColor = function() {
			return tileColor;
		}

		// -------
		// PRIVATE
		// -------

		function fillScreen() {

			var tile;
			var length = width * height;

			for ( var y = 0; y < height; y++ ) {
				for ( var x = 0; x < width; x++ ) {

					tile = new Tile( x, y, tileColor, tileComplete );

					container.appendChild( tile.getElement() );

					tiles.push( tile );

				}
			}

			for ( var i = 0; i < length; i++ ) {

				tile = tiles[ i ];
				row = ~~( i / width );
				col = i % width;

				if ( col < width - 1 )
					tile.addNeighbor( orientation.RIGHT, tiles[ i + 1 ] );

				if ( col > 0 )
					tile.addNeighbor( orientation.LEFT, tiles[ i - 1 ] );

				if ( row > 0 )
					tile.addNeighbor( orientation.TOP, tiles[ i - width ] );

				if ( row < height - 1 )
					tile.addNeighbor( orientation.BOTTOM, tiles[ i + width ] );
			}
		}

		function snowball() {

			var row = ~~( position.y / options.tileSize );
			var col = ~~( position.x / options.tileSize );

			tiles[ col + row * width ].fromTop();
		}

		function tileComplete() {
			completeCount++;

			if ( completeCount === tiles.length && onComplete ) {
				onComplete();
			}
		}

		init();

	};

} );