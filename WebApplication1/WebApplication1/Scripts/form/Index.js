var data = [
	{"block": false,"use": false,"move":true,"value":"","vali":false},//0 cel_num
	{"block": false,"use": false,"move":true,"value":"","vali":false}, //1 id_code
	{"use": false,"click": false} //2 coun_code
];
window.onload = function() {
	//改變語言初始下拉
	var href = location.href.split("?language=")[1];
	if(href =="zh-TW"){
		$("#language").children('.init').html($("#zh-TW").html());
		$("#language .init .hide_span").css("display","contents");
	}
	else if(href =="zh-CN"){
		$("#language").children('.init').html($("#zh-CN").html());
		$("#language .init .hide_span").css("display","contents");
	}
	$("#language").hover(function() {
		$(this).closest("#language").children('li:not(.init)').toggle();
		$(this).toggleClass("init_click");
		$(".lan_sp").toggleClass("fa-chevron-down fa-chevron-up");
	});
	var language_all = $("#language").children('li:not(.init)');
	$("#language").on("click", "li:not(.init)", function() {
		if($(this).val() == 1){
			location = "../registered/index?language=zh-TW";
		}
		else if($(this).val() == 2){
			location = "../registered/index?language=zh-CN";
		}
	});
	//地區
	$("#coun_code").hover(function() {
		if(data[2].use == false && data[2].click == false){
			$("#coun_code").closest("#coun_code").children('li:not(.init)').toggle();
			$("#coun_code").addClass("init_click");
			$("#coun_code_title").addClass("title_click");
			$("#coun_code_block").addClass("block_click");
			data[2].use = true;
		}
		else if(data[2].click == true){ //點擊後 回到hover func
			data[2].use = false;
			data[2].click = false;
		}
		else{ //沒點擊 收hover
			$("#coun_code").closest("#coun_code").children('li:not(.init)').toggle();
			$("#coun_code").removeClass("init_click");
			$("#coun_code_title").removeClass("title_click");
			$("#coun_code_block").removeClass("block_click");
			data[2].use = false;
		}
		$("#coun_code .init span").toggleClass("fa-chevron-down fa-chevron-up");
	});
	var coun_code_all = $("#coun_code").children('li:not(.init)');
	$("#coun_code").on("click", "li:not(.init)", function() {
		data[2].use = false;
		data[2].click = true;
		$("#coun_code").closest("#coun_code").children('li:not(.init)').toggle();
		$("#coun_code").removeClass("init_click");
		$("#coun_code_title").removeClass("title_click");
		$("#coun_code_block").removeClass("block_click");
		$("#coun_code").children('.init').html($(this).html());
		$("#coun_code").children('.init').val($(this).val());
		$("#coun_code .init .hide_span").css("display","inline");
		$("#coun_code .init span").toggleClass("fa-chevron-down fa-chevron-up");
	});
	
	/*
	//地區
	$("#coun_code").on("click", ".init", function() {
		$(this).closest("#coun_code").children('li:not(.init)').toggle();
		$(this).toggleClass("init_click");
		$("#coun_code_title").toggleClass("title_click");
		$("#coun_code_block").toggleClass("block_click");
		$("#coun_code .init span").toggleClass("fa-chevron-down fa-chevron-up");
	});
	var coun_code_all = $("#coun_code").children('li:not(.init)');
	$("#coun_code").on("click", "li:not(.init)", function() {
		$("#coun_code_title").removeClass("title_click");
		$("#coun_code_block").removeClass("block_click");
		$("#coun_code").children('.init').html($(this).html());
		$("#coun_code").children('.init').val($(this).val());
		$("#coun_code").children('.init').removeClass('init_click');
		$("#coun_code .init .hide_span").css("display","inline");
		coun_code_all.toggle();
	});
	*/
	
	//手機號碼 cel_num
	$("#cel_num_block").click(function () {
		showHide("cel_num","0");
		
	});
	$("#cel_num").click(function () {
		data[0].use = true;		
	});
	$("#cel_num").change(function () {
		inputChange("cel_num","0");
		if(!!data[0].value){
			checkCel(data[0].value);
		}
	});
	//驗證碼 id_code
	$("#id_code_block").click(function () {
		showHide("id_code","1");
		
	});
	$("#id_code").click(function () {
		data[1].use = true;		
	});
	$("#id_code").change(function () {
		inputChange("id_code","1");
		if(!!data[1].value){
			checkCode(data[1].value);
		}
	});
	//重傳驗證碼
	$(document).on('click', '#reCode', function () {
		$("#form1_label").click();
	});
}
/*====================送出按鈕====================*/
var validate = true;
var timeFinished = true;
$(document).on('click', '#form1_label', function () {
	setTimeout(function () { //等驗證手機合格
		validate = true; //reset
		//手機號碼 cel_num
		if(!data[0].value){
			showNullError("cel_num","0");
		}
		else if(!data[0].vali){
			showError("cel_num");
		}
		/*=====檢查認證狀態=====*/
		if(!validate){ //有空值 or 有欄位格式錯誤 >> 中斷submit
			console.log("X");
			return false;
		}
		else if(timeFinished){ //沒空值&沒計時 >合格 > 送出表單
			console.log("O");
			sendCode(data[0].value);
			//開始計時
			$("#form1_label").css("display","none");
			$("#form1_label").css("paddingLeft","10px");
			$(".time_notice").css("display","flex");
			$(".time").css("display","block");
			$(".block_code_info").css("display","block");
			change();
			//return false; //temp refuse
		}
	},1000);
});
$(document).on('click', '#form2_btn', function () {
	validate = true; //reset
	//驗證碼 id_code
	if(!data[1].value){
		showNullError("id_code","1");
	}
	else if(!data[1].vali){
		showError("id_code");
	}
	/*=====檢查認證狀態=====*/
	if(!validate){ //有空值 or 有欄位格式錯誤 >> 中斷submit
		console.log("X");
		return false;
	}
	else{ //沒空值 >合格 > 送出表單
		console.log("O");
		checkCodeAPI(data[0].value,data[1].value);
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
	}
}
/*=====移動標題=====*/
//count --
function LooMinus(target) { 
	finished = false;
	$("#"+target+"_block").css("border","solid 1px #3DA9FD");
	//$("#"+target+"_title").css("color","#3DA9FD");
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
	//$("#"+target+"_title").css("color","#818A97");
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
	$("#"+target+"_block").css("border","solid 1px #3DA9FD");
	$("#"+target+"_title").css("color","#818A97"); //#3DA9FD
	$("#"+target+"_label").css("display","none");
	$("#"+target+"_labelO").css("display","none");
	$("#"+target+"_labelX").css("display","none");
	$("#"+target+"_labelN").css("display","none");
	$("#"+target+"_eye").css("display","inline-block");
	$("#"+target+"_cal").css("display","inline-block");
	$("#"+target).focus();
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
/*====================驗證====================*/
/*=====手機號碼=====*/
//比對手機號碼長度
function checkCel(num){
	if(num.length == 10){
		num = num.substr(1,10);
	}
	if(num.length == 9){
		data[0].value = num;
		validateCel(num);
	}
	else{
		data[0].vali = false;
		showNullError("cel_num","0");
	}
}
//檢查手機號碼格式
function validateCel(num) {
    var re = /^[0-9]{9}$/;
    if(re.test(num)){
		console.log(num)
		celApi(num);
	}
	else{
		data[0].vali = false;
		showNullError("cel_num","0");
	}
}
//檢查手機號碼存在
function celApi(num){
	$.ajax({
		url: "/api/check_cel_num?cel_num="+ num,
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
				$("#cel_num_group").css("marginBottom","30px");
				$("#cel_num_labelO").css("display","block");
			}	
			else{ //X
				data[0].vali = false;
				showError("cel_num");
			}
		}
	});
}
/*=====驗證碼=====*/
//寄送驗證碼
function sendCode(cel_num){
	var coun_code = $("#coun_code .init").val(); //國碼
	console.log(coun_code+","+cel_num);
	$.ajax({
		url: "/api/Verification_code",
		type : "POST",
		dataType : "text",  
		contentType : 'application/json; charset=utf-8',
		data: JSON.stringify({
			coun_code: coun_code,
			cel_num: cel_num
		}),
		success: function(doc) {
			//type of doc : string
			doc = JSON.parse(doc); //doc:string to json
			console.log(doc);
		}
	});
}
//比對驗證碼
function checkCode(code){
	if(code.length != 4){
		data[1].vali = false;
		showError("id_code");
	}
	else{
		data[1].vali = true;
	}
}
//檢查驗證碼
function checkCodeAPI(cel_num,reg_code){
	var coun_code = $("#coun_code .init").val(); //國碼
	$.ajax({
		url: "/api/check_reg_code_num?coun_code="+coun_code+"&cel_num="+ cel_num +"&reg_code="+ reg_code,
		type : "GET",
		dataType : "json",  
		//contentType : 'application/json; charset=utf-8',
		data: {
		},
		success: function(doc) {
			//type of doc : string
			doc = JSON.parse(doc); //doc:string to json
			//console.log(doc);
			var result = doc.Table[0].Column1;// 0> 錯誤 ,1> 正確
			if(result == 1){ //O 正確
				data[1].vali = true;
				$("#form1").submit();
			}	
			else{ //X
				data[1].vali = false;
				showError("id_code");
			}
		}
	});
}
/*====================倒數====================*/
var time = 30;
var timer;
function change() {
	timeFinished = false;
	time--;
	if(time > -1) {
		document.getElementById("second").innerHTML = time % 60;
		timer = setTimeout('change()', 1000);
	} 
	else{
		reset();
		$(".time").css("display","none");
		$(".time_notice").css("display","none");
		$(".block_code_info").css("display","none");
		$("#form1_label").css("display","block");
		$("#form1_label").css("paddingLeft","18px");
		$("#form1_label").text("重新發送");
	}
}
function reset() {
	timeFinished = true;
	clearTimeout(timer);
	time = 30;
}