/*
 * Funcionalidad de tu producto
 */

// Puedes hacer uso de la base de datos a través de la variable `data`
console.log(data);
/*grafico 1*/
Highcharts.chart('graphic_1', {
    chart: {
        type: 'column'
    },
    title: {
    	text: '',
	    style: {
	        display: 'none'
	    }
    },
    xAxis: {
        categories: [
            'S1',
            'S2',
            'S3',
            'S4'
        ],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'PORCENTAJE (%)'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: 'General',
        data: [49.9, 71.5, 106.4, 129.2]

    }, {
        name: 'AM',
        data: [83.6, 78.8, 98.5, 93.4]

    }, {
        name: 'PM',
        data: [48.9, 38.8, 39.3, 41.4]

    }]
});

/* grafico 2*/
Highcharts.chart('graphic_2', {
    chart: {
        type: 'column'
    },
    title: {
    	text: '',
	    style: {
	        display: 'none'
	    }
    },
    xAxis: {
        categories: [
            'S1',
            'S2',
            'S3',
            'S4'
        ],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'PORCENTAJE (%)'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: 'General',
        data: [49.9, 71.5, 106.4, 129.2]

    }, {
        name: 'AM',
        data: [83.6, 78.8, 98.5, 93.4]

    }, {
        name: 'PM',
        data: [48.9, 38.8, 39.3, 41.4]

    }]
});

/* grafico 3*/
Highcharts.chart('graphic_3', {
    chart: {
        type: 'column'
    },
    title: {
    	text: '',
	    style: {
	        display: 'none'
	    }
    },
    xAxis: {
        categories: [
            'S1',
            'S2',
            'S3',
            'S4'
        ],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'PORCENTAJE (%)'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: 'General',
        data: [49.9, 71.5, 106.4, 129.2]

    }, {
        name: 'AM',
        data: [83.6, 78.8, 98.5, 93.4]

    }, {
        name: 'PM',
        data: [48.9, 38.8, 39.3, 41.4]

    }]
});

/*grafico 4.2*/

// Make monochrome colors
var pieColors = (function () {
    var colors = [],
        base = Highcharts.getOptions().colors[0],
        i;

    for (i = 0; i < 10; i += 1) {
        // Start out with a darkened base color (negative brighten), and end
        // up with a much brighter color
        colors.push(Highcharts.Color(base).brighten((i - 3) / 7).get());
    }
    return colors;
}());

// Build the chart
Highcharts.chart('container', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Browser market shares at a specific website, 2014'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            colors: pieColors,
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
                distance: -50,
                filter: {
                    property: 'percentage',
                    operator: '>',
                    value: 4
                }
            }
        }
    },
    series: [{
        name: 'Brands',
        data: [
            { name: 'IE', y: 56.33 },
            { name: 'Chrome', y: 24.03 },
            { name: 'Firefox', y: 10.38 },
            { name: 'Safari', y: 4.77 },
            { name: 'Opera', y: 0.91 },
            { name: 'Other', y: 0.2 }
        ]
    }]
});

var transformBD= function() {
	var BD = [];
	for (var sede in data) {
		for(var semestre in data[sede]){
			for(var estudiante in data[sede][semestre]["students"]){
				for(var sprints in data[sede][semestre]["students"][estudiante]["sprints"]){
					var notaTech = data[sede][semestre]["students"][estudiante]["sprints"][sprints].score.tech;
					var notaHse = data[sede][semestre]["students"][estudiante]["sprints"][sprints].score.hse;
					BD.push({
						"sede" : sede,
						"semestre" : semestre,
						"estudiante" : estudiante,
						"sprints" : sprints,
						"notaTech" : notaTech,
						"notaHse" : notaHse,
					});
				}
			}
		}
	}
	return BD;
}

var BD = [];
BD = transformBD();
var total= 0;
for (var i = 0; i < BD.length; i++) {
	if (BD[i].sprints == 1) {
		total += BD[i].notaTech;
	}
}
console.log(total);