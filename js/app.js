function editar(){
	/*creamos elementos y nodos*/
	var contenedor = document.getElementById("navEditar")
	var lista = document.createElement("div");
	var sclA = document.createElement("a");
	var limA = document.createElement("a");
	var mexA = document.createElement("a");
	var arqA = document.createElement("a");
	var sedeSCL = document.createElement("p");
	var sedeLIM = document.createElement("p");
	var sedeMEX = document.createElement("p");
	var sedeARQ = document.createElement("p");
	var scl = document.createTextNode("Santiago");
	var lim = document.createTextNode("Lima");
	var arq = document.createTextNode("Arequipa");
	var mex = document.createTextNode("Mexico");
	/*asignar padre a los huerfanos*/
	sedeSCL.appendChild(scl);
	sedeLIM.appendChild(lim);
	sedeMEX.appendChild(mex);
	sedeARQ.appendChild(arq);
	sclA.appendChild(sedeSCL);
	limA.appendChild(sedeLIM);
	mexA.appendChild(sedeMEX);
	arqA.appendChild(sedeARQ);
	lista.appendChild(sclA);
	lista.appendChild(limA);
	lista.appendChild(mexA);
	lista.appendChild(arqA);
	contenedor.appendChild(lista)
	/*crear atributos*/
	lista.className = "lista";
	sclA.className = "sedeSCL";
	limA.className = "sedeLIM";
	mexA.className = "sedeMEX";
	arqA.className = "sedeARQ";

}
