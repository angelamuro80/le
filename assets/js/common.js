// 탭메뉴 공통적으로 사용
function tabOn(tab,num,img) {
	var $tab,$tab_btn;
	var tabid=tab, n=num-1, btn_img=img;

	$tab = $(tabid+'> ul > li');
	$tab_btn = $(tabid+'> ul > li > a');

	$tab_btn.siblings().hide();
	$tab.eq(n).addClass('active');
	$tab.eq(n).children('a').siblings().show();

	if(btn_img =='img'){
		var btn = $tab.eq(n).children('a').find("img");
		btn.attr("src",btn.attr("src").replace("_off","_on"));
	}

	$tab_btn.on("click",function(event){
		var realTarget = $(this).attr('href');

		if(realTarget != "#"){
			return
		}
		if(btn_img =='img'){
			for(var i=0;i<$tab.size();i++){
				var btn = $tab.eq(i).children('a').find("img");
				btn.attr("src",btn.attr("src").replace("_on","_off"));
			}
			var active = $(this).parent().attr('class');
			if(active != 'active'){
				var btn_img_off = $(this).find('img')[0];
				btn_img_off.src =  btn_img_off.src.replace('_off','_on');
			}
		}
		$tab_btn.siblings().hide();
		$tab_btn.parent().removeClass('active');

		$(this).siblings().show();
		$(this).parent().addClass('active');

		event.preventDefault();
	});
}

function tabOrg(tabid,a,img) {
	var $tab, $tab_btn,$obj,$obj_view;
	var tabid = tabid, num = a, btn_img = img;

	$tab = $(tabid+' .tab_item  > li');
	$tab_btn = $(tabid+' .tab_item > li > a');
	$obj = $(tabid+' .tab_obj');
	$obj_view = $(tabid+' .tab_obj.n'+num);

	$tab.eq(num-1).addClass('active');
	$obj_view.show();

	if(btn_img =='img'){
		var btn = $tab.eq(num-1).children('a').find("img");
		btn.attr("src",btn.attr("src").replace("_off","_on"));
	}

	$tab.bind("click",function(event){
		if(btn_img =='img'){
			for(var i=0;i<$tab.size();i++){
				var btn = $tab.eq(i).children('a').find("img");
				btn.attr("src",btn.attr("src").replace("_on","_off"));
			}
			var active = $(this).parent().attr('class');
			if(active != 'active'){
				var btn_img_off = $(this).find('img')[0];
				btn_img_off.src =  btn_img_off.src.replace('_off','_on');
			}
		}

		var this_eq = $tab.index( $(this) );
		$tab.removeClass('active');
		$tab.eq(this_eq).addClass('active');

		$obj.hide();
		$(tabid+' .tab_obj.n'+(this_eq+1)).show();

		event.preventDefault ();
	});
}

