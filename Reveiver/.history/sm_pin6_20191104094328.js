//接收机频谱图,频谱数据需通过实部I和虚部Q进行FFT计算得到
var sm_pin = (function() {
	function _(options) {
		this.id = options.id;
		this.option = options.option;
		this.data = [];
		this.type = this.option.type;
		this.markerList = [];
		this.lineColor = "#00FF00";
		this.dataInCoorSpace = null;
		this.zlc = 1000; //纵向量程，最大和最小数中的绝对值大的
		this.level;
		this.lineVTick = [];	//纵向所有值
		this.lineHTick = [];	//横向所有值
		this.noNum = -1000000;//未输入数据时的默认值
		
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
		this.init()
	}
	_.prototype.init = function() {
		this.drawRect(); //矩形黑底背景
		this.drawGH(); //纵向网格
		this.drawGV(); //横向网格
		this.drawHTick(); //横坐标 标尺
		this.drawVTick(); //纵坐标 标尺
		// this.mousemove(); //鼠标移动
		//this.drawTickRect(); //此方法会在左上角增加灰色块，本用于实现纵坐标滑块、单位，暂时注释掉
		// this.mousePeak(); //
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
				this.lineHTick.push(vtxt);
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
		this.lineVTick = [];
		var myheigth = this.canvas.height * 0.8;
		//console.log("myheigth--", myheigth);
		if (this.level != this.noNum) {
			var li = this.canvas.height * 0.8 / 100; //100为最大值
			for (var i = 0; i < this.canvas.height * 0.8 + 1; i++) {
				if (i % parseInt(this.canvas.height * 0.8 / 10) === 0) {
					var aa = Math.round((i - myheigth) * (this.zlc / myheigth)) + this.level; //四舍五入取整，包含负整数 
					//aa = parseInt(aa*10/10);
					this.lineVTick.push(aa);
					this.ctx.fillText(parseFloat(aa.toFixed(2)),
						this.canvas.width * 0.1 - 10,
						this.canvas.height * 0.9 - i + (i !== 0 ? 6 : 0));
					this.ctx.stroke()
				}
			}
		} else {
			var li = this.canvas.height * 0.8 / 100; //100为最大值
			for (var i = 0; i < this.canvas.height * 0.8 + 1; i++) {
				if (i % parseInt(this.canvas.height * 0.8 / 10) === 0) {

					var aa;
					var myheigth = this.canvas.height * 0.8;
					if (this.zlc == 1000) { //初始化时纵向量程为1000
						aa = Math.round((i - myheigth / 2) * (this.zlc / (myheigth / 2))); //5.5472为limit = max / myCanvasHeigth 
					} else { //有数据输入时，纵向量程不为1000
						aa = Math.round((i - myheigth / 2) * (this.zlc / (myheigth / 2))); //四舍五入取整，包含负整数 
					}
					var vtxt;
					vtxt = Math.round(aa);
					this.lineVTick.push(vtxt);
					this.ctx.fillText(parseFloat(vtxt.toFixed(2)),
						this.canvas.width * 0.1 - 10,
						this.canvas.height * 0.9 - i + (i !== 0 ? 6 : 0))
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
			} else
				this.zlc = this.level + mi;
		} else { //为空时是自动幅值模式
			if (ma >= mi)
				this.zlc = ma;
			else
				this.zlc = mi;
			if (this.zlc > 10) {
				this.zlc = parseInt(this.zlc * 1.1 / 10) * 10;
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
			this.ctx.strokeStyle = this.lineColor; //#FF0000
			
			/* var a = myCanvasWidth / 2 - 10;
			var b = myCanvasWidth / 2 + 10;
			var p = center_point - myCanvasWidth / 2;*/
			if (this.level != this.noNum) {
				/* var aaaa1 = 0;
				var aaaa2 = -100;*/
				for (var i = 0; i < this.canvas.width * 0.8; i++) {
					if (max == 0 && min == this.noNum) {
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
			this.ctx.strokeStyle = this.lineColor; //#FF0000

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
			this.ctx.strokeStyle = this.lineColor; //#FF0000

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

	//鼠标绘制矩形的操作，对与标记符号。
	_.prototype.mouseDrop = function() {
		let that = this
		let clickRightMenu = document.getElementById("clickRightMenu")
		let colorMenus = document.getElementById("colorMenus")
		let clickReset = document.getElementById("cvs_reset")
		// let clickCancel = document.getElementById("cvs_cancel")
		let mousedown = {},
				rubberbandRect = {},
				dragging = false,
				drawingSurfaceImageData

		function mathApply(list = [0], type = "min"){
			return type==="min" ? Math.min.apply(null, list) : Math.max.apply(null, list);
		}

		//数据绘制图像
		function drawlLine(){
			const _span = $("#input_span").val()
			const {startX,startY,endX,endY} = mousedown
			const [newStartX,newStartY,newEndX,newEndY] = [(startX-100),(startY-80),(endX-100),(endY-80)]
			// console.log("新的XY轴",newStartX,newStartY,newEndX,newEndY)
			// debugger
			//纵坐标
			const minVTick = mathApply(that.lineVTick, "min")
			const maxVTick = mathApply(that.lineVTick, "max")
			const countVabs = Math.abs(minVTick - maxVTick)
			//横坐标
			const minHTick = mathApply(that.lineHTick, "min") / 1000
			const maxHTick = mathApply(that.lineHTick, "max") / 1000
			//Res X,Y轴点
			const res_x = _span / (that.canvas.width * 0.8)
			const res_y = countVabs / (that.canvas.height * 0.8)
			//中心频点
			const centerX = (newStartX+newEndX) / 2
			const centerY = (newStartY+newEndY) / 2
			const xPin = minHTick + centerX * res_x
			const yPin = maxVTick - centerY * res_y
			//扫宽
			const xSpan = Math.abs(newStartX - newEndX) * res_x
			const ySpan = Math.abs(newStartY - newEndY) * res_y

			// console.log("线起始XY点：",newStartX,newStartY,"线结束XY点：",newEndX,newEndY,"width像素点",(that.canvas.width * 0.8),
			// "height像素点",(that.canvas.height * 0.8))
			// console.log("X轴最小值：",minHTick,"X轴最大值：",maxHTick,"纵坐标总和：",countVabs)
			// console.log("Res X,Y轴值：",res_x,res_y)
			// console.log("中心频点 X,Y值：",xPin,yPin)
			// console.log("扫宽 X,Y值：",xSpan,ySpan)
			$("#input_span").val(xSpan.toFixed(2))
			$("#input_level").val(ySpan.toFixed(2))
			$("#input_center").val(xPin.toFixed(2))
		}
		
		/**
     * 坐标转化为canvas坐标
     * @param x
     * @param y
     */
    function windowToCanvas(x, y) {
			//返回元素的大小以及位置
			var bbox = that.canvas.getBoundingClientRect();
			return {x: x - bbox.left * (that.canvas.width / bbox.width), y: y - bbox.top * (that.canvas.height / bbox.height)};
		}
		//保存和恢复绘图面板
    function saveDrawingSurface() {
			drawingSurfaceImageData = that.ctx.getImageData(0, 0, that.canvas.width, that.canvas.height);
		}
		function restoreDrawingSurface() {
				that.ctx.putImageData(drawingSurfaceImageData, 0, 0);
		}
		/**
     * 画辅助线，并设置属性
     */
    function drawGuidewires(x, y) {
			that.ctx.save();
			that.ctx.strokeStyle = 'rgba(0,255,0,0.4)';
			that.ctx.lineWidth = 1;
			drawVerticalLine(x);
			drawHorizontalLine(y);
			that.ctx.restore();
		}
		/**
     * 画水平辅助线，占整个宽canvas度
     */
    function drawHorizontalLine(y) {
			that.ctx.beginPath();
			that.ctx.moveTo(100, y + 0.5);
			that.ctx.lineTo((that.canvas.width*0.9), y + 0.5);
			that.ctx.stroke();
		}
		/**
		 * 画垂直辅助线，占整个canvas高度
		 */
		function drawVerticalLine(x) {
				that.ctx.beginPath();
				that.ctx.moveTo(x + 0.5, 80);
				that.ctx.lineTo(x + 0.5, (that.canvas.height*0.9));
				that.ctx.stroke();
		}
		/**
     * 更新矩形
     */
    function updateRubberband(loc) {
        rubberbandRect.width = Math.abs(loc.x - mousedown.startX);
        rubberbandRect.height = Math.abs(loc.y - mousedown.startY);
        //从左往右拉，和从右往左拉的两种情况。主要是判断左边的位置
        //因为从左往右拉的时候，左边x坐标不变
				//从右往左拉的时候，左边线的x坐标需要跟着鼠标移动
        if (loc.x > mousedown.startX) {
					rubberbandRect.left = mousedown.startX;
				} else {
					rubberbandRect.left = loc.x;
				}
        if (loc.y > mousedown.startY) {
					rubberbandRect.top = mousedown.startY;
				} else {
					rubberbandRect.top = loc.y;
				}
				that.ctx.save();
				that.ctx.beginPath();
				that.ctx.lineWidth = 2;
				that.ctx.strokeStyle = "red";
				that.ctx.rect(rubberbandRect.left, rubberbandRect.top, rubberbandRect.width, rubberbandRect.height);
				that.ctx.stroke();
				that.ctx.restore();
		}
		
		
		//右键Canvas事件
		that.canvas.addEventListener('contextmenu', function(ev) {
			var event = ev || window.event;
			clickRightMenu.style.display = "block";
			clickRightMenu.style.left = event.clientX + "px";
			clickRightMenu.style.top = event.clientY + "px";
			ev.preventDefault();
			return false;
		});
		//点击重置
		clickReset.addEventListener('click', function(ev) {
			$("#input_center").val(0)
			$("#input_span").val(18.75)
			$("#input_level").val('')
			clickRightMenu.style.display = "none";
		});
		//显示二级菜单
		// clickCancel.addEventListener("onmousemove", function(ev){
		// 	var event = ev || window.eval
		// }, false)
		//点击返回上一次绘图
		// clickCancel.addEventListener('click', function(ev) {
		// 	clickRightMenu.style.display = "none";
		// });

		//鼠标按下的时候，记录坐标，并设置为拖拽状态
    that.canvas.onmousedown = function (e) {
			if(e.button === 2) return false
			var loc = windowToCanvas(e.clientX, e.clientY);
			const {x , y} = {x:loc.x-100,y: loc.y-80};
			if((x>0 && x<800)&&(y>0 && y<640) && !dragging){
				clickRightMenu.style.display = "none";
				console.log("按下操作")
				e.preventDefault();
				saveDrawingSurface();
				mousedown.startX = loc.x;
				mousedown.startY = loc.y;
			}
		}
		/**
		 * （鼠标按下之后）鼠标移动的时候
		 * 判断拖拽中：更新当前连线的位置
		 * 判断辅助线显示：添加辅助线
		 */
		that.canvas.onmousemove = function (e) {
				var loc = windowToCanvas(e.clientX, e.clientY);
				const {x , y} = {x:loc.x-100,y: loc.y-80};
				if (dragging && (x>0 && x<800)&&(y>0 && y<640)) {
						console.log("拖动了")
						e.preventDefault();
						restoreDrawingSurface();
						updateRubberband(loc);
						drawGuidewires(loc.x, loc.y);
						dragging = true;
				}
		}
		/**
		 * (拖拽完成后)当鼠标松开时，重新获取本点坐标，清除之前的"跟随鼠标移动的线"，更新连线，取消拖拽状态
		 */
		that.canvas.onmouseup = function (e) {
			if(e.button === 2) return false
			var loc = windowToCanvas(e.clientX, e.clientY);
			const {x , y} = {x:loc.x-100,y: loc.y-80};
			if((x>0 && x<800)&&(y>0 && y<640) && dragging){ // (x - mousedown.startX) > 50 限制最小矩形
				console.log("松开操作")
				mousedown.endX = loc.x;
				mousedown.endY = loc.y;
				restoreDrawingSurface();
				updateRubberband(loc);
				drawlLine();
				dragging = false;
			}
		};
	};

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
	_.prototype.showLight = function(obj) {
		this.ctx.fillText('<_>', obj.x, obj.y - 10)
	}

	return _;
})()
