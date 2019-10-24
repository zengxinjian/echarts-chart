//接收机频谱图,频谱数据需通过实部I和虚部Q进行FFT计算得到
var sm_pin = (function() {
	function _(options) {
		this.id = options.id;
		this.option = options.option;
		this.data = [];
		this.type = this.option.type;
		this.markerList = [];
		this.dataInCoorSpace = null;
		this.zlc = 1000; //纵向量程，最大和最小数中的绝对值大的
		this.init()
	}
	_.prototype.init = function() {
		console.log("init--FFT");
		var canvas = document.createElement('canvas');
		var doc = document.getElementById(this.id);
		this.canvas = doc.appendChild(canvas);
		this.ctx = this.canvas.getContext('2d');
		this.canvas.width = parseInt(doc.style.width);
		this.canvas.height = parseInt(doc.style.height);
		this.canvas.style.width = doc.style.width;
		this.canvas.style.height = doc.style.height;
		// this.canvas.style.border='1px solid #000';
		// this.canvas.style.backgroundColor='#000';
		this.drawRect(); //矩形黑底背景
		this.drawGH(); //纵向网格
		this.drawGV(); //横向网格
		this.drawHTick(); //横坐标 标尺
		this.drawVTick(); //纵坐标 标尺
		this.mousemove(); //鼠标移动
		//this.drawTickRect(); //此方法会在左上角增加灰色块，本用于实现纵坐标滑块、单位，暂时注释掉
		this.mousePeak(); //
		this.mouseDrop(); //鼠标按下并且放开时的操作，对与标记符号
	}

	_.prototype.drawHTick = function() {
		var center = $("#input_center").val() * 1000;
		var span = $("#input_span").val() * 1000;
		var _start_f = parseInt(center - span / 2);
		if (_start_f < -18750 / 2)
			_start_f = -18750 / 2;
		var _end_f = parseInt(center + span / 2);
		if (_end_f > 18750 / 2)
			_end_f = 18750 / 2;
		var _length_f = _end_f - _start_f;
		//console.log("_length_f--",_length_f);
		for (var i = 0; i < this.canvas.width * 0.8 + 1; i++) {
			this.ctx.beginPath();
			this.ctx.strokeStyle = "#ddd"
			this.ctx.lineWidth = 0.5;
			this.ctx.font = "14px Arial";
			this.ctx.textAlign = "right";
			if (i % parseInt(this.canvas.width * 0.8 / 10) === 0) {
				var vtxt = parseInt(_start_f + i * _length_f / 800);
				//console.log("drawHTick--",i,vtxt);
				this.ctx.fillText(vtxt,
					i + this.canvas.width * 0.1 + 5,
					this.canvas.height * 0.9 + 15)
				this.ctx.stroke() //图形绘制
			}

		}
		this.ctx.fillText("单位:Hz",
			this.canvas.width * 0.8 + 120,
			this.canvas.height * 0.9 + 28)
		this.ctx.stroke()
	}
	_.prototype.drawVTick = function() {
		//console.log("height--" + this.canvas.height * 0.8);
		this.ctx.beginPath();
		this.ctx.strokeStyle = "#ddd";
		this.ctx.font = "14px Arial";
		this.ctx.textAlign = "right";
		var li = this.canvas.height * 0.8 / 100; //100为最大值
		for (var i = 0; i < this.canvas.height * 0.8 + 1; i++) {
			if (i % parseInt(this.canvas.height * 0.8 / 10) === 0 && i !== 0) {
				// var aa = Math.round(i*li);//2.08333为limit
				//   	  var bb = Math.round(aa/10);
				/* var myheigth = this.canvas.height * 0.8;
				console.log("myheigth--", myheigth);
				aa = Math.round((i - myheigth / 2) * (this.zlc / (myheigth / 2))); //四舍五入取整，包含负整数

				console.log(i, "-aa-1---", aa);
				console.log(i, "-aa-2---", parseInt(aa));

				var cc = Math.round(i / li);
				this.ctx.fillText(cc,
					this.canvas.width * 0.1 - 10,
					this.canvas.height * 0.9 - i + 10)
				this.ctx.stroke() */
				var aa;
				var myheigth = this.canvas.height * 0.8;
				//console.log("myheigth--", myheigth);
				if (this.zlc == 1000) { //初始化时纵向量程为1000
					//console.log("this.zlc--", this.zlc);
					aa = Math.round((i - myheigth / 2) * (this.zlc / (myheigth / 2))); //5.5472为limit = max / myCanvasHeigth 
				} else { //有数据输入时，纵向量程不为1000
					aa = Math.round((i - myheigth / 2) * (this.zlc / (myheigth / 2))); //四舍五入取整，包含负整数 
				}
				//console.log(i, "-aa-1---", aa);
				//console.log("aa-2---", parseInt(aa));
				var vtxt;
				vtxt = Math.round(aa);
				this.ctx.fillText(vtxt,
					this.canvas.width * 0.1 - 10,
					this.canvas.height * 0.9 - i + 6)
				//console.log("pin-drawVTick----", parseInt(i), vtxt);
				this.ctx.stroke()
			}

		}


		// this.ctx.fillText("单位:dB",
		// 	this.canvas.width * 0.1 - 10,
		// 	this.canvas.height * 0.9 - i - 10)
		// this.ctx.stroke()

	}
	_.prototype.drawRect = function() {
		this.ctx.fillStyle = '#000';
		this.ctx.fillRect(this.canvas.width * 0.1, this.canvas.height * 0.1, this.canvas.width * 0.8, this.canvas.height *
			0.8);
	}
	_.prototype.drawGV = function(data) {

		for (var i = 0; i < this.canvas.height * 0.8; i++) {
			this.ctx.beginPath();
			this.ctx.strokeStyle = "#eee"
			this.ctx.lineWidth = 1;
			if (i % parseInt(this.canvas.height * 0.8 / 10) === 0) {
				this.ctx.moveTo(this.canvas.width * 0.1, this.canvas.height * 0.1 + i)
				this.ctx.lineTo(this.canvas.width * 0.9, this.canvas.height * 0.1 + i)

				if (i === parseInt(this.canvas.height * 0.8 / 2)) {
					//console.log("white========");
					this.ctx.strokeStyle = "#FFFFFF"
				}
				this.ctx.stroke()
			}

		}
	}
	_.prototype.drawTickRect = function() {
		if (this.type === 'sincurve') return;
		this.ctx.clearRect(0, 0, this.canvas.width * 0.2, this.canvas.height * 0.1)
		this.ctx.fillStyle = 'rgb(0,0,0,0.09)';
		this.ctx.fillRect(0, 0, this.canvas.width * 0.2, this.canvas.height * 0.1);
		// this.ctx.fillText(,5,5)
		//console.log(this.markerList.length);
		if (this.markerList.length > 0) {
			this.ctx.fillStyle = 'rgb(0,0,0,0.09)';
			//console.log(this.canvas.width * 0.8)
			this.ctx.fillRect(this.canvas.width * 0.8, 0, this.canvas.width, this.canvas.height * 0.1)
		}
	}
	_.prototype.drawTickDelta = function(hz) {
		console.log(hz);
		var index = this.data.indexOf(hz);
		this.ctx.fillStyle = '#000';
		this.ctx.fillText('MR:' + hz + 'dBm', 5, 20)
		this.ctx.fillText(index + 'k', 5, 25)
		this.ctx.save();
	}
	_.prototype.drawGH = function(Length) {
		for (var i = 0; i < this.canvas.width * 0.8; i++) {
			this.ctx.beginPath();
			this.ctx.strokeStyle = "#eee"
			this.ctx.lineWidth = 1;
			if (i % parseInt(this.canvas.width * 0.8 / 10) === 0) {
				this.ctx.moveTo(this.canvas.width * 0.1 + i, this.canvas.height * 0.1)
				this.ctx.lineTo(this.canvas.width * 0.1 + i, this.canvas.height * 0.9)
				this.ctx.stroke()
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


		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //清除画布所有图形
		this.ctx.save();
		this.ctx.fillStyle = '#000';
		this.ctx.fillRect(this.canvas.width * 0.1, this.canvas.height * 0.1, this.canvas.width * 0.8, this.canvas.height *
			0.8); //中间网格
		//this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

		this.drawGV(this.data);
		this.drawGH()
		this.ctx.stroke()
	}

	//    if(data){
	//    	var max=Math.max.apply(null,data);
	//    	var min=Math.min.apply(null,data);
	//    	var current=max-min;
	//    	var vSpace=current/this.canvas.height;
	//    	if(vSpace>1){
	//    		
	//    	}
	//    }

	//绘制数据
	_.prototype.drawData = function(data) {
		//console.log("sm_ping2_drawData---");
		//console.log(data);
		this.data = data;



		var max = Math.max.apply(null, data); //获取数组最大、最小值
		var min = Math.min.apply(null, data);
		var current = parseInt(max - min);
		var myCanvasHeigth = parseInt(this.canvas.height * 0.8);
		var myCanvasWidth = parseInt(this.canvas.width * 0.8);
		//var limit = 100 / myCanvasHeigth; //current/myCanvasHeigth;
		//console.log("myCanvasHeigth--" + myCanvasHeigth);



		this.redraw();
		//console.log("max--", max);
		//console.log("min--", min);
		var ma = Math.abs(max); //取绝对值
		var mi = Math.abs(min);
		//console.log("pin--ma--", ma);
		//console.log("pin--mi--", mi);
		var max_index = data.indexOf(max);
		//console.log("max_index---", max_index); //中心频点
		var min_index = data.indexOf(min);
		//console.log("min_index---", min_index); //中心频点
		// var center_min = center_point - parseInt(myCanvasWidth * 0.8); //按像素点和数据点对应排列，中心频点范围最小值，即数据点范围起点下标
		// var center_max = center_point + parseInt(myCanvasWidth * 0.8); //
		//console.log("center_min--", center_min);
		if (ma >= mi)
			this.zlc = ma;
		else
			this.zlc = mi;
		//console.log("pin--this.zlc--", this.zlc);
		if (this.zlc > 10) {
			this.zlc = parseInt(this.zlc * 1.1 / 10) * 10;
			//console.log("pin--add-10%-this.zlc--", this.zlc);
		}
		var limit = this.zlc / myCanvasHeigth;
		//console.log("pin--limit--" + limit); //缩放比例
		//重绘横向标尺 this.drawHTick()
		this.drawHTick();
		//重绘纵向标尺 this.drawVTick()
		this.drawVTick();
		//console.log("data.length--", data.length);
		//console.log("canvas.width--", this.canvas.width);
		//console.log(this.canvas.width * 0.8);

		if (data.length > (this.canvas.width * 0.8)) { //data.length > (this.canvas.width * 0.8)
			//console.log("pin--data.length >>>>", data.length)
			this.dataInCoorSpace = data.length / (this.canvas.width * 0.8);
			//console.log("dataInCoorSpace--" + this.dataInCoorSpace);
			this.ctx.beginPath();
			this.ctx.strokeStyle = '#00FF00'; //#FF0000
			//console.log("this.canvas.width-", this.canvas.width, this.canvas.width * 0.8)
			//console.log("this.canvas.height-", this.canvas.height, this.canvas.height * 0.8)
			/* 
			var a = myCanvasWidth / 2 - 10;
			var b = myCanvasWidth / 2 + 10;
			var p = center_point - myCanvasWidth / 2;
			console.log("a-b-", a, b, p);

			for (var i = 0; i < data.length; i++) {
				if (i < 10) {
					//console.log("x-y");
					console.log(this.canvas.width * 0.1 + i * this.dataInCoorSpace + 0.5);
					var yy = this.canvas.height / 2 - data[i] / (limit * 2) + 0.5;
					console.log(yy);
				}

				this.ctx.lineTo(this.canvas.width * 0.1 + i * this.dataInCoorSpace + 0.5, this.canvas.height / 2 - data[i] / (
						limit * 2) +
					0.5);
				i += 1;
			}
			this.ctx.stroke(); */
			/* for (var i = 0; i < myCanvasWidth; i++) {

				//a < i && i < b
				if (true) {
					//console.log("i--", i, p + i, data[p + i]);
					var x = this.canvas.width * 0.1 + i;
					var y = this.canvas.height * 0.9 - data[p + i] / limit + 0.5;
					//console.log("x-y--", x, y);
					this.ctx.lineTo(x, y);
				}
			} */

			//console.log("this.dataInCoorSpace--", this.dataInCoorSpace);
			for (var i = 0; i < this.canvas.width * 0.8; i++) {
				/* if (i < 10) {
					//console.log("x-y");
					console.log("x--", this.canvas.width * 0.1 + i + 0.5);
					var y = this.canvas.height * 0.8 / 2 - data[parseInt(i * this.dataInCoorSpace)] / (2 * limit);
					console.log("y--", y);
				} */
				//console.log("1111------", data[parseInt(i * this.dataInCoorSpace)]);
				//console.log("max--", max, min);
				if (max == 0 && min == -1000000) {
					//console.log("max == min == 0"); //全0的数据为中间一条线
					this.ctx.lineTo(this.canvas.width * 0.1 + i + 0.5, this.canvas.height / 2);
				} else {
					this.ctx.lineTo(this.canvas.width * 0.1 + i + 0.5, this.canvas.height / 2 - data[parseInt(i *
						this.dataInCoorSpace)] / (2 * limit));
				}
				//* 0.8   this.canvas.height  / 2 - data[parseInt(i *	this.dataInCoorSpace)] / (2 * limit)
				//this.ctx.lineTo(this.canvas.width * 0.1 + i * this.dataInCoorSpace + 0.5, this.canvas.height / 2 - data[i] / (limit * 2) +0.5);
				//this.ctx.lineTo(this.canvas.width * 0.1 + i + 0.5, this.canvas.height - data[parseInt(i * this.dataInCoorSpace)] /(2 * limit));
				//this.ctx.lineTo(this.canvas.width * 0.1 + i * this.dataInCoorSpace + 0.5, this.canvas.height / 1 - data[i] / (limit * 2) +0.5);

				/* if (parseInt(i * this.dataInCoorSpace) === data.length / 2) {
					this.drawMark(this.canvas.width * 0.1 + i, this.canvas.height / 2 + data[parseInt(i *
						this.dataInCoorSpace)] / limit - 5);
					this.ctx.save();
				} */
				// i += 1;
			}
			this.ctx.stroke();
		} else {
			//console.log("pin--data.length <<<<<==")
			this.dataInCoorSpace = this.canvas.width * 0.8 / data.length;
			this.ctx.beginPath();
			this.ctx.strokeStyle = '#00FF00'; //#FF0000

			//console.log("dataInCoorSpace--" + this.dataInCoorSpace);
			for (var i = 0; i < data.length; i++) {
				/* if (i < 10) {
					//console.log("x-y");
					console.log(this.canvas.width * 0.1 + i * this.dataInCoorSpace + 0.5);
					var yy = this.canvas.height / 2 - data[i] / (limit) + 0.5;
					console.log(yy);
				} */
				// this.ctx.lineTo(this.canvas.width * 0.1 + i + 0.5, this.canvas.height  / 2 - data[parseInt(i *
				// 	this.dataInCoorSpace)] / (2 * limit));
				this.ctx.lineTo(this.canvas.width * 0.1 + i * this.dataInCoorSpace + 0.5, this.canvas.height / 2 - data[i] / (
					limit * 2) + 0.5);
				// i += 1;
			}

			/* this.dataInCoorSpace = this.canvas.width * 0.8 / data.length;
			this.ctx.beginPath();
			this.ctx.strokeStyle = '#00FF00'; //#FF0000

			console.log("dataInCoorSpace--" + this.dataInCoorSpace);
			console.log("this.canvas.height--" + this.canvas.height);
			var lim = myCanvasHeigth / 100;
			for (var i = 0; i < data.length; i++) {
				if (i < 10) {
					console.log("x-y");
					console.log(this.canvas.width * 0.1 + i * this.dataInCoorSpace + 0.5);
					var yy = data[i] / (limit * 2) + 0.5;
					console.log(yy);
				}
				console.log("data--", data[i])
				var t1 = this.canvas.width * 0.1 + i * this.dataInCoorSpace + 0.5;
				var t2 = this.canvas.height * 0.9 - data[i] * lim; //limit = 100 / myCanvasHeigth;
				console.log("t1=t2--", this.canvas.height * 0.9, data[i] * lim)
				console.log("t1-t2--", t1, t2)
				this.ctx.lineTo(t1, t2);
				//i += 1;
			} */
			/* for (var i = 0; i < data.length;i++) {
            	if(i<10){
	            	console.log("x-y");
	            	console.log(this.canvas.width * 0.1 + i * this.dataInCoorSpace + 0.5);
	            	var yy = this.canvas.height/2 - data[i]/(limit*2) + 0.5;
	            	console.log(yy);
	            }
            	
                this.ctx.lineTo(this.canvas.width * 0.1 + i * this.dataInCoorSpace + 0.5, this.canvas.height/2 - data[i]/(limit*2) +
                    0.5);
                i += 1;
            } */
			this.ctx.stroke();
		}
	}
	_.prototype.drawMark = function(imgx, imgy) {
		if (this.type === 'sincurve') return;
		var img = new Image();
		//img.src = './static/img/purple.png';
		var that = this;
		img.onload = function() {
			that.ctx.drawImage(img, imgx, imgy, 10, 10)
			for (var i = 0; i < that.markerList.length; i++) {
				that.ctx.drawImage(img, that.markerList[i].x, that.markerList[i].y, 10, 10);
				that.ctx.fillText('M' + that.markerList[i].index, that.markerList[i].x, that.markerList[i].y);
				if (that.markerList[i].showlight) {
					that.ctx.fillText('<_>', that.markerList[i].x - 2, that.markerList[i].y - 10)
				}
			}
		}
		this.ctx.save()
		this.ctx.fillStyle = '#fff';
		this.ctx.font = "10px Arial";
		//this.ctx.fillText('MR', imgx, imgy);

		this.ctx.stroke();

	}
	//根据x轴计算y轴
	_.prototype.addMark = function() {
		var obj = {};
		obj.x = this.canvas.width * 0.7;
		obj.y = this.canvas.height / 2 - this.data[obj.x] / 2 - 5;
		obj.index = this.markerList.length + 1;
		obj.showlight = false;
		this.markerList.push(obj);
		this.drawTickRect()
	}
	//添加的标记要进行peak操作，也就是一键到顶的;
	//但是为什么我的鼠标还是获取不到我所绘制的图形呢？我很捉急。。。。。。
	_.prototype.peakMark = function(index) {
		if (this.markerList.length < 1) return;
		var max = Math.max.apply(null, this.data);
		var index = this.data.indexOf(max);
		this.markerList[0].x = this.canvas.width * 0.1 + index + 0.5;
		this.markerList[0].y = this.canvas.height / 2 - this.data[parseInt(index)] / 2 - 5;
		//console.log(this.markerList);
	}

	//添加鼠标移动事件
	_.prototype.mousemove = function() {
		var that = this;
		if (this.type === "sincurve") return;
		this.canvas.addEventListener('mousemove', function(ev) {
			var x, y;
			if (ev.layerX || ev.layerX == 0) {
				x = ev.layerX;
				y = ev.layerY;
			} else if (ev.offsetX || ev.offsetX == 0) {
				x = ev.offsetX;
				y = ev.offsetY;
			}
			// that.markerList[0].x=x;
			// that.markerList[0].y=y;
			//    console.log(x,y);
			for (var i = 0; i < that.markerList.length; i++) {
				(function(a) {
					if (parseInt(that.markerList[a].x) === x && parseInt(that.markerList.y) === y) {
						//console.log("aaaaaaaa")
					}
				})(i)
			}
		}, false)
	}
	_.prototype.mousePeak = function() {
		var that = this;
		if (this.type === 'sincurve') return;
		this.canvas.addEventListener('mousedown', function(ev) {
			var x, y;
			if (ev.layerX || ev.layerX == 0) {
				x = ev.layerX;
				y = ev.layerY;
			} else if (ev.offsetX || ev.offsetX == 0) {
				x = ev.offsetX;
				y = ev.offsetY;
			}
			//console.log(x, y);
			for (var i = 0; i < that.markerList.length; i++) {
				(function(a) {
					// console.log(that.markerList[a]);
					if (x < (that.markerList[a].x + 10) && x > (that.markerList[a].x - 10)) {
						if (y < (that.markerList[a].y + 10) && y > (that.markerList[a].y - 10)) {
							// console.log(that.markerList[a]);
							that.markerList[a].showlight = true;
							// that.showLight(that.markerList[a]);
						}
					}
				})(i)
			}
		})
	}
	//鼠标按下并且放开时的操作，对与标记符号。
	_.prototype.mouseDrop = function() {
		var that = this;
		this.canvas.addEventListener('mousedown', function(ev) {
			var x, y;
			if (ev.layerX || ev.layerX == 0) {
				x = ev.layerX;
				y = ev.layerY;
			} else if (ev.offsetX || ev.offsetX == 0) {
				x = ev.offsetX;
				y = ev.offsetY;
			}
			//console.log(x, y);
			that.canvas.addEventListener('mouseup', function(ev) {
				var x, y;
				if (ev.layerX || ev.layerX == 0) {
					x = ev.layerX;
					y = ev.layerY;
				} else if (ev.offsetX || ev.offsetX == 0) {
					x = ev.offsetX;
					y = ev.offsetY;
				}
				for (var i = 0; i < that.markerList.length; i++) {
					(function(a) {
						if (that.markerList[a].showlight) {
							that.markerList[a].x = x;
							that.markerList[a].y = that.canvas.height / 2 - that.data[parseInt(x - that.canvas.width * 0.1)] / 2 - 5;
							that.markerList[a].showlight = false;
						}
					})(i)
				}
			}, false)

		}, false)
	}
	_.prototype.showLight = function(obj) {
		//console.log(obj);
		this.ctx.fillText('<_>', obj.x, obj.y - 10)
	}

	return _;
})()