var waterfullCanvas=(function(){
	function _(options){
		this.wheel=new Number(0);
		this.currentData=128;
		this.powerWave=document.getElementById(options.canvasId1);
		this.waterfull=document.getElementById(options.canvasId2);
		this.powerWaveCtx=this.powerWave.getContext('2d');
		this.waterfullCtx=this.waterfull.getContext('2d');
		this.addEventListener();
		this.getData();
		this.drawcoordinate(this.waterfull,this.waterfullCtx,'waterfull');
		this.drawcoordinate(this.powerWave,this.powerWaveCtx,'powerWave')
		
	}
	var marginLeft=50;
	var marginTop=50;
	var coorWidth=512;
	
	_.prototype.getData=function(){
		var index=0;
		var self=this;
		var timer=setInterval(function(){
			$.ajax({
				type : 'get',
				url : '../../SituEarth/receiveAction!getdata.action',
				async : false, //异步，false为阻塞
				timeout : 90000, //40秒后超时,
				success : function(json, textStatus) {
					if(!json) return;
					/*json.sort(function(a,b){
						return a-b;
					})
					console.log(json[json.length-1]);*/
					self.drawfrequency(json,index+marginTop);
					self.drawpowerwave(json);
					self.wheel++;
					index++;
				},
				error:function(XMLHttpRequest, textStatus){
					
				}
			})
		},1000);
	}
	
	
	_.prototype.drawfrequency=function(data,index,drawIndex,wheelIndex){
		if(!data) return;
		if(!index) return;
		var draw_i=drawIndex||0;
		var wheel_i=wheelIndex||1;
		var self=this;
		var imgData = this.waterfullCtx.createImageData(1, 1);
		var positionX =1+marginLeft;
		for (var i=draw_i;i<data.length/2;) {
			var imgData = returnColor(data[i], imgData);
			waterfullContext.putImageData(imgData, positionX, index>this.waterfull.height-100?this.waterfull.height-101:index);
			positionX+=1;
			/*i+=wheel_i*/
			i+=1;
		}
	
		
		if(index>220){
		    var img = this.waterfullCtx.getImageData(marginLeft+1, marginTop, marginLeft+coorWidth, this.waterfull.height-marginTop-3);
		    this.waterfullCtx.putImageData(img, marginTop, -1);
		}
	}
	_.prototype.drawpowerwave=function(data){
		this.powerWaveCtx.clearRect(marginLeft,0,coorWidth+marginLeft,this.powerWave.height-marginTop-2);
		
		this.powerWaveCtx.save();
		this.powerWaveCtx.fillStyle="#fff";
		this.powerWaveCtx.lineWidth=1;
		this.powerWaveCtx.beginPath();
		//第一次取256的数据，所以这里的逻辑，应该是取值256;
		for(var i=0;i<data.length/2;i++){
//			this.powerWaveCtx.lineTo(i*(coorWidth/data.length)+marginLeft,this.powerWave.height-50-parseInt(data[i])/2);
			this.powerWaveCtx.lineTo(i+marginLeft,this.powerWave.height-50-parseInt(data[i])/2);
			
		}
		this.powerWaveCtx.stroke();
	}
	_.prototype.drawcoordinate=function(canvas,context,type){
		context.save();
		context.lineWidth =1;
		context.strokeStyle = "#fff";
		this.drawVerticalAxis(canvas,context);
	    this.drawHorizontalAxis(canvas,context);
	    context.lineWidth =1;
	    context.strokeStyle="#fff";
	    this.drawVerticalAxisTick(canvas,context);
	    this.drawHorizontalAxisTick(canvas,context);
	    context.fillStyle="#fff";
	    this.drawVerticalAxisLabel(canvas,context,type);
	    this.drawHorizontalAxisLabel(canvas,context,type);
	    context.restore();
	}
	_.prototype.drawVerticalAxis=function(canvas,context){
		context.save();
		context.beginPath();
		context.moveTo(marginLeft,canvas.height-marginTop);
		context.lineTo(marginLeft,marginTop);
		context.stroke()
	}
	_.prototype.drawVerticalAxisTick=function(canvas,context){
		var deltaX=10;
		for(var i=1;i<=canvas.height-marginTop*2;i++){
			context.beginPath();
			if(i%20===0){
				context.moveTo(marginLeft-deltaX,canvas.height-marginTop-i);
				context.lineTo(marginLeft,canvas.height-marginTop-i)
				context.stroke();
			}

		}
	}
	_.prototype.drawHorizontalAxisTick=function(canvas,context){
		var deltaY=10;
		var bottom=canvas.height-marginTop;
		for(var i=1;i<coorWidth;i++){
			context.beginPath();
			if(i%20===0){
				context.moveTo(marginLeft+i,bottom)
				context.lineTo(marginLeft+i,bottom+deltaY);
				context.stroke();
			}
		}
	}
	
	_.prototype.drawHorizontalAxis=function(canvas,context){
		context.save();
		context.beginPath();
		context.moveTo(marginLeft,canvas.height-marginTop);
		context.lineTo(marginLeft+coorWidth,canvas.height-marginTop);
		context.stroke()
	}
	_.prototype.drawVerticalAxisLabel=function(canvas,context,type){
		context.textAlign = "center";
		context.textBaseline = "top";
		context.strokeStyle="#fff";
		var deltaX=20;
		var deltaY=8;
		if(type==="waterfull"){
			context.beginPath();
			for(var i=0;i<canvas.height-marginTop*2;i++){
				if (i % 20 === 0) {
					context.fillText(i,
						marginLeft-deltaX,
						marginTop + i-deltaY);
				}
			}
			context.fillText('t/s',marginLeft-deltaX,marginTop-deltaX);
		}else{
			context.beginPath();
			for(var i=1;i<=220;i++){
				if(i%20===0){
					context.fillText(i*2,
							marginLeft-deltaX,
							canvas.height-marginTop-i-deltaY)
				}
			}
			context.fillText('t/s',marginLeft-deltaX,marginTop-deltaX);
		}
	}
	_.prototype.drawHorizontalAxisLabel=function(canvas,context,type){
		context.textAlign="center";
		context.testBaseline="top";
		context.strokeStyle="#fff";
		var deltaX=10;
		var deltaY=8;
			context.beginPath();
			for(var i=0;i<coorWidth;i++){
				if(i%20===0){
					context.fillText(parseInt(i*0.12), 
							marginLeft+i,
							canvas.height-marginTop+deltaX)
				}
			}
			context.fillText("Mkz", canvas.width-marginLeft+deltaX,canvas.height-marginTop+deltaX)
	}
	_.prototype.addEventListener=function(){
		var self=this;
		this.waterfull.addEventListener('mousewheel',function(){
			var e = event || window.event;
			var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
			
			if (e.pageX || e.pageY) { //兼容做到ie9
				x = e.pageX;
				y = e.pageY;
			} else {
				x = e.clientX + document.body.scrollLeft || document.documentElement.scrollLeft;
				y = e.clientY + document.body.scrollTop || document.documentElement.scrollTop;
			}
			//主要控制放大级别和显示的，所以要重绘坐标系和数据;
			//因为数据太大，所以在最小级别时以某一值从数据中取出。如果放大，则绘制对应的区域，并且改变这个值就行了。
		},false);
	}
	return _;
})()