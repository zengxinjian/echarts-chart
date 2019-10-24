
// function activeLastPointToolip(chart) {
// 	var points = chart.series[0].points;
// 	chart.tooltip.refresh(points[points.length -1]);
// }

function showData(num, n) {
    var arr = [];
    var a = 100;
    for (var i = 0; i < num; i++) {
        var arra = []
        arra.push(i, n, parseInt(a * Math.random()))
        arr.push(arra)
    }
    // console.log(arr);
    return arr;
}
var data=showData(100,100)
var IFLS_chart = new Highcharts.Chart('IFLS', {
    chart: {
        type: 'heatmap',
        marginTop: 40,
        marginBottom: 80,
        plotBorderWidth: 0,
        events:{
            load : function () {
				// set up the updating of the chart each second
                var series = this.series[0];
                var index=100;
				setInterval(function () {
                    index--;
                        var data=showData(100,index)
                        for(var i=0;i<data.length;i++){
                            series.addPoint(data[i],true,false);     
                        }
                        
				}, 1000);
			}
        }
    },
    title: {
        text: 'Sales per employee per weekday'
    },
    xAxis: {
        categories: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    },
    yAxis: {
        categories: ['0', '1', '2', '3', '4'],
        title: null
    },
    
    colorAxis: {
        min: 5,
        minColor: '#FFFFFF',
        maxColor: Highcharts.getOptions().colors[3]
    },
    legend: {
        align: 'right',
        layout: 'vertical',
        margin: 0,
        verticalAlign: 'top',
        y: 25,
        symbolHeight: 220
    },
    series: [{
        name: 'Sales per employee',
        borderWidth: 1,
        data:data,
        // data: [[0, 0, 10], [0, 1, 19], [0, 2, 8], [0, 3, 24], [0, 4, 67], [1, 0, 92], [1, 1, 58], [1, 2, 78], [1, 3, 117], [1, 4, 48], [2, 0, 35], [2, 1, 15], [2, 2, 123], [2, 3, 64], [2, 4, 52], [3, 0, 72], [3, 1, 132], [3, 2, 114], [3, 3, 19], [3, 4, 16], [4, 0, 38], [4, 1, 5], [4, 2, 8], [4, 3, 117], [4, 4, 115], [5, 0, 88], [5, 1, 32], [5, 2, 12], [5, 3, 6], [5, 4, 120], [6, 0, 13], [6, 1, 44], [6, 2, 88], [6, 3, 98], [6, 4, 96], [7, 0, 31], [7, 1, 1], [7, 2, 82], [7, 3, 32], [7, 4, 30], [8, 0, 85], [8, 1, 97], [8, 2, 123], [8, 3, 64], [8, 4, 84], [9, 0, 47], [9, 1, 114], [9, 2, 31], [9, 3, 48], [9, 4, 91]],
        // data: data,
        dataLabels: {
            enabled: true,
            color: '#000000'
        }
    }]
});

