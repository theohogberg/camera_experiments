requirejs.config({
	baseUrl:'src',
	paths:{
	}
});

requirejs(['pixutl', 'domReady'], function (pixutl, domReady) {
  domReady(function () {


	var streaming = false,
	video        = document.querySelector('#video'),
	canvas       = document.querySelector('#canvas'),
    photo        = document.querySelector('#photo'),
	startbutton  = document.querySelector('#startbutton'),
	context      = canvas.getContext('2d'),
	width = 320,
	height = 0;
	window.GREY = true; //global greyscale trigger
 
	navigator.getMedia = ( navigator.getUserMedia ||
		navigator.webkitGetUserMedia ||
		navigator.mozGetUserMedia ||
		navigator.msGetUserMedia);

	navigator.getMedia(
	{
		video: true,
		audio: false
	},
	function(stream) {
		if (navigator.mozGetUserMedia) {
			video.mozSrcObject = stream;
		} else {
			var vendorURL = window.URL || window.webkitURL;
			video.src = vendorURL ? vendorURL.createObjectURL(stream) : stream;
		}
		video.play();
	},
	function(err) {
		console.log("An error occured! " + err);
	}
	);

	video.addEventListener('canplay', function(ev){
		if (!streaming) {
			height = video.videoHeight / (video.videoWidth/width);
			video.setAttribute('width', width);
			video.setAttribute('height', height);
			canvas.setAttribute('width', width);
			canvas.setAttribute('height', height);
		}
	}, false);
	
	video.addEventListener('play',function() {

		var i = window.setInterval(function() {
			
			context.drawImage(video, 0, 0, canvas.width, canvas.height);
			
			var imageData = context.getImageData(0, 0, canvas.width, canvas.height);

			pixutl.executeFnSquare(imageData, 8, function(imageData, sq_size, k, l){

				var rgba = [0,0,0,0];	
				pixutl.drawRectCustom(imageData, k*sq_size, l*sq_size, (k+1)*sq_size, (l+1)*sq_size, function(imageData, x, y){
					var index = (x + y * imageData.width) * 4;
					if (window.GREY) {
						var g = (imageData.data[index]
								 +imageData.data[index+1]
								 +imageData.data[index+2]
								 // +imageData.data[index+3]
								 )/4; 
						rgba[0] += g;
						rgba[1] += g;
						rgba[2] += g;
						// rgba[3] += g;
					} else {
						rgba[0] += imageData.data[index];
						rgba[1] += imageData.data[index+1];
						rgba[2] += imageData.data[index+2];
						rgba[3] += imageData.data[index+3];
					}
				});

				// if (grey) {
				// };

				pixutl.drawRectCustom(imageData, k*sq_size, l*sq_size, (k+1)*sq_size, (l+1)*sq_size, function(imageData, x, y){
					var index = (x + y * imageData.width) * 4;
					imageData.data[index]   = rgba[0]/(k+l)|1;
					imageData.data[index+1] = rgba[1]/(k+l)|1;
					imageData.data[index+2] = rgba[2]/(k+l)|1;
					// imageData.data[index+3] = rgba[3]/(k+l)|1;
				});

			});

			context.putImageData(imageData, 0, 0);

		},
		25);

	},false);
	

	startbutton.onclick=function(){
		var data = canvas.toDataURL('image/png');
		photo.setAttribute('src', data);		
	}



  });
});