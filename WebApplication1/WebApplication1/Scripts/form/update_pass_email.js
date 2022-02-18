var data = [
	{"block": false,"use": false,"move":true,"value":"","vali":false},//0 cel_num
	{"block": false,"use": false,"move":true,"value":"","vali":false},//1 email
	{"block": false,"use": false,"move":true,"value":"","vali":false},//2 id_code
	{"block": false,"use": false,"move":true,"value":"","vali":false},//3 pas
	{"block": false,"use": false,"move":true,"value":"","vali":false} //4 rpas
];
var email = ""; // His/update_pass_email?email= OOO
window.onload = function() {
	//隱藏登入
	$("#login").css("visibility","hidden");
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
			location = "../His/update_pass_email?language=zh-TW";
		}
		else if($(this).val() == 2){
			location = "../His/update_pass_email?language=zh-CN";
		}
	});
	//email
	email = location.href.split("?email=")[1];
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
}
/*====================送出按鈕====================*/
var validate = true;
//手機選單 step 3>4
$(document).on('click', '#send_cel_num_3', function () {
	validate = true; //reset
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
		updatePas(email,data[4].value);
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
//更新密碼
function updatePas(email,pas){
	$.ajax({
		url: "/api/update_pass2",
		type : "POST",
		dataType : "text",  
		contentType : 'application/json; charset=utf-8',
		data: JSON.stringify({
			email: email,
			pas: pas
		}),
		success: function(doc) {
			//type of doc : string
			doc = JSON.parse(doc); //doc:string to json
			//console.log(doc); //成功
			$(".big_tilte").css("display","none");
			$("#cel_num_3").css("display","none");
			$("#cel_num_4").css("display","block");
			$("#title3").css("display","none");
			$("#title4").css("display","block");
			$("#cel4 img").attr("src","../Content/images/icons/finish_done.png");
			setTimeout(function () { location = "../His/Index"; }, 2000);
		}
	});
}