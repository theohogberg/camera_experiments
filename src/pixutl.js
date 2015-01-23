define(['llib'],function (llib) {

	function drawRectCustom (imageData, sx, sy, dx, dy, fn){

		var setPixelLast = llib.addArgFirst(setPixel, imageData);		
		
		for (var x = sx; x < dx; x++) {

			for (var y = sy; y < dy; y++) {

				if (llib.isFunction(fn)) {
					
					fn(imageData, x, y);

				} else {

					setPixelLast.apply(null, [x,y].concat(fn) );

				}

			}

		}

	}

	function executeFnSquare (imageData, sq_size, fn) {
		for (var k=0; k < imageData.width/sq_size; k++) {
			for (var l=0; l < imageData.width/sq_size; l++) {

				fn(imageData, sq_size, k, l);

			}
		}
	}

	function setPixel(imageData, x, y, r, g, b, a) {
		var index = (x + y * imageData.width) * 4;
		imageData.data[index+0] = r;
		imageData.data[index+1] = g;
		imageData.data[index+2] = b;
		imageData.data[index+3] = a;
	}


	return {
		drawRectCustom:drawRectCustom,
		executeFnSquare:executeFnSquare,
		setPixel:setPixel
	};

});



