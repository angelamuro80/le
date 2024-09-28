// CK 에디터 기본 파라메타 설정
var CK_PARAM = {
	allowedContent : true
, filebrowserImageUploadUrl : '/edu/ckImageUpload.do'
, removeButtons : 'Save,NewPage,Preview,Print,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Find,Replace,SelectAll,Scayt,Form,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Checkbox,PageBreak,Anchor,Language,Flash'
};

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

//scale_box
$('#header .scale_box button').on('click', function(event){
	var $target=$(event.target),
		$now_state=$('#wrapper').attr('data-scale');
	if($now_state>=-4 && $now_state<=4){
		if($target.is('.plus')){
			if($now_state==4){
				$('#wrapper').attr('data-scale', 4);
			}else{
				$('#wrapper').attr('data-scale', Number($now_state)+1);
			};
		}else if($target.is('.minus')){
			if($now_state==-4){
				$('#wrapper').attr('data-scale', -4);
			}else{
				$('#wrapper').attr('data-scale', Number($now_state)-1);
			};
		}else{
			$('#wrapper').attr('data-scale', 0)
		};
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

/**
* 페이지 이동
*/
var fnGoPage = function(menuId, contentId, pageIndex, historyBack) {
if (typeof contentId == "undefined" || contentId == "") {
	$("#contentFrm").attr("action", $("#hiddenUrlFrm").find("input[name='at_" + menuId + "']").val());
	$("#contentFrm").find("input[name='menuId']").val("");
	$("#contentFrm").find("input[name='contentId']").val("");
} else {
	$("#contentFrm").attr("action", $("#hContentViewUrl").val());
	$("#contentFrm").find("input[name='contentId']").val(contentId);

	if (typeof menuId == "undefined" || menuId == "") {
		$("#contentFrm").find("input[name='menuId']").val("");
	} else {
		$("#contentFrm").find("input[name='menuId']").val(menuId);
	}
}
if (typeof pageIndex == "undefined" || pageIndex == "") {
	$("#contentFrm").find("input[name='pageIndex']").val("1");
} else {
	$("#contentFrm").find("input[name='pageIndex']").val(pageIndex);
}
if (typeof historyBack == "undefined" || historyBack == "") {
	$("#contentFrm").find("input[name='historyBack']").val("");
} else {
	$("#contentFrm").find("input[name='historyBack']").val(historyBack);
}

$("#contentFrm").submit();
};

/**
* 공통코드 조회
*/
function fnEduCodeSelect(masterCodeId, callback, codeType, etc1, etc2) {
if (typeof codeType == "undefined" || codeType == "") {
	codeType = "";
}
if (typeof etc1 == "undefined" || etc1 == "") {
	etc1 = "";
}
if (typeof etc2 == "undefined" || etc2 == "") {
	etc2 = "";
}

$.ajax({
	type : "post",
	url : "/edu/selectEduCodeDetailList.do",
	dataType : "json",
	data : {masterCodeId : masterCodeId, etc1 : etc1, etc2 : etc2, codeType : codeType},
	success : function(result) {
		callback(result);
	},
	error: function(xhr, status, error) {
		alert(xhr.responseJSON.errorMassege);
		if (xhr.status == 461) {
			location.href="/edu/";
		}
	}
});
}

/**
* 컨텐츠 클릭 시 조회/다운/재생 수 증가
*/
function fnContentClickInc(editMode, contentId, callback) {
$.ajax({
	type : "post",
	url : "/edu/updateEduContentClickInc.do",
	dataType : "json",
	data : {contentId : contentId, editMode : editMode},
	success : function(result) {
		callback(result);
	},
	error: function(xhr, status, error) {
		alert(xhr.responseJSON.errorMassege);
		if (xhr.status == 461) {
			location.href="/edu/";
		}
	}
});
}

/**
* 컨텐츠 클릭 시 조회 수 증가
*/
function fnInqireInc(contentId, callback) {
fnContentClickInc("INQIRE", contentId, callback);
}

/**
* 컨텐츠 재생 시 재생 수 증가
*/
function fnPlayngInc(contentId, callback) {
fnContentClickInc("PLAYNG", contentId, callback);
}

/**
* 컨텐츠 다운로드 시 다운로드 수 증가
*/
function fnDwldInc(contentId, callback) {
fnContentClickInc("DWLD", contentId, callback);
}

/**
*	페이징 UI 공통 모듈
* @param : paginationInfo 페이징 객체
*        : fnName 사용자함수
*        : $naviObj 페이지 네비게이션 UI 선택자
*/
var printPaging = function(paginationInfo, fnName, $naviObj) {
/* 페이징 객체 유효성 검사 */
if ($.isEmptyObject(paginationInfo)) {
	return null;
}
/* 사용자 함수 체크 */
if ($.isEmptyObject(fnName)) {
	return 'ComException : "fnName IS NULL"';
}
/* 선택자 체크 */
if ($.isEmptyObject($naviObj)) {
	$naviObj = $("#pagingInfo");
}

$naviObj.html(""); // 페이지 네비게이션 영역 초기화

var currPageNo = paginationInfo.currentPageNo; // 현재 페이지번호
var minPageNo = paginationInfo.firstPageNo; // 시작 페이지번호
var maxPageNo = paginationInfo.lastPageNo; // 마지막 페이지번호
var sttPageNo = paginationInfo.firstPageNoOnPageList; // 출력을 시작할 페이지 번호
var endPageNo = paginationInfo.lastPageNoOnPageList; // 마지막 출력 페이지 번호
var ul = $("<div class='pagination'></div>");

/* 현재 페이지가 첫 페이지가 아닌 경우 */
if (currPageNo > 1) {
	ul.append("<a class='prev_end' href='javascript:"+fnName+"("+minPageNo+")' title='첫페이지 이동'>FIRST</a>"); // 첫 페이지 이동
	ul.append("<a class='prev_one' href='javascript:"+fnName+"("+(currPageNo-1)+")' title='이전페이지 이동'>PREV</a>"); // 이전 페이지 이동
}

for (var i=sttPageNo; i<=endPageNo; i++) {
	if (currPageNo == i) {
		ul.append("<strong title='현재 " + i + "페이지'>" + i + "</strong>");
	} else {
		ul.append("<a href='javascript:"+fnName+"("+i+");' title='" + i + "페이지 이동'>" + i + "</a>");
	}
}

/* 현재 페이지가 마지막 페이지가 아닌 경우 */
if (currPageNo < maxPageNo) {
	ul.append("<a class='next_one' href='javascript:"+fnName+"("+(currPageNo+1)+")' title='다음페이지 이동'>NEXT</a>"); // 다음 페이지 이동
	ul.append("<a class='next_end' href='javascript:"+fnName+"("+maxPageNo+")' title='마지막페이지 이동'>LAST</a>"); // 마지막 페이지 이동
}

$naviObj.html(ul);
};
