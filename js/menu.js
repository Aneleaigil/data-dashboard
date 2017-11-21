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
		var add_1 = document.createTextNode("Agregar Estudiante");
		var remove = document.createTextNode("Remover Estudiante");
		var add_2 = document.createTextNode("Agregar Sprint");
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
		var Sprint_1 = document.createElement("p"); //lima
		var Sprint_2 = document.createElement("p");//santiago
		var Sprint_3= document.createElement("p");//mexico
		var Sprint_4 = document.createElement("p");//arequipa
		var spr1 = document.createTextNode("Sprint 1"); //lim
		var spr2 = document.createTextNode("Sprint 2"); //scl
		var spr3 = document.createTextNode("Sprint 3");//mex
		var spr4 = document.createTextNode("Sprint 4");//arq
		/*asignar padre a los huerfanos*/
		Sprint_1.appendChild(spr1);
		Sprint_2.appendChild(spr2);
		Sprint_3.appendChild(spr3);
		Sprint_4.appendChild(spr4);
		opcion_1.appendChild(Sprint_1);
		opcion_2.appendChild(Sprint_2);
		opcion_3.appendChild(Sprint_3);
		opcion_4.appendChild(Sprint_4);
		lista.appendChild(opcion_1);
		lista.appendChild(opcion_2);
		lista.appendChild(opcion_3);
		lista.appendChild(opcion_4);
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