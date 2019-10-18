function init(){
	const characters = {
	"bernice" : "Bernice",
	"boris-and-natasha" : "Boris and Natasha",
	"britney-and-britney" : "Britney and Britney",
	"cecile" : "Cecile",
	"daisy-lee" : "Daisy Lee",
	"donna" : "Donna",
	"ezmyr-and-wilde" : "Ezmyr and Wilde",
	"geraldine" : "Geraldine",
	"luke-and-stew" : "Luke and Stew",
	"rick-and-junebug" : "Rick and Junebug"
	};

	var soundsLoaded = 0;

	function showGallery(){
		$('#gallery').append($("#credits").html());
		$("#loader").fadeOut(1000,function(){
			$(".after-loading").fadeIn(500);
		});
	}

	function stopAll(){
		$("audio").each(function(){
			$(this)[0].pause();
			$(this)[0].currentTime = 0;
		})
	}

	$.each(characters, function(cid, name) {
    	//create the audio
    	var $audio = $("<audio>", {src: "audio/sample.m4a"});
    	console.log($audio);
    	$audio[0].load();
    	$audio.on('canplaythrough', function(){
    		soundsLoaded ++;
    		console.log(cid + " loaded");
    	});
    	$audio.on('end', function(){
    		this.parent.removeClass('playing');
    	})

		//create the image
		var $img = $("<img>", {src: "img/thumbs/" + cid +".jpg"});

		//create the label
		var $label = $("<div>", {class: "label"});
		$label.text(name);

		//create the box and add the content
		var $box = $("<div>", {id: cid, class: "col-6 col-md-4 col-lg-3 box character"});
		$box.append($img);
		$box.append($label);
		$box.append($audio);

		//add box to container
		$('#gallery').append($box);
	});

	// handle clicks on a character
	$(".character").click(function(){
		var $char = $(this);
		var cid = $char.attr('id');
		stopAll();

		if( $char.hasClass('playing') ){
			$char.removeClass('playing');
		}else{
			$(".character").removeClass("playing");

			$char.children("audio")[0].play();
			$char.addClass('playing');
		}
	});

	//display gallery once images and sounds are loaded
	$('#gallery').imagesLoaded( function() {
		var loadChecker = setInterval(function(){
			if (soundsLoaded == Object.keys(characters).length){
				showGallery();
				clearInterval(loadChecker);
			}
		}, 300);
	});
}


$( document ).ready(function() {
    init();
});