/*
 * Funcionalidad de tu producto
 */

// Puedes hacer uso de la base de datos a través de la variable `data`
console.log(data);
var transformBD= function() {
	var BD = [];
	for (var sede in data) {
		for(var semestre in data[sede]){
			for(var estudiante in data[sede][semestre]["students"]){
				for(var sprints in data[sede][semestre]["students"][estudiante]["sprints"]){
					var notaTech = data[sede][semestre]["students"][estudiante]["sprints"][sprints].score.tech;
					var notaHse = data[sede][semestre]["students"][estudiante]["sprints"][sprints].score.hse;
                    var activo = data[sede][semestre]["students"][estudiante]["active"];
					BD.push({
						"sede" : sede,
						"semestre" : semestre,
						"estudiante" : estudiante,
                        "activado" : activo,
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

/*function promedioTech(a, b, c){
    var sum= 0;
    var cantidad = 0;
    for (var i = 0; i < BD.length; i++) {
        if (BD[i].sprints == a && BD[i].sede == b && BD[i].semestre == c) {
            sum1= (BD[i].notaTech/100)*60;
            cantidad +=1;
        }
    }
    return (sum/cantidad);
    console.log(sum/cantidad)
}*/
function activo(a, b, c){
    var contarTotal= 0;
    var contarTrue= 0;
    var contarFalse = 0;
    for (var i = 0; i < BD.length; i++){
        if(BD[i].sprints == a && BD[i].sede == b && BD[i].semestre == c){
            contarTotal+= 1
            if(BD[i].activado == true) {
                contarTrue +=1;
            }
            else{
                contarFalse +=1;
            }
        }
    }
    return Math.round((contarTrue/contarTotal)*100);
}
function promedioTech(a, b, c){
    var sum= 0;
    var cantidad = 0;
    for (var i = 0; i < BD.length; i++) {
        if (BD[i].sprints == a && BD[i].sede == b && BD[i].semestre == c) {
            sum+=(BD[i].notaTech/1800)*100;
            cantidad +=1;
        }
    }
    return Math.round(sum/cantidad);
    console.log(sum/cantidad)
}

console.log(promedioTech(0,"SCL","2017-2"));
function promedioHse(a, b, c){
    var sum= 0;
    var cantidad = 0;
    for (var i = 0; i < BD.length; i++) {
        if (BD[i].sprints == a && BD[i].sede == b && BD[i].semestre == c) {
            sum+=(BD[i].notaHse/1200)*100;
            cantidad +=1;
        }
    }
    return Math.round(sum/cantidad);
    console.log(sum/cantidad)
}
console.log(promedioHse(0,"SCL","2017-2"));

function total(sprint, casa, bloque){
    var total = promedioHse(sprint, casa, bloque)*0.6 + promedioTech(sprint, casa, bloque)*0.4
    return Math.round(total);
}
console.log(total(0,"SCL","2017-2"));
/*console.log(total(1,"SCL","2017-2"));*/
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
            text: 'Activas (%)'
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
        data: [activo(0, "SCL", "2017-2"), activo(1, "SCL", "2017-2"), activo(2, "SCL", "2017-2"), activo(3, "SCL", "2017-2")]

    }, {
        name: 'AM',
        data: [activo(0, "SCL", "2017-2"), activo(1, "SCL", "2017-2"), activo(2, "SCL", "2017-2"), activo(3, "SCL", "2017-2")]

    }, {
        name: 'PM',
        data: [activo(0, "SCL", "2017-2"), activo(1, "SCL", "2017-2"), activo(2, "SCL", "2017-2"), activo(3, "SCL", "2017-2")]

    }]
});

/* grafico 2*/
Highcharts.chart('graphic_2', {
    chart: {
        type: 'line'
    },
    title: {
        text: '',
        style: {
            display: 'none'
        }
    },
    xAxis: {
        categories: ['S1', 'S2', 'S3', 'S4']
    },
    yAxis: {
        title: {
            text: 'Rendimiento (%)'
        }
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        }
    },
    series: [{
        name: 'General',
        data: [total(0,"SCL","2017-2"),total(1,"SCL","2017-2") ,total(2,"SCL","2017-2") ,total(3,"SCL","2017-2") ]
    }, {
        name: 'AM',
        data: [total(0,"SCL","2017-2"),total(1,"SCL","2017-2") ,total(2,"SCL","2017-2") ,total(3,"SCL","2017-2") ]
    }, {
        name: 'PM',
        data: [total(0,"SCL","2017-2"),total(1,"SCL","2017-2") ,total(2,"SCL","2017-2") ,total(3,"SCL","2017-2") ]
    }]
});

/*Highcharts.chart('graphic_2', {
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
        data: [total(0,"SCL","2017-2"),total(1,"SCL","2017-2") ,total(2,"SCL","2017-2") ,total(3,"SCL","2017-2") ]

    }, {
        name: 'AM',
        data: [total(0,"SCL","2017-2"), total(1,"SCL","2017-2"), total(2,"SCL","2017-2"), total(3,"SCL","2017-2")]

    }, {
        name: 'PM',
        data: [total(0,"SCL","2017-2"), total(1,"SCL","2017-2"), total(2,"SCL","2017-2"), total(3,"SCL","2017-2")]

    }]
});
*/
/* grafico 3*/
Highcharts.chart('graphic_3', {
    chart: {
        type: 'line'
    },
    title: {
        text: '',
        style: {
            display: 'none'
        }
    },
    xAxis: {
        categories: ['S1', 'S2', 'S3', 'S4']
    },
    yAxis: {
        title: {
            text: 'Rendimiento (%)'
        }
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        }
    },
    series: [{
        name: 'General',
        data: [total(0,"SCL","2017-2"),total(1,"SCL","2017-2") ,total(2,"SCL","2017-2") ,total(3,"SCL","2017-2") ]
    }, {
        name: 'AM',
        data: [total(0,"SCL","2017-2"),total(1,"SCL","2017-2") ,total(2,"SCL","2017-2") ,total(3,"SCL","2017-2") ]
    }, {
        name: 'PM',
        data: [total(0,"SCL","2017-2"),total(1,"SCL","2017-2") ,total(2,"SCL","2017-2") ,total(3,"SCL","2017-2") ]
    }]
});

/*grafico 4.1*/
Highcharts.chart('graphic_4-1', {
    chart: {
        zoomType: 'xy'
    },
    title: {
        text: 'Average Monthly Temperature and Rainfall in Tokyo'
    },
    subtitle: {
        text: 'Source: WorldClimate.com'
    },
    xAxis: [{
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        crosshair: true
    }],
    yAxis: [{ // Primary yAxis
        labels: {
            format: '{value}°C',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
        title: {
            text: 'Temperature',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        }
    }, { // Secondary yAxis
        title: {
            text: 'Rainfall',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        labels: {
            format: '{value} mm',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        opposite: true
    }],
    tooltip: {
        shared: true
    },
    legend: {
        layout: 'vertical',
        align: 'left',
        x: 120,
        verticalAlign: 'top',
        y: 100,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
    },
    series: [{
        name: 'Rainfall',
        type: 'column',
        yAxis: 1,
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
        tooltip: {
            valueSuffix: ' mm'
        }

    }, {
        name: 'Temperature',
        type: 'spline',
        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
        tooltip: {
            valueSuffix: '°C'
        }
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
Highcharts.chart('graphic_4-2', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: '',
        style: {
            display: 'none'
        }
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
        name: 'Sprint 1',
        data: [
            { name: 'Logrado', y: promedioTech(0,"SCL","2017-2") },
            { name: 'NO-logrado', y: (100-promedioTech(0,"SCL","2017-2")) }
        ]
    }]
});

/*grafico 5.1*/
Highcharts.chart('graphic_5-1', {
    chart: {
        zoomType: 'xy'
    },
    title: {
        text: 'Average Monthly Temperature and Rainfall in Tokyo'
    },
    subtitle: {
        text: 'Source: WorldClimate.com'
    },
    xAxis: [{
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        crosshair: true
    }],
    yAxis: [{ // Primary yAxis
        labels: {
            format: '{value}°C',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
        title: {
            text: 'Temperature',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        }
    }, { // Secondary yAxis
        title: {
            text: 'Rainfall',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        labels: {
            format: '{value} mm',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        opposite: true
    }],
    tooltip: {
        shared: true
    },
    legend: {
        layout: 'vertical',
        align: 'left',
        x: 120,
        verticalAlign: 'top',
        y: 100,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
    },
    series: [{
        name: 'Rainfall',
        type: 'column',
        yAxis: 1,
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
        tooltip: {
            valueSuffix: ' mm'
        }

    }, {
        name: 'Temperature',
        type: 'spline',
        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
        tooltip: {
            valueSuffix: '°C'
        }
    }]
});

/*grafico 5.2*/

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
Highcharts.chart('graphic_5-2', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: '',
        style: {
            display: 'none'
        }
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
            { name: 'Logrado', y: promedioHse(0,"SCL","2017-2") },
            { name: 'NO-Logrado', y: (100-promedioHse(0,"SCL","2017-2")) }
        ]
    }]
});

/*grqafico 6*/
Highcharts.chart('graphic_6', {
    chart: {
        type: 'line'
    },
    title: {
        text: '',
        style: {
            display: 'none'
        }
    },
    xAxis: {
        categories: ['S1', 'S2', 'S3', 'S4']
    },
    yAxis: {
        title: {
            text: 'Temperature (°C)'
        }
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        }
    },
    series: [{
        name: 'Tokyo',
        data: [7.0, 6.9, 9.5, 14.5]
    }]
});

/*grafico 7*/
Highcharts.chart('graphic_7', {
    chart: {
        type: 'line'
    },
    title: {
        text: '',
        style: {
            display: 'none'
        }
    },
    xAxis: {
        categories: ['S1', 'S2', 'S3', 'S4']
    },
    yAxis: {
        title: {
            text: 'Temperature (°C)'
        }
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        }
    },
    series: [{
        name: 'Tokyo',
        data: [7.0, 6.9, 9.5, 14.5]
    }]
});
/*grafico 8*/
Highcharts.chart('graphic_8', {
    chart: {
        type: 'line'
    },
    title: {
        text: '',
        style: {
            display: 'none'
        }
    },
    xAxis: {
        categories: ['S1', 'S2', 'S3', 'S4']
    },
    yAxis: {
        title: {
            text: 'Temperature (°C)'
        }
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        }
    },
    series: [{
        name: 'Tokyo',
        data: [7.0, 6.9, 9.5, 14.5]
    }]
});
