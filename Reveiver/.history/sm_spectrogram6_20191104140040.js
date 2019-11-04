var sm_spectrogram=(function(){
    function _(options){
        this.id=options.id;
        this.option=options.option;
        this.drawIndex = 0;
        this.changeColor = this.option.changeColor;
        this.axis=this.option.axis;
        this.allData=[];
        this.rgbData=[];
        this.init()
    }
    _.prototype.init=function(){
        var canvas=document.createElement('canvas');
        var doc=document.getElementById(this.id);
        this.canvas=doc.appendChild(canvas);
        this.ctx=this.canvas.getContext('2d');
        this.canvas.width=parseInt(doc.style.width);
        this.canvas.height=parseInt(doc.style.height);
        this.canvas.style.width=doc.style.width;
        this.canvas.style.height=doc.style.height;
        // this.canvas.style.border='1px solid #000';
        this.drawRect();
        this.drawGH();
        this.drawGV();
        this.drawHTick();
        // this.drawVTick();
        this.drawGradientLine()
        this.drawGradientLineH();
    } 

    _.prototype.drawGradientLine=function(){
         //this.ctx.beginPath();
        //var gradient=this.ctx.createLinearGradient(parseInt(this.canvas.width*0.9+3),parseInt(this.canvas.height*0.3),parseInt(this.canvas.width*0.02),parseInt(this.canvas.height*0.6));
        //gradient.addColorStop(0,this.changeColor[0]);
        //gradient.addColorStop(1,this.changeColor[1]);
        
        //this.ctx.fillStyle=gradient;
        //this.ctx.fillRect(parseInt(this.canvas.width*0.9+3),parseInt(this.canvas.height*0.3),parseInt(this.canvas.width*0.02),parseInt(this.canvas.height*0.6));
        //this.ctx.stroke();
        
        var canvasGH = parseInt(this.canvas.height*0.6);
        var canvasGW = parseInt(this.canvas.width*0.02);
        var drawG = (parseInt(this.canvas.height*0.6)-30)/180;

        var data = [];
        for(var i=-150; i<31; i++) {
            data.push(i);
        }
        var gradient = this.gradientColor(data,data.length);
        var gr = gradient[0]; 
        var gRed = gr[0].toString(16);
        if(gRed.length < 2) {
            gRed = '0' + gRed;
        }
        var gGreen = gr[1].toString(16);
        if(gGreen.length < 2) {
            gGreen = '0' + gGreen;
        }
        var gBlue = gr[2].toString(16);
        if(gBlue.length < 2) {
            gBlue = '0' + gBlue;
        }
        var fillStyleStr =  '#' + gRed + gGreen + gBlue + ''; 
        this.ctx.fillStyle = fillStyleStr;
        this.ctx.fillRect(parseInt(this.canvas.width*0.9+3),parseInt(this.canvas.height*0.3),parseInt(this.canvas.width*0.02),15);
        //this.ctx.fill();
        this.ctx.save();
        this.ctx.stroke();
       
       // debugger
        
        for(var i=0; i < 181 ; i++){
            this.ctx.beginPath();
            var gr = gradient[i]; 
            var gRed = gr[0].toString(16);
            if(gRed.length < 2) {
                gRed = '0' + gRed;
            }
            var gGreen = gr[1].toString(16);
            if(gGreen.length < 2) {
                gGreen = '0' + gGreen;
            }
            var gBlue = gr[2].toString(16);
            if(gBlue.length < 2) {
                gBlue = '0' + gBlue;
            }
            var fillStyleStr =  '#' + gRed + gGreen + gBlue + ''; 
           // console.log("gRed: ",gRed,"gGreen: ",gGreen,"gBlue: ",gBlue, "fillStyleStr: ", fillStyleStr) 
               
            this.ctx.fillStyle = fillStyleStr;
            
           // console.log("this.ctx.fillStyle: ",this.ctx.fillStyle);
            this.ctx.fillRect(parseInt(this.canvas.width*0.9+3),parseInt(this.canvas.height*0.3)+drawG*i+15,parseInt(this.canvas.width*0.02),drawG+1);
            //this.ctx.fill();
            this.ctx.save();
            this.ctx.stroke();
        } 
        
        gr = gradient[180]; 
        gRed = gr[0].toString(16);
        if(gRed.length < 2) {
            gRed = '0' + gRed;
        }
        gGreen = gr[1].toString(16);
        if(gGreen.length < 2) {
            gGreen = '0' + gGreen;
        }
        gBlue = gr[2].toString(16);
        if(gBlue.length < 2) {
            gBlue = '0' + gBlue;
        }
        var fillStyleStr =  '#' + gRed + gGreen + gBlue + ''; 
        // console.log("gRed: ",gRed,"gGreen: ",gGreen,"gBlue: ",gBlue, "fillStyleStr: ", fillStyleStr)      
        this.ctx.fillStyle = fillStyleStr;
            
        // console.log("this.ctx.fillStyle: ",this.ctx.fillStyle);
        this.ctx.fillRect(parseInt(this.canvas.width*0.9+3),parseInt(this.canvas.height*0.3)+drawG*181+15,parseInt(this.canvas.width*0.02),15);
        //this.ctx.fill();
        this.ctx.save();
        this.ctx.stroke();
    }
    _.prototype.drawGradientLineH=function(){
        var canvasGH = parseInt(this.canvas.height*0.6);
        
        var canvasGW = parseInt(this.canvas.width*0.02);
        var spaning =  (canvasGH - 30)/9;          //线的跨度
        //console.log("spaning: " ,spaning);
        // 画标线：两条标线的线的跨度 spaning，第一条标线的起始位置:this.canvas.height*0.3+spaning/3      
        for(var i=1; i<11; i++) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = "#ffffff";
            this.ctx.lineWidth = 0.8;
            //if ((i % 10) === 0)  {
            this.ctx.moveTo(parseInt(this.canvas.width*0.9+3), parseInt(this.canvas.height*0.3+15) + spaning*(i-1));  //超出-150--30 画15高度
            this.ctx.lineTo(parseInt(this.canvas.width*0.9+3) + canvasGW, parseInt(this.canvas.height*0.3+15) + spaning*(i-1));  // 超出-150--30 画15高度
            //this.ctx.stroke();

            this.ctx.strokeStyle = "#ffffff";
            this.ctx.textAlign = "left";
            var val = (i-1) * 20 - 150;
            this.ctx.fillText(val.toString(),
            parseInt(this.canvas.width*0.9+3) + canvasGW,     // X轴的位置
            parseInt(this.canvas.height*0.3+15) + spaning*(i-1) + 5);   // Y轴的位置
            this.ctx.stroke();
            
            
            //}
            /* 
            else if((i % 5) === 0) {
                this.ctx.moveTo(parseInt(this.canvas.width*0.01+3) + canvasGW/3, parseInt(this.canvas.height*0.2) + spaning*i);
                this.ctx.lineTo(parseInt(this.canvas.width*0.01+3) + canvasGW, parseInt(this.canvas.height*0.2) + spaning*i);
            } else {
                this.ctx.moveTo(parseInt(this.canvas.width*0.01+3) + (canvasGW*2)/3, parseInt(this.canvas.height*0.2) + spaning*i);
                this.ctx.lineTo(parseInt(this.canvas.width*0.01+3) + canvasGW, parseInt(this.canvas.height*0.2) + spaning*i);
            }*/
         // this.ctx.stroke()
        }
    }
    _.prototype.drawHTick=function(){
        var center = $("#input_center").val() * 1000;
		var span = $("#input_span").val() * 1000;
		var _start_f = parseInt(center - span / 2);
		if (_start_f < -18750 / 2)
			_start_f = -18750 / 2;
		var _end_f = parseInt(center + span / 2);
		if (_end_f > 18750 / 2)
			_end_f = 18750 / 2;
		var _length_f = _end_f - _start_f;
		for (var i = 0; i < this.canvas.height * 0.8 + 1; i++) {
			this.ctx.beginPath();
			this.ctx.strokeStyle = "#ddd"
			this.ctx.lineWidth = 0.5;
			this.ctx.font = "14px Arial";
			this.ctx.textAlign = "right";
			if (i % parseInt(this.canvas.height * 0.8 / 10) === 0) {
				var vtxt = parseInt(_start_f + i * _length_f / (this.canvas.height*0.8));
				this.ctx.fillText(vtxt,
					this.canvas.width * 0.1 - 5,
					this.canvas.height*0.1 +i+ (i===(this.canvas.height*0.8)?0:5))
				this.ctx.stroke() //图形绘制
			}

        }
        this.ctx.fillText("单位:Hz",
            this.canvas.width * 0.1 + 8,
			this.canvas.height * 0.9 + 16)
		// this.ctx.fillText("单位:Hz",
		// 	this.canvas.width * 0.8 + 105,
		// 	this.canvas.height * 0.9 + 28)
		this.ctx.stroke()
    }
    _.prototype.drawVTick=function(){
        var oldHeight = this.canvas.height * 0.8;
        for (var i = 0; i <= parseInt(oldHeight); i++) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = "#ddd";
            this.ctx.font = "14px Arial";
			if (i % parseInt(oldHeight / 10) === 0 && i !== 0) {
				if(this.drawIndex > parseInt(oldHeight)){
					var a = this.drawIndex - parseInt(oldHeight) + i;
					this.ctx.fillText(parseInt(a),
						this.canvas.width * 0.1 - 5,
						this.canvas.height * 0.1 + i+ (i===parseInt(oldHeight)?0:5));
				}else{
                    this.ctx.fillText(parseInt(i),
                        this.canvas.width * 0.1 - 5,
                        this.canvas.height * 0.1 + i+ (i===parseInt(oldHeight)?0:5))
                }
                
			}
        }
		this.ctx.fillText("单位:s",
			this.canvas.width * 0.1 - 5,
			this.canvas.height * 0.1 + 9)
		this.ctx.stroke()
    }
    _.prototype.drawRect=function(){
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(this.canvas.width * 0.1, this.canvas.height * 0.1, this.canvas.width * 0.8, this.canvas.height * 0.8);
    }
    _.prototype.drawGV=function(){
        for (var i = 0; i < this.canvas.height * 0.8; i++) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = "#eee"
            this.ctx.lineWidth = 0.5;
            if (i % parseInt(this.canvas.height * 0.8 / 10) === 0) {
                this.ctx.moveTo(this.canvas.width * 0.1, this.canvas.height * 0.1 + i)
                this.ctx.lineTo(this.canvas.width * 0.9, this.canvas.height * 0.1 + i)
                this.ctx.stroke()
            }
        }
    }
    _.prototype.drawGH=function(){
        for (var i = 0; i < this.canvas.width * 0.8; i++) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = "#eee"
            this.ctx.lineWidth = 0.5;
            if (i % parseInt(this.canvas.width * 0.8 / 10) === 0) {
                this.ctx.moveTo(this.canvas.width * 0.1 + i, this.canvas.height * 0.1)
                this.ctx.lineTo(this.canvas.width * 0.1 + i, this.canvas.height * 0.9)
                this.ctx.stroke()
            }
        }
    }
    _.prototype.drawData=function(data){
        var drawData = this.getImageData(data);
        this.allData.push(data);
        var dataInCoorSpace ;
        if (this.axis ==="Horizontal") {
            debugger
            if(drawData.length > (this.canvas.width * 0.8)){
                dataInCoorSpace = data.length / (this.canvas.height * 0.8);
                for (var i = 0; i < this.canvas.height*0.8; i++) {
                    this.ctx.putImageData(drawData[parseInt(i*dataInCoorSpace)], this.canvas.width*0.1+this.drawIndex>this.canvas.width*0.9?parseInt(this.canvas.width*0.9)-1:parseInt(this.canvas.width*0.1)+this.drawIndex, this.canvas.height*0.1+i);
                }
                if (this.drawIndex > parseInt(this.canvas.width * 0.8)) {
                    var img = this.ctx.getImageData(parseInt(this.canvas.height * 0.1), 0, parseInt(this.canvas.width * 0.9), parseInt(this.canvas.height * 0.9));
                    this.ctx.putImageData(img, parseInt(this.canvas.width * 0.1) - 2, 0);
                }
                if (this.drawIndex > parseInt(this.canvas.width * 0.8)) {
                    var img = this.ctx.getImageData(parseInt(this.canvas.height * 0.1), parseInt(this.canvas.width*0.1), parseInt(this.canvas.height * 0.8), parseInt(this.canvas.width * 0.8));
                    this.ctx.putImageData(img, parseInt(this.canvas.height * 0.1), parseInt(this.canvas.width*0.1)-1);
                    this.allData.shift();
					// 清除Y坐标数值，重新绘制数据
					this.ctx.clearRect(50,0,45,this.canvas.width*0.9);
					this.drawVTick();
                }
                this.drawIndex++;
            }
        } else {
            //这里的drawdata是指的颜色处理过后的数据，也就是Imgdata，可以直接put上去。
            //重绘横向标尺 this.drawHTick()
            this.redraw();
            this.drawHTick();
            if(drawData.length > (this.canvas.width * 0.8)){
                dataInCoorSpace = data.length / (this.canvas.width * 0.8);
                for (var i = 0; i < this.canvas.width*0.8; i++) {
                    this.ctx.putImageData(drawData[parseInt(i*dataInCoorSpace)], this.canvas.width * 0.1 + i, this.canvas.height*0.1+this.drawIndex>this.canvas.height*0.9?parseInt(this.canvas.height*0.9)-1:parseInt(this.canvas.height*0.1)+this.drawIndex);
                }
                //通过像素的获取绘制要注意取到的值是整数,不然的话会导致像素偏移
                if (this.drawIndex > parseInt(this.canvas.height * 0.8)) {
                    var img = this.ctx.getImageData(parseInt(this.canvas.width * 0.1), parseInt(this.canvas.height*0.1), parseInt(this.canvas.width * 0.8), parseInt(this.canvas.height * 0.8));
                    this.ctx.putImageData(img, parseInt(this.canvas.width * 0.1), parseInt(this.canvas.height*0.1)-1);
                    this.allData.shift();
					// 清除Y坐标数值，重新绘制数据
					this.ctx.clearRect(50,0,45,this.canvas.height*0.9);
					this.drawVTick();
                }
                this.drawIndex++;
            } else {
                dataInCoorSpace = this.canvas.width * 0.8 / data.length;
                for (var i = 0; i < this.canvas.width*0.8; i++) {
                    // this.ctx.putImageData(drawData[i],this.drawIndex,i)
                    // this.ctx.putImageData(drawData[i],this.canvas.width * 0.1+this.drawIndex,this.canvas.height * 0.9-i-2);
                    this.ctx.putImageData(drawData[parseInt(i*dataInCoorSpace)], this.canvas.width * 0.1 + i, this.canvas.height*0.1+this.drawIndex>this.canvas.height*0.9?parseInt(this.canvas.height*0.9)-1:parseInt(this.canvas.height*0.1)+this.drawIndex);
                }
                //通过像素的获取绘制要注意取到的值是整数,不然的话会导致像素偏移
                if (this.drawIndex > parseInt(this.canvas.height * 0.9)) {
                    var img = this.ctx.getImageData(parseInt(this.canvas.width * 0.1), parseInt(this.canvas.height*0.1), parseInt(this.canvas.width * 0.8), parseInt(this.canvas.height * 0.8));
                    this.ctx.putImageData(img, parseInt(this.canvas.width * 0.1), parseInt(this.canvas.height*0.1)-1);
                    this.allData.shift();
                }
                this.drawIndex++;
            }
        }
    }
    //在绘制新的数据前先删除再重绘一遍
	_.prototype.redraw = function() {
		/* this.ctx.clearRect(this.canvas.width * 0.1, this.canvas.height * 0.1, this.canvas.width * 0.8, this.canvas.height *
			0.8);
		this.ctx.save();
		this.ctx.fillStyle = '#000';
		this.ctx.fillRect(this.canvas.width * 0.1, this.canvas.height * 0.1, this.canvas.width * 0.8, this.canvas.height *
			0.8);

		this.drawGV(this.data);
		this.drawGH()
		this.ctx.stroke() */

		this.ctx.clearRect(0, this.canvas.height*0.9, this.canvas.width, this.canvas.height * 0.1); //清除画布所有图形
		this.ctx.save();
		this.ctx.fillStyle = '#000';
		//this.ctx.fillRect(this.canvas.width * 0.1, this.canvas.height * 0.1, this.canvas.width * 0.8, this.canvas.height *
		//	0.8); //中间网格
		//this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

		// this.drawGV(this.data);
		//this.drawGH()
		this.ctx.stroke()
	}
    
    _.prototype.getImageData = function (data) {
        var goDistinct = [];
        data.map(function (v) {
            var value = Math.ceil(v);
            goDistinct.push(value);

        })
        var hashMap = this.distinct(goDistinct);

        var imageDataArray = [];
        let rgb = {}
        // let newImageData=imageData;
        data.map((v) => {
            var newImageData = this.ctx.createImageData(1, 1)
            //    var value=parseInt(v);
            var value = Math.ceil(v);
            rgb = hashMap[value];
            (function (rgb, newImageData) {
                // debugger;
                for (let j = 0; j < newImageData.data.length; j += 4) {
                    newImageData.data[j + 0] = rgb[0];
                    newImageData.data[j + 1] = rgb[1];
                    newImageData.data[j + 2] = rgb[2];
                    newImageData.data[j + 3] = 255;
                }
                imageDataArray.push(newImageData);
            })(rgb, newImageData)
        })
        return imageDataArray;
    }
    _.prototype.distinct = function (array) {
        var hash = [];
        
        for (var i = 0; i < array.length; i++) {
            //if (array.indexOf(array[i]) == i) {
                hash.push(array[i]);
           // }
        }
        
        // 
        // var gradientArray = new gradientColor(this.changeColor[0],this.changeColor[1], hash.length);
        // var gradientArray = new gradientColor(this.changeColor[0], this.changeColor[1], hash.length);
        var gradientArray =  this.gradientColor(hash, hash.length);
        var hashMap = new Array();
        for (var j = 0; j < hash.length; j++) {
            hashMap[hash[j]] = gradientArray[j];
        }

        //将这个值的长度给颜色生成函数。


        return hashMap;
    }

    
    /*
    //根据数组的长度返回颜色数组。
    function gradientColor(startColor, endColor, step) {

        startRGB = this.colorRgb(startColor); //转换为rgb数组模式
        startR = startRGB[0];
        startG = startRGB[1];
        startB = startRGB[2];

        endRGB = this.colorRgb(endColor);
        endR = endRGB[0];
        endG = endRGB[1];
        endB = endRGB[2];

        sR = (endR - startR) / step; //总差值
        sG = (endG - startG) / step;
        sB = (endB - startB) / step;

        var colorArr = [];
        for (var i = 0; i < step; i++) {
            //计算每一步的hex值 
            //返回每一个的rgb。
            var rgb = [];
            rgb.push(parseInt((Math.round(this.rgbData[0]*val) + 0)))
            rgb.push(parseInt((Math.round(this.rgbData[1]*val) + 0)))
            rgb.push(parseInt((Math.round(this.rgbData[2]*val) + 255)))
            // var rgb = {}
            // rgb.r = parseInt((sR * i + startR))
            // rgb.g = parseInt((sG * i + startG))
            // rgb.b = parseInt((sB * i + startB))
            // var hex = this.colorHex('rgb('+ parseInt((sR * i + startR))+ ',' + parseInt((sG * i + startG))+ ',' + parseInt((sB * i + startB)) + ')');

            colorArr.push(rgb);
        }
        return colorArr;
    }

    gradientColor.prototype.colorRgb = function (sColor) {
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        var sColor = sColor.toLowerCase();
        if (sColor && reg.test(sColor)) {
            if (sColor.length === 4) {
                var sColorNew = "#";
                for (var i = 1; i < 4; i += 1) {
                    sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                }
                sColor = sColorNew;
            }
            //处理六位的颜色值
            var sColorChange = [];
            for (var i = 1; i < 7; i += 2) {
                sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
            }
            return sColorChange;
        } else {
            return sColor;
        }
    };
    */


   _.prototype.gradientColor = function(data,len) {

    var colorArr = [];
    var max = Math.max.apply(null,data);
    var min = Math.min.apply(null,data);
    
    if(max === 0 && min === -1000000) {
        for (var i = 0; i < len; i++) {
            var rgb = [0.0, 0.0, 0.0];
            rgb[2] = 255;
            colorArr.push(rgb);
        }
    } else {
        for (var i = 0; i < len; i++) {
            //计算每一步的hex值 
            // console.log(parseInt((sR * i + startR)))
            // console.log(parseInt((sG * i + startG)))
            // console.log(parseInt((sB * i + startB)))
            //返回每一个的rgb。
            var val = data[i];
            var rgb = [0.0, 0.0, 0.0];
           
            if(val < -150) {
                val = -150;
            } else if(val > 30) {
                val = 30;
            }

            val = (val+150)/180;
            if(val < 0.125){
                rgb[2] = parseInt(256 * (0.5+ (val * 4)))
            }else if(val < 0.375){
                rgb[2] = 255;
                rgb[1] = parseInt(256 * (val - 0.125) *4)
            }else if(val < 0.625){
                rgb[2] = parseInt(256 * (-4 * val + 2.5))
                rgb[1] = 255
                rgb[0] = parseInt(256 * (4 * (val - 0.375)))
            }
            else if(val < 0.875){
                rgb[1] = parseInt(256 * (-4 * val + 3.5))
                rgb[0] = 255
            }else{
                rgb[0] = parseInt(256* (-4 * val + 4.5))
            }
            

            // rgb.push(parseInt((Math.round(this.rgbData[0]*val) + 0)))
            // rgb.push(parseInt((Math.round(this.rgbData[1]*val) + 0)))
            // rgb.push(parseInt((Math.round(this.rgbData[2]*val) + 255)))
            // var rgb = {}
            // rgb.r = parseInt((sR * i + startR))
            // rgb.g = parseInt((sG * i + startG))
            // rgb.b = parseInt((sB * i + startB))
            // var hex = this.colorHex('rgb('+ parseInt((sR * i + startR))+ ',' + parseInt((sG * i + startG))+ ',' + parseInt((sB * i + startB)) + ')');

            colorArr.push(rgb);
            //console.log(rgb,'========================')
        }
    }
    //console.log("colorArr",colorArr);
    return colorArr;
}

    _.prototype.colorRgb = function (sColor) {
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        var sColor = sColor.toLowerCase();
        if (sColor && reg.test(sColor)) {
            if (sColor.length === 4) {
                var sColorNew = "#";
                for (var i = 1; i < 4; i += 1) {
                    sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                }
                sColor = sColorNew;
            }
            //处理六位的颜色值
            var sColorChange = [];
            for (var i = 1; i < 7; i += 2) {
                sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
            }
            return sColorChange;
        } else {
            return sColor;
        }
    };
    // 将rgb表示方式转换为hex表示方式
    _.prototype.colorHex = function (rgb) {

        var _this = rgb;
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        if (/^(rgb|RGB)/.test(_this)) {
            var aColor = _this.replace(/(?:(|)|rgb|RGB)*/g, "").split(",");
            var strHex = "#";
            for (var i = 0; i < aColor.length; i++) {
                var hex = Number(aColor[i]).toString(16);
                hex = hex < 10 ? 0 + '' + hex : hex; // 保证每个rgb的值为2位
                if (hex === "0") {
                    hex += hex;
                }
                strHex += hex;
            }
            if (strHex.length !== 7) {
                strHex = _this;
            }
            return strHex;
        } else if (reg.test(_this)) {
            var aNum = _this.replace(/#/, "").split("");
            if (aNum.length === 6) {
                return _this;
            } else if (aNum.length === 3) {
                var numHex = "#";
                for (var i = 0; i < aNum.length; i += 1) {
                    numHex += (aNum[i] + aNum[i]);
                }
                return numHex;
            }
        } else {
            return _this;
        }
    }
    return _;
})()