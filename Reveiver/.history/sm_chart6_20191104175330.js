//波形图
var sm_chart = (function() {
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
		this.drawHTick(); //横坐标 标尺 一帧数据长度：16384   每个点的横坐标= (16384/560)*16384/18750
		this.drawVTick(); //纵坐标 标尺
		this.mousemove(); //鼠标移动
		this.drawTickRect(); //
		this.mousePeak(); //
		this.mouseDrop(); //鼠标按下并且放开时的操作，对与标记符号
	}

	// 横坐标时间单位
	_.prototype.drawHTick = function() {
		for (var i = 0; i < this.canvas.width * 0.8 + 1; i++) {
			this.ctx.beginPath();
			this.ctx.strokeStyle = "#ddd"
			this.ctx.lineWidth = 0.5;
			this.ctx.font = "14px Arial";
			this.ctx.textAlign = "right";
			if (i % parseInt(this.canvas.width * 0.8 / 10) === 0) {
				this.ctx.fillText(parseInt(i),
				i + this.canvas.width * 0.1 + 5,
				this.canvas.height * 0.9 + (i===this.canvas.width* 0.8) ? 0 : 15)
				this.ctx.stroke() //图形绘制
			}
		}
		this.ctx.fillText("单位:s",
			this.canvas.width * 0.8 + 120,
			this.canvas.height * 0.9 + 28)
		this.ctx.stroke()
	}
	_.prototype.drawVTick = function() {
		this.ctx.beginPath();
		this.ctx.strokeStyle = "#ddd";
		this.ctx.font = "14px Arial";
		this.ctx.textAlign = "right"; //right
		for (var i = 0; i < this.canvas.height * 0.8 + 1; i++) {
			if (i % parseInt(this.canvas.height * 0.8 / 10) === 0 && i !== 0 || i === 0) {
				var aa;
				var myheigth = this.canvas.height * 0.8;
				if (this.zlc == 1000) { //初始化时纵向量程为1000
					aa = Math.round((i - myheigth / 2) * (this.zlc / (myheigth / 2))); //5.5472为limit = max / myCanvasHeigth 
				} else { //有数据输入时，纵向量程不为1000
					aa = Math.round((i - myheigth / 2) * (this.zlc / (myheigth / 2))); //四舍五入取整，包含负整数 
				}
				var vtxt;
				vtxt = Math.round(aa);
				this.ctx.fillText(vtxt,
					this.canvas.width * 0.1 - 10,
					this.canvas.height * 0.9 - i + 6)
				this.ctx.stroke()
			}
		}
		      //  this.ctx.fillText("单位",
		      //  this.canvas.width * 0.1 - 10,
		      //  this.canvas.height * 0.9 - i -20)
		      //  this.ctx.stroke()
	}
	_.prototype.drawRect = function() {
		this.ctx.fillStyle = '#000';
		this.ctx.fillRect(this.canvas.width * 0.1, this.canvas.height * 0.1, this.canvas.width * 0.8, this.canvas.height *
			0.8);
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
	_.prototype.drawGV = function(data) {

		for (var i = 0; i < this.canvas.height * 0.8; i++) {
			this.ctx.beginPath();
			this.ctx.strokeStyle = "#eee"
			this.ctx.lineWidth = 1;
			if (i % parseInt(this.canvas.height * 0.8 / 10) === 0) {
				this.ctx.moveTo(this.canvas.width * 0.1, this.canvas.height * 0.1 + i)
				this.ctx.lineTo(this.canvas.width * 0.9, this.canvas.height * 0.1 + i)
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

	//在绘制新的数据前先删除再重绘一遍
	_.prototype.redraw = function() {
		//this.ctx.clearRect(this.canvas.width * 0.1, this.canvas.height * 0.1, this.canvas.width * 0.8, this.canvas.height * 0.8);
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
		this.data = data;
		var max = Math.max.apply(null, data); //获取数组最大、最小值
		var min = Math.min.apply(null, data);
		var current = parseInt(max - min);
		var myCanvasHeigth = parseInt(this.canvas.height * 0.8);
	


		this.redraw();
		var ma = Math.abs(max); //取绝对值
		var mi = Math.abs(min);
		if (ma >= mi)
			this.zlc = ma;
		else
			this.zlc = mi;
		if (this.zlc > 10) {
			this.zlc = parseInt(this.zlc * 1.1/10)*10;
		}
		var limit = this.zlc / myCanvasHeigth;
		//重绘横向标尺 this.drawHTick()
		this.drawHTick();
		//重绘纵向标尺 this.drawVTick()
		this.drawVTick();
		if (data.length > (this.canvas.width * 0.8)) {
			this.dataInCoorSpace = data.length / this.canvas.width * 0.8;

			this.ctx.beginPath();
			this.ctx.strokeStyle = '#00FF00'; //#FF0000
			for (var i = 0; i < this.canvas.width * 0.8; i++) {
				if (i < 10) {
					var y = this.canvas.height * 0.8 / 2 - data[parseInt(i * this.dataInCoorSpace)] / (2 * limit);
				}
				this.ctx.lineTo(this.canvas.width * 0.1 + i + 0.5, this.canvas.height * 0.8 / 2 - data[parseInt(i *
					this.dataInCoorSpace)] / (2 * limit));
				if (parseInt(i * this.dataInCoorSpace) === data.length / 2) {
					this.drawMark(this.canvas.width * 0.1 + i, this.canvas.height / 2 + data[parseInt(i *
						this.dataInCoorSpace)] / limit - 5);
					this.ctx.save();
				}
			}
			//this.ctx.stroke();
		} else {

			this.dataInCoorSpace = this.canvas.width * 0.8 / data.length;
			this.ctx.beginPath();
			this.ctx.strokeStyle = '#00FF00'; //#FF0000

			for (var i = 0; i < data.length; i++) {
				if (i < 10) {
					var yy = this.canvas.height / 2 - data[i] / (limit * 2) + 0.5;
				}

				this.ctx.lineTo(this.canvas.width * 0.1 + i * this.dataInCoorSpace + 0.5, this.canvas.height / 2 - data[i] / (
						limit * 2) +
					0.5);
				i += 1;
			}
			this.ctx.stroke();
		}
	}
	_.prototype.drawMark = function(imgx, imgy) {
		if (this.type === 'sincurve') return;
		var img = new Image();
		l
		img.src = './static/img/purple.png';
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
		this.ctx.fillText('MR', imgx, imgy);

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
