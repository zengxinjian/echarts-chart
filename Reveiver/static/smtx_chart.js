var smtx_chart = (function () {
    //canvas的方法很多，我们通过范围获取，判断我的鼠标是否在所指定的按钮内部。
    //isPointInPath(x,y);
    function _(options) {
        this.id = options.id;
        this.option = options.option;
        this.element = document.getElementById(this.id);
        this.canvas = document.createElement('canvas');
        this.canvas.id = this.id + 'canvas';
        this.canvas.style.float='left';
        this.element.appendChild(this.canvas);
        this.context = this.canvas.getContext('2d');
        this.drawIndex=0;
        this.buttonArray=this.option.buttonArray;
        this.changeColor=this.option.changeColor;
        console.log(this.changeColor);
        // this.canvas.style.backgroundColor = "#3f51b5";
        this.init();
        
    }
    _.prototype.init = function () {
        this.createCanvasElement()
        //mark功能
        this.EventHandlerMouseDown()
        //滑动十字架功能
        this.EventHandlerMousemove()
        //滚轮放大功能
    }
  
    //初始化canvas容器，并绘制坐标系
    _.prototype.createCanvasElement = function () {
        if ((!this.element.style.height) || (!this.element.style.width)) {

        } else {
            this.canvas.height = parseInt(this.element.style.height);
            this.canvas.width = parseInt(this.element.style.width)*0.9;
        }
        console.log(this.buttonArray);
        var button=document.createElement('button');
        button.style.width=parseInt(this.element.style.width)*0.05;
        button.value='mark';
        button.innerHTML='mark'
        button.style.float='left';
        this.element.appendChild(button);
        var button=document.createElement('button');
        button.style.width=parseInt(this.element.style.width)*0.05;
        button.value='mark';
        button.innerHTML='mark';
        button.style.float='left';
        this.element.appendChild(button);
        var button=document.createElement('button');
        button.style.width=parseInt(this.element.style.width)*0.05;
        button.value='mark';
        button.innerHTML='mark'
        button.style.float='left';
        this.element.appendChild(button);
        var button=document.createElement('button');
        button.style.width=parseInt(this.element.style.width)*0.05;
        button.value='mark';
        button.innerHTML='颜色'
        button.style.float='left';
        this.element.appendChild(button);
        this.context.save();
        this.context.strokeStyle = '#333';
        this.context.lineWidth = "1";
        this.drawCoordinateH();
        this.drawCoordinateV();
        this.drawCoorLabelH();
        this.drawCoorHTick();
        this.drawCoorLabelV();
        this.drawCoorVTick();
        this.context.restore();

    }

    //水平直线
    _.prototype.drawCoordinateH = function () {
        this.context.save()
        this.context.beginPath();
        this.context.moveTo(this.canvas.width * 0.1, this.canvas.height * 0.9);
        this.context.lineTo(this.canvas.width, this.canvas.height * 0.9);
        this.context.stroke();
    }
    //垂直直线
    _.prototype.drawCoordinateV = function () {
        this.context.save()
        this.context.beginPath();
        this.context.moveTo(this.canvas.width * 0.1, 0);
        this.context.lineTo(this.canvas.width * 0.1, this.canvas.height * 0.9);
        this.context.stroke();
    }
    //刻度（水平方向）
    _.prototype.drawCoorHTick = function () {
        this.strokeStyle = "#000";
        var HWidth = this.canvas.width * 0.9;
        for (var i = 0; i < HWidth; i++) {
            this.context.beginPath();
            if (i % 20 === 0 && i !== 0) {
                this.context.moveTo(this.canvas.width * 0.1 + i, this.canvas.height * 0.90)
                this.context.lineTo(this.canvas.width * 0.1 + i, this.canvas.height * 0.92);
                this.context.stroke();
            }
        }
    }
    //水平方向的label
    _.prototype.drawCoorLabelH = function () {
        this.context.textAlign = "center";
        this.context.textBaseline = "top";
        this.context.strokeStyle = "#000";
        this.context.font = "10px Arial"
        var HWidth = this.canvas.width * 0.9;
        for (var i = 0; i < HWidth; i++) {
            this.context.beginPath();
            if (i % 20 === 0 && i !== 0) {
                this.context.fillText(parseInt(i),
                    this.canvas.width * 0.1 + i,
                    this.canvas.height * 0.92)
            }
        }
    }
    //垂直方向的label
    _.prototype.drawCoorLabelV = function () {
        this.context.textAlign = "center";
        this.context.textBaseline = "top";
        this.context.strokeStyle = "#000";
        this.context.font = "10px Arial"
        var VHeight = this.canvas.height * 0.9;
        for (var i = 0; i < VHeight; i++) {
            if (i % 20 === 0) {
                this.context.fillText(parseInt(i),
                    this.canvas.width * 0.05,
                    i)
            }
        }
    }
    //刻度（垂直方向）
    _.prototype.drawCoorVTick = function () {

        var VHeight = this.canvas.height * 0.9;
        for (var i = 0; i < VHeight; i++) {
            this.context.beginPath();
            if (i % 20 === 0) {
                this.context.moveTo(this.canvas.width * 0.08, i)
                this.context.lineTo(this.canvas.width * 0.1, i);
                this.context.stroke();
            }
        }
    }
    //添加数据，并且处理数据
    _.prototype.appendData = function (data) {
        //这里先判断是什么类型;
        // if(typeof(data)!==Array){
        //     return;
        // }
        this.drawData(data);

    }
    //绘制处理好的数据
    _.prototype.drawData = function (data) {
        //负责绘制区域的面积大小，位置区域。
        var imageData = this.context.createImageData(1, 1);
        // var drawData = getImageData(data, imageData);
        var drawData=this.getImageData(data);
        for(var i=0,j=0;i<drawData.length;){
           // this.context.putImageData(drawData[i],this.drawIndex,i)
           this.context.putImageData(drawData[i],this.canvas.width * 0.1+this.drawIndex,this.canvas.height * 0.9-j-2);
           i+=25;
           j+=1;
         }
         
         if(this.drawIndex>parseInt(this.canvas.width*0.9)){
            
            console.log(parseInt(this.canvas.width*0.9));
                var img=this.context.getImageData(parseInt(this.canvas.width * 0.1),0,parseInt(this.canvas.width*0.9),parseInt(this.canvas.height*0.9));
              
                this.context.putImageData(img,parseInt(this.canvas.width * 0.1)-2,0);
                
         }
        this.drawIndex++;
    }
    _.prototype.getImageData=function(data){
        var goDistinct = [];
        data.map(function (v) {
            console.log()
            // var value=parseInt(v);
            var value=Math.ceil(v);
            goDistinct.push(value);

        })
        var hashMap = this.distinct(goDistinct);

        // console.log(hashMap);
        var imageDataArray = [];
        let rgb={}
        // let newImageData=imageData;
        data.map((v)=>{
           var newImageData=this.context.createImageData(1, 1)
        //    var value=parseInt(v);
           var value=Math.ceil(v);
            rgb = hashMap[value];
            (function(rgb,newImageData){
                // debugger;
                // console.log(newImageData.data.length);
                for (let j = 0; j < newImageData.data.length; j+=4) {
                    newImageData.data[j + 0] = rgb[0];
                    newImageData.data[j + 1] = rgb[1];
                    newImageData.data[j + 2] = rgb[2];
                    newImageData.data[j + 3] = 255;
                }
                imageDataArray.push(newImageData);
            })(rgb,newImageData)
        })

        return imageDataArray;
    }
    _.prototype.distinct=function(array){
        var hash = [];
        for (var i = 0; i < array.length; i++) {
            if (array.indexOf(array[i]) == i) {
                hash.push(array[i]);
            }
        }
       console.log(hash.length);
        // 
        // var gradientArray = new gradientColor(this.changeColor[0],this.changeColor[1], hash.length);
        var gradientArray = new gradientColor(this.changeColor[0],this.changeColor[1], hash.length);
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
   
    function argsToImage(imageData,rgb){
        for (let j = 0; j < imageData.data.length; j+=4) {
            imageData.data[j + 0] = rgb.r;
            imageData.data[j + 1] = rgb.g;
            imageData.data[j + 2] = rgb.b;
            imageData.data[j + 3] = 255;
           
        }
        // console.log(imageData);
        return imageData;
    }

    //去重返回不重复的数据的长度，做颜色渐变的step值。
    function distinct(array) {
        var hash = [];
        for (var i = 0; i < array.length; i++) {
            if (array.indexOf(array[i]) == i) {
                hash.push(array[i]);
            }
        }
       
        // 
        var gradientArray = new gradientColor('#0b52ad','#FF0000', hash.length);
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

    function getMaxOfArray(data) {
        return Math.max.apply(null, data);
    }

    function getMinOfArray(data) {
        return Math.min.apply(null, data);
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
            var rgb=[];
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
    //鼠标事件，放在这里，还有按钮事件。
    _.prototype.EventHandlerMouseDown=function(){
        var that=this;
        that.canvas.addEventListener("mousedown",function(e){
            // var doc=document.createElement('div');
            // doc.style.width="200px";
            // doc.style.height="200px";
            // doc.style.border="1px solid #ddd";
            // that.element.appendChild(doc);
            console.log(e);
            console.log(e.clientX,e.clientY);
        },false);

    }
    _.prototype.EventHandlerMousemove=function(){
        var that=this;
        that.canvas.addEventListener("mousemove",function(e){
            var doc=document.createElement('div');
            doc.style.width="200px";
            doc.style.height="200px";
            doc.style.left=e.clientX;
            doc.style.top=e.clientY;
            doc.style.border="1px solid #ddd";
            // that.element.appendChild(doc);
             
        },false);

    }

    return _;

})()