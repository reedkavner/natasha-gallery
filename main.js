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

	var sounds = {};

	var soundsLoaded = 0;

	function stopAll(){
		var cid;
		for (cid in sounds){
			sounds[cid].stop();
		}
	}

	function showGallery(){
	$('#gallery').append($("#credits").html());
	$("#loader").fadeOut(1000,function(){
		$(".after-loading").fadeIn(500);
	});
	}

	$.each(characters, function(cid, name) {
		// load sound into sound array
		sounds[cid] = new Howl({
      		src: ['audio/sample.m4a'],
      		onend: function(){
      			$('#'+cid).removeClass('playing');
      		},
      		onload: function(){
      			console.log(cid + " loaded");
      			soundsLoaded ++;
      		}
    	});

		//create the image
		var $img = $("<img>", {src: "img/thumbs/" + cid +".jpg"});

		//create the label
		var $label = $("<div>", {class: "label"});
		$label.text(name);

		//create the box and add the content
		var $box = $("<div>", {id: cid, class: "col-6 col-md-4 col-lg-3 box character"});
		$box.append($img);
		$box.append($label);

		//add box to container
		$('#gallery').append($box);
	});

	// handle clicks on a character
	$(".character").click(function(){
		var $char = $(this);
		var cid = $char.attr('id');
		if( $char.hasClass('playing') ){
			sounds[cid].stop();
			$char.removeClass('playing');
		}else{
			// stop all songs
			stopAll();
			$(".character").removeClass("playing");

			sounds[cid].play();
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