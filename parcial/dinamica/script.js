//en memoria la direccion es primero las cubetas y luego los registros

let cubetas;
let reg;
let ampliamineto; 
let reduccion;
let flag=0;

let memoria;
let ingresos=[];
let colisiones=[];

let regocupados=0;

let interfaz=document.querySelector(".container .change");
let botonenv=document.querySelector(".container #enviar");
let botonelim=document.querySelector(".container #eliminar");

let tablaContainer=document.querySelector(".tabla");
var tabla = document.createElement("table");


let mitad=0;
let doble=0;
let map;

let ubicacion;

// H(K)= K mod(N) donde K es el numero del dato que entra y N es el numero de cubetas
let hashmodfunc=((numberin)=>{
return numberin%cubetas
});


let ingresar=((id)=>{
    ubicacion=parseInt(hashmodfunc(id));
    // console.log(memoria);
    let fl=true;
    for (let index = 0; index < reg; index++) {
        // console.log(ubicacion);
        if(memoria[ubicacion][index]==undefined){
            memoria[ubicacion][index]=id;
            fl=false;
            break;
        }
        
    }
    if(fl){
        console.log(id);
        colisiones.push(id);
    }
});

// let memoria = [];


botonenv.addEventListener("click",()=>{
    if(flag==0){
        cubetas=document.querySelector(".container .change #cubetas");
        cubetas=parseInt(cubetas.value);

        reg=document.querySelector(".container .change #reg");
        reg=parseInt(reg.value);

        ampliamineto=document.querySelector(".container .change #porexp");
        ampliamineto=parseFloat(ampliamineto.value);

        reduccion=document.querySelector(".container .change #porred");
        reduccion=parseFloat(reduccion.value);

      interfaz.innerHTML=`
<label for="datos" >ingrese un dato:</label>
<input id="datos" type="number" min="0">` ;
botonelim.classList.remove("none");
memoria = new Array(cubetas);
for (var i = 0; i < cubetas; i++) {
    memoria[i] = new Array(reg);
}
flag=1;  
while (tablaContainer.firstChild) {
    tablaContainer.removeChild(tablaContainer.firstChild);
}
while (tabla.firstChild) {
    tabla.removeChild(tabla.firstChild);
}
// let id=document.querySelector(".container .change #datos");
// console.log(memoria)   
// Recorre la matriz y crea filas y celdas
for (var i = 0; i < reg; i++) {
    var fila = document.createElement("tr");

    for (var j = 0; j < cubetas; j++) {
        var celda = document.createElement("td");
        celda.textContent = memoria[j][i]; // Intercambia j e i
        fila.appendChild(celda);
    }

    tabla.appendChild(fila);
}

// Agrega la tabla al contenedor
tablaContainer.appendChild(tabla);

    }else{
        regocupados++;
        let id=document.querySelector(".container .change #datos");
        id=parseInt(id.value);
        ingresos.push(id);
        ingresar(id);
        // console.log(ingresos);

        // ubicacion=parseInt(hashmodfunc(id));
        // // console.log(memoria);
        // let fl=true;
        // for (let index = 0; index < reg; index++) {
        //     // console.log(ubicacion);
        //     if(memoria[ubicacion][index]==undefined){
        //         memoria[ubicacion][index]=id;
        //         fl=false;
        //         break;
        //     }
            
        // }
        // if(fl){
        //     // console.log(id);
        //     colision.push(id);
        // }
        //la condicion es que sea mayor o igual al numero especificado
        // console.log((regocupados/(reg*cubetas)));
        // console.log(ampliamineto);
        if((regocupados/(reg*cubetas))>ampliamineto){
            if(mitad==0){
                let auxmitad=parseInt(cubetas/2);
                doble=cubetas;
                memoria = new Array(cubetas+auxmitad);
                cubetas=cubetas+auxmitad;

                for (var i = 0; i < cubetas; i++) {
                        memoria[i] = new Array(reg);
                    }
                
                for (let index = 0; index < ingresos.length; index++) {
                    const element = ingresos[index];
                    ingresar(element);
                }
                mitad=1
            }else{
                memoria = new Array(doble*2);
                cubetas=doble*2;
                for (var i = 0; i < cubetas; i++) {
                        memoria[i] = new Array(reg);
                    }
                for (let index = 0; index < ingresos.length; index++) {
                        const element = ingresos[index];
                        ingresar(element);
                }
                mitad=0
            }
        }
        
    

        while (tablaContainer.firstChild) {
            tablaContainer.removeChild(tablaContainer.firstChild);
        }
        while (tabla.firstChild) {
            tabla.removeChild(tabla.firstChild);
        }
   
      // Recorre la matriz y crea filas y celdas
      for (var i = 0; i < reg; i++) {
        var fila = document.createElement("tr");
    
        for (var j = 0; j < cubetas; j++) {
            var celda = document.createElement("td");
            celda.textContent = memoria[j][i]; // Intercambia j e i
            fila.appendChild(celda);
        }
    
        tabla.appendChild(fila);
    }
    // Agrega la tabla al contenedor
    tablaContainer.appendChild(tabla);
    
    //  tablaContainer.innerHTML+="COLISIONES: ";
    //  for (let index = 0; index < colisiones.length; index++) {
    //     tablaContainer.innerHTML+=`${colisiones[i]}`;
    //  }
    }
    
  
 
});
