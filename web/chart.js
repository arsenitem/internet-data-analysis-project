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
			priceFormat: {
				minMove: 0.0001
			},
		});
		this.chart = chart
		this.areaSeries = areaSeries
	}

	update(data) {
		this.areaSeries.update({time: data.timestamp/1000, value: data.ask})
	}
	setData() {
		this.areaSeries.setData([])
	}
}