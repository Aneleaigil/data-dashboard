var mostrar = true;
function editar(){
	console.log(mostrar);
	if(mostrar) {
		mostrar = false;
		/*creamos elementos y nodos*/
		var contenedor = document.getElementById("navEditar")
		var lista = document.createElement("div");
		var opcion_1 = document.createElement("a");
		var opcion_2 = document.createElement("a");
		var opcion_3 = document.createElement("a");
		var addStudent = document.createElement("p");
		var removeStudent= document.createElement("p");
		var addSprint = document.createElement("p");
		var add_1 = document.createTextNode("Add Student");
		var remove = document.createTextNode("Remove Student");
		var add_2 = document.createTextNode("Add Sprint");
		/*asignar padre a los huerfanos*/
		addStudent.appendChild(add_1);
		removeStudent.appendChild(remove);
		addSprint.appendChild(add_2);
		opcion_1.appendChild(addStudent);
		opcion_2.appendChild(removeStudent);
		opcion_3.appendChild(addSprint);
		lista.appendChild(opcion_3);
		lista.appendChild(opcion_2);
		lista.appendChild(opcion_1);
		contenedor.appendChild(lista)
		/*crear atributos*/
		lista.className = "lista";
		// sclA.className = "add1";
		// limA.className = "remove";
		// mexA.className = "add2";
		lista.setAttribute("id", "listaEditar");
	} else {
		mostrar = true;
		var contenedor = document.getElementById("listaEditar");
		contenedor.remove();
	}
}
/*para cambiar sede y sprint*/

function buscar(){
	console.log(mostrar);
	if(mostrar) {
		mostrar = false;
		/*creamos elementos y nodos*/
		var contenedor = document.getElementById("navBuscador")
		var lista = document.createElement("div");
		var opcion_1 = document.createElement("a");
		var opcion_2 = document.createElement("a");
		var opcion_3 = document.createElement("a");
		var opcion_4 = document.createElement("a");
		var lima = document.createElement("p");
		var santiago = document.createElement("p");
		var mexico= document.createElement("p");
		var arequipa = document.createElement("p");
		var lim = document.createTextNode("Lima");
		var scl = document.createTextNode("Santiago");
		var mex = document.createTextNode("Mexico");
		var arq = document.createTextNode("Arequipa");
		/*asignar padre a los huerfanos*/
		lima.appendChild(lim);
		santiago.appendChild(scl);
		mexico.appendChild(mex);
		arequipa.appendChild(arq);
		opcion_1.appendChild(lima);
		opcion_2.appendChild(santiago);
		opcion_3.appendChild(mexico);
		opcion_4.appendChild(arequipa);
		lista.appendChild(opcion_4);
		lista.appendChild(opcion_3);
		lista.appendChild(opcion_2);
		lista.appendChild(opcion_1);
		contenedor.appendChild(lista)
		/*crear atributos*/
		lista.className = "lista";
		// sclA.className = "add1";
		// limA.className = "remove";
		// mexA.className = "add2";
		lista.setAttribute("id", "listaBuscar");
	} else {
		mostrar = true;
		var contenedor = document.getElementById("listaBuscar");
		contenedor.remove();
	}
}

var estudiantesInscritas = function(){
	var estudiante = document.getElementById("studentInscritas");
	estudiante.textContent = estudiantesEstadoActivos("SCL", "2017-2").length;
}

estudiantesInscritas()

var estudiantesInactivos = function(){
	var estudiante = document.getElementById("studentInactivos");
	estudiante.textContent = abandonaron("SCL", "2017-2");
}

estudiantesInactivos()



var estudiantesSuperanObjetivo = function(){
	var casa = "SCL";
	var bloque = "2017-2";
	var estudiante = document.getElementById("studentSuperan");
	var cantidad = promedioSuperanObjetivo(0,casa, bloque) +promedioSuperanObjetivo(1,casa, bloque)+promedioSuperanObjetivo(2,casa, bloque)+promedioSuperanObjetivo(3,casa, bloque)
	var cantidadSprint = sprintRealizados(casa,bloque);
	estudiante.textContent = Math.round(cantidad/cantidadSprint);
}
var evaluar = function(cont){
	return isNaN(cont) ? 0 : cont;
}

estudiantesSuperanObjetivo();

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
	console.log(cantidad)
	var cantidadSprint = sprintRealizados(casa,bloque);
	estudiante.textContent = Math.round(cantidad/cantidadSprint);
}
promedioNps("SCL", "2017-2")

var estudiantesPromoter = function(casa, bloque){
	var estudiante = document.getElementById("studentPromoter");
	estudiante.textContent = promoter("SCL", "2017-2");
}
estudiantesPromoter("SCL", "2017-2")

var estudiantesPasive = function(casa, bloque){
	var estudiante = document.getElementById("studentPasive");
	estudiante.textContent = pasive("SCL", "2017-2");
}
estudiantesPasive("SCL", "2017-2")