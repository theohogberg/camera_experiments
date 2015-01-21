define(function () {

	function drawOrModifyRect (imageData, sx, sy, dx, dy, fn){
		for (var x = sx; x < dx; x++) {
			for (var y = sx; y < dy; y++) {
				if (typeof fn === 'function') {
					fn(imageData, x, y);
				} else {
					setPixel.call(null, imageData, fn);
				}
			}
		}
	};

	function setPixel(imageData, x, y, r, g, b, a) {
		index = (x + y * imageData.width) * 4;
		imageData.data[index+0] = r;
		imageData.data[index+1] = g;
		imageData.data[index+2] = b;
		imageData.data[index+3] = a;
	};

	return {
		drawOrModifyRect : drawOrModifyRect
	};

});



