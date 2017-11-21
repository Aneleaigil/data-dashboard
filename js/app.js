document.getElementById("sprint").addEventListener("change", function() {
	var e = document.getElementById("sprint");
	// e.options[e.selectedIndex] es para obtener el option que esta seleccionado
	var sede = e.options[e.selectedIndex].getAttribute("data-sede");
	document.getElementById("nombre_sede").textContent = sede;
	var casa = e.options[e.selectedIndex].getAttribute("data-casa");
	var bloque = e.value;

	// Actualizar Resultados
	estudiantesInscritas(casa, bloque);
	estudiantesInactivos(casa, bloque);
	estudiantesSuperanObjetivo(casa,bloque);
	promedioNotas(casa,bloque);
	promedioNps(casa,bloque);
	estudiantesPromoter(casa,bloque);
	estudiantesPassive(casa,bloque);
	estudiantesDetractor(casa,bloque);
	cantidadEstudianteSuperanObjetivoTech(0, casa,bloque);
	promedioEstudianteSuperanObjetivoTech(0, casa,bloque);
	cantidadEstudianteSuperanObjetivoHse(0, casa,bloque);
	promedioEstudianteSuperanObjetivoHse(0, casa,bloque);
	promedioSatifaccionTotal(casa,bloque);
	promedioProfe(casa,bloque);
	promedioJedi(casa,bloque);
	grafico1(casa, bloque);
	grafico2(casa, bloque);
	grafico3(casa, bloque);
	grafico4_1(0, casa, bloque);
	grafico4_2(0, casa, bloque);
	grafico5_1(0, casa, bloque);
	grafico5_2(0, casa, bloque);
	grafico6(casa, bloque);
	grafico7(casa, bloque);
	grafico8(casa, bloque);



	console.log(casa, bloque);

});
/*seleccionar sprint*/
document.getElementById("cadaSprintTech").addEventListener("change", function() {
	var e = document.getElementById("sprint");
	var casa = e.options[e.selectedIndex].getAttribute("data-casa");
	var bloque = e.value;
	var a = document.getElementById("cadaSprintTech");
	var sprint = a.value;

	// Actualizar Resultados
	grafico4_1(sprint, casa, bloque);
	grafico4_2(sprint, casa, bloque);
	cantidadEstudianteSuperanObjetivoTech(sprint, casa,bloque);
	promedioEstudianteSuperanObjetivoTech(sprint, casa,bloque);

});
document.getElementById("cadaSprintHse").addEventListener("change", function() {
	var e = document.getElementById("sprint");
	var casa = e.options[e.selectedIndex].getAttribute("data-casa");
	var bloque = e.value;
	var a = document.getElementById("cadaSprintHse");;
	var sprint = a.value;

	// Actualizar Resultados
	cantidadEstudianteSuperanObjetivoHse(sprint, casa,bloque);
	promedioEstudianteSuperanObjetivoHse(sprint, casa,bloque);
	grafico5_1(sprint, casa, bloque);
	grafico5_2(sprint, casa, bloque);

});


/*grafico 1 primera parte*/
var estudiantesInscritas = function(casa, bloque){
	var estudiante = document.getElementById("studentInscritas");
	estudiante.textContent = estudiantesEstadoActivos(casa, bloque).length;
}

estudiantesInscritas("SCL", "2017-2")

var estudiantesInactivos = function(casa, bloque){
	var estudiante = document.getElementById("studentInactivos");
	estudiante.textContent = abandonaron(casa, bloque);
}

estudiantesInactivos("SCL", "2017-2")

var estudiantesSuperanObjetivo = function(casa, bloque){
	var estudiante = document.getElementById("studentSuperan");
	var cantidad = promedioSuperanObjetivo(0,casa, bloque) +promedioSuperanObjetivo(1,casa, bloque)+promedioSuperanObjetivo(2,casa, bloque)+promedioSuperanObjetivo(3,casa, bloque)
	var cantidadSprint = sprintRealizados(casa,bloque);
	estudiante.textContent = Math.round(cantidad/cantidadSprint);
}
var evaluar = function(cont){
	return isNaN(cont) ? 0 : cont;
}

estudiantesSuperanObjetivo("SCL", "2017-2");

var promedioNotas = function(casa, bloque){
	var estudiante = document.getElementById("promedioSprint");
	var nota0 = total(0,casa, bloque);
	var nota1 = total(1,casa, bloque);
	var nota2 = total(2,casa, bloque);
	var nota3 = total(3,casa, bloque);
	var cantidad = evaluar(nota0) +evaluar(nota1)+evaluar(nota2)+evaluar(nota3)
	console.log(cantidad)
	var cantidadSprint = sprintRealizados(casa,bloque);
	estudiante.textContent = Math.round(cantidad/cantidadSprint);
}

promedioNotas("SCL", "2017-2")

/*datos de nps*/
var promedioNps = function(casa, bloque){
	var estudiante = document.getElementById("npsPromedio");
	var nota0 = nps(0,casa, bloque);
	var nota1 = nps(1,casa, bloque);
	var nota2 = nps(2,casa, bloque);
	var nota3 = nps(3,casa, bloque);
	var cantidad = evaluar(nota0) +evaluar(nota1)+evaluar(nota2)+evaluar(nota3)
	var cantidadSprint = sprintRealizados(casa,bloque);
	estudiante.textContent = Math.round(cantidad/cantidadSprint);
}
promedioNps("SCL", "2017-2")

