requirejs.config({
	baseUrl:'src',
	paths:{
	}
});

requirejs(['pixelutil'], function (pixelutil) {

	var streaming = false,
	video        = document.querySelector('#video'),
	canvas       = document.querySelector('#canvas'),
	startbutton  = document.querySelector('#startbutton'),
	context      = canvas.getContext('2d'),
	width = 320,
	height = 0;

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
		var i = window.setTimeout(function() {
		// var i = window.setInterval(function() {

			context.drawImage(video, 0, 0, canvas.width, canvas.height);
			var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
		
			pixelutil.drawOrModifyRect(imageData, 0, 0, 3, 3, [255, 255, 0, 255]);
		
			context.putImageData(imageData, 0, 0);

		},50);
	},false);




});