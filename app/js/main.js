'use strict';

(function(){
$(function(){




	// FANCYBOX
	if( $("[data-fancybox='gallery']").length != 0 )
		$("[data-fancybox='gallery']").fancybox({
			afterShow : function( instance, current ) {
			},
			transitionEffect: "zoom-in-out"
		});

	//WOW
	new WOW({
		offset: 30
	}).init();




	// AOS
	AOS.init({
	  offset: 100,
	  once: true,
	  duration: 1100,
	  delay: 150
	});

	setTimeout(function(){AOS.refresh()}, 1000);



	$("#min-menu").mmenu({
		extensions 	: [ 
									"fullscreen", 
									//"theme-black", 
									//"listview-50", 
									"fx-panels-slide-up", 
									"fx-listitems-drop", 
									"border-offset" ,
			            "position-front",
			            "position-bottom"
         
									],
		navbar 			: 
								{
									title 		: "Меню"
								},
		navbars		: [{
			height 	: 2,
			content : [ 
									'<div class="close-btn bar">'+
									'<a  href="#page" ><span class="icon-bar"></span><span class="icon-bar"></span></a>'+
									'</div>'
								]
					}, 
			{
				content : ["prev","title"] 
			}]
		}, { });





  // Flikity Carousel
	function flickityPrevNext( className ) {
		var carouselWrapper = $( className );
		var carousel = carouselWrapper.find( ".carousel-items" );
		var carouselPrevNext = carouselWrapper.find( ".carousel-prev-next" );
		var btnNext = carouselPrevNext.find(".next");
		var btnPrev = carouselPrevNext.find(".prev");
		var flkty = carousel.data("flickity");
		var selected;
		btnNext.on( 'click', function() {
			carousel.flickity('next', true);
		});
		
		btnPrev.on( 'click', function() {
			carousel.flickity('previous', true);
		});
		carousel.on( 'select.flickity', function() {
			selected = $(flkty.selectedElement);
			//console.log( $(selected).addBack() )
			selected.siblings().addBack().removeClass("is-next is-prev");
			selected.next().addClass("is-next");
			selected.prev().addClass("is-prev");
		  	//console.log( $(flkty.selectedElement).next() )
		})


	}


	var arrowStyle = { 
	  x0: 10,
	  x1: 60, y1: 50,
	  x2: 70, y2: 40,
	  x3: 30
	}


	var carouselProductions = $('.short-productions-carousel .carousel-items').flickity({
		imagesLoaded: true,
		autoPlay: false,
		arrowShape: arrowStyle,
		prevNextButtons: false,
		draggable: false,
		selectedAttraction: 0.1,
		friction: 1,
		wrapAround: false,	
		pageDots: false,
		contain: false,
		percentPosition: true,
		cellAlign: !checkSm() ? '0.025' : 'center'
	});
	flickityPrevNext( $('.short-productions-carousel') );

	var carouselPartners = $('.short-partners-carousel .carousel-items').flickity({
		imagesLoaded: true,
		autoPlay: 3000,
		pauseAutoPlayOnHover: true,
		arrowShape: arrowStyle,
		initialIndex: 2,
		prevNextButtons: false,
		draggable: checkSm(),
		wrapAround: null,	
		pageDots: false,
		contain: false,
		percentPosition: true,
		cellAlign: 'center'
	});
	flickityPrevNext( $('.short-partners-carousel') );

	if( !checkSm() ){
		window.carouselTour = $('.tour-carousel .carousel-items').flickity({
			imagesLoaded: true,
			autoPlay: false,
			arrowShape: arrowStyle,
			//cellSelector: '.carousel-cell',
			pauseAutoPlayOnHover: true,
			initialIndex: 1,
			selectedAttraction: 1,
			friction: 1,
			prevNextButtons: false,
			draggable: checkSm(),
			wrapAround: null,	
			pageDots: false,
			contain: false,
			percentPosition: true,
			cellAlign: 'center'
		});
		flickityPrevNext( $('.tour-carousel') );
	}



	if( $('.carousel-article').length >= 0 ){

		var carouselMain = 		$('.carousel-article .carousel-main'),
				carouselNav = 		$('.carousel-article .carousel-nav');

		for( var i = 0 ; i < carouselMain.length ; i++ ){

			var crs = $(carouselMain).eq(i).flickity({
				imagesLoaded: true,
				prevNextButtons: false,
				cellAlign: 'center',
				//friction: 1,
				//selectedAttraction: 1,
				initialIndex: 0,
				draggable: true,
				contain: true,
				pageDots: false
			});
			var flkty = crs.data('flickity');

			// crs.on( 'settle.flickity', function(e) {
			// 	$(flkty.selectedElement).siblings().css("display", "none");
			// })
			// crs.on( 'select.flickity', function(e) {
			// 	$(flkty.selectedElement).css("display", "");
			// })

			$(carouselNav).eq(i).flickity({
				imagesLoaded: true,
				initialIndex: 0,
			  asNavFor: $(carouselMain)[i],
			  prevNextButtons: true,
			  draggable: true,
			  cellAlign: 'center',
			  adaptiveHeight: true,
			  //contain: true,
			  pageDots: false
			});

		}
	}





	function onLoaded  (){
		
		//MASONRY
		if( $('.grid-img').length != 0 ){
		
			var $grid = $('.grid-img').masonry({
			  itemSelector: '.grid-img-item',
			  columnWidth: '.grid-img-sizer',
			  percentPosition: true
			});

		}
	}



	//SCROLL
	var minMenu = $(".header-scroll") || null;
	var headerRange = false;
	$( window ).on("scroll", function(e){

		if( $(window).scrollTop() > 150 && headerRange == false ){
			headerRange = true;
			if ( minMenu ) minMenu.addClass("scrolled").addClass("down");
		}else if( $(window).scrollTop() < 150 && headerRange == true ){
			headerRange = !true;
			if ( minMenu ) minMenu.removeClass("scrolled");
		}//.originalEvent.wheelDelta
	});

	$(window).bind('mousewheel', function(event) {
		if( !headerRange )
			return;
		if (event.originalEvent.wheelDelta >= 0) {
			console.log('Scroll up');
			minMenu.removeClass("up")
		}
		else {			
			console.log('Scroll down');
			minMenu.addClass("up")
		}
	});

	//vi init
	window.vi = $(".vi-btn-toggle").initVi({

		fontSize: 2,		 					// default 2
		bgColor: "black", 				// default white
		imgVisibility: "visible", 	// default hidden
		grayScale: true, 					// default true

		// Callback function
		callOn: function(){				
			//$(".fa.fa-eye").addClass("fa-eye-slash")
		},			
		callOff: function(){
			//$(".fa.fa-eye").removeClass("fa-eye-slash")
		},		
		callToggle: function(){}


	})

	
	window.preLoader = {

		preBox: ".pre-box",
		enter: false,
		status: $(".pre-box").hasClass("in"),

		preToggle: function ( bool, func ) {
			var endtime = 600;
			if( !this.enter ) 
				return;
			if ( typeof func === "function" )
				setTimeout( function() { func(); }, endtime )
			var preBox = $(this.preBox);

			bool || this.status ?
				preBox.removeClass("in").setTimeout( function(){ $( preBox ).hide(); }, endtime )
			:
				preBox.show().addClass("in").find(".box-content");
			
			return this.status = !this.status;

		},


		preImg: function ( img ) {

			var images = 						 		img || document.images,
					imagesTotalCount = 			images.length,
					imagesLoadedCount = 		0,
					preloadPercent = 		 		$(".percent").text("0 %");


			if( imagesTotalCount == 0 ){
				preOnload();
				$(preloadPercent).text("100 %"); 
			}

			for ( var i = 0; i < imagesTotalCount ; i++ ) {
				var image_clone = new Image();
						image_clone.onload = 		image_loaded;
						image_clone.onerror = 	image_loaded;
						image_clone.src = 			images[i].src;
			}

			function preOnload (){
				onLoaded();
			}

			function image_loaded (){
				imagesLoadedCount++;

				var per = ( ( 100 / imagesTotalCount ) * imagesLoadedCount ) << 0 ;

				setTimeout( function(){
					//console.log(per);
					$(preloadPercent).text(  per +  "%"); 
				}, 1)

				if(imagesLoadedCount >= imagesTotalCount )	preOnload();
			}

		}
	}


	preLoader.preImg();






		window.revSlider = $('.rev-slider') || null;
		var bannerSlider =  $('.rev-slider').hasClass("banner-slider") || null;

		onResized(function(){

	  	if( revSlider )
		   revSlider.revolution({
					delay:6000,
					startwidth: checkSm() ? $( window ).width() : checkMd() ? 970 : 1170,
					startheight: checkSm() ? 450 :  bannerSlider ? 700 : $( window ).height(),
					autoHeight:"off",
					fullScreenAlignForce:"off",

					onHoverStop:"on",

					thumbWidth:100,
					thumbHeight:50,
					thumbAmount:3,

					hideThumbsOnMobile:"on",
					hideBulletsOnMobile:"on",
					hideArrowsOnMobile:"on",
					hideThumbsUnderResoluition:0,

					hideThumbs: 300,
					hideTimerBar:"on",

					keyboardNavigation:"off",

					navigationType:"none",
					navigationArrows:"solo",	//solo
					navigationStyle:"round",

					navigationHAlign:"center",
					navigationVAlign:"bottom",
					navigationHOffset: 0,
					navigationVOffset: 30,

					soloArrowLeftHalign:"left",
					soloArrowLeftValign:"center",
					soloArrowLeftHOffset:30,
					soloArrowLeftVOffset:0,

					soloArrowRightHalign:"right",
					soloArrowRightValign:"center",
					soloArrowRightHOffset:30,
					soloArrowRightVOffset:0,


					touchenabled: "off",
					swipe_velocity:"0.7",
					swipe_max_touches:"1",
					swipe_min_touches:"1",
					drag_block_vertical: "false",

					stopAtSlide:-1,
					stopAfterLoops:-1,
					hideCaptionAtLimit:0,
					hideAllCaptionAtLilmit:0,
					hideSliderAtLimit:0,

					fullWidth:"on",
					fullScreen:"on",
					fullScreenOffsetContainer: "#header",

					dottedOverlay:"none",
					forceFullWidth:"off",

		      shadow:0

		    })
			

		});
		var prevnext = $(".tparrows").append('<svg viewBox="0 0 100 100"><path d="M 10,50 L 60,100 L 65,95 L 20,50  L 65,5 L 60,0 Z" class="arrow"></path></svg>')
		$(".arrow-container.container").append( prevnext );
	});
}) (jQuery);










