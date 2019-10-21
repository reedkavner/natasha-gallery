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

	function showGallery(){
		$('#gallery').append($("#credits").html());
		$("#loader").fadeOut(1000,function(){
			$(".after-loading").fadeIn(500);
		});
	}

	function stopAll(){
		$("audio").each(function(){
			$(".character").removeClass("playing");
			$(this)[0].pause();
			$(this)[0].currentTime = 0;
		});
	}

	var soundsLoaded = 0;
	var allLoaded;
	if (navigator.userAgent.indexOf("Firefox") === -1){
		allLoaded = false;
	}else{
		// terrible hack to make firefox work
		allLoaded = true;
	}
	console.log(allLoaded);

	function newSoundLoaded(cid){
		if (allLoaded === false){
			soundsLoaded += 1;
    		console.log(cid + " loaded");
    		if (soundsLoaded === Object.keys(characters).length){
    			allLoaded = true;
    		}
		}
	}

	$.each(characters, function(cid, name) {
    	//create the audio
    	var $audio = $("<audio>");
    	$audio.append($("<source>", {type: "audio/webm", src: "audio/" + cid + ".webm"}));
    	$audio.append($("<source>", {type: "audio/m4a", src: "audio/" + cid + ".m4a"}));
    	$audio.append($("<source>", {type: "audio/mp3", src: "audio/" + cid + ".mp3"}));
    	$audio.on('canplaythrough', function(){
    		newSoundLoaded(cid);
    	});
    	$audio.on('ended', function(){
    		$(this).parent().removeClass('playing');
    	});

		//create the image
		var $img = $("<img>", {src: "img/thumbs/" + cid +".jpg"});

		//create the label
		var $label = $("<div>", {class: "label"});
		$label.text(name);

		//create the box and add the content
		var $box = $("<div>", {
			id: cid, 
			class: "col-6 col-md-4 col-lg-3 box character"});
		$box.append($img);
		$box.append($label);
		$box.append($audio);

		//add box to container
		$('#gallery').append($box);
		console.log('loading ' + cid);
		$audio[0].load();
	});

	// handle clicks on a character
	$(".character").click(function(){
		var $char = $(this);
		var cid = $char.attr('id');
		stopAll();
		
		$.featherlight("img/big/" +cid+".jpg", {
			beforeClose: stopAll,
			afterContent: function(){
				$char.children("audio")[0].play();
				$char.addClass('playing');
			}
		});

		gtag('event', "click", {
  		'event_category': "character photo",
  		'event_label': cid
		});


	});

	//display gallery once images and sounds are loaded
	$('#gallery').imagesLoaded( function() {
		var loadChecker = setInterval(function(){
			if (allLoaded === true){
				showGallery();
				clearInterval(loadChecker);
			}
		}, 300);
	});
}


$( document ).ready(function() {
    init();
});