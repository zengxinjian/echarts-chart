var baseBand=(function(){
	//constructor
	function _(options){
		this.basePower=document.getElementById(options.canvasId1);
		this.powerCtx=this.basePower.getContext('2d');
		this.drawcoordinate(this.basePower,this.powerCtx,'power');
//		this.drawcoordinate(this.baseCurve,this.CurveCtx,'curve');
		this.wheelIndex=0;
//		this.getData();
		
	}
	// 
	var marginLeft=50;
	var marginTop=50;
	var coorWidth=512;
	var vertivalheight=140;
	var coorWidth=512;
	var data=(function(){
		var data=[];
		for(var i=0;i<16;i++){
			for(var j=0;j<dataArr1.length;j++){
				data.push(dataArr1[j]);
			}
		}
		return data;
	})()
	
	function add(){
		var i=0;
		return function(){
			i++;
		}
	}
	var f=add();
	var index=0;
	_.prototype.getData=function(data){
//		this.drawCurve(data);
//		data=jsFFT.FFT(data,8192,-1);
		this.drawPower(data,index);
		
//		var self=this;
//		var timer=setInterval(function(){
//			
//		     index++;
//		},1000)
		data.sort(function(a,b){
			return a-b;
		})
		console.log(data[0]);
		console.log(data[data.length-1]);
		index++;
	
	}
	_.prototype.getMax=function(data){
		data.sort(function(a,b){
			return a-b
		})
		return data[data.length-1];
	}
	_.prototype.getMin=function(data){
		data.sort(function(a,b){
			return a-b;
		})
		return data[0];
	}
	_.prototype.getWheelIndex=function(){
		return this.wheelIndex;
	}
	_.prototype.drawPower=function(data,positionIndex){
		
		var imgData = this.powerCtx.createImageData(1, 1);
		var positionY=0;
		var height=this.basePower.height;
		for(var i=0;i<16384;i+=128){
			var imgData = returnColor(data[i], imgData);
			this.powerCtx.putImageData(imgData, positionIndex+marginLeft>coorWidth?coorWidth+marginLeft-1:positionIndex+marginLeft,height-marginTop-positionY-1)
			positionY++;
		}
	}
	_.prototype.drawCurve=function(data){
//		this.CurveCtx.clearRect(marginLeft, marginTop,this.baseCurve.width-marginLeft,this.baseCurve.height-marginTop);
		this.CurveCtx.save();
		this.CurveCtx.fillStyle="#fff";
		this.CurveCtx.lineWidth=1;
		this.CurveCtx.beginPath();
//		console.log(this.baseCurve.height/2);
		console.log(this.getMax(data),"max");
		console.log(this.getMin(data),"MIN");
		console.log()
		var include=this.getMax(data)+(-this.getMin(data));
		console.log(include/220)
		for(var i=0;i<data.length;i+=32){
//			console.log((parseInt(data[i])/512));
			var num=data[i];
//			console.log(num>0?num:0)
			if(num>0){
				this.CurveCtx.lineTo(i+marginLeft,this.baseCurve.height/2-marginLeft-num);	
			}
			
		}
		this.CurveCtx.stroke();
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
		context.lineTo(marginLeft,(canvas.height-marginTop-vertivalheight));
		context.stroke()
	}
	_.prototype.drawVerticalAxisTick=function(canvas,context){
		var deltaX=10;
		for(var i=1;i<=vertivalheight;i++){
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
		var deltaX=25;
		var deltaY=8;
		if(type==="power"){
			context.beginPath();
			for(var i=0;i<=vertivalheight;i++){
				if (i % 20 === 0) {
					context.fillText(i*128,
						marginLeft-deltaX,
						canvas.height-marginTop - i-deltaY);
				}
			}
			context.fillText('t/s',marginLeft-deltaX,vertivalheight-marginTop);
		}else{
			context.beginPath();
			for(var i=1;i<=220;i++){
				if(i%20===0&&i<110){
					context.fillText(-(5-i)*6000,
							marginLeft-deltaX,
							canvas.height-marginTop-i-deltaY)
				}else if(i%20===0&&i>110){
					context.fillText(i*2,
							marginLeft-deltaX,
							canvas.height-marginTop-i-deltaY)
				}
			}
			context.fillText('t/s',marginLeft-deltaX,vertivalheight-marginTop);
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
					context.fillText(i, 
							marginLeft+i,
							canvas.height-marginTop+deltaX)
				}
			}
			context.fillText("Mkz", canvas.width-marginLeft+deltaX,canvas.height-marginTop+deltaX)
	}
	
	
	
	
	
	
	
	return _;
})();