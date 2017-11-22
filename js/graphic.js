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
function cantidadAbandonan(casa, bloque){
    var estadoEstudiante = estudiantesEstadoActivos(casa, bloque);
    var estudianteQueAbandonaron = 0;
    for(var i = 0; i < estadoEstudiante.length; i++){
        if(estadoEstudiante[i]==false || typeof estadoEstudiante[i] == "undefined"){
            estudianteQueAbandonaron += 1;
        }
    }
    return estudianteQueAbandonaron;
}
function abandonaron(casa, bloque){
    var estadoEstudiante = estudiantesEstadoActivos(casa, bloque);
    var abandonan = cantidadAbandonan(casa, bloque);
    return Math.round(abandonan*100/estadoEstudiante.length);
}

function cantidadActivos(casa, bloque){
    var estadoEstudiante = estudiantesEstadoActivos(casa, bloque);
    var estudianteQueQuedan= 0;
    for(var i = 0; i < estadoEstudiante.length; i++){
        if(estadoEstudiante[i]== true){
            estudianteQueQuedan += 1;
        }
    }
    return estudianteQueQuedan;
}
function activos(casa, bloque){
    var estadoEstudiante = estudiantesEstadoActivos(casa, bloque);
    return Math.round(cantidadActivos(casa, bloque)*100/estadoEstudiante.length);
}
function activo(casa,bloque){
    var estadoEstudiante = estudiantesEstadoActivos(casa, bloque);
    var lista = []
    if(sprintRealizados(casa,bloque)==4){
        lista.push(100);
        var sprint4_4 = Math.round(cantidadActivos(casa, bloque)*100/estadoEstudiante.length);
        var cantidadAgregarSprint4 = Math.round(cantidadAbandonan(casa, bloque)*100/estadoEstudiante.length);
        var sprint4_2 = Math.round(100 - cantidadAgregarSprint4/3)
        var sprint4_3 = Math.round(sprint4_2 - cantidadAgregarSprint4/3)
        lista.push(sprint4_2);
        lista.push(sprint4_3);
        lista.push(sprint4_4);
    }else if(sprintRealizados(casa,bloque)==3){
        lista.push(100);
        var sprint3_3 = Math.round(cantidadActivos(casa, bloque)*100/estadoEstudiante.length);
        var cantidadAgregarSprint3 = Math.round(cantidadAbandonan(casa, bloque)*100/estadoEstudiante.length);
        var sprint3_2 = math.round(100 - cantidadAgregarSprint3/2);
        lista.push(sprint3_2);
        lista.push(sprint3_3);
    }else if(sprintRealizados(casa,bloque)==2){
        lista.push(100);
        var sprint2_2 = Math.round(cantidadActivos(casa, bloque)*100/estadoEstudiante.length);
        lista.push(sprint2_2)
    }else{
        lista.push(100);
    }
    return lista;
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

/*objetivo alcanzado por sprint y fracuencia de promedios tech*/
function estudiantesPromedioObjetivosTech(sprint, casa, bloque){
    var promediosT=promediosTech(sprint, casa, bloque);
    var promedioEstudiantes=[];
    for (var i=0; i < promediosT.length; i++){
         promedioEstudiantes.push(Math.round(promediosT[i]))
    }
    return promedioEstudiantes;
}

function promedioSuperanObjetivoTech(sprint, casa, bloque){
    var promedios=estudiantesPromedioObjetivosTech(sprint, casa, bloque);
    var superado=[]
    for(var i=0; i<promedios.length; i++){
        if (promedios[i] >= 70){
            superado.push(promedios[i])
        }
    }
    return superado.length
}
function promedioSprintTech(sprint, casa, bloque){
    return Math.round(promedioSuperanObjetivoTech(sprint, casa, bloque)*100/estudiantesPromedioObjetivosTech(sprint, casa, bloque).length)
}
function cantidadPromediosSprintTech(sprint,casa,bloque){
    var promedios = promediosTech(sprint,casa,bloque);
    var frecuencia = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for(var cantidadPromedios in promedios){
        if(promedios[cantidadPromedios] > 0 && promedios[cantidadPromedios] <=10){
            frecuencia[0] += 1;
        }else if(promedios[cantidadPromedios] > 10 && promedios[cantidadPromedios] <=20){
            frecuencia[1] += 1;
        }else if(promedios[cantidadPromedios] > 20 && promedios[cantidadPromedios] <=30){
            frecuencia[2] += 1;
        }else if(promedios[cantidadPromedios] > 30 && promedios[cantidadPromedios] <=40){
            frecuencia[3] += 1;
        }else if(promedios[cantidadPromedios] > 40 && promedios[cantidadPromedios] <=50){
            frecuencia[4] += 1;
        }else if(promedios[cantidadPromedios] > 50 && promedios[cantidadPromedios] <=60){
            frecuencia[5] += 1;
        }else if(promedios[cantidadPromedios] > 60 && promedios[cantidadPromedios] <=70){
            frecuencia[6] += 1;
        }else if(promedios[cantidadPromedios] > 70 && promedios[cantidadPromedios] <=80){
            frecuencia[7] += 1;
        }else if(promedios[cantidadPromedios] > 80 && promedios[cantidadPromedios] <=90){
            frecuencia[8] += 1;
        }else{
            frecuencia[9] += 1;
        }
    }
    return frecuencia;
}
/*promedio por sprint en Hse*/
function estudiantesPromedioObjetivosHse(sprint, casa, bloque){
    var promediosH=promediosHse(sprint, casa, bloque);
    var promedioEstudiantes=[];
    for (var i=0; i < promediosH.length; i++){
         promedioEstudiantes.push(Math.round(promediosH[i]))
    }
    return promedioEstudiantes;
}

function promedioSuperanObjetivoHse(sprint, casa, bloque){
    var promedios=estudiantesPromedioObjetivosHse(sprint, casa, bloque);
    var superado=[]
    for(var i=0; i<promedios.length; i++){
        if (promedios[i] >= 70){
            superado.push(promedios[i])
        }
    }
    return superado.length
}

function promedioSprintHse(sprint, casa, bloque){
    return Math.round(promedioSuperanObjetivoHse(sprint, casa, bloque)*100/estudiantesPromedioObjetivosHse(sprint, casa, bloque).length)
}

function cantidadPromediosSprintHse(sprint,casa,bloque){
    var promedios = promediosHse(sprint,casa,bloque);
    var frecuencia = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for(var cantidadPromedios in promedios){
        if(promedios[cantidadPromedios] > 0 && promedios[cantidadPromedios] <=10){
            frecuencia[0] += 1;
        }else if(promedios[cantidadPromedios] > 10 && promedios[cantidadPromedios] <=20){
            frecuencia[1] += 1;
        }else if(promedios[cantidadPromedios] > 20 && promedios[cantidadPromedios] <=30){
            frecuencia[2] += 1;
        }else if(promedios[cantidadPromedios] > 30 && promedios[cantidadPromedios] <=40){
            frecuencia[3] += 1;
        }else if(promedios[cantidadPromedios] > 40 && promedios[cantidadPromedios] <=50){
            frecuencia[4] += 1;
        }else if(promedios[cantidadPromedios] > 50 && promedios[cantidadPromedios] <=60){
            frecuencia[5] += 1;
        }else if(promedios[cantidadPromedios] > 60 && promedios[cantidadPromedios] <=70){
            frecuencia[6] += 1;
        }else if(promedios[cantidadPromedios] > 70 && promedios[cantidadPromedios] <=80){
            frecuencia[7] += 1;
        }else if(promedios[cantidadPromedios] > 80 && promedios[cantidadPromedios] <=90){
            frecuencia[8] += 1;
        }else{
            frecuencia[9] += 1;
        }
    }
    return frecuencia;
}
function promedioSatisfaccion(sprint,casa,bloque){
    for(var i = 0; i < BDR.length; i++){
        if(BDR[i].sprint == sprint && BDR[i].sede == casa && BDR[i].semestre == bloque){
            return(BDR[i].supera + BDR[i].cumple)           
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

function jedi(sprint,casa,bloque){
    for(var i = 0; i < BDR.length; i++){
        if(BDR[i].sprint == sprint && BDR[i].sede == casa && BDR[i].semestre == bloque){
            return BDR[i].jedi;
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

/*grafico 1*/
function grafico1(casa, bloque) {
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
        colors: ['#f9a91a', '#A4A4A4', '#333333', '#910000', '#1aadce', 
        '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
       
        xAxis: {
            categories: [
                'Sprint 1',
                'Sprint 2',
                'Sprint 3',
                'Sprint 4'
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
                '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
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
            name: 'Promedio General',
            data: activo(casa, bloque)

        }, {
            name: 'AM',
            data: activo(casa, bloque)

        }, {
            name: 'PM',
            data: activo(casa, bloque)

        }]
    });
}

grafico1("SCL", "2017-2");

/* grafico 2*/
function grafico2(casa, bloque){
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
        colors: ['#f9a91a', '#A4A4A4', '#333333', '#910000', '#1aadce', 
        '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
        xAxis: {
            categories: [
                'Sprint 1',
                'Sprint 2',
                'Sprint 3',
                'Sprint 4'
            ],
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
            data: [total(0,casa,bloque),total(1,casa,bloque) ,total(2,casa,bloque) ,total(3,casa,bloque) ]
        }, {
            name: 'AM',
            data: [total(0,casa,bloque),total(1,casa,bloque) ,total(2,casa,bloque) ,total(3,casa,bloque) ]
        }, {
            name: 'PM',
            data: [total(0,casa,bloque),total(1,casa,bloque) ,total(2,casa,bloque) ,total(3,casa,bloque) ]
        }]
    });
}

grafico2("SCL","2017-2");

/* grafico 3*/
function grafico3(casa,bloque){
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
         colors: ['#A4A4A4', '#f9a91a', '#333333', '#910000', '#1aadce', 
        '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
        xAxis: {
            categories: ['S1', 'S2', 'S3', 'S4']
        },
        yAxis: {
            title: {
                text: 'NPS (%)'
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
            data: [nps(0, casa, bloque), nps(1, casa, bloque), nps(2, casa, bloque), nps(3, casa, bloque)]
        }, {
            name: 'AM',
            data: [nps(0,casa, bloque),nps(1,casa, bloque) ,nps(2,casa, bloque) ,nps(3,casa, bloque) ]
        }, {
            name: 'PM',
            data: [nps(0,casa, bloque),nps(1,casa, bloque) ,nps(2,casa, bloque) ,nps(3,casa, bloque) ]
        }]
    });
}
grafico3("SCL", "2017-2")
/*grafico 4.1*/
function grafico4_1(sprint,casa, bloque){
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
        colors: ['#A4A4A4', '#333333', '#8bbc21', '#910000', '#1aadce', 
        '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
        xAxis: [{
            categories: [5,15,25,35,45,55,65,75,85,95],
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
            data: cantidadPromediosSprintTech(sprint,casa, bloque),
        }]
    });
}
grafico4_1(0,"SCL", "2017-2")
/*grafico 4.2*/
// Build the chart
function grafico4_2(sprint,casa, bloque){
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
                { name: 'Logrado', y: promedioSprintTech(sprint, casa, bloque) },
                { name: 'NO-Logrado', y: 100 - promedioSprintTech(sprint, casa, bloque) }
            ]
        }]
    });
}

