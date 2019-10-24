
ajaxFunction = function(args){
    $.ajax({
        type: 'GET',
        url: 'http://169.254.10.222:8080/SituEarth/receiveAction!getdata.action',
        // data: {messages:args},
        async: false,//异步，false为阻塞
        timeout:90000,//40秒后超时
        success: function(data, textStatus) {
            console.log(data);
            console.log(data);
            console.log("接收到回执消息");
        },
        error: function(XMLHttpRequest, textStatus) {
            console.log("任务请求失败,报错信息：");
            console.log(XMLHttpRequest.responseText);
        }
    });
}

//IP地址与端口号
IPandPORT = function () {
    var string = reg();
    if(string){
        ajaxFunction(string);
    }
}

RBTCheck = function(){
    var string = reg();
    var string2 = "RBT?";
    if(string){
        var string3 = ajaxFunction(string+","+string2);
        document.getElementById("RBTCha").value = string3;
    }
}

RBTCheckSelf = function(){
    var string = reg();
    var string2 = "RBT0";
    if(string){
        ajaxFunction(string+","+string2);
    }
}

RSTRepo = function(){
    var string = reg();
    var string2 = "RST0";
    if(string){
        ajaxFunction(string+","+string2);
    }
}

GCheck = function(){
    var string = reg();
    var string2 = "G?";
    if(string){
        var string3 = ajaxFunction(string +","+string2);
        document.getElementById("GCha").value = string3;
    }
}

GSelect = function(){
    var string = reg();
    var string2 = document.getElementById("Gselect").value;
    if(string){
        ajaxFunction(string+","+string2);
    }
}

DCheck = function(){
    var string = reg();
    var string2 = "D?";
    if(string){
        var string3 = ajaxFunction(string +","+string2);
        document.getElementById("DCha").value = string3;
    }
}

DValue = function(){
    var string = reg();
    var string2 = document.getElementById("DShe").value;
    if(string){
        ajaxFunction(string +",D"+string2);
    }
}

SCFCheck = function(){
    var string = reg();
    var string2 = "SCF?";
    if(string){
        ajaxFunction(string+","+string2);
    }
}

SCFSelect = function(){
    var string = reg();
    var string2 = document.getElementById("SCFselect").value;
    if(string){
        ajaxFunction(string + ","+string2);
    }
}

SESStart = function(){
    var string = reg();
    var string2 = "SES1";
    if(string){
        ajaxFunction(string+","+string2);
    }
}

SESEnd = function(){
    var string = reg();
    var string2 = "SES0";
    if(string){
        ajaxFunction(string+","+string2);
    }
}

SPCPause = function(){
    var string = reg();
    var string2 = "SPC0";
    if(string){
        ajaxFunction(string+","+string2);
    }
}


SPCCon = function(){
    var string = reg();
    var string2 = "SPC1";
    if(string){
        ajaxFunction(string+","+string2);
    }
}

SPCKCon = function(){
    var string = reg();
    var string2 = "SPC2";
    if(string){
        ajaxFunction(string+","+string2);
    }
}

RFSCheck = function(){
    var string = reg();
    var string2 = "RFS?";
    if(string){
        var string3 = ajaxFunction(string+","+string2);
        document.getElementById("RFSCha").value = string3;
    }
}

RFCValue = function(){
    var string = reg();
    var string2 = document.getElementById("RFSShe").value;
    if(string){
        ajaxFunction(string+","+string2);
    }
}

INCCheck = function(){
    var string = reg();
    var string2 = "INC?";
    if(string){
        var string3 = ajaxFunction(string+","+string2);
        document.getElementById("INCCha").value = string3;
    }
}

INCValue = function(){
    var string = reg();
    var string2 = document.getElementById("INCShe").value;
    if(string){
        ajaxFunction(string+","+string2);
    }
}
// var base=+new Date(2015,9,1);
//var oneDay=24*3600*1000;

// var now=new Date(base)
// function addData(shift){
//     now=[now.getFullYear(),now.getMonth()+1,now.getDate()].join('/');
//     date.push(now);
//     data.push((Math.random()-0.4)*10+data[data.length-1]);
//     if(shift){
//         // date.shift();
//         // data.shift();
//     }
//     now=new Date(+new Date(now)+oneDay);
// }

