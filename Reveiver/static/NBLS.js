

//Highcharts.setOptions({
//	global : {
//		useUTC : false
//	}
//});
// Create the chart
//var chart=Highcharts.stockChart('NBLS', {
//	chart : {
//		events : {
//			load : function () {
//				// 每秒钟更新一次数据，只是模拟
//				var series = this.series[0];
//				 
////				 var pcmsocket=
//			/*	fftsocket.onmessage=function(ev){
//					 var arr=[];
//					arr = ev.data.split(','); 
//				      console.log(array);
//				    for (i = 0; i < array.length; i ++) {
//                      var x = i, // current time
//                      y = array[i];
//                      series.addPoint([x, y], true, true);
//                  }
//					
////				}*/
//			}
//		}
//	},
//	rangeSelector: {
//		buttons: [{
//			count: 1,
//			type: 'minute',
//			text: '1s'
//		}, {
//			count: 5,
//			type: 'minute',
//			text: '5s'
//		}, {
//			type: 'all',
//			text: 'All'
//		}],
//		inputEnabled: false,
//		selected: 0
//	},
//	title : {
//		text : '基带波形数据'
//	},
//	tooltip: {
//		split: false
//	},
//	exporting: {
//		enabled: false
//	},
//	series : [{
//		name : '实时数据',
//		data : (function () {
//			// generate an array of random data
//			var data = [], time = (new Date()).getTime(), i;
//			for (i = 0; i <= 16348; i +=1) {
//				data.push([
//					i
//					
//				]);
//			}
//			return data;
//        }())
////		data:[]
//	}]
//});



