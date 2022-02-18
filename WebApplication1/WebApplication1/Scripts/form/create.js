var data = [
	{"block": false,"use": false,"move":true,"value":"","vali":false},//0 acc
	{"block": false,"use": false,"move":true,"value":"","vali":false},//1 cel
	{"block": false,"use": false,"move":true,"value":"","vali":false},//2 email
	{"block": false,"use": false,"move":true,"value":"","vali":false},//3 pas
	{"block": false,"use": false,"move":true,"value":"","vali":false},//4 rpas
	//1老師 school,name,birth
	{"block": false,"use": false,"move":true,"value":"","vali":false},//5 school
	{"block": false,"use": false,"move":true,"value":"","vali":false},//6 name
	{"block": false,"use": false,"move":true,"value":"","vali":false},//7 birth
	//2學生 school,name,id
	{"block": false,"use": false,"move":true,"value":"","vali":false},//8 school
	{"block": false,"use": false,"move":true,"value":"","vali":false},//9 name
	{"block": false,"use": false,"move":true,"value":"","vali":false},//10 id
	{"use": false,"click": false} //11 right_ul
];
var text =[];//language data >> TextResourse.js
window.onload = function() {
	//改變語言初始下拉
	var href = location.href.split("?language=")[1];
	text = zhTW;
	if(href =="zh-TW"){
		$("#language").children('.init').html($("#zh-TW").html());
		$("#language .init .hide_span").css("display","contents");
	}
	else if(href =="zh-CN"){
		text = zhCN;
		changeLanguage();
		$("#language").children('.init').html($("#zh-CN").html());
		$("#language .init .hide_span").css("display","contents");
	}
	else if(href =="en-US"){
		text = enUS;
		changeLanguage();
		$("#language").children('.init').html($("#en-US").html());
		$("#language .init .hide_span").css("display","contents");
	}
	$("#language").hover(function() {
		$(this).closest("#language").children('li:not(.init)').toggle();
		$(this).toggleClass("init_click");
		$("#language .init").toggleClass("lan_init lan_hover");
		$(".lan_sp").toggleClass("fa-chevron-down fa-chevron-up");
	});
	var language_all = $("#language").children('li:not(.init)');
	$("#language").on("click", "li:not(.init)", function() {
		if($(this).val() == 1){
			location = "index.html?language=zh-TW";
		}
		else if($(this).val() == 2){
			location = "index.html?language=zh-CN";
		}
		else if($(this).val() == 3){
			location = "index.html?language=en-US";
		}
	});
	//帳號 acc
	$("#acc_block").click(function () {
		showHide("acc","0");
	});
	$("#acc").click(function () {
		data[0].use = true;
	});
	$("#acc").change(function () {
		inputChange("acc","0");
		if(!!data[0].value){
			checkAcc(data[0].value);
		}
	});
	/*
	$("#name_error").click(function(){
		$("#acc").val('');
		$("#name_error").css("display","none");
	});*/
	//手機號碼 cel
	$("#cel_block").click(function () {
		showHide("cel","1");
		
	});
	$("#cel").click(function () {
		data[1].use = true;		
	});
	$("#cel").change(function () {
		inputChange("cel","1");
		if(!!data[1].value){
			checkCel(data[1].value);
		}
	});
	//信箱 email
	$("#email_block").click(function () {
		showHide("email","2");
		
	});
	$("#email").click(function () {
		data[2].use = true;		
	});
	$("#email").change(function () {
		inputChange("email","2");
		if(!!data[2].value){
			checkMail(data[2].value);
		}
	});
	//密碼 pas
	$("#pas_block").click(function () {
		showHide("pas","3");
	});
	$("#pas").click(function () {
		data[3].use = true;		
	});
	$("#pas").change(function () {
		inputChange("pas","3");
		if(data[3].value !="" && data[4].value !=""){
			checkPass(data[3].value,data[4].value);
		}
	});
	$("#pas_eye").click(function() {
		$(this).toggleClass("fa-eye fa-eye-slash"); //class: fa-eye<change>fa-eye-slash
		var input = $("#pas");
		if(input.attr("type") == "password") {
			input.attr("type", "text");
		} 
		else{
			input.attr("type", "password");
		}
	});
	//確認密碼 rpas
	$("#rpas_block").click(function () {
		showHide("rpas","4");
	});
	$("#rpas").click(function () {
		data[4].use = true;
	});
	$("#rpas").change(function () {
		inputChange("rpas","4");
		if(data[3].value !="" && data[4].value !=""){
			checkPass(data[3].value,data[4].value);
		}
	});
	$("#rpas_eye").click(function() {
		$(this).toggleClass("fa-eye fa-eye-slash"); //class: fa-eye<change>fa-eye-slash
		var input = $("#rpas");
		if(input.attr("type") == "password") {
			input.attr("type", "text");
		} 
		else{
			input.attr("type", "password");
		}
	});
	/*=====身份下拉選單=====*/
	$("#right_ul").hover(function() {
		$("#sele_block").removeClass("block_error");
		$("#sele_title").removeClass("title_error");
		$("#sele_group").css("marginBottom","10px");
		$("#sele_labelN").css("display","none");
		if(data[11].use == false && data[11].click == false){
			$("#right_ul").closest("#right_ul").children('li:not(.init)').toggle();
			$("#right_ul").addClass("init_click");
			$("#sele_title").addClass("title_click");
			$("#sele_block").addClass("block_click");
			data[11].use = true;
		}
		else if(data[11].click == true){ //點擊後 回到hover func
			data[11].use = false;
			data[11].click = false;
		}
		else{ //沒點擊 收hover
			$("#right_ul").closest("#right_ul").children('li:not(.init)').toggle();
			$("#right_ul").removeClass("init_click");
			$("#sele_title").removeClass("title_click");
			$("#sele_block").removeClass("block_click");
			data[11].use = false;
		}
		$("#right_ul .init span").toggleClass("fa-chevron-down fa-chevron-up");
	});
	var right_all = $("#right_ul").children('li:not(.init)');
	$("#right_ul").on("click", "li:not(.init)", function() {
		data[11].use = false;
		data[11].click = true;
		$("#right_ul").closest("#right_ul").children('li:not(.init)').toggle();
		$("#right_ul").removeClass("init_click");
		$("#sele_title").removeClass("title_click");
		$("#sele_block").removeClass("block_click");
		$("#right_ul").children('.init').html($(this).html());
		$("#right_ul").children('.init').val($(this).val());
		$("#right_ul .init .hide_span").css("display","inline");
		$("#right_ul .init span").toggleClass("fa-chevron-down fa-chevron-up");
		$(".sele_section").css("display","block");
		changeSection();
	});
	/*
	$("#right_ul").on("click", ".init", function() { //$("#right_ul").hover(function() {
		$("#sele_block").removeClass("block_error");
		$("#sele_title").removeClass("title_error");
		$("#sele_group").css("marginBottom","10px");
		$("#sele_labelN").css("display","none");
		$(this).closest("#right_ul").children('li:not(.init)').toggle();
		$(this).toggleClass("init_click");
		$("#sele_title").toggleClass("title_click");
		$("#sele_block").toggleClass("block_click");
		$("#right_ul .init span").toggleClass("fa-chevron-down fa-chevron-up");
	});
	var right_all = $("#right_ul").children('li:not(.init)');
	$("#right_ul").on("click", "li:not(.init)", function() {
		$("#sele_title").removeClass("title_click");
		$("#sele_block").removeClass("block_click");
		$("#right_ul").children('.init').html($(this).html());
		$("#right_ul").children('.init').val($(this).val());
		$("#right_ul").children('.init').removeClass('init_click');
		$("#right_ul .init .hide_span").css("display","inline");
		right_all.toggle();
		$(".sele_section").css("display","block");
		changeSection();
	});
	*/
	/*
	$("#sele_block").click(function () {
		$("#sele_group").css("marginBottom","10px");
		displayReset("sele");
		$("#sele_block").css("border","solid 1px #C1C1C1");
	});
	$("#right").change(function () {
		$(".sele_section").css("display","block");
		changeSection();
	});
	$("#right").on("input", function () {
		$("#sele_group").css("marginBottom","10px");
		displayReset("sele");
	});*/
	/*====================表單-老師====================*/
	//學校 school
	$(document).on('click', '#school_block', function () {
		var select =$("#right").val();
		//下拉 老師
		if(select =="1"){
			showHide("school","5");
		}
		//下拉 學生
		else if(select =="2"){
			showHide("school","8");
		}
	});
	$(document).on('click', '#school', function () {
		var select =$("#right").val();
		//下拉 老師
		if(select =="1"){
			data[5].use = true;
		}
		//下拉 學生
		else if(select =="2"){
			data[8].use = true;
		}
	});
	$(document).on('change', '#school', function () {
		var select =$("#right").val();
		//下拉 老師
		if(select =="1"){
			inputChange("school","5");
		}
		//下拉 學生
		else if(select =="2"){
			inputChange("school","8");
		}
	});
	//姓名 name
	$(document).on('click', '#name_block', function () {
		var select =$("#right").val();
		//下拉 老師
		if(select =="1"){
			showHide("name","6");
		}
		//下拉 學生
		else if(select =="2"){
			showHide("name","9");
		}
	});
	$(document).on('click', '#name', function () {
		var select =$("#right").val();
		//下拉 老師
		if(select =="1"){
			data[6].use = true;
		}
		//下拉 學生
		else if(select =="2"){
			data[9].use = true;
		}
	});
	$(document).on('change', '#name', function () {
		var select =$("#right").val();
		//下拉 老師
		if(select =="1"){
			inputChange("name","6");
		}
		//下拉 學生
		else if(select =="2"){
			inputChange("name","9");
		}
	});
	//生日 birth
	$(document).on('click', '#birth_block', function () {
		showHide("birth","7");	
	});
	$(document).on('click', '#birth', function () {
		data[7].use = true;	
	});
	$(document).on('change', '#birth', function () {
		inputChange("birth","7");
	});
	/*datepicker*/
	$(document).on('focus', '#birth', function () {
		$.datepicker.setDefaults( $.datepicker.regional[ "zh-TW" ] ); //若有使用中文
        $(this).datepicker({dateFormat: 'yy-mm-dd'}); //選用日期格式
		//$(this).datepicker({dateFormat: 'yy-mm-dd',showOn: "both",buttonImage: "../../Content/images/b_calendar.png",buttonImageOnly: true,buttonText: "Select date"}); //選用日期格式
    });
	$(document).on('click', '#birth_cal', function () {
		$("#birth").focus();
	});
	/*====================表單-學生====================*/
	//學生證號碼 id
	$(document).on('click', '#id_block', function () {
		showHide("id","10");	
	});
	$(document).on('click', '#id', function () {
		data[10].use = true;	
	});
	$(document).on('change', '#id', function () {
		inputChange("id","10");
		if(!!data[10].value){
			checkID(data[10].value);
		}
	});
	//上傳圖片按鈕
	$(document).on('change', '.btn_label', function () {
		if($("#photo")[0].files[0]){
			var up = $("#photo")[0].files[0].name;
			var select =$("#right").val();
			displayLeft("id","11");
		}
	});
}
/*=====下拉改變顯示區塊=====*/
function changeSection(){
	var html = "";//reset
	var select = $("#right").val();
	//下拉後組html
	if(select == "1"){ //老師
		//reset
		for(var a=5;a<=7;a++){
			data[a].block = false;
			data[a].use = false;
			data[a].move = true;
			data[a].value = "";
		}
		//學校 school
		html +="<div id='school_group' class='form-group'><div id='school_block' class='block'><div id='school_title' class='title'>"+text.school+"</div>";
        html +="<div id='school_sub' class='sub'><input type='text' id='school' name='school' class='form-control' maxlength='20' placeholder='"+text.enter+text.school+"' />"
		html +="<i id='school_error' class='far fa-times-circle error_icon'></i></div>";
        html +="<div id='school_labelN' class='msg_label_red_null'>"+text.enter+text.school+"</div></div></div>";
		//姓名 name
		html +="<div id='name_group' class='form-group'><div id='name_block' class='block'><div id='name_title' class='title'>"+text.name+"</div>";
        html +="<div id='name_sub' class='sub'><input type='text' id='name' name='name' class='form-control' maxlength='20' placeholder='"+text.enter+text.name+"' />"
		html +="<i id='name_error' class='far fa-times-circle error_icon'></i></div>";
        html +="<div id='name_labelN' class='msg_label_red_null'>"+text.enter+text.name+"</div></div></div>";
		//生日 birth
		html +="<div id='birth_group' class='form-group'><div id='birth_block' class='block'><div id='birth_title' class='title'>"+text.birth+"</div>";
        html +="<div id='birth_sub' class='sub'><input type='text' id='birth' name='birth' class='form-control' maxlength='40' placeholder='"+text.enter+text.birth+"(yyyy-mm-dd)' />"
		html +="<i id='birth_error' class='far fa-times-circle error_icon'></i></div>";
        html +="<div id='birth_labelN' class='msg_label_red_null'>"+text.enter+text.birth+"</div></div><i id='birth_cal' class='far fa-calendar-alt field-icon'></i></div>";
	}
	else if(select == "2"){ //學生
		//reset
		for(var a=8;a<=10;a++){
			data[a].block = false;
			data[a].use = false;
			data[a].move = true;
			data[a].value = "";
		}
		//學校 school
		html +="<div id='school_group' class='form-group'><div id='school_block' class='block'><div id='school_title' class='title'>"+text.school+"</div>";
        html +="<div id='school_sub' class='sub'><input type='text' id='school' name='school' class='form-control' maxlength='20' placeholder='"+text.enter+text.school+"' />"
		html +="<i id='school_error' class='far fa-times-circle error_icon'></i></div>";
        html +="<div id='school_labelN' class='msg_label_red_null'>"+text.enter+text.school+"</div></div></div>";
		//姓名 name
		html +="<div id='name_group' class='form-group'><div id='name_block' class='block'><div id='name_title' class='title'>"+text.name+"</div>";
        html +="<div id='name_sub' class='sub'><input type='text' id='name' name='name' class='form-control' maxlength='20' placeholder='"+text.enter+text.name+"' />"
		html +="<i id='name_error' class='far fa-times-circle error_icon'></i></div>";
        html +="<div id='name_labelN' class='msg_label_red_null'>"+text.enter+text.name+"</div></div></div>";
		//身分證號碼 id
		html +="<div id='id_group' class='form-group uphead'><div id='id_block' class='block block_left'><div id='id_title' class='title'>"+text.id+"</div>";
        html +="<div id='id_sub' class='sub'><input type='text' id='id' name='id' class='form-control' maxlength='10' placeholder='"+text.enter+text.id+text.up_place+"' />"
		html +="<i id='id_error' class='far fa-times-circle error_icon'></i></div>";
		html +="<div id='id_label' class='msg_label_red'>"+text.wrong+"</div>";
        html +="<div id='id_labelN' class='msg_label_red_null'>"+text.enter+text.id+"</div></div>";
		html +="<div id='id_up' class='block block_up'><label class='btn_label'><input type='file' id='photo' name='photo' accept='.png, .jpg, .jpeg'><i class='fas fa-upload'></i>"+text.up+"</label></div></div>";
	}
	$(".sele_section").html(html);
}
/*====================送出按鈕====================*/
var validate = true;
$(document).on('click', '#submit', function () {
	validate = true; //reset
	/*=====基本表單=====*/
	//帳號 acc
	if(!data[0].value){
		showNullError("acc","0");
	}
	else if(!data[0].vali){
		showError("acc");
	}
	//手機 cel
	if(!data[1].value){
		showNullError("cel","1");
	}
	else if(!data[1].vali){
		showError("cel");
	}
	//信箱 email
	if(!data[2].value){
		showNullError("email","2");
	}
	else if(!data[2].vali){
		showError("email");
	}
	//密碼 pas
	if(!data[3].value){
		showNullError("pas","3");			
	}
	//確認密碼 rpas
	if(!data[4].value){
		showNullError("rpas","4");
	}
	else if(!data[4].vali){
		showError("rpas");
	}
	/*=====身分表單=====*/
	var sele = $("#right").val(); //抓身份
	if(sele == ""){
		showNullErrorSele();
	}
	/*=====表單-老師=====*/
	else if(sele == "1"){
		//學校 school
		if(!data[5].value){ 
			showNullError("school","5");
		}
		//姓名 name
		if(!data[6].value){
			showNullError("name","6");
		}
		//生日 birth
		if(!data[7].value){
			showNullError("birth","7");
		}
	}
	/*=====表單-學生=====*/
	else if(sele == "2"){
		//學校 school
		if(!data[8].value){
			showNullError("school","8");
		}
		//姓名 name
		if(!data[9].value){ 
			showNullError("name","9");
		}
		//醫事機構代碼 id
		if(!data[10].value){
			showNullError("id","10");
			$("#id_labelN").html(text.enter+text.id);
		}
		else if(!$("#photo").val()){
			showNullError("id","10");
			$("#id_labelN").html(text.up_null);
		}
	}
	/*=====檢查認證狀態=====*/
	if(!validate){ //有空值 or 有欄位格式錯誤 >> 中斷submit
		console.log("X");
		return false;
	}
	else{ //沒空值 >合格 > 送出表單
		console.log("O");
		$("#part1").css("display","none");
		$("#part2").css("display","block");
		//return false; //temp refuse
	}
});
//略過 skip
$(document).on('click', '#skip', function () {
	validate = true; //reset
	/*=====基本表單=====*/
	//帳號 acc
	if(!data[0].value){
		showNullError("acc","0");
	}
	else if(!data[0].vali){
		showError("acc");
	}
	//手機 cel
	if(!data[1].value){
		showNullError("cel","1");
	}
	else if(!data[1].vali){
		showError("cel");
	}
	//信箱 email
	if(!data[2].value){
		showNullError("email","2");
	}
	else if(!data[2].vali){
		showError("email");
	}
	//密碼 pas
	if(!data[3].value){
		showNullError("pas","3");			
	}
	//確認密碼 rpas
	if(!data[4].value){
		showNullError("rpas","4");
	}
	else if(!data[4].vali){
		showError("rpas");
	}
	/*=====檢查認證狀態=====*/
	if(!validate){ //有空值 or 有欄位格式錯誤 >> 中斷submit
		console.log("X");
		return false;
	}
	else{ //沒空值 >合格 > 送出表單
		console.log("O");
		$("#part1").css("display","none");
		$("#part2").css("display","block");
		//return false; //temp refuse
	}
});
/*====================控制css====================*/
var i = "";
var finished = true;
/*=====控制顯示/隱藏=====*/
function showHide(target,num){
	blockReset(target);
	if(data[num].move){ //沒輸入值> 可移動
		if(!data[num].use && finished){ //沒點擊input & 移動完成
			if(!data[num].block){
				//點擊區塊
				data[num].block = true;
				i = 17;//reset
				LooMinus(target);	
			}
			else{
				data[num].block = false;
				i = 5;//reset
				LooPlus(target);
			}
		}
		else{
			data[num].use = false;
		}
	}
	else{ //不可動 >reset
		displayReset(target);
		$("#"+target).focus();
	}
}
/*=====移動標題=====*/
//count --
function LooMinus(target) { 
	finished = false;
	$("#"+target+"_block").css("border","solid 1px #FFAA33");
	$("#"+target+"_title").css("color","#FFAA33");
	setTimeout(function () {     
		i--;                    
		if (i >= 5) {       
			$("#"+target+"_title").css("marginTop",i +"px");		
			LooMinus(target);    
			if(i == 5){
				$("#"+target+"_sub").css("display","block");
				$("#"+target).focus();
				finished = true;
			}					
		}		
	}, 33)
}
//count ++
function LooPlus(target) {  
	finished = false; 
	$("#"+target+"_block").css("border","solid 1px #C1C1C1");
	$("#"+target+"_title").css("color","#818A97");
	$("#"+target+"_sub").css("display","none");
	setTimeout(function () {             
		i++;                    
		if (i <= 17) {    
			$("#"+target+"_title").css("marginTop",i +"px");
			LooPlus(target);
			if(i == 17){
				finished = true;
			}				
		}		
	}, 33)
}
/*=====設定值&變更移動旗標=====*/
function inputChange(target,num){
	data[num].value = $("#"+target).val();
	if(!!data[num].value){
		data[num].move = false;
	}
	else{
		data[num].move = true;
	}
}
/*=====重設 區塊css=====*/
function blockReset(target){
	$("#"+target+"_group").css("marginBottom","20px");
	$("#"+target+"_labelN").css("display","none");
	$("#"+target+"_error").css("display","none");
}
/*=====重設 點擊css=====*/
function displayReset(target){
	$("#"+target+"_block").css("border","solid 1px #FFAA33");
	$("#"+target+"_title").css("color","#FFAA33"); //#FFAA33
	$("#"+target+"_label").css("display","none");
	$("#"+target+"_labelO").css("display","none");
	$("#"+target+"_labelX").css("display","none");
	$("#"+target+"_labelN").css("display","none");
	$("#"+target+"_eye").css("display","inline-block");
	$("#"+target+"_cal").css("display","inline-block");
	$("#"+target).focus();
}
/*=====重設 上傳左框css=====*/
function displayLeft(target,num){
	$("#"+target+"_group").css("marginBottom","10px");
	$("#"+target+"_block").css("border","solid 1px #FFAA33");
	$("#"+target+"_title").css("color","#FFAA33");
	$("#"+target+"_title").css("marginTop","5px");
	$("#"+target+"_sub").css("display","block");
	$("#"+target+"_label").css("display","none");
	$("#"+target+"_labelO").css("display","none");
	$("#"+target+"_labelN").css("display","none");
	$("#"+target+"_error").css("display","none");
	data[num].move = false;
	//$("#"+target).attr("disabled","true");
}
/*=====格式 錯誤css=====*/
function showError(target){
	$("#"+target+"_group").css("marginBottom","30px");
	$("#"+target+"_block").css("border","solid 1px #EB2413");
	$("#"+target+"_title").css("color","#EB2413");
	$("#"+target+"_error").css("display","block");
	$("#"+target+"_label").css("display","block");
	$("#"+target+"_eye").css("display","none");
	validate = false;
}
/*=====空值 錯誤css=====*/
function showNullError(target,num){
	$("#"+target+"_group").css("marginBottom","30px");
	$("#"+target+"_block").css("border","solid 1px #EB2413");
	$("#"+target+"_title").css("marginTop","5px");
	$("#"+target+"_title").css("color","#EB2413");
	$("#"+target+"_sub").css("display","block");
	$("#"+target+"_error").css("display","block");
	$("#"+target+"_labelN").css("display","block");
	$("#"+target+"_eye").css("display","none");
	$("#"+target+"_cal").css("display","none");
	data[num].move = false;
	validate = false;
}
/*=====下拉空值 錯誤css=====*/
function showNullErrorSele(){
	$("#sele_group").css("marginBottom","30px");
	$("#sele_block").addClass("block_error");
	$("#sele_title").addClass("title_error");
	$("#sele_labelN").css("display","block");
	validate = false;
}
/*====================驗證====================*/
/*=====帳號=====*/
//比對帳號
function checkAcc(acc) {
	/*$.ajax({
		url: "https://hiswebapi1.azurewebsites.net/api/Default?acc="+ acc,
		type : "GET",
		dataType : "json",  
		//contentType : 'application/json; charset=utf-8',
		//xhrFields: {withCredentials: true},
		data: {
		},
		success: function(doc) {
			//type of doc : string
			doc = JSON.parse(doc); //doc:string to json
			//console.log(doc);
			var result = doc.Table[0].num;// 0> 不存在 ,1> 已存在
			if(result == 0){ //O 可創辦
				data[0].vali = true;
				$("#acc_group").css("marginBottom","30px");
				$("#acc_labelO").css("display","block");
			}	
			else{ //X
				data[0].vali = false;
				showError("acc");
			}
		}
	});*/
	if(acc == "steven"){
		data[0].vali = false;
		showError("acc");
	}
	else{
		data[0].vali = true;
		$("#acc_group").css("marginBottom","30px");
		$("#acc_labelO").css("display","block");
	}
}
/*=====手機號碼=====*/
//比對手機號碼長度
function checkCel(num){
	if(num.length == 10){
		data[1].value = num;
		validateCel(num);
	}
	else{
		data[1].vali = false;
		showNullError("cel","1");
	}
}
//檢查手機號碼格式
function validateCel(num) {
    var re = /^[0-9]{10}$/;
    if(re.test(num)){
		celApi(num);
	}
	else{
		data[1].vali = false;
		showNullError("cel","1");
	}
}
//檢查手機號碼存在
function celApi(num){
	/*$.ajax({
		url: "/api/check_cel?cel="+ num,
		type : "GET",
		dataType : "json",  
		//contentType : 'application/json; charset=utf-8',
		//xhrFields: {withCredentials: true},
		data: {
		},
		success: function(doc) {
			//type of doc : string
			doc = JSON.parse(doc); //doc:string to json
			//console.log(doc);
			var result = doc.Table[0].num;// 0> 不存在 ,1> 已存在
			if(result == 0){ //O 可創辦
				data[0].vali = true;
				$("#cel_group").css("marginBottom","30px");
				$("#cel_labelO").css("display","block");
			}	
			else{ //X
				data[0].vali = false;
				showError("cel");
			}
		}
	});*/
	data[1].vali = true;
}
/*=====信箱=====*/
//比對信箱
function checkMail(mail) {
	if(!validateEmail(mail)){
		//不合格
		data[2].vali = false;
		showError("email");
	} 
	else{ 
		//合格 >檢查存在
		mailApi(mail);
	}
}
//檢查信箱格式
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
//檢查信箱存在
function mailApi(mail){
	/*$.ajax({
		url: "/api/check_email_num?email="+ mail,
		type : "GET",
		dataType : "json",  
		//contentType : 'application/json; charset=utf-8',
		//xhrFields: {withCredentials: true},
		data: {
		},
		success: function(doc) {
			//type of doc : string
			doc = JSON.parse(doc); //doc:string to json
			//console.log(doc);
			var result = doc.Table[0].num;// 0> 不存在 ,1> 已存在
			if(result == 0){ //O 可創辦
				data[2].vali = true;
			}	
			else{ //X
				data[2].vali = false;
				showError("email");
			}
		}
	});*/
	data[2].vali = true;
}
/*=====密碼=====*/
//比對密碼
function checkPass(pas,rpas){
	if(pas != rpas){
		data[4].vali = false;
		showError("rpas");
	}
	else{
		data[4].vali = true;
	}
}
/*=====身份證字號=====*/
//比對身份證字號
function checkID(IDNo){
	var domestic = /^[A-Z]{1}[1-2]{1}[0-9]{8}$/;
	if(!domestic.test(IDNo)){
		data[10].vali = false;
		showError("id");
	}
	else{
		data[10].vali = true;
	}
}
/*====================改語言====================*/
function changeLanguage(){
	document.title = text.big_tilte;
	//big_title
	$(".big_tilte").html(text.big_tilte);
	//acc
	$("#acc_title").html(text.acc);
	$("#acc").attr("placeholder",text.enter+text.acc);
	$("#acc_labelO").html(text.acc+text.useOK);
	$("#acc_label").html(text.useNo+text.acc);
	$("#acc_labelN").html(text.enter+text.acc);
	//cel
	$("#cel_title").html(text.cel);
	$("#cel").attr("placeholder",text.enter+text.cel);
	$("#cel_label").html(text.no+text.cel);
	$("#cel_labelN").html(text.enter+text.cel);
	//email
	$("#email_title").html(text.email);
	$("#email").attr("placeholder",text.enter+text.email);
	$("#email_label").html(text.no+text.email);
	$("#email_labelN").html(text.enter+text.email);
	//pas
	$("#pas_title").html(text.pas);
	$("#pas").attr("placeholder",text.enter+text.pas);
	$("#pas_labelN").html(text.enter+text.pas);
	//rpas
	$("#rpas_title").html(text.rpas);
	$("#rpas").attr("placeholder",text.rpas);
	$("#rpas_label").html(text.notSame);
	$("#rpas_labelN").html(text.rpas);
	//create_title
	$(".create_title").html("<div class='blue'></div>"+text.create_title);
	//sele
	$("#sele_title").html(text.sele_title);
	$("#right").html(text.sele_choose+text.sele);
	$("#teacher").html(text.teacher);
	$("#student").html(text.student);
	$("#sele_labelN").html(text.sele_choose+text.sele);
	//submit
	$("#submit").val(text.big_tilte);
	//skip
	$("#skip a").html(text.skip);
	//big_tilte_finish
	$(".big_tilte_finish").html(text.big_tilte_finish);
}