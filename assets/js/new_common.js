$(function (){
function GetIEVersion(){
	var sAgent = window.navigator.userAgent;
	var Idx = sAgent.indexOf("MSIE");
	if(Idx>0){// If IE, return version number.
		return parseInt(sAgent.substring(Idx+5,sAgent.indexOf(".",Idx)));
	}else if (!!navigator.userAgent.match(/Trident\/7\./)){// If IE 11 then look for Updated user agent string.
		return 11;
	}else{
		return 0; //It is not IE
	};
};
var total=$('#lnb .depth1').length,
		dep2_h=new Array;
for(i=0;i<total;i++){
	var j=i+1;
	$('#lnb .depth1').eq(i).addClass('rule0'+j);
	dep2_h[i]=$('#lnb .depth1').eq(i).find('.depth2').height();
};
var depth2_max = Math.max.apply(null, dep2_h),
		dep2_height=depth2_max,
		lnb_h=depth2_max+98,
		d_width=$('body').width(),
		reHead='',
		head_height=400;

if(d_width<=640){
	reHead=1;
}/*else if(d_width>640&&d_width<=800){
	reHead=2;
}*/else{
	$('#lnb .depth2 > ul,#lnb .title_box').css({'height':dep2_height-45}); /* lnb 사이즈 틀리면 여기서 조정 */
	reHead=0;
};

$(window).resize(function(){
	d_width=$('#lnb_box').width();
	if(GetIEVersion()>8||GetIEVersion()==0){
		if(d_width<=640){
			if(reHead!=1){
				$('body').removeClass('m_on');
				$('#lnb_box').removeClass('m_lnb').find('#lnb').removeClass('m_on').find('.depth1').removeClass('active').find('.tit').removeClass('on').next('.depth2').find('a').removeClass('on');
				reHead=1;
			}else{
				return false;
			};
		}/*else if(d_width>640&&d_width<=800){
			if(reHead!=2){

				reHead=2;
			}else{
				return false;
			};
		}*/else{
			if(reHead!=0){
				var dep2_h2=new Array;
				for(i=0;i<total;i++){
					var j=i+1;
					dep2_h2[i]=$('#lnb .depth1').eq(i).find('.depth2').height();
				};
				depth2_max = Math.max.apply(null, dep2_h2),
				dep2_height=depth2_max,
				lnb_h=depth2_max+98;
				$('body').removeClass('m_on');
				$('#lnb_box').removeClass('m_lnb').find('#lnb').addClass('m_on').find('.tit').removeClass('on').next('.depth2').removeClass('dep2_on').find('a').removeClass('on').next('.depth3').removeClass('dep3_on').find('a').removeClass('on').next('.depth4').removeClass('dep4_on');
				reHead=0;
			}else{
				return false;
			};
		};
	};
});
var lnb_current=-1;
$('#lnb .tit').on('mouseenter focusin',function(){
	var d_width=$('#lnb_box').width();
	if(d_width>800){
		if($(this).parents('ul').find('li').hasClass('current_dep1')==true){
			lnb_current=$(this).parents('ul').find('.current_dep1').index()
		};
		var d_height=$(this).parents('.depth1').find('.depth2').innerHeight();
		$('#lnb_box').addClass('lnb_on')//.css({'height':lnb_h});
		$('#lnb .tit').removeClass('on').parents('.depth1').removeClass('active').removeClass('current_dep1');
		$(this).addClass('on').parents('.depth1').addClass('active');
	};
});
$('#lnb .depth2').prev('.tit').on('click',function(event){
	var $target=$(event.target),
			d_width=$('#lnb_box').width();
	if(d_width>800){
		return true;
	}else{
		if($target.is('.on')){
			$('#lnb').removeClass('m_on').find('.tit').removeClass('on').next('.depth2').removeClass('dep2_on').find('a').removeClass('on').next('.depth3').removeClass('dep3_on').removeClass('on').next('.depth4').removeClass('dep4_on');
		}else{
			$('#lnb').addClass('m_on').find('.tit').removeClass('on').next('.depth2').removeClass('dep2_on').find('a').removeClass('on').next('.depth3').removeClass('dep3_on').find('a').removeClass('on').next('.depth4').removeClass('dep4_on');
			$(this).addClass('on').next('.depth2').addClass('dep2_on');
		}
		return false;
	};
});
$('#lnb .depth3').prev('a').on('click',function(event){
	var $target=$(event.target),
			d_width=$('#lnb_box').width();
	if(d_width>800){
		return true;
	}else{
		if($target.is('.on')){

		}else{
			$(this).parents('li').siblings().find('>a').removeClass('on').next('div').removeClass('dep3_on').find('a').removeClass('on').next('div').removeClass('dep4_on');
			$(this).addClass('on').next('div').addClass('dep3_on');
		}
		return false;
	};
});
$('#lnb .depth4').prev('a').on('click',function(event){
	var $target=$(event.target),
			d_width=$('#lnb_box').width();
	if(d_width>800){
		return true;
	}else{
		if($target.is('.on')){

		}else{
			$(this).parents('li').siblings().find('>a').removeClass('on').next('div').removeClass('dep4_on');
			$(this).addClass('on').next('div').addClass('dep4_on');
		}
		return false;
	};
});
$('#lnb').on('mouseleave',function(){
	var d_width=$('#lnb_box').width();
	if(d_width>800){
		$('#lnb_box').removeClass('lnb_on');
		$('#lnb_box').removeClass('m_lnb').find('.tit').removeClass('on').parents('.depth1').removeClass('active').find('a').removeClass('on');
		if(lnb_current>-1){
			$('#lnb_box').find('.depth1').eq(lnb_current).addClass('current_dep1');
		};
	}else{
		return false;
	};
});
$('#lnb .depth2').on('mouseenter',function(){
		$('.depth1').removeClass('active');
		$(this).parents('.depth1').addClass('active');
});
$('#lnb .depth3').on('mouseenter',function(){
	var $target=$(event.target),
			d_width=$('#lnb_box').width();
	if(d_width>800){
		$(this).prev('a').addClass('on');
	};
});
$('#lnb .depth3').on('mouseleave',function(){
	var $target=$(event.target),
			d_width=$('#lnb_box').width();
	if(d_width>800){
		$('.depth2 a').removeClass('on');
	};
});
$('.lnb_open').on('click',function(){
	$('#lnb_box').addClass('m_lnb');
	$('body').addClass('m_on');
	$('#lnb .tit').removeClass('on').parents('.depth1').removeClass('active').find('a').removeClass('on');
});
$('.lnb_close').on('click',function(){
	$('body').removeClass('m_on');
	$('#lnb_box').removeClass('m_lnb').find('#lnb').removeClass('m_on').find('.depth1').removeClass('active').find('.tit').removeClass('on').next('.depth2').removeClass('dep2_on').find('a').removeClass('on').next('.depth3').removeClass('dep3_on').find('a').removeClass('on').next('div').removeClass('dep4_on');
});

//search
	$('#header .search .search_close').on('click', function(){
	$(this).parents('.search').removeClass('active');
});
$('#header .search .search_open').on('click', function(){
	var d_width=$('#header').width();
	if(d_width<800){
		$(this).parents('.search').addClass('active');
	};
});

//gototop
$(window).scroll(function(event){
	var x=$(this).scrollTop();

	if(x==0){
		$('#footer').removeClass('top_on');
	}else{
		$('#footer').addClass('top_on');
	};
});
$('#footer .top').click(function(){
	jQuery('html,body').animate({scrollTop:0},1000);
});
});