$(document).ready(function(){
	//이미지 롤오버
	 $(".overimg").mouseover(function (){
		var file = $(this).attr('src').split('/');
		var filename = file[file.length-1];
		var path = '';
		for(i=0 ; i < file.length-1 ; i++){
		 path = ( i == 0 )?path + file[i]:path + '/' + file[i];
		}
		$(this).attr('src',path+'/'+filename.replace('_off.','_on.'));

	 }).mouseout(function(){
		var file = $(this).attr('src').split('/');
		var filename = file[file.length-1];
		var path = '';
		for(i=0 ; i < file.length-1 ; i++){
		 path = ( i == 0 )?path + file[i]:path + '/' + file[i];
		}
		$(this).attr('src',path+'/'+filename.replace('_on.','_off.'));
	 });
});

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
			lnb_h=depth2_max+100,
			d_width=$('body').width(),
			reHead='',
			head_height=100;
	if(d_width<=1000){
		reHead=1;
	}/*else if(d_width>640&&d_width<=800){
		reHead=2;
	}*/else{
		reHead=0;
	};
	$('#lnb .depth2 > ul > li:nth-child(5n+0)').after('<li class="block"></li>');

	$(window).resize(function(){
		d_width=$('body').width();
		if(GetIEVersion()>8||GetIEVersion()==0){
			if(d_width<=1000){
				if(reHead!=1){
					$('#header').removeClass('m_lnb').find('#lnb_box').removeClass('lnb_on').css({height:0}).find('#lnb').removeClass('m_on').find('.depth1').removeClass('active').find('.tit').removeClass('on').next('.depth2').css({'height':'inherit'}).find('a').removeClass('on');
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
					$('#header').removeClass('m_lnb').find('#lnb_box').removeClass('lnb_on').css({height:100}).find('#lnb').removeClass('m_on').find('.depth1').removeClass('active').find('.tit').removeClass('on').next('.depth2').css({'height':'inherit'}).find('a').removeClass('on')
					reHead=0;
				}else{
					return false;
				};
			};
		};
	});
	$('#lnb .tit').on('mouseenter focusin',function(){
		var d_width=$('#lnb_box').width();
		if(d_width>1000){
			var d_height=$(this).parents('.depth1').find('.depth2').innerHeight();
			$('#lnb .tit').removeClass('on').parents('.depth1').removeClass('active');
			$(this).addClass('on').parents('.depth1').addClass('active');
		};
	});
	$('#lnb .depth2').prev('.tit').on('click',function(event){
		var $target=$(event.target),
				d_width=$('#lnb_box').width();
		if(d_width>1000){
			return true;
		}else{
			if($target.is('.on')){
				$('#lnb').removeClass('m_on').find('.tit').removeClass('on').next('.depth2').removeClass('dep2_on').find('a').removeClass('on').next('.depth3').removeClass('dep3_on');
			}else{
				$('#lnb').addClass('m_on').find('.tit').removeClass('on').next('.depth2').removeClass('dep2_on').find('a').removeClass('on').next('.depth3').removeClass('dep3_on');
				$(this).addClass('on').next('.depth2').addClass('dep2_on');
			}
			return false;
		};
	});
	$('#lnb .depth3').prev('a').on('click',function(event){
		var $target=$(event.target),
				d_width=$('#lnb_box').width();
		if(d_width>1000){
			return true;
		}else{
			if($target.is('.on')){

			}else{
				$(this).parents('li').siblings().find('>a').removeClass('on').next('div').removeClass('dep3_on');
				$(this).addClass('on').next('div').addClass('dep3_on');
			}
			return false;
		};
	});
	$('#lnb').on('mouseleave',function(){
		var d_width=$('#lnb_box').width();
		if(d_width>1000){
			//$('#lnb_box').removeClass('lnb_on');
			$('#header').removeClass('m_lnb').find('#lnb').find('.tit').removeClass('on').parents('.depth1').removeClass('active').find('a').removeClass('on');
		}else{
			return false;
		};
	});
	$('#lnb .depth2').on('mouseenter',function(){
		var d_width=$('#lnb_box').width();
		if(d_width>1000){
			$('.depth1').removeClass('active').find('.tit').removeClass('on');
			$(this).parents('.depth1').addClass('active');
		};
	});
	$('#lnb .depth3').on('mouseenter',function(){
		var $target=$(event.target),
				d_width=$('#lnb_box').width();
		if(d_width>1000){
			$(this).prev('a').addClass('on');
		};
	});
	$('#lnb .depth3').on('mouseleave',function(){
		var $target=$(event.target),
				d_width=$('#lnb_box').width();
		if(d_width>1000){
			$('.depth2 a').removeClass('on');
		};
	});
	$('.lnb_open').on('click',function(){
		var d_width=$('#header').width(),
			total=$('#lnb .depth1').length,
			dep2_h=new Array;
		if(d_width>=1000){
			$('#lnb_box').addClass('lnb_on');

			for(i=0;i<total;i++){
				dep2_h[i]=$('#lnb .depth1').eq(i).find('.depth2').height();
			};
			var depth2_max = Math.max.apply(null, dep2_h),
				dep2_height=depth2_max;
			$('#lnb_box').css({'height':dep2_height}).find('.depth2').css({'height':dep2_height});
			$('#header').removeClass('m_lnb').find('#lnb').find('.tit').removeClass('on').parents('.depth1').removeClass('active').find('a').removeClass('on');
		}else{
			$('#header').addClass('m_lnb').find('#lnb').find('.tit').removeClass('on').parents('.depth1').removeClass('active').find('a').removeClass('on');
		};
	});
	$('.lnb_close').on('click',function(){
		var d_width=$('#header').width();
		if(d_width>1000){
			$('#lnb_box').removeClass('lnb_on');
			$('#lnb_box').css({'height':100}).find('.depth2').css({'height':'inherit'});
			$('#header').removeClass('m_lnb').find('#lnb').find('.tit').removeClass('on').parents('.depth1').removeClass('active').find('a').removeClass('on');
		}else{
			$('#header').removeClass('m_lnb').find('#lnb').removeClass('m_on').find('.depth1').removeClass('active').find('.tit').removeClass('on').next('.depth2').removeClass('dep2_on').find('a').removeClass('on').next('.depth3').removeClass('dep3_on').find('a').removeClass('on');
		};
	});

	//header_popup
	$('.header_popup .button_popup').on('click',function(event){
		var $target=$(event.target);
		if($target.is('.close_popup .button_popup')){
				$('#header').removeClass('close_popup').find('.button_popup').attr('title','팝업 닫힘');
		}else{
			$('#header').addClass('close_popup').find('.button_popup').attr('title','팝업 열림');
		};
	});

	//.map_side
	$('.map_side .open').on('click', function(event){
		$('body').addClass('map_side_active');
	});
	$('.map_side .close').on('click', function(){
		$('body').removeClass('map_side_active');
	});

	//map_other
	$('.map_other .map_other_open').on('click', function(event){
		$('body').addClass('map_other_active');
	});
	$('.map_other .map_other_close').on('click', function(){
		$('body').removeClass('map_other_active');
	});

	//map_location
	$('.map_location .open').on('click', function(event){
		var $target=$(event.target);

		if($target.is('.active_location .open')){
			$(this).parents('.map_box').removeClass('active_location').find('.map_location').find('div').removeClass('dep_on').find('button').removeClass('on');
		}else{
			$(this).parents('.map_box').addClass('active_location');
		};
	});
	$('.map_location .dep1 > button').on('click',function(event){
		var $target=$(event.target);

		if($target.is('.on')){
			$(this).removeClass('on').next().removeClass('dep_on');
		}else{
			$('.map_location').find('div').removeClass('dep_on').find('button').removeClass('on');
			$(this).addClass('on').next().addClass('dep_on');
		};
	});
	$('.map_location .dep2 > ul > li > button').on('click',function(event){
		var $target=$(event.target);

		if($target.is('.on')){
			$(this).removeClass('on').next().removeClass('dep_on');
		}else{
			$('.map_location .dep2 > ul > li > button').removeClass('on').next().removeClass('dep_on');
			$(this).addClass('on').next().addClass('dep_on');
		};
	});

	//map_choose
	$('.map_choose button').on('click', function(event){
		var $target=$(event.target);

		if($target.not('.on')){
			$('.map_choose button').removeClass('on');
			$(this).addClass('on');
		};
	});

	//map_communication
	$('.map_communication .open').on('click', function(event){
		var $target=$(event.target);
		$('.map_box').removeClass('active_detail');
		if($target.is('.active_communication .open')){
			$(this).parents('.map_box').removeClass('active_communication');
		}else{
			$(this).parents('.map_box').addClass('active_communication');
		};
	});

	//map_detail
	$('.map_detail .open').on('click', function(event){
		var $target=$(event.target);
		$('.map_box').removeClass('active_communication');
		if($target.is('.active_detail .open')){
			$(this).parents('.map_box').removeClass('active_detail');
		}else{
			$(this).parents('.map_box').addClass('active_detail');
		};
	});

	//map_twitter
	var focus_twitter;
	$('.map_twitter .open').on('click',function(event){
		focus_twitter=$(event.target);
		$('body').addClass('twitter_active');
	});
	$('.map_twitter .close').on('click',function(){
		$('body').removeClass('twitter_active');
		focus_twitter.focus();
	});

	//map_legend
	$('.map_legend .open').on('click', function(event){
		var $target=$(event.target);

		if($target.is('.active_legend .open')){
			$(this).parents('.map_box').removeClass('active_legend');
		}else{
			$(this).parents('.map_box').addClass('active_legend');
		};
	});

	//map_tab_layer
	$('.map_tab_layer .dep1').removeClass('active');
	$('.map_tab_layer .dep1:first-child').addClass('active');

	$('.map_tab_layer .open').on('click', function(event){
		var $target=$(event.target),
			tab=$(this).parents('.map_tab_layer'),
			nums=$(this).parents('.dep1').index();

		if($target.not('.active .open')){
			tab.find('.dep1').removeClass('active');
			$(this).parents('.dep1').addClass('active');
		};
	});

	//map_layer
	$('.map_layer .close').on('click', function(){
		$(this).parents('.map_layer').hide();
	});

	//side_tab
	var side_tab_confirm=$('.side_tab').hasClass('action');
	if(side_tab_confirm==true){
		$('.side_tab.action button').removeClass('on');
		$('.side_tab.action button').eq(0).addClass('on');
		$('.side_contents').hide();
		$('.side_contents').eq(0).show();
	};
	$('.side_tab button').on('click', function(event){
		var $target=$(event.target),
			tab=$(this).parents('.side_tab'),
			nums=$(this).index();

		if($target.is('.on button')){
			return false;
		}else{
			var tab_inner_confirm=$('.side_inner_tab').hasClass('action');

			tab.find('button').removeClass('on');
			$(this).addClass('on');
			$('.side_contents').hide();
			$('.side_contents').eq(nums).show();
			if(tab_inner_confirm==true){
				$('.side_inner_tab.action button').removeClass('on');
				$('.side_contents').eq(nums).find('.side_inner_tab.action button').eq(0).addClass('on');
				$('.side_inner_contents').hide();
				$('.side_contents').eq(nums).find('.side_inner_contents').eq(0).show();
			};
			return false;
		};
	});

	//side_inner_tab
	var tab_inner_confirm=$('.side_inner_tab').hasClass('action');
	if(tab_inner_confirm==true){
		$('.side_inner_tab.action button').removeClass('on');
		$('.side_inner_tab.action button').eq(0).addClass('on');
		$('.side_inner_contents').hide();
		$('.side_contents .side_inner_contents').eq(0).show();
	};
	$('.side_inner_tab button').on('click', function(event){
		var $target=$(event.target),
			tab=$(this).parents('.side_inner_tab'),
			nums=$(this).index();

		if($target.is('.on button')){
			return false;
		}else{
			tab.find('button').removeClass('on');
			$(this).addClass('on');


			$('.side_inner_contents').hide();
			$(this).parents('.side_contents').find('.side_inner_contents').eq(nums).show();
			return false;
		};
	});

	//tab_menu
	var tab_confirm=$('.tab_menu').hasClass('action');
	if(tab_confirm==true){
		$('.tab_menu.action li').removeClass('on');
		$('.tab_menu.action li').eq(0).addClass('on');
		$('.tab_contents').hide();
		$('.tab_contents').eq(0).show();
	};
	$('.tab_menu a').on('click', function(event){
		var $target=$(event.target),
			tab=$(this).parents('.tab_menu'),
			nums=$(this).parents('li').index();

		if($target.is('.on a')){
			if($target.is('.active_on')){
				$(this).removeClass('active_on').parents('ul').removeClass('active');
			}else{
				$(this).addClass('active_on').parents('ul').addClass('active');
			};
			return false;
		}else{
			tab.find('li').removeClass('on');
			$(this).parents('li').addClass('on');
			if($target.is('.action a')){
				$('.tab_menu li a').removeClass('active_on').parents('li').removeClass('on').parents('ul').removeClass('active');
				$(this).parents('li').addClass('on');
				if($target.is('.tab_contents a')){
					$('.tab_contents').find('li').removeClass('on');
					$('.tab_contents').find('li').eq(0).addClass('on');
				}else{
					$('.tab_contents').hide();
					$('.tab_contents').eq(nums).show();
					return false;
				};
			}else{
				return true;
			};
		};
	});


	//bbs_popup
	var focus_button;
	$('.bbs_popup_open').on('click',function(event){
		focus_button=$(event.target);
		$('body').addClass('bbs_popup_active');
	});
	$('.bbs_popup .close').on('click',function(){
		$('body').removeClass('bbs_popup_active');
		focus_button.focus();
	});

	// 푸터 바로가기
	$('.foot_shortcut button').on('click',function(event){
		var $target=$(event.target);
		if($target.is('.active button')){
			$(this).parents('.foot_shortcut').removeClass('active');
		}else{
			$(this).parents('.foot_shortcut').addClass('active');
		};
	});

});

