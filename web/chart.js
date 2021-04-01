// var chart = LightweightCharts.createChart(document.getElementById('binance'), {
// 	width: 600,
//     height: 300,
// 	rightPriceScale: {
// 		borderVisible: false,
// 	},
// 	timeScale: {
// 		borderVisible: false,
// 	},
// });

// var areaSeries = chart.addAreaSeries({
//     topColor: 'rgba(33, 150, 243, 0.56)',
//     bottomColor: 'rgba(33, 150, 243, 0.04)',
//     lineColor: 'rgba(33, 150, 243, 1)',
//     lineWidth: 2,
//   });
var darkTheme = {
	chart: {
		layout: {
			backgroundColor: '#2B2B43',
			lineColor: '#2B2B43',
			textColor: '#D9D9D9',
		},
		watermark: {
			color: 'rgba(0, 0, 0, 0)',
		},
		crosshair: {
			color: '#758696',
		},
		grid: {
			vertLines: {
				color: '#2B2B43',
			},
			horzLines: {
				color: '#363C4E',
			},
		},
        timeScale: {
		timeVisible: true,
        secondsVisible: true,
		
	},
        
	},
	series: {
			topColor: 'rgba(32, 226, 47, 0.56)',
			bottomColor: 'rgba(32, 226, 47, 0.04)',
			lineColor: 'rgba(32, 226, 47, 1)',
	},
};
// chart.applyOptions(darkTheme.chart);
// var chart = LightweightCharts.createChart(document.getElementById('binance'), {
//     width: 1200,
//     height: 600,
//     crosshair: {
// 		mode: LightweightCharts.CrosshairMode.Normal,
// 	},
//   });
  
// var candleSeries = chart.addCandlestickSeries();


// let binance = new ccxt.binance()
// setInterval(function () {
//     binance.fetch_ticker("BTC/USDT").then(data => {
        
//         areaSeries.update({time: data.timestamp/1000, value: data.open})
//         // candleSeries.update({
//         //     time: data.timestamp/1000,
//         //     open: data.open,
//         //     high: data.high,
//         //     low: data.low,
//         //     close: data.close
//         // })
//     })
// }, 1000)
class Chart {
	constructor(id) {
		var chart = LightweightCharts.createChart(document.getElementById(id), {
			width: 1200,
			height: 300,
			rightPriceScale: {
				borderVisible: false,
			},
			timeScale: {
				borderVisible: false,
			},
		});
		chart.applyOptions(darkTheme.chart);
		var areaSeries = chart.addAreaSeries({
			topColor: 'rgba(33, 150, 243, 0.56)',
			bottomColor: 'rgba(33, 150, 243, 0.04)',
			lineColor: 'rgba(33, 150, 243, 1)',
			lineWidth: 2,
		});
		areaSeries.applyOptions({
			priceFormat: {
				type: 'volume',
				precision: 3,
				minMove: 0.0001,
			},
		});
		this.chart = chart
		this.areaSeries = areaSeries
	}

	update(data) {
		this.areaSeries.update({time: data.timestamp/1000, value: data.ask})
	}
}