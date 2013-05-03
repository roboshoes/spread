define( function() {

	var values = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f" ];

	return function() {
		var color = "#", i = 7;

		while ( --i ) color += values[ ~~( Math.random() * 16 ) ];

		return color;
	}

} );