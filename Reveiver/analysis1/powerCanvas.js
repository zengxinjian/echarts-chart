var powerCanvas=(function(){
	function _(options){
		this.canvas=document.getElementById(options.canvasId);
		this.addEventListener();
		this.drawPowerCoordinate();
	}
	_.prototype.addEventListener=function(){
		this.canvas.addEventListener('mousewheel',function(){
			var e = event || window.event;
			var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
			console.log(delta);
			var x,y;
			if (e.pageX || e.pageY) { //兼容做到ie9
				x = e.pageX;
				y = e.pageY;
			} else {
				x = e.clientX + document.body.scrollLeft || document.documentElement.scrollLeft;
				y = e.clientY + document.body.scrollTop || document.documentElement.scrollTop;
			}
			
		},false);
		
		this.canvas.addEventListener('mousemove',function(){
			var e=event||window.event;
			var x,y;
			if (e.pageX || e.pageY) { //兼容做到ie9
				x = e.pageX;
				y = e.pageY;
			} else {
				x = e.clientX + document.body.scrollLeft || document.documentElement.scrollLeft;
				y = e.clientY + document.body.scrollTop || document.documentElement.scrollTop;
			}
			
		},false)
	}
	
	_.prototype.drawPowerCoordinate=function(){
		
	}
	
	
	return _;
})()