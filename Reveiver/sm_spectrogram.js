var sm_spectrogram=(function(){
    function _(options){
        this.id=options.id;
        this.option=options.option;
        this.drawIndex = 0;
        this.changeColor = this.option.changeColor;
        this.axis=this.option.axis;
        this.allData=[];
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
        this.drawVTick();
        this.drawGradientLine()
    }
    _.prototype.drawGradientLine=function(){
        this.ctx.beginPath();
        var gradient=this.ctx.createLinearGradient(parseInt(this.canvas.width*0.01),parseInt(this.canvas.height*0.2),parseInt(this.canvas.width*0.03),parseInt(this.canvas.height*0.6));
        gradient.addColorStop(0,this.changeColor[0]);
        gradient.addColorStop(1,this.changeColor[1]);
        this.ctx.fillStyle=gradient;
        this.ctx.fillRect(parseInt(this.canvas.width*0.01),parseInt(this.canvas.height*0.3),parseInt(this.canvas.width*0.03),parseInt(this.canvas.height*0.6));
    }
    _.prototype.drawHTick=function(){
        for (var i = 0; i < this.canvas.width * 0.8; i++) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = "#ddd"
            this.ctx.lineWidth = 0.5;
            this.ctx.font = "10px Arial";
            if (i % parseInt(this.canvas.width * 0.8 / 10) === 0) {
                this.ctx.fillText(parseInt(i),
                    i + this.canvas.width * 0.1 - 5,
                    this.canvas.height * 0.9 + 10)
                this.ctx.stroke()
            }
        }
    }
    _.prototype.drawVTick=function(){
        for (var i = 0; i < this.canvas.height * 0.8; i++) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = "#ddd";
            this.ctx.font = "10px Arial";
                if (i % parseInt(this.canvas.height * 0.8 / 10) === 0 && i !== 0) {
                    this.ctx.fillText(parseInt(i),
                    this.canvas.width * 0.1 - 20,
                    this.canvas.height * 0.9 - i +3)
                    this.ctx.stroke()
                }

        }
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
            for (var i = 0; i < drawData.length; i++) {
                
                this.ctx.putImageData(drawData[i], this.canvas.width * 0.1 + this.drawIndex, this.canvas.height * 0.8 + i - 2);

            }

            if (this.drawIndex > parseInt(this.canvas.width * 0.9)) {

                var img = this.ctx.getImageData(parseInt(this.canvas.width * 0.1), 0, parseInt(this.canvas.width * 0.9), parseInt(this.canvas.height * 0.9));

                this.ctx.putImageData(img, parseInt(this.canvas.width * 0.1) - 2, 0);

            }
            this.drawIndex++;
        } else {
            //这里的drawdata是指的颜色处理过后的数据，也就是Imgdata，可以直接put上去。
            
            if(drawData.length > (this.canvas.width * 0.8)){
                
                dataInCoorSpace = data.length / this.canvas.width * 0.8;
                for (var i = 0; i < this.canvas.width*0.8; i++) {
                //   console.log(drawData.length);
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

    _.prototype.getImageData = function (data) {
        var goDistinct = [];
        data.map(function (v) {
            var value = Math.ceil(v);
            goDistinct.push(value);

        })
        var hashMap = this.distinct(goDistinct);

        // console.log(hashMap);
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
                // console.log(newImageData.data.length);
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
            if (array.indexOf(array[i]) == i) {
                hash.push(array[i]);
            }
        }
        
        // 
        // var gradientArray = new gradientColor(this.changeColor[0],this.changeColor[1], hash.length);
        var gradientArray = new gradientColor(this.changeColor[0], this.changeColor[1], hash.length);
        // console.log(gradientArray);
        var hashMap = new Array();
        // console.log(newArray);
        for (var j = 0; j < hash.length; j++) {
            hashMap[hash[j]] = gradientArray[j];
        }

        // console.log(newArray);
        //将这个值的长度给颜色生成函数。

        return hashMap;
    }

    

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
            // console.log(parseInt((sR * i + startR)))
            // console.log(parseInt((sG * i + startG)))
            // console.log(parseInt((sB * i + startB)))
            //返回每一个的rgb。
            var rgb = [];
            rgb.push(parseInt((sR * i + startR)))
            rgb.push(parseInt((sG * i + startG)))
            rgb.push(parseInt((sB * i + startB)))
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
    // 将rgb表示方式转换为hex表示方式
    gradientColor.prototype.colorHex = function (rgb) {

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