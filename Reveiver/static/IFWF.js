function getData(n) {
	var arr = [],
		i,
		a,
		b,
		c,
		spike;
	for (i = 0; i < n; i = i + 1) {
		if (i % 100 === 0) {
			a = 2 * Math.random();
		}
		if (i % 1000 === 0) {
			b = 2 * Math.random();
		}
		if (i % 10000 === 0) {
			c = 2 * Math.random();
		}
		if (i % 50000 === 0) {
			spike = 10;
		} else {
			spike = 0;
		}
		arr.push([
			i,
			2 * Math.sin(i / 100) + a + b + c + spike + Math.random()
		]);
	}
	return arr;
}
     var n = 1024,
	data = getData(n);
	console.log(data);

//var chart=Highcharts.chart('IFWf', {
//	chart: {
//		zoomType: 'x'
//	},
//	legend: {
//			enabled: false
//		},
//		credits: {
//            	text: 'smtx.com',
//            	href: '#'
//        	},
//	boost: {
//		useGPUTranslations: false
//	},
//	title: {
//		text: '中频数据波形'
//	},
//	subtitle: {
//		text: '全部显示'
//	},
//	tooltip: {
//		valueDecimals: 1
//	},
//	series: [{
//		data: data,
//		lineWidth: 1
//	}]
//})
//console.log(chart);
//series.addPoint([x,y], true, true,true);




