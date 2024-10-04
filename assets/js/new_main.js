$(function (){
	//visual
	var $visual_box = $('.visual'),
	$visual = $visual_box.find('.slide_box'),
	slideCount = null,
	visualLength = $visual.find('.cont_box').length;

	if(visualLength>1){
		$visual_box.find('.auto').addClass('pause').text('정지');
	} else{
		$visual_box.find('.auto').addClass('play').text('재생');
	};
	$visual.on('init', function(event, slick){
		slideCount = slick.slideCount;
		setSlideCount();
		setCurrentSlideNumber(slick.currentSlide);
	});

	$visual.on('beforeChange', function(event, slick, currentSlide, nextSlide){
		setCurrentSlideNumber(nextSlide);
	});

	function setSlideCount() {
		var $el = $('.visual .count_box').find('.total');
		$el.text('0' + slideCount);
	};

	function setCurrentSlideNumber(currentSlide) {
		var $el = $('.visual .count_box').find('.current');
		$el.text('0'+ (currentSlide + 1));
	};
	$visual.slick({
		swipe : true,
		draggable : false,
		slidesToShow : 1,
		slidesToScroll: 1,
		speed: 500,
		infinite: true,
		autoplay : true,
		autoplaySpeed:4000,
		//centerMode: true,
		dots : false,
		fade: false,
		cssEase: 'linear',
		arrows: true,
		prevArrow : $visual_box.find('.prev'),
		nextArrow : $visual_box.find('.next'),
	});

	$visual_box.find('.auto').click(function(){
		var NowPlaying = $(this).is('.pause');
		if(visualLength>1){
			if(NowPlaying==true){
				$visual.slick('slickPause');
				$(this).removeClass('pause').addClass('play').text('재생');
			} else if(NowPlaying==false){
				$visual.slick('slickPlay');
				$(this).removeClass('play').addClass('pause').text('정지');
			};
		};
	});

	$visual_box.find('.slick-arrow').on('click', function(){
		$visual.slick('slickPause');
		$visual_box.find('.auto').addClass('pause').text('재생');
	});

	//poster
	var $poster_box = $('.poster'),
	$poster = $poster_box.find('.slide_box'),
	posterLength = $poster.find('.cont_box').length;

	if(posterLength>1){
		$poster_box.find('.auto').addClass('pause').text('정지');
	} else{
		$poster_box.find('.auto').addClass('play').text('재생');
	};

	$poster.slick({
		swipe : true,
		draggable : false,
		slidesToShow : 1,
		slidesToScroll: 1,
		speed: 500,
		infinite: true,
		autoplay : true,
		autoplaySpeed:4000,
		dots : false,
		fade: true,
		cssEase: 'linear',
		arrows: true,
		prevArrow : $poster_box.find('.prev'),
		nextArrow : $poster_box.find('.next'),
	});

	$poster_box.find('.auto').click(function(){
		var NowPlaying = $(this).is('.pause');
		if(posterLength>1){
			if(NowPlaying==true){
				$poster.slick('slickPause');
				$(this).removeClass('pause').addClass('play').text('재생');
			} else if(NowPlaying==false){
				$poster.slick('slickPlay');
				$(this).removeClass('play').addClass('pause').text('정지');
			};
		};
	});

	$poster_box.find('.slick-arrow').on('click', function(){
		$poster.slick('slickPause');
		$poster_box.find('.auto').addClass('pause').text('재생');
	});

	//tab_menu
	var tab_confirm=$('.tab_box .item').hasClass('active');
	if(tab_confirm==true){
		$('.tab_box .item').removeClass('active');
		$('.tab_box .item').eq(0).addClass('active');
	}else {
		$('.tab_box .item').eq(0).addClass('active');
	};
	$('.tab_box .tit').on('click', function(event){
		var $target=$(event.target),
				tab=$(this).parents('.item');
		if($target.is('.active .tit')){
			return false;
		}else{
			$('.tab_box .item').removeClass('active');
			tab.addClass('active');
		};
	});

});