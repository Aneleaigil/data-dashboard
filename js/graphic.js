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

                if (typeof data[sede][semestre]["students"][estudiante]["sprints"] == "undefined" || data[sede][semestre]["students"][estudiante]["sprints"].length == 0) {
                    var activo = data[sede][semestre]["students"][estudiante]["active"];
                    var nombre = data[sede][semestre]["students"][estudiante]["name"];
                    BD.push({
                        "sede" : sede,
                        "nombre" : nombre,
                        "semestre" : semestre,
                        "estudiante" : estudiante,
                        "activado" : activo,
                        "sprints" : -1,
                        "notaTech" : 0,
                        "notaHse" : 0,
                    });
                }
				for(var sprints in data[sede][semestre]["students"][estudiante]["sprints"]){
					var notaTech = data[sede][semestre]["students"][estudiante]["sprints"][sprints].score.tech;
					var notaHse = data[sede][semestre]["students"][estudiante]["sprints"][sprints].score.hse;
                    var activo = data[sede][semestre]["students"][estudiante]["active"];
                    var nombre = data[sede][semestre]["students"][estudiante]["name"];
					BD.push({
                        "sede" : sede,
						"nombre" : nombre,
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
var transformBD_2 = function(){
    var BDR = [];
    for(var sede in data){
        for(var semestre in data[sede]){
            for(var rating in data[sede][semestre]["ratings"]){
                var jedi = data[sede][semestre]["ratings"][rating].jedi;
                var promoter = data[sede][semestre]["ratings"][rating].nps.promoters;
                var passive = data[sede][semestre]["ratings"][rating].nps.passive;
                var detractor = data[sede][semestre]["ratings"][rating].nps.detractors;
                // var sprint = data[sede][semestre]["ratings"][rating].sprint;
                var noCumple = data[sede][semestre]["ratings"][rating].student["no-cumple"];
                var cumple = data[sede][semestre]["ratings"][rating].student["cumple"];
                var supera = data[sede][semestre]["ratings"][rating].student["supera"];
                var teacher = data[sede][semestre]["ratings"][rating].teacher;
                BDR.push({
                    "sede" : sede,
                    "semestre" : semestre,
                    "jedi" : jedi,
                    "sprint" : rating,
                    "teacher" : teacher,
                    "no-cumple" : noCumple,
                    "cumple" : cumple,
                    "supera" : supera,
                    "nps-promoter" : promoter,
                    "nps-passive" : passive,
                    "nps-detractor" : detractor
                })
            }
        }
    }
    return BDR;
} 

var BD = [];
BD = transformBD();
console.log(BD);
var BDR = [];
BDR = transformBD_2();
/*estudiantes activos, inscritos*/
function estudiantes(casa, bloque){
    var estudiante = [];
    for(var i = 0; i < BD.length; i++){
        if(BD[i].sede == casa && BD[i].semestre == bloque && (BD[i].sprints == 1 || BD[i].sprints == -1)){
            estudiante.push(BD[i].estudiante)
        }
    }
    return estudiante;

}

function estudiantesEstadoActivos(casa, bloque){
    var estudiante = [];
    for(var i = 0; i < BD.length; i++){
        if(BD[i].sede == casa && BD[i].semestre == bloque && (BD[i].sprints == 1 || BD[i].sprints == -1)){
            estudiante.push(BD[i].activado)
        }
    }
    return estudiante;
}

function abandonaron(casa, bloque){
    var estadoEstudiante = estudiantesEstadoActivos(casa, bloque);
    var estudianteQueAbandonaron = 0;
    for(var i = 0; i < estadoEstudiante.length; i++){
        if(estadoEstudiante[i]==false){
            estudianteQueAbandonaron += 1;
        }
    }
    return Math.round(estudianteQueAbandonaron*100/estadoEstudiante.length);
}
function activos(casa, bloque){
    var estadoEstudiante = estudiantesEstadoActivos(casa, bloque);
    var estudianteQueAbandonaron = 0;
    for(var i = 0; i < estadoEstudiante.length; i++){
        if(estadoEstudiante[i]== true){
            estudianteQueAbandonaron += 1;
        }
    }
    return Math.round(estudianteQueAbandonaron*100/estadoEstudiante.length);
}
/*pensar como dejar el primero al tope*/
function activo(sprint,casa,bloque){
    var contarTotal= estudiantesEstadoActivos(casa, bloque);
    var contarTrue= 0;
    var contarFalse = 0;
    if(sprint < sprintRealizados(casa,bloque) && 0 != sprintRealizados(casa,bloque)){
        for (var i = 0; i < contarTotal.length; i++){
            if(contarTotal[i] == true){
                    contarTrue +=1;
            }else{
                    contarFalse +=1;
            }
        }
        
    }else if(sprint == 0){
        return 100
    }
    return Math.round((contarTrue/contarTotal.length)*100);
}

/*promedio de notas por sprint y general, logros*/
function sprintRealizados(casa,bloque){
    var cantidadSprint = 0;
    for(var i = 0; i < BDR.length; i++){
        if(BDR[i].sede == casa && BDR[i].semestre == bloque && cantidadSprint < BDR[i].sprint){
            cantidadSprint = BDR[i].sprint;
        }
    }
    return parseInt(cantidadSprint) + 1;
}
function promediosTech(sprint,casa,bloque){
    var todos = [];
    for(var i = 0; i < BD.length; i++){
        if(BD[i].sprints == sprint && BD[i].sede == casa && BD[i].semestre == bloque){
            todos.push(Math.round((BD[i].notaTech/1800)*100))
        }
    }
    return todos;
}

function promediosHse(sprint,casa,bloque){
    var todos = [];
    for(var i = 0; i < BD.length; i++){
        if(BD[i].sprints == sprint && BD[i].sede == casa && BD[i].semestre == bloque){
            todos.push(Math.round((BD[i].notaHse/1200)*100))
        }
    }
    return todos;
}

function promedioTech(sprint, casa, bloque){
    var sum= math.sum(promediosTech(sprint,casa,bloque));
    var cantidad = promediosTech(sprint, casa, bloque).length;
    return Math.round(sum/cantidad);
}

function promedioHse(sprint, casa, bloque){
    var sum= math.sum(promediosHse(sprint, casa, bloque));
    var cantidad = promediosHse(sprint, casa, bloque).length;
    return Math.round(sum/cantidad);
}


function total(sprint, casa, bloque){
    var total = promedioHse(sprint, casa, bloque)*0.4 + promedioTech(sprint, casa, bloque)*0.6
    return Math.round(total);
}

function estudiantesPromedioObjetivos(sprint, casa, bloque){
    var promediosT=promediosTech(sprint, casa, bloque);
    var promediosH=promediosHse(sprint, casa, bloque);
    var promedioEstudiantes=[];
    for (var i=0; i < promediosT.length; i++){
         promedioEstudiantes.push(Math.round(promediosT[i]*0.6+promediosH[i]*0.4))
    }
    return promedioEstudiantes;
}

/*NPS promedio recomendabilidad de los estudiantes*/
function nps(sprint,casa,bloque){
    for(var i = 0; i < BDR.length; i++){
        if(BDR[i].sprint == sprint && BDR[i].sede == casa && BDR[i].semestre == bloque){
            return BDR[i]["nps-promoter"] - BDR[i]["nps-detractor"];
        }
    }
}

function promoter(sprint,casa,bloque){
    for(var i = 0; i < BDR.length; i++){
        if(BDR[i].sprint == sprint && BDR[i].sede == casa && BDR[i].semestre == bloque){
            return BDR[i]["nps-promoter"];
        }
    }
}
function passive(sprint,casa,bloque){
    for(var i = 0; i < BDR.length; i++){
        if(BDR[i].sprint == sprint && BDR[i].sede == casa && BDR[i].semestre == bloque){
            return BDR[i]["nps-passive"];
        }
    }
}
function detractor(sprint,casa,bloque){
    for(var i = 0; i < BDR.length; i++){
        if(BDR[i].sprint == sprint && BDR[i].sede == casa && BDR[i].semestre == bloque){
            return BDR[i]["nps-detractor"];
        }
    }
}

/*objetivo alcanzado por sprint y fracuencia de promedios*/
function promedioSuperanObjetivo(sprint, casa, bloque){
    var promedios=estudiantesPromedioObjetivos(sprint, casa, bloque);
    var superado=[]
    for(var i=0; i<promedios.length; i++){
        if (promedios[i] >= 70){
            superado.push(promedios[i])
        }
    }
    return superado.length
}

function jedi(sprint,casa,bloque){
    for(var i = 0; i < BDR.length; i++){
        if(BDR[i].sprint == sprint && BDR[i].sede == casa && BDR[i].semestre == bloque){
            return BDR[i].jedi;
        }
    }
}
function teacher(sprint,casa,bloque){
    for(var i = 0; i < BDR.length; i++){
        if(BDR[i].sprint == sprint && BDR[i].sede == casa && BDR[i].semestre == bloque){
            return BDR[i].teacher;
        }
    }
}

function noCumple(sprint,casa,bloque){
    for(var i = 0; i < BDR.length; i++){
        if(BDR[i].sprint == sprint && BDR[i].sede == casa && BDR[i].semestre == bloque){
            return BDR[i]["no-cumple"];
        }
    }
}
function promedioSatisfaccion(sprint,casa,bloque){
    var promedios = []
    for(var i = 0; i < BDR.length; i++){
        if(BDR[i].sprint == sprint && BDR[i].sede == casa && BDR[i].semestre == bloque){
            promedios.push(BDR[i].supera + BDR[i].cumple)           
        }
    }
    return promedios;
}
function promedioSatisfaccionAcumulada(sprint,casa,bloque){
    var sum= math.sum(promedioSatisfaccion(sprint,casa,bloque));
    var cantidad = promedioSatisfaccion(sprint,casa,bloque).length;
    return Math.round(sum/cantidad);
}
function promedioSprint(sprint,casa,bloque){
    var promedios = promediosTech(sprint,casa,bloque);
    var frecuencia = {};
    for(var cantidadPromedios in promedios){
        if(typeof frecuencia[promedios[cantidadPromedios]] == "undefined"){
            frecuencia[promedios[cantidadPromedios]] = 1;
        }else{
            frecuencia[promedios[cantidadPromedios]] += 1;
        }
    }
    return frecuencia;
}

/*grafico 1*/
Highcharts.chart('graphic_1', {
    credits: {
      enabled: false
    },
    chart: {
        type: 'column'
    },
    title: {
        text: '',
        style: {
            display: 'none'
        }
    },
    colors: ['#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce', 
    '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
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
    credits: {
      enabled: false
    },
    chart: {
        type: 'line'
    },
    title: {
        text: '',
        style: {
            display: 'none'
        }
    },
    colors: ['#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce', 
    '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
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

/* grafico 3*/
Highcharts.chart('graphic_3', {
    credits: {
      enabled: false
    },
    chart: {
        type: 'line'
    },
    title: {
        text: '',
        style: {
            display: 'none'
        }
    },
    colors: ['#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce', 
    '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
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
        data: [nps(0, "SCL", "2017-2"), nps(1, "SCL", "2017-2"), nps(2, "SCL", "2017-2"), nps(3, "SCL", "2017-2")]
    }, {
        name: 'AM',
        data: [nps(0,"SCL","2017-2"),nps(1,"SCL","2017-2") ,nps(2,"SCL","2017-2") ,nps(3,"SCL","2017-2") ]
    }, {
        name: 'PM',
        data: [nps(0,"SCL","2017-2"),nps(1,"SCL","2017-2") ,nps(2,"SCL","2017-2") ,nps(3,"SCL","2017-2") ]
    }]
});


/*grafico 4.1*/
Highcharts.chart('graphic_4-1', {
    credits: {
      enabled: false
    },
    chart: {
        zoomType: 'xy'
    },
    title: {
        text: '',
        style: {
            display: 'none'
        }
    },
    colors: ['#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce', 
    '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
    xAxis: [{
        categories: Object.keys(promedioSprint(0,"SCL","2017-2")),
        crosshair: true
    }],
    yAxis: [{ // Primary yAxis
        labels: {
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
        title: {
            text: 'Alumnas',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        }
    }],
    series: [
    {
        name: 'cantidad',
        type: 'column',
        data: Object.values(promedioSprint(0,"SCL","2017-2")),
    }]
});

/*grafico 4.2*/
// Build the chart
Highcharts.chart('graphic_4-2', {
    credits: {
      enabled: false
    },
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
            colors: ['#f9a91a', '#f5c979', '#89A54E', '#80699B', '#3D96AE', 
   '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92'],
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
            { name: 'Logrado', y: noCumple(0,"SCL","2017-2") },
            { name: 'NO-Logrado', y: noCumple(0,"SCL","2017-2") }
        ]
    }]
});

/*grafico 5.1*/
Highcharts.chart('graphic_5-1', {
    credits: {
      enabled: false
    },
    chart: {
        zoomType: 'xy'
    },
    title: {
        text: '',
        style: {
            display: 'none'
        }
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
    credits: {
      enabled: false
    },
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
    credits: {
      enabled: false
    },
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
        name: 'General',
        data: [promedioSatisfaccionAcumulada(0,"SCL","2017-2"), promedioSatisfaccionAcumulada(1,"SCL","2017-2"), promedioSatisfaccionAcumulada(2,"SCL","2017-2"), promedioSatisfaccionAcumulada(3,"SCL","2017-2")]
    }]
});

/*grafico 7*/
Highcharts.chart('graphic_7', {
    credits: {
      enabled: false
    },
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
            text: 'Promedio'
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
        data: [teacher(0, "SCL", "2017-2"), teacher(1, "SCL", "2017-2"), teacher(2, "SCL", "2017-2"), teacher(3, "SCL", "2017-2")]
    }]
});
/*grafico 8*/
Highcharts.chart('graphic_8', {
    credits: {
      enabled: false
    },
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
            text: 'Promedio (%)'
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
        data: [jedi(0, "SCL", "2017-2"), jedi(1, "SCL", "2017-2"), jedi(2, "SCL", "2017-2"), jedi(3, "SCL", "2017-2")]
    }]
});

/*grafico 9*/
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
Highcharts.chart('graphic_9', {
    credits: {
      enabled: false
    },
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
            { name: 'Logrado', y: noCumple(0,"SCL","2017-2") },
            { name: 'NO-Logrado', y: noCumple(0,"SCL","2017-2") }
        ]
    }]
});