grafico4_2(0,"SCL", "2017-2")
/*grafico 5.1*/
function grafico5_1(sprint, casa,bloque){
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
        colors: ['#A4A4A4', '#333333', '#8bbc21', '#910000', '#1aadce', 
        '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
        xAxis: [{
            categories: [5,15,25,35,45,55,65,75,85,95],
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
            data: cantidadPromediosSprintHse(sprint,casa, bloque),
        }]
    });
}
grafico5_1(0,"SCL","2017-2")
/*grafico 5.2*/

function grafico5_2(sprint, casa,bloque){
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
                colors: ['#A4A4A4', '#33333', '#89A54E', '#80699B', '#3D96AE', 
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
            name: 'Brands',
            data: [
                { name: 'Logrado', y: promedioSprintHse(sprint, casa,bloque) },
                { name: 'NO-Logrado', y: (100-promedioSprintHse(sprint, casa,bloque)) }
            ]
        }]
    });
}
grafico5_2(0,"SCL","2017-2")
/*grqafico 6*/
function grafico6(casa, bloque){
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
         colors: ['#A4A4A4', '#333333', '#8bbc21', '#910000', '#1aadce', 
        '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
        xAxis: {
            categories: ['S1', 'S2', 'S3', 'S4']
        },
        yAxis: {
            title: {
                text: 'Satisfacción (%)'
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
            name: 'Promedio General',
            data: [promedioSatisfaccion(0,casa,bloque), promedioSatisfaccion(1,casa,bloque), promedioSatisfaccion(2,casa,bloque), promedioSatisfaccion(3,casa,bloque)]
        }]
    });
}
grafico6("SCL","2017-2")
/*grafico 7*/
function grafico7(casa,bloque){
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
         colors: ['#A4A4A4', '#333333', '#8bbc21', '#910000', '#1aadce', 
        '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
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
            name: 'Promedio General',
            data: [teacher(0, casa,bloque), teacher(1, casa,bloque), teacher(2, casa,bloque), teacher(3, casa,bloque)]
        }]
    });
}
grafico7("SCL","2017-2")
/*grafico 8*/
function grafico8(casa,bloque){
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
         colors: ['#A4A4A4', '#333333', '#8bbc21', '#910000', '#1aadce', 
        '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
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
            name: 'Promedio General',
            data: [jedi(0, casa,bloque), jedi(1, casa,bloque), jedi(2, casa,bloque), jedi(3, casa,bloque)]
        }]
    });
}
grafico8("SCL","2017-2")
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
            { name: 'Logrado', y: 90},
            { name: 'NO-Logrado', y: 10 }
        ]
    }]
});