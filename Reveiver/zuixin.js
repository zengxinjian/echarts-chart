var waterfull = (function () {
    function _(options) {
        this.id = options.id;
        this.option = options.option;

        this.init();
    }
    _.prototype.init = function () {
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
            ctx:_cvs.getContext("2d"),  
            imgsheet:new Image()//显示结果的表  
        };        
        //鼠标滑过画布  
        prop.cvs.onmousemove = function(e){  
        	if(document.body.contains(document.getElementById("div1"))) {
        		var div1 = document.getElementById('div1');
               	div1.parentNode.removeChild(div1); 
              }
        	  var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
              var scrollLeft=document.documentElement.scrollLeft||document.body.scrollLeft;           
        	  var x=e.offsetX+scrollLeft;
          	  var y=e.offsetY+scrollTop;
             
        	if(0.1*_cvs.width<x&&x<0.9*_cvs.width&&0.1*_cvs.height<y&&y<0.9*_cvs.height){
        	 var div1 = document.createElement('div');
           	 div1.id ='div1';
           	 div1.style.height = "40px";
           	 div1.style.width = "60px";
           	 div1.style.border="1px solid red";
           	 div1.style.position="absolute";
           	 div1.style.display="inline-block";
           	 div1.style.background="#f5f5f5";
           	 var parentdiv = document.getElementById(this.id);
           	 parentdiv.parentNode.appendChild(div1);
               var oDiv=document.getElementById('div1');
               oDiv.style.left=x+'px';
               oDiv.style.top= y+'px'; 
               oDiv.innerHTML = "x=" + x + " y=" +y;
        		}else{
        		 
        	}
        	
        }  
        this.initCoordinate();

    }
    _.prototype.initCoordinate = function () {
        var canvasId = document.getElementById(this.id + 'canvas');
        var canvasContext = canvasId.getContext('2d');
        var ratio = getPixelRatio(canvasContext);
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

    _.prototype.drawContent = function (canvasContext, canvasId,leftPosition,topPosition) {
        var rightPosition = canvasId.width - leftPosition;
        var bottomPosition = canvasId.height - topPosition;
        var contentWidth = rightPosition- leftPosition;
        var contentHeight = bottomPosition- topPosition;
        //判断是否什么方式的分布。
        
        if(this.option.axis==="Horizontal"){
            //如果是水平的，那么就是语谱图，按照横向绘制即可
            var index=0;
            setInterval(function(){
                var imgData = canvasContext.createImageData(1, 1);
                var positionX = leftPosition-8;
            for (var i = 0; i < contentHeight - 1;) {
                var imgData = returnColor(parseInt(250 *Math.random()), imgData);
                //index>this.waterfull.height-100?this.waterfull.height-101:index  index>100?99:index
                canvasContext.putImageData(imgData, index>contentWidth?contentWidth+ leftPosition-1:index+ leftPosition,positionX);
                positionX += 1;
                i += 1;
            }

            if(index> contentWidth){
                var img=canvasContext.getImageData(leftPosition,topPosition,contentWidth+rightPosition,bottomPosition-topPosition-1);
                canvasContext.putImageData(img,leftPosition-1,topPosition);
            }
            index++
            },100)
        }else{
            //如果是垂直的，那么就是瀑布图，按照纵向绘制即可
            var index=0;
            setInterval(function(){
                var imgData = canvasContext.createImageData(1, 1);
                var positionY = topPosition+11;
              
            for (var i = 0; i < contentWidth - 1;) {
                var imgData = returnColor(parseInt(250 *Math.random()), imgData);
                //index>this.waterfull.height-100?this.waterfull.height-101:index  index>100?99:index
                canvasContext.putImageData(imgData, positionY, index>contentHeight?contentHeight+ topPosition-1:index+ topPosition);
                positionY += 1;
                i += 1;
            }

            if(index> contentHeight){
                var img=canvasContext.getImageData(leftPosition,topPosition,rightPosition,contentHeight);
                canvasContext.putImageData(img,leftPosition,topPosition-1);
            }
            index++
            },100)
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
         // 移动到指定位置
        context.fillText(0,0.1*canvas.width,y0+20);
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
	function canvaswheel(){
		console.log("","hahaha");
	}
    return _;
})()