/*  게시판 */
function addCellHeader(table,length){
    if(!table) {
        return false;
    };
	//console.log(length);

    //var table=$(table).eq(length);
    var table=$('.react_table').eq(length),
		trs=table.find('tr'),
		trsChild,
		grid={},
		cells,
		cellHeader='',
		cellConent='',
		confirm=table.find('thead').length;
	if(confirm==1){
			for(i=0,cntI=trs.length;i<cntI;i++){
					if(!grid[i]){
							grid[i]={};
					};
					trsChild=trs.eq(i).children();
					cells=0;
					for(j=0,cntJ=trsChild.length;j<cntJ;j++){
							if(trsChild[j].nodeType==1){
									grid[i][cells++]=trsChild[j];
							};
					};
			};
			for(row in grid) {
					if(row==0){
							continue;
					};
					for(cell in grid[row]){
							/*if(cell==0){
									continue;
							};*/
							cellHeader=grid[0][cell].innerHTML+'：';
				//cellConent=grid[row][cell].innerHTML;
							grid[row][cell].setAttribute('data-cell-header',cellHeader);
							//grid[row][cell].setAttribute('data-cell-content',cellConent);
					};
			};
	};
};

$(function (){
    var bbsTableRwdb=$('[data-rwdb="yes"]');
	bbsTableRwdb.addClass('react_table')
    if(bbsTableRwdb.length > 0){
        var thisTable=bbsTableRwdb.attr('class').replace(/ /g, '.');
		if(navigator.appVersion.indexOf('MSIE 7.')==-1 && navigator.appVersion.indexOf('MSIE 8.')==-1){
			for(t=0;t<bbsTableRwdb.length;t++){
				addCellHeader('.'+thisTable,t);
			};
		};
    };
});

/* faq */
function faqList(list){
	var faqList=$(list).find('.list > li'),
		faqBtn_open=faqList.find('.bbs_question'),
		faqBtn_close=faqList.find('.close');

	faqBtn_open.on('click',function(){
		var item=$(this).parent('li');

		if(item.hasClass('active')) {
			item.removeClass('active');
			$(this).siblings('div').slideUp();
		}else{
			faqList.not(item).each(function() {
				$(this).removeClass('active');
				$(this).find('.bbs_answer_area').slideUp();
			});
			item.addClass('active');
			$(this).siblings('div').slideDown();
		};
	});
	faqBtn_close.on('click',function(){
		faqList.removeClass('active');
		faqList.find('.bbs_answer_area').slideUp();
	});
};

$(function (){
    var faq=$('[data-list="faq"]');

    if(faq.length>0){
        var list=faq.attr('class').replace(/ /g, '.');
        $(window).on({
            load:function(){
                faqList('.'+list)
            }
        });
    };
});