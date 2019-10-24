

var waterfull = (function (w) {
    function _(options) {
        this.id = options.id;
        this.option = options.option;
        this.index=0;
        this.init();
        this.allData=[];
//        console.log(this.option)
        this.fftworker=this.option.fftworker;
        console.log(this.fftworker)
        this.contentWidth=0;
        w.pcmWorker.onmessage=function(ev){
// 		   console.log(ev.data); 
 		   
 		} 
    }
//    _.prototype.init = function () {
//        var doc = document.getElementById(this.id);
//        var canvas = document.createElement('canvas');
//        canvas.id = this.id + 'canvas'
//        canvas.style.backgroundColor = "#fff"
//        canvas.style.marginLeft = "4%";
//        // canvas.style.border = "1px solid #ddd"
//        doc.appendChild(canvas);
//        this.initCoordinate();
//
//    }
    _.prototype.init = function () {
    	var that=this;
        var doc = document.getElementById(this.id);
        var canvas = document.createElement('canvas');
        canvas.id = this.id + 'canvas'
        canvas.style.backgroundColor = "#fff"
        canvas.style.marginLeft = "4%";
        // canvas.style.border = "1px solid #ddd"
        doc.appendChild(canvas);
        var element=document.getElementById(this.id + 'canvas');
        try{
            //火狐兼容写法
        	element.addEventListener("mousewheel",canvaswheel)||element.addEventListener("DOMMouseScroll",canvaswheel);
        }catch(e){
            //IE兼容写法
        	element.attachEvent("mousewheel",canvaswheel);
        }
      //局部变量（这样定义变量会增加链深，但管理集中  
        var _cvs = document.getElementById(this.id + 'canvas');  
        var prop = {  
            cvs:_cvs,  
            width:_cvs.width,//  
            height:_cvs.height,  
            ctx:_cvs.getContext("2d")
              };        
        //鼠标滑过画布 
          var _this=this;
        prop.cvs.onmousemove = function(e){  
            if(_this.option.axis==="Horizontal"){
                
            }else{
                console.log(_this.contentWidth);
                if(document.body.contains(document.getElementById("div1"))) {
                    var div1 = document.getElementById('div1');
                    div1.parentNode.removeChild(div1); 
                    var div2 = document.getElementById('div2');
                    div2.parentNode.removeChild(div2); 
                    var div3 = document.getElementById('div3');
                    div3.parentNode.removeChild(div3); 
                  }
                  var scrollTop=_cvs.scrollTop;
                  var scrollLeft=_cvs.scrollLeft;           
                  var x=e.offsetX+scrollLeft;
                  var y=e.offsetY+scrollTop;
                 
                if(0.1*_cvs.width<x&&x<0.9*_cvs.width&&0.1*_cvs.height<y&&y<0.9*_cvs.height){
                 var div1 = document.createElement('div');
                 div1.id ='div1';
                 div1.style.height = "40px";
                 div1.style.width = "60px";
                 div1.style.border="1px solid #7cb5ec";
                 div1.style.position="absolute";
                 div1.style.display="inline-block";
                 div1.style.background="#f5f5f5";
                 div1.padding="10% 10%"
                 var div2 = document.createElement('div');
                 div2.id ='div2';
                 div2.style.height = _cvs.height+"px";
                 div2.style.width = "0px";
                 div2.style.borderLeft="1px solid #7cb5ec";
                 div2.style.position="absolute";
                 div2.style.display="inline-block";
                 div2.style.background="#f5f5f5";
                 var div3 = document.createElement('div');
                 div3.id ='div3';
                 div3.style.height = "0px";
                 div3.style.width = _cvs.width+"px";
                 div3.style.borderTop="1px solid #7cb5ec";
                 div3.style.position="absolute";
                 div3.style.display="inline-block";
                 div3.style.background="#f5f5f5";
                 var parentdiv = document.getElementById(this.id);
                 parentdiv.parentNode.appendChild(div1);
                 parentdiv.parentNode.appendChild(div2);
                 parentdiv.parentNode.appendChild(div3);
                   var oDiv=document.getElementById('div1');
                   oDiv.style.left=(x+0.05*_cvs.width+1)+'px';
                   oDiv.style.top= y+'px'; 
                   var oDiv2=document.getElementById('div2');
                   oDiv2.style.left=(x+0.05*_cvs.width+1)+'px';
                   oDiv2.style.top='0px'; 
                   var oDiv3=document.getElementById('div3');
                   oDiv3.style.left='0px';
                   oDiv3.style.top= y+'px'; 
                   // console.log(x+0.05*_cvs.width-68.5);
                   // console.log(y-36);

// oDiv.innerHTML=_this.allData[parseInt(y-36)][parseInt((x+0.05*_cvs.width-68.5)*16384/_this.contentWidth)];
                   // console.log(x);
                   
                   if(_this.allData.length>0){
                    // console.log(16384/_this.contentWidth)
                    console.log();
                    if(_this.allData[parseInt(y-0.1*_cvs.height)]){
                        console.log()
                        var value=_this.allData[parseInt(y-0.1*_cvs.height)][parseInt((x-0.1*_cvs.width)*16384/(0.8*_cvs.width))];
                        oDiv.innerHTML="值: "+parseFloat(value).toFixed(4);
                        // oDiv.innerHTML=_this.allData[parseInt(y-36)][parseInt((x+0.05*_cvs.width-68.5)*16384/_this.contentWidth)];
                    }else{
                        oDiv.innerHTML=" 0"
                    }
                    // console.log(_this.allData[parseInt(y-36)][parseInt((x+0.05*_cvs.width-68.5)*16384/_this.contentWidth)])
                    // if(_this.allData[parseInt(y-36)][parseInt((x+0.05*_cvs.width-68.5)*16384/_this.contentWidth)]!=Number){
                    //     oDiv.innerHTML = "值：0";
                    // }else{
                       
                   }else{
                    oDiv.innerHTML="0";
                   }
                 }else{
                     
                }   
            }                       
        }  
//         prop.cvs.onmousemove = function(e){  
//         	if(document.body.contains(document.getElementById("div1"))) {
//         		var div1 = document.getElementById('div1');
//                	div1.parentNode.removeChild(div1); 
//               }
//         	  var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
//               var scrollLeft=document.documentElement.scrollLeft||document.body.scrollLeft;           
//         	  var x=e.offsetX+scrollLeft;
//           	  var y=e.offsetY+scrollTop;
             
//         	if(0.1*_cvs.width<x&&x<0.9*_cvs.width&&0.1*_cvs.height<y&&y<0.9*_cvs.height){
//         	 var div1 = document.createElement('div');
//            	 div1.id ='div1';
//            	 div1.style.height = "40px";
//            	 div1.style.width = "60px";
//            	 div1.style.border="1px solid red";
//            	 div1.style.position="absolute";
//            	 div1.style.display="inline-block";
//            	 div1.style.background="#f5f5f5";
//            	 var parentdiv = document.getElementById(this.id);
//            	 parentdiv.parentNode.appendChild(div1);
//                var oDiv=document.getElementById('div1');
//                oDiv.style.left=x+'px';
//                oDiv.style.top= y+'px'; 
//                if(that.allData.length>(y-30)){
//             	   console.log(x,y);
//             	   console.log(that.allData[y-30][x-30]);
//             	   var showData=that.allData[y-30][x-30]
// //                 oDiv.innerHTML = "x=" + x + " y=" +y;
//                  oDiv.innerHTML = "value="+showData;   
//                }
               
//         		}else{
        		 
//         	}
        	
//         }  
        this.initCoordinate();

    }
    _.prototype.initCoordinate = function () {
        var canvasId = document.getElementById(this.id + 'canvas');
        var canvasContext = canvasId.getContext('2d');
        var ratio = getPixelRatio(canvasContext);
	    console.log("ratio",ratio);
	    canvasId.width = this.option.width * ratio;
	    canvasId.height = this.option.height * ratio;
        canvasContext.save();
      /*  canvasContext.lineWidth = 2;
        canvasContext.fillStyle = "#000";
        canvasContext.beginPath();
        canvasContext.moveTo(30, 30);
        canvasContext.lineTo(30, canvasId.height - 30);
        canvasContext.lineTo(canvasId.width - 30, canvasId.height - 30);
        canvasContext.stroke();*/
        this.drawCoordinate(canvasId,canvasContext,this.option.textX,this.option.textY);
        
        this.drawContent(canvasContext, canvasId,0.1*canvasId.width,0.1*canvasId.height);
    }

    // _.prototype.getData = function (data) {

    //     // return data;
    // }
   _.prototype.getData=function(data){
	   var canvasId = document.getElementById(this.id + 'canvas');
       var canvasContext = canvasId.getContext('2d');
       var ratio = getPixelRatio(canvasContext);
       canvasId.width = this.option.width * ratio;
	    canvasId.height = this.option.height * ratio;
	   this.drawContent(canvasContext,canvasId,0.1*canvasId.width,0.1*canvasId.height,data,this.index)
	   this.index++;
	   
   }  
  
    _.prototype.drawContent = function (canvasContext, canvasId,leftPosition,topPosition,data,index) {
    	var that=this;
//    	console.log(this.fftworker);
//    	that.fftworker.onmessage=function(ev){
//    		console.log(ev.data);
//    	}
    	console.log(that.contentWidth);
    	console.log(that.fftworker)
    	var fftsocket = new WebSocket("ws://169.254.10.213:8080/SituEarth/ws/WebSocketShoetFFT/"+"fft"+Math.random()*10);
        var rightPosition = canvasId.width - leftPosition;
        var bottomPosition = canvasId.height - topPosition;
        var contentWidth = rightPosition- leftPosition;
         this.contentWidth=contentWidth;
        var contentHeight = bottomPosition- topPosition;
        var self=this;
        var index=0;
        

        chart1=echarts.init(document.getElementById('NBLS'))
        var option1 = {
        			//    title:{
        			//        text:'音谱'
        			//    },
        			backgroundColor:'#fff',
        			tooltip : {},
        			xAxis : {
        				type : 'category',
        				Color:'#fff',
        				boundaryGap : false,
        				splitLine:{
        				  show:false
        				},
                        min:0,
                        max:16384,
        				axisLine:{
        				  lineStyle:{
        				    color:'#000'
        				  }
        				},
        			    /* data:date */
        			},
        			yAxis : {
        				type : 'value',
        				Color:'#000',
        				splitLine:{
        				  show:false
        				},
        				axisLine:{
        				  lineStyle:{
        				    color:'#000'
        				  }
        				},
                        min:-120,
                        max:120,
        				boundaryGap : [ 0, '100%' ]
        			},
        			dataZoom : [
        				{
        					type : 'slider',
        					xAxisIndex : 0,
        					start : 0,
        					end : 1000
        				},
        				{
        					type : 'inside',
        					xAxisIndex : 0,
        					start : 0,
        					end : 200
        				}
        				// {
        				// 	type : 'slider',
        				// 	yAxisIndex : 0,
        				// 	start : 0,
        				// 	end : 1000
        				// },
        				// {
        				// 	type : 'inside',
        				// 	yAxisIndex : 0,
        				// 	start : 0,
        				// 	end : 200
        				// }
        			],
        			series : [ {
        				name : '频率',
        				type : 'line', 
        				//        smooth:true,
        				//        stack:'a',
        				showSymbol : 'fasle',
        				lineStyle:{
        				   color:['#000'],
        				   width:0.8
        				},
        				data : []
        			} ],
        		};
        		chart1.setOption(option1);
                chart1.on('dataZoom',function(params){
                	
                	
                })

        //判断是否什么方式的分布。
        w.pcmWorker.onmessage=function(ev){
        	 var arr=[];
			  arr = ev.data.split(',');
			  arr.shift();
			  arr.shift();
			 // var arr=[];
             // console.log(arr);
             that.allData.push(arr);
               var date=[]
                var drawData=[]
             // for(var i=0;i<arr.length/2;i++){
             //    arr.push(arr.shift);
             //    // date.push(arr.length/2);
             // }



			   
				
				// for(var i=arr.length/2;i<arr.length;i--){
				// 	date.push(-i);
					
				// }
    //             for(var j=0;j<arr.length/2;j++){
    //                 date.push(j)
    //             }
                for(var i=0;i<16384;i++){
                     if(i<8192){
                      date.push((-(8192-i)*1.1).toFixed(2));
                   }else{
                         date.push(((i-8192)*1.1).toFixed(2));
                  }
                 }
                for(var k=0;k<arr.length;k++){
                   
                   drawData.push(arr[k]) 
                }
                // console.log(drawData,date);
                // 
				  chart1.setOption({
								   xAxis : {
										data :date 
									}, 
									series : [ 
									{
										data : drawData
									} ]
								}); 
//			  
			  
        if(self.option.axis==="Horizontal"){
            //如果是水平的，那么就是语谱图，按照横向绘制即可
             // console.log(arr);	
			  var imgData = canvasContext.createImageData(1, 1);
              var positionX = leftPosition-8;
          for (var i = 0; i < arr.length/2;) {
              var imgData = returnColor3(arr[i], imgData,arr);
              //index>this.waterfull.height-100?this.waterfull.height-101:index  index>100?99:index
              canvasContext.putImageData(imgData, index>contentWidth?contentWidth+ leftPosition-1:index+ leftPosition,positionX);
              positionX += 1;
              i += parseInt(arr.length/2/contentHeight+1);
          }

          if(index> contentWidth){
              console.log("超过了")
              var img=canvasContext.getImageData(leftPosition,topPosition,contentWidth+rightPosition,bottomPosition-topPosition-1);
              console.log(img);
              canvasContext.putImageData(img,leftPosition-1,topPosition);
          }
          index++;
             
        }else{
            //如果是垂直的，那么就是瀑布图，按照纵向绘制即可
                       
    					 var positionX = leftPosition;
    					     var imgData = canvasContext.createImageData(1, 1);
    			                var positionY = topPosition+11;
    			            for (var i = 0; i < arr.length - 1;) {
    			                var imgData = returnColor3(arr[i], imgData,arr);
    			                //index>this.waterfull.height-100?this.waterfull.height-101:index  index>100?99:index
    			                canvasContext.putImageData(imgData, positionY, index>contentHeight?contentHeight+ topPosition-1:index+ topPosition);
    			                positionY += 1;
    			                i += parseInt(arr.length/contentWidth+1);
    			            }
    			            if(index> contentHeight){
    			                // console.log("超过了")
    			                var img=canvasContext.getImageData(leftPosition,topPosition,rightPosition,contentHeight);
    			                canvasContext.putImageData(img,leftPosition,topPosition-1);
                                this.allData.shift()
    			            }
    			            index++
        }
            
        }
            
    }
    _.prototype.drawCoordinate=function(canvas,context,textX,textY){
	    var x0=0.1*canvas.width;
        var y0=0.9*canvas.height;    
        context.save();
        context.moveTo(0.1*canvas.width,0.1*canvas.height-2);
        context.lineTo(0.1*canvas.width,0.9*canvas.height);
        context.lineTo(0.9*canvas.width,0.9*canvas.height+2);
        context.moveTo(0.09*canvas.width,0.115*canvas.height-2);
        context.lineTo(0.1*canvas.width,0.1*canvas.height-2);
        context.lineTo(0.11*canvas.width,0.115*canvas.height-2);
        context.moveTo(0.885*canvas.width,0.89*canvas.height+2);
        context.lineTo(0.9*canvas.width,0.9*canvas.height+2);
        context.lineTo(0.885*canvas.width,0.91*canvas.height+2);
        context.strokeStyle='black';
        context.lineWidth=1;
        context.stroke();
        context.save();
        context.beginPath();
        context.moveTo(0,0.1*canvas.height);                 
        context.fillText(this.option.textA,0,0.1*canvas.height);       
        context.stroke();       
        context.save()
        context.beginPath();
        context.moveTo(0.8*canvas.width,canvas.height);                 
        context.fillText(this.option.textB,0.8*canvas.width,canvas.height);       
        context.stroke();       
        context.save()
        context.beginPath();
        context.font="10pt Calibri";   
        
        for(var i=0;i<textX.length&&x0<=canvas.width;i++){
            context.font="10pt Calibri";
            context.moveTo(1/(textX.length)*0.8*canvas.width*(i+1)+x0, y0+10);                 
            context.fillText(textX[i],1/(textX.length)*0.8*canvas.width*(i+1)+x0,y0+20);
            context.lineTo(1/(textX.length)*0.8*canvas.width*(i+1)+x0, y0)             
        }
         for(var i=0;i<textY.length&&y0<=canvas.height;i++)
        {
            y0-=1/(textY.length+1)*0.8*canvas.height;
            context.font="10pt Calibri";
            context.moveTo(x0-10, 1/(textY.length+1)*0.8*canvas.height*(i+1)+x0);                 
            context.fillText(textY[i],x0-20,1/(textY.length+1)*0.8*canvas.height*(i+1)+x0);
            context.lineTo(x0, 1/(textY.length+1)*0.8*canvas.height*(i+1)+x0)           
        }
         // 画出路径
         context.stroke();      
}
    function canvaswheel(){
		console.log("","hahaha");
	}
	//获取canvas应该放大的倍数的方法；
	function getPixelRatio(context) {
	    var backingStore = context.backingStorePixelRatio 
	    || context.webkitBackingStorePixelRatio 
	    || context.mozBackingStorePixelRatio 
	    || context.msBackingStorePixelRatio 
	    || context.oBackingStorePixelRatio 
	    || context.backingStorePixelRatio || 1;
	    return (window.devicePixelRatio || 1) / backingStore;
	 
	};
    return _;
})(window)