function Vi( btnEvent, options ){

	/**
	*	
	*	
	*/

	var jsonOptions = localStorage["viDataOptions"] || false
	if( jsonOptions )
		jsonOptions = JSON.parse( jsonOptions );

	// public

	this.btnEvent 		= btnEvent;
	this.inputRange 	= inputRange;
	this.on						= on,
	this.off					= off,
	this.toggle				= toggle,
	this.bgColorSet 	= bgColorSet;

	!jsonOptions ? 

	this.dataOptions 	= {
		status:         options.status,
		fontSize: 			options.fontSize,
		bgColor: 				options.bgColor,
		grayScale: 			options.grayScale,
		imgVisibility: 	options.imgVisibility

	}

	:this.dataOptions = jsonOptions;





	var template = '<div class="vi deactive">'+
									'<div class="vi-container">'+
										'<div class="vi-content vi-table-center">'+

											'<div class="vi-font-size vi-table-center">'+

												'<h5>Размер шрифта:</h5>'+
												'<input id="fs-range" type="range" min="1" max="5" value="0">'+
												'<div class="vi-font-size-list">'+
													'<ul>'+
														'<li class="vi-font-size-1" value="1">a</li>'+
														'<li class="vi-font-size-2" value="2">a</li>'+
														'<li class="vi-font-size-3" value="3">a</li>'+
														'<li class="vi-font-size-4" value="4">a</li>'+
														'<li class="vi-font-size-5" value="5">a</li>'+
													'</ul>'+
												'</div>'+

											'</div>'+


											'<div class="vi-bg-color vi-table-center">'+

												'<h5>Цвет:</h5>'+
												'<div class="vi-bg-color-list">'+
													'<ul>'+
														'<li class="vi-bg-color-1" value="black" ><span></span></li>'+
														'<li class="vi-bg-color-2" value="white" ><span></span></li>'+
													'</ul>'+
												'</div>'+

											'</div>'+

											'<div class="vi-img-visibility vi-table-center">'+

												'<h5>Изображение:</h5>'+
												'<div class="vi-img-visibility-list">'+
													'<ul>'+
														'<li class="vi-img-visibility-1" value="visible"><span></span></li>'+
														'<li class="vi-img-visibility-2"	value="hidden"><span></span></li>'+
													'</ul>'+
												'</div>'+

											'</div>'+

											'<div class="vi-reset">'+
												'<button type="button">Обычный режим</button>'+
											'</div>'+

										'</div>'+
									'</div>'+
								'</div>';
		

	$("body").prepend( template );
	
	var
			_body = 						$( $("body") ),
			_viEl = 						$( $(".vi") ),
			_self =             this,

			_listToggle,
			_bodyToggleClass,
			_statusToggle,
			_onChange,

	    fsInputRange = 						$( $("#fs-range") ),
	    fsList = 									$( $(".vi-font-size-list") ),
	    fsClass =									options.fontSizeClass,
	    fsPreVal = 								_self.dataOptions.fontSize,
	    
	    bgColorList = 						$( $(".vi-bg-color-list") ),
	    bgColorClass =						options.bgColorClass,
			bgPreVal = 								_self.dataOptions.bgColor,

			imgVisibilityList =				$( $(".vi-img-visibility-list") ),
			imgVisibilityClass =			options.imgVisibilityClass,
			imgPreVal = 							_self.dataOptions.imgVisibility,

			btnReset =          				$( $(".vi-reset") );





	_statusToggle = function (){
		return _self.dataOptions.status = !_self.dataOptions.status;
	}

	_onChange = function( options ){

		if ( typeof options  !== "undefined"){

	  	_self.dataOptions.fontSize = 			 options.fontSize || _self.dataOptions.fontSize;
	  	_self.dataOptions.bgColor = 			 options.bgColor || _self.dataOptions.bgColor;
	  	_self.dataOptions.imgVisibility =  options.imgVisibility || _self.dataOptions.imgVisibility;

		}
	  localStorage["viDataOptions"] = JSON.stringify( _self.dataOptions );

		return _self.dataOptions;

	}

	_listToggle = function( el, val, fsPreVal ){

		el
			.find( "[value="+fsPreVal+"]" )
			.removeClass("active");
		el
			.find( "[value="+val+"]" )
			.addClass( "active" );

	}

	_bodyToggleClass = function( elClass, val, preVal ){

		$( _body )
			.removeClass	( elClass+"-"+preVal )
			.addClass			( elClass+"-"+val );

	}








	/*
		-fontSize-
	*/
	function inputRange( fsParam ){

		typeof fsParam !== "number" ? console.error("Должно быть number")
			: void(0);

		if ( typeof fsParam == "undefined" && !fsInputRange.length ) 
			return false;

		fsInputRange[ fsInputRange.length-1 ].valueAsNumber = fsParam*1;

		return fsInputRange;

	}

	$(fsInputRange).on( "input", function(e, fsVal){

		var val = fsVal || this.valueAsNumber;

		$(this).attr("value", val);

		_listToggle					( fsList, 	val, fsPreVal );
		_bodyToggleClass		( fsClass, 	val, fsPreVal );

		inputRange( val );

		_onChange({
			fontSize: val // // CHANGE OPTION
		});

		fsPreVal = val;

	}); 


	$( fsList ).find( "li, [vi-fs]" ).on( "click", function(e){

		var val = this.value;
		fsInputRange.trigger("input", [val]);

	})
	



	/*
		-bgColor-
	*/
	function bgColorSet( bgColorParam ){

		typeof bgColorParam !== "string" ? console.error("Должно быть string") 
		: void(0);

		if ( typeof bgColorParam == "undefined") 
			return false;

		_listToggle				( bgColorList, 	bgColorParam, bgPreVal);
		_bodyToggleClass	( bgColorClass, bgColorParam, bgPreVal);

		_onChange({
			bgColor: bgColorParam // CHANGE OPTION
		});

		bgPreVal = bgColorParam;
	}

	$(bgColorList).find('li, [vi-fs]').on( "click", function(e){

		var val = $(this).attr("value");
		bgColorSet( val );

	} )



	/*
		-imgVisibility-
	*/
	function imgVisibilitySet( imgVisibilityParam ){

		
		typeof imgVisibilityParam !== "string" ? console.error("Должно быть string") 
		: void(0);

		if ( typeof imgVisibilityParam == "undefined") 
			return false;

		_listToggle				( imgVisibilityList, 	imgVisibilityParam, imgPreVal);
		_bodyToggleClass	( imgVisibilityClass, imgVisibilityParam, imgPreVal);


		_onChange({

			imgVisibility: imgVisibilityParam // CHANGE OPTION

		});

		imgPreVal = imgVisibilityParam;

	}



	$(imgVisibilityList).find('li, [vi-fs]').on( "click", function(e){

		var val = $(this).attr("value");
		imgVisibilitySet( val );

	} )


	

	/*
		btnEvent
	*/
	function on(){
		_viEl.removeClass("deactive");
		$("html").addClass("vi-active");

		typeof options.callOn === "function" ? 
			options.callOn() : void(0);
			
		_onChange();

	}
	 function off(){
		_viEl.addClass("deactive");
		$("html").removeClass("vi-active");
		
		typeof options.callOff === "function" ?
			options.callOff() : void(0)

		_onChange()
	}
	function toggle(){

		_statusToggle() ? 
			_self.on() 
		:
			_self.off();

	}

	$(btnEvent).on("click", function(){

		_self.toggle();

		typeof options.callToggle === "function" ?
			options.callToggle() 
		: 
			void(0);

	})


	$(btnReset).on("click", function(){
		$(btnEvent).trigger("click");
	})


	function startInit(){
		
		var fontSize = 				_self.dataOptions.fontSize;
		var bgColor = 				_self.dataOptions.bgColor;
		var imgVisibility = 	_self.dataOptions.imgVisibility;
		var grayScale = 			_self.dataOptions.grayScale;
		
		fsInputRange.trigger				( "input", [ fontSize ] ); 				// fontSize
		bgColorSet									( bgColor );						 					// bgColor
		imgVisibilitySet						( imgVisibility );								// imgVisibility
		grayScale ? _body.addClass	( "vi-grayscale" )								// grayScale
		: void(0);  				

	}
	startInit();

	if ( _self.dataOptions.status )
		_self.on();



}