// for(var i=0;i<100;i++){
//     addData();
// }

var firstChart=echarts.init(document.getElementById('scrn2'));
var date=[];
var data=[];
var option={
//    title:{
//        text:'音谱'
//    },
    tooltip:{},
    xAxis:{
        type:'category',
        boundaryGap:false
//        data:date
    },
    yAxis:{
        type:'value',
        boundaryGap:[0,'100%']
    },
    dataZoom:[
        {
            type:'slider',
            xAxisIndex:0,
            start:0,
            end:200
        },
        {
            type:'inside',
            xAxisIndex:0,
            start:0,
            end:200
        }
//        {
//            type:'slider',
//            yAxisIndex:0,
//            start:0,
//            end:300
//        },{
//            type:'inside',
//            yAxisIndex:0,
//            start:0,
//            end:300
//        }
    ],
    series:[{
        name:'波形数据',
        type:'line',
//        smooth:true,
//        stack:'a',
        showSymbol:'fasle',
        hoverAnimation:false,
//        areaStyle:{
//            normal:{}
//        },
        data:data
    }],
};


var _sto=setInterval;
window.setInterval=function(callback,time,param){
	var args=Array.prototype.slice.call(arguments,2);
	var _cb=function(){
		callback.apply(null,args);
	}
	_sto(_cb,time);
}
function getAjaxData(){
	 $.ajax({
	        type: 'get',
	        url: '../../receiveAction!getdata.action',
	        // data: {messages:args},
	        async: false,//异步，false为阻塞
	        timeout:90000,//40秒后超时,
	        // xhrFields:{withCredentials:true},
	        // crossDomain:true,
//	        dataType:'jsonp',
	        // jsonp:"callback",
	        // jsonpCallback:"handler",
	        success: function(json, textStatus) {
	        	if(json.length!=0){
                console.log(json);
	             var spliceLength=index; 
	             console.log(spliceLength);
	             for(var i=0;i<json.length;i++){
	                	date.push(index+i);
	                }
	             console.log(date.length);
	            index=date.length;
	            console.log(index);
	            date.splice(0,spliceLength)
	            console.log(date)
	            renderTable(date,json);
	           
	            console.log("接收到回执消息");
	        	}
	        },
	        error: function(XMLHttpRequest, textStatus) {
	            console.log("任务请求失败,报错信息：");
	            console.log(XMLHttpRequest.responseText);
	        }
	    });
	 
}
//window.setInterval(getAjaxData,1000);
firstChart.setOption(option)
function renderTable(date,data){
    firstChart.setOption({
        xAxis:{
            data:date
        },
        series:[{
            data:data
        }]
    });
}
var index=0;
var spliceLength=0;
var playData=[];
var keepTimer=window.setInterval(function(){
// 	 $.ajax({
// 	        type: 'get',
// 	        url: '../../receiveAction!getdata.action',
// 	        // data: {messages:args},
// 	        async: false,//异步，false为阻塞
// 	        timeout:90000,//40秒后超时,
// 	        // xhrFields:{withCredentials:true},
// 	        // crossDomain:true,
// //	        dataType:'jsonp',
// 	        // jsonp:"callback",
// 	        // jsonpCallback:"handler",
// 	        success: function(json, textStatus) {
// 	        	console.log(json);
// 	        	if(json.length!==0){
// 	        		date=[];
	        		
// 	             for(var i=0;i<json.length;i++){
// 	                	date.push(i);
// 	                	playData.push(json[i]);
// 	                }
// 	            firstChart.setOption({
// 	                xAxis:{
// 	                    data:date
// 	                },
// 	                series:[{
// 	                    data:json
// 	                }]
// 	            });
// //	            console.log("接收到回执消息");
// 	        	}
// //	        	console.log("接受到的消息为空");
// 	        	if(playData.length===65536){
// 	        		console.log(index);	
// 	        		playData=[];
// 	        	}
// 	        	index++
	        	
// 	        },
// 	        error: function(XMLHttpRequest, textStatus) {
// 	            console.log("任务请求失败,报错信息：");
// 	            console.log(XMLHttpRequest.responseText);
// 	        }
// 	    });
	console.log("111");
},1000)