var estudiantesPromoter = function(casa, bloque){
	var estudiante = document.getElementById("studentPromoter");
	var nota0 = promoter(0,casa, bloque);
	var nota1 = promoter(1,casa, bloque);
	var nota2 = promoter(2,casa, bloque);
	var nota3 = promoter(3,casa, bloque);
	var cantidad = evaluar(nota0) +evaluar(nota1)+evaluar(nota2)+evaluar(nota3)
	var cantidadSprint = sprintRealizados(casa,bloque);
	estudiante.textContent = Math.round(cantidad/cantidadSprint);
}
estudiantesPromoter("SCL", "2017-2")

var estudiantesPassive = function(casa, bloque){
	var estudiante = document.getElementById("studentPassive");
	var nota0 = passive(0,casa, bloque);
	var nota1 = passive(1,casa, bloque);
	var nota2 = passive(2,casa, bloque);
	var nota3 = passive(3,casa, bloque);
	var cantidad = evaluar(nota0) +evaluar(nota1)+evaluar(nota2)+evaluar(nota3)
	var cantidadSprint = sprintRealizados(casa,bloque);
	estudiante.textContent = Math.round(cantidad/cantidadSprint);
}
estudiantesPassive("SCL", "2017-2")

var estudiantesDetractor = function(casa, bloque){
	var estudiante = document.getElementById("studentDetractor");
	var nota0 = detractor(0,casa, bloque);
	var nota1 = detractor(1,casa, bloque);
	var nota2 = detractor(2,casa, bloque);
	var nota3 = detractor(3,casa, bloque);
	var cantidad = evaluar(nota0) +evaluar(nota1)+evaluar(nota2)+evaluar(nota3)
	var cantidadSprint = sprintRealizados(casa,bloque);
	estudiante.textContent = Math.round(cantidad/cantidadSprint);
}
estudiantesDetractor("SCL", "2017-2");

var cantidadEstudianteSuperanObjetivoTech = function(sprint,casa,bloque){
	var estudiante = document.getElementById("studentSuperanTech");
	estudiante.textContent = promedioSuperanObjetivoTech(sprint,casa,bloque);
}
cantidadEstudianteSuperanObjetivoTech(0, "SCL", "2017-2");

var promedioEstudianteSuperanObjetivoTech = function(sprint,casa,bloque){
	var estudiante = document.getElementById("studentSuperanPromedio");
	estudiante.textContent = promedioSprintTech(sprint,casa,bloque);
}
promedioEstudianteSuperanObjetivoTech(0, "SCL", "2017-2");

var cantidadEstudianteSuperanObjetivoHse = function(sprint,casa,bloque){
	var estudiante = document.getElementById("studentSuperanHse");
	estudiante.textContent = promedioSuperanObjetivoHse(sprint,casa,bloque);
}
cantidadEstudianteSuperanObjetivoHse(0, "SCL", "2017-2");

var promedioEstudianteSuperanObjetivoHse = function(sprint,casa,bloque){
	var estudiante = document.getElementById("studentSuperanPromedioHse");
	estudiante.textContent = promedioSprintHse(sprint,casa,bloque);
}
promedioEstudianteSuperanObjetivoHse(0, "SCL", "2017-2");

var promedioSatifaccionTotal = function(casa,bloque){
	var estudiante = document.getElementById("satisfaccion");
	var nota0 = promedioSatisfaccion(0,casa, bloque);
	var nota1 = promedioSatisfaccion(1,casa, bloque);
	var nota2 = promedioSatisfaccion(2,casa, bloque);
	var nota3 = promedioSatisfaccion(3,casa, bloque);
	var cantidad = evaluar(nota0) +evaluar(nota1)+evaluar(nota2)+evaluar(nota3);
	var cantidadSprint = sprintRealizados(casa,bloque);
	estudiante.textContent = Math.round(cantidad/cantidadSprint);
}

promedioSatifaccionTotal("SCL", "2017-2");

var promedioProfe = function(casa,bloque){
	var estudiante = document.getElementById("promedioTeacher");
	var nota0 = teacher(0,casa, bloque);
	var nota1 = teacher(1,casa, bloque);
	var nota2 = teacher(2,casa, bloque);
	var nota3 = teacher(3,casa, bloque);
	var cantidad = evaluar(nota0) +evaluar(nota1)+evaluar(nota2)+evaluar(nota3);
	var cantidadSprint = sprintRealizados(casa,bloque);
	estudiante.textContent = Math.round((cantidad/cantidadSprint)*10)/10;
}
promedioProfe("SCL", "2017-2");

var promedioJedi = function(casa,bloque){
	var estudiante = document.getElementById("promedioJediMaster");
	var nota0 = jedi(0,casa, bloque);
	var nota1 = jedi(1,casa, bloque);
	var nota2 = jedi(2,casa, bloque);
	var nota3 = jedi(3,casa, bloque);
	var cantidad = evaluar(nota0) +evaluar(nota1)+evaluar(nota2)+evaluar(nota3);
	var cantidadSprint = sprintRealizados(casa,bloque);
	estudiante.textContent = Math.round((cantidad/cantidadSprint)*10)/10;
}
promedioJedi("SCL", "2017-2");