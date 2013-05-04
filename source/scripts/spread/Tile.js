define( [

	"spread/config/options",
	"spread/config/orientation",
	"spread/utils/random"

], function( options, orientation, random ) {

	function Tile( x, y, color, onComplete ) {

		var div, inlay;
		var neighbors = [];
		var isShown = false;

		function initUI() {

			div = document.createElement( "div" );
			div.className = "tile";
			div.style.width = options.tileSize + "px";
			div.style.height = options.tileSize + "px";
			div.style.top = y * options.tileSize + "px";
			div.style.left = x * options.tileSize + "px";

			inlay = document.createElement( "div" );
			inlay.className = "inlay";
			inlay.style.backgroundColor = color;

			cover = document.createElement( "div" );
			cover.className = "cover";

			div.appendChild( inlay );
			inlay.appendChild( cover );

		}

		// ------
		// PUBLIC
		// ------

		this.isShown = function() {
			return isShown;
		}

		this.getElement = function() {
			return div;
		}

		this.addNeighbor = function( direction, neighbor ) {
			neighbors[ direction ] = neighbor;
		}

		this.fromTop = function() {
			div.classList.add( "from-top" );
			show();
		}

		this.fromBottom = function() {
			div.classList.add( "from-bottom" );
			show();
		}

		this.fromRight = function() {
			div.classList.add( "from-right" );
			show();
		}

		this.fromLeft = function() {
			div.classList.add( "from-left" );
			show();
		}

		function onTransitionEnd() {

			for ( var i = 0; i < neighbors.length; i++ ) {

				if ( neighbors[ i ] && ! neighbors[ i ].isShown() ) {

					neighbors[ i ][ getFunctionName( i ) ]();

					setTimeout( onTransitionEnd, random( 10, 200 ) );
					break;

				}

			}

		}

		// -------
		// PRIVATE
		// -------

		function getFunctionName( index ) {
			return [ "fromBottom", "fromLeft", "fromTop", "fromRight" ][ index ];
		}

		function show() {
			isShown = true;

			setTimeout( function() {

				inlay.classList.add( "show" );

				setTimeout( onTransitionEnd, random( 200, 300 ) );
				setTimeout( onComplete, 300 );

			}, 50 );
		}

		initUI();

	}

	return Tile;

} );