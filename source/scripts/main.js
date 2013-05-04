require.config( {

	urlArgs: "bust=" +  Date.now(),

	paths: {
		text: "libs/require/plugin.text",
		dat: "libs/dat"
	}

} );

require( [ "spread/Controller" ], function( Flip ) {

	var container = document.getElementById( "container" );

	document.addEventListener( "click", onClick );

	function onClick( event ) {

		var div = document.createElement( "div" );

		var size = {
			width: window.innerWidth,
			height: window.innerHeight
		}

		var position = {
			x: event.pageX,
			y: event.pageY
		}

		var flip = new Flip( div, size, position );

		flip.onComplete( function() {

			document.body.style.backgroundColor = flip.getColor();
			container.removeChild( div );

		} );

		container.appendChild( div );

	}

} );