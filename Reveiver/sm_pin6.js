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
		this.level;
		this.noNum = -1000000;//未输入数据时的默认值
		this.init()
	}
	_.prototype.init = function() {
		//console.log("init--FFT");
		this.level = this.noNum;
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
		if (_start_f < -18750 / 2)//超出频率范围判断，最大18750Hz
			_start_f = -18750 / 2;
		var _end_f = parseInt(center + span / 2);
		if (_end_f > 18750 / 2)
			_end_f = 18750 / 2;
		var _length_f = _end_f - _start_f;
		for (var i = 0; i < this.canvas.width * 0.8 + 1; i++) {
			this.ctx.beginPath();
			this.ctx.strokeStyle = "#ddd"
			this.ctx.lineWidth = 0.5;
			this.ctx.font = "14px Arial";
			this.ctx.textAlign = "right";
			if (i % parseInt(this.canvas.width * 0.8 / 10) === 0) {
				var vtxt = parseInt(_start_f + i * _length_f / 800);
				this.ctx.fillText(vtxt,
					i + this.canvas.width * 0.1 + 5,
					this.canvas.height * 0.9 + 15)
				this.ctx.stroke() //图形绘制
			}
		}
		this.ctx.fillText("单位:Hz",
			this.canvas.width * 0.8 + 120,
			this.canvas.height * 0.9 + 25)
		this.ctx.stroke()
	}
	_.prototype.drawVTick = function() {
		this.ctx.beginPath();
		this.ctx.strokeStyle = "#ddd";
		this.ctx.font = "14px Arial";
		this.ctx.textAlign = "right";
		var myheigth = this.canvas.height * 0.8;
		//console.log("myheigth--", myheigth);
		if (this.level != this.noNum) {
			var li = this.canvas.height * 0.8 / 100; //100为最大值
			for (var i = 0; i < this.canvas.height * 0.8 + 1; i++) {
				if (i % parseInt(this.canvas.height * 0.8 / 10) === 0 && i !== 0) {
					var aa = Math.round((i - myheigth) * (this.zlc / myheigth)) + this.level; //四舍五入取整，包含负整数 
					//console.log(i, "-aa-1---", aa);
					//aa = parseInt(aa*10/10);
					//console.log(i, "-aa-2---", aa);
					//console.log("aa-2---", parseInt(aa));

					this.ctx.fillText(aa,
						this.canvas.width * 0.1 - 10,
						this.canvas.height * 0.9 - i + 6);
					//console.log("pin-drawVTick----", parseInt(i), vtxt);
					this.ctx.stroke()
				}
			}
		} else {
			var li = this.canvas.height * 0.8 / 100; //100为最大值
			for (var i = 0; i < this.canvas.height * 0.8 + 1; i++) {
				if (i % parseInt(this.canvas.height * 0.8 / 10) === 0 && i !== 0) {

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
		}


		this.ctx.fillText("单位:dB",
			this.canvas.width * 0.1 - 10,
			this.canvas.height * 0.9 - i + 30)
		this.ctx.stroke()

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
		if (this.markerList.length > 0) {
			this.ctx.fillStyle = 'rgb(0,0,0,0.09)';
			this.ctx.fillRect(this.canvas.width * 0.8, 0, this.canvas.width, this.canvas.height * 0.1)
		}
	}
	_.prototype.drawTickDelta = function(hz) {
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

	//绘制图形
	_.prototype.drawData = function(data) {
		this.data = data;



		var max = Math.max.apply(null, data); //获取数组最大、最小值
		var min = Math.min.apply(null, data);
		var current = parseInt(max - min);
		var myCanvasHeigth = parseInt(this.canvas.height * 0.8);
		var myCanvasWidth = parseInt(this.canvas.width * 0.8);
		//var limit = 100 / myCanvasHeigth; //current/myCanvasHeigth;



		this.redraw();
		var ma = Math.abs(max); //取绝对值
		var mi = Math.abs(min);
		var max_index = data.indexOf(max);
		var min_index = data.indexOf(min);
		// var center_min = center_point - parseInt(myCanvasWidth * 0.8); //按像素点和数据点对应排列，中心频点范围最小值，即数据点范围起点下标
		// var center_max = center_point + parseInt(myCanvasWidth * 0.8); //
		//console.log("center_min--", center_min);
		/* if (ma >= mi)
			this.zlc = ma;
		else
			this.zlc = mi; */
		var _level = $("#input_level").val(); //设置参考幅值时，幅值最大为参考幅值，为空时是自动幅值模式。
		if (_level != "")
			this.level = parseFloat(_level);
		else
			this.level = this.noNum;
		//console.log("this.level--", this.level)
		if (this.level != this.noNum) {
			if (mi > 10) {
				this.zlc = this.level + parseInt(mi * 1.1 / 10) * 10;
				//console.log("pin--add-10%-this.zlc--", this.zlc);
			} else
				this.zlc = this.level + mi;

			//console.log("pin--this.zlc--", this.zlc);
		} else { //为空时是自动幅值模式
			if (ma >= mi)
				this.zlc = ma;
			else
				this.zlc = mi;
			//console.log("pin--this.zlc--", this.zlc);
			if (this.zlc > 10) {
				this.zlc = parseInt(this.zlc * 1.1 / 10) * 10;
				//console.log("pin--add-10%-this.zlc--", this.zlc);
			}
		}
		var limit = this.zlc / myCanvasHeigth;
		//重绘横向标尺 this.drawHTick()
		this.drawHTick();
		//重绘纵向标尺 this.drawVTick()
		this.drawVTick();

		if (data.length > (this.canvas.width * 0.8)) { //data.length > (this.canvas.width * 0.8)
			this.dataInCoorSpace = data.length / (this.canvas.width * 0.8);
			this.ctx.beginPath();
			this.ctx.strokeStyle = '#00FF00'; //#FF0000
			//console.log("this.canvas.width-", this.canvas.width, this.canvas.width * 0.8)
			//console.log("this.canvas.height-", this.canvas.height, this.canvas.height * 0.8)

			/* var a = myCanvasWidth / 2 - 10;
			var b = myCanvasWidth / 2 + 10;
			var p = center_point - myCanvasWidth / 2;
			console.log("a-b-", a, b, p); */


			//console.log("this.dataInCoorSpace--", this.dataInCoorSpace);
			if (this.level != this.noNum) {
				/* var aaaa1 = 0;
				console.log(aaaa1, "--bbbb--", this.canvas.height * 0.1 + (this.level - aaaa1) / limit);
				console.log("height * 0.1--", this.canvas.height * 0.1);
				var aaaa2 = -100;
				console.log(aaaa2, "--bbbb--", this.canvas.height * 0.1 + (this.level - aaaa2) / limit);
				console.log("height * 0.9--", this.canvas.height * 0.9); */
				for (var i = 0; i < this.canvas.width * 0.8; i++) {
					if (max == 0 && min == this.noNum) {
						//console.log("max == min == 0"); //全0的数据为中间一条线
						this.ctx.lineTo(this.canvas.width * 0.1 + i + 0.5, this.canvas.height * 0.1 + (this.level - 0) / limit);
					} else {
						var aa = data[parseInt(i * this.dataInCoorSpace)];
						var bb = this.canvas.height * 0.1 + (this.level - aa) / limit; //

						//判断数值防止图形绘制到有效画布范围外面
						if (bb > this.canvas.height * 0.9)
							bb = this.canvas.height * 0.9;
						else if (bb < this.canvas.height * 0.1)
							bb = this.canvas.height * 0.1;
						//var aa = Math.round((i - myheigth) * (this.zlc / myheigth)) + this.level; 
						this.ctx.lineTo(this.canvas.width * 0.1 + i + 0.5, bb);
					}
				}
			} else {
				for (var i = 0; i < this.canvas.width * 0.8; i++) {
					if (max == 0 && min == this.noNum) {
						//console.log("max == min == 0"); //全0的数据为中间一条线
						this.ctx.lineTo(this.canvas.width * 0.1 + i + 0.5, this.canvas.height / 2);
					} else {
						this.ctx.lineTo(this.canvas.width * 0.1 + i + 0.5, this.canvas.height / 2 - data[parseInt(i * this.dataInCoorSpace)] /
							(2 * limit));
					}
				}
			}
			this.ctx.stroke();
		} else {
			this.dataInCoorSpace = this.canvas.width * 0.8 / data.length;
			this.ctx.beginPath();
			this.ctx.strokeStyle = '#00FF00'; //#FF0000

			for (var i = 0; i < data.length; i++) {
				/* if (i < 10) {
					var yy = this.canvas.height / 2 - data[i] / (limit) + 0.5;
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

			var lim = myCanvasHeigth / 100;
			for (var i = 0; i < data.length; i++) {
				if (i < 10) {
					var yy = data[i] / (limit * 2) + 0.5;
				}
				var t1 = this.canvas.width * 0.1 + i * this.dataInCoorSpace + 0.5;
				var t2 = this.canvas.height * 0.9 - data[i] * lim; //limit = 100 / myCanvasHeigth;
				this.ctx.lineTo(t1, t2);
				//i += 1;
			} */
			/* for (var i = 0; i < data.length;i++) {
            	if(i<10){
	            	var yy = this.canvas.height/2 - data[i]/(limit*2) + 0.5;
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
			for (var i = 0; i < that.markerList.length; i++) {
				(function(a) {
					if (parseInt(that.markerList[a].x) === x && parseInt(that.markerList.y) === y) {
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
			for (var i = 0; i < that.markerList.length; i++) {
				(function(a) {
					if (x < (that.markerList[a].x + 10) && x > (that.markerList[a].x - 10)) {
						if (y < (that.markerList[a].y + 10) && y > (that.markerList[a].y - 10)) {
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
		this.ctx.fillText('<_>', obj.x, obj.y - 10)
	}

	return _;
})()