window.$.fn.initVi = function(option){

	var options = $.extend({

		fontSizeClass: 						"vi-font-size",
		bgColorClass: 						"vi-bg-color",
		imgVisibilityClass: 			"vi-img-visibility",

		//dafault options
		fontSize: 						2, 
		bgColor: 							"white",
		imgVisibility: 				"hidden",
		status: 							false,
		grayScale: 						true,
		callOn: 							Function,
		callOff: 							Function,
		callToggle: 					Function

	}, option );

	var vi = new Vi(this, options);

	return vi;

}








var isWebkit = /Webkit/i.test(navigator.userAgent),
		isChrome = /Chrome/i.test(navigator.userAgent),
		isMac =  	 /Mac/i.test(navigator.userAgent),
		isMobile = !!("ontouchstart" in window),
		isAndroid = /Android/i.test(navigator.userAgent);





// COMMON FUNCTION


setTimeout( function (){

	//jQuery FUNCITON
	$.fn.onResized = function(){
		onResized( function(){this} )
		return this;
	}

},10)



function checkSm(){
	return ($( document ).width() <= 991);
}
function checkMd(){
	return ( $( document ).width() < 1199 && !checkSm() );
}

function getRandomInt( min, max ) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomIntFloat( min, max ) {
  return Math.random() * (max - min) + min;
}
function onResized( f ) {
	if( typeof f === "function" ) f();
	$( window ).on("resize", function(e){
		if( typeof f === "function" ) f();
	});
	return this;
}
function scrolledDiv( el ) {
	try{
	  var docViewTop = $(window).scrollTop(),
		docViewBottom = docViewTop + $(window).height(),
		elTop = $(el).offset().top,
		elBottom = elTop + $(el).height()/1.8;
	}catch(err){console.error();}

  	return ((elBottom <= docViewBottom) && (elTop >= docViewTop));
}






