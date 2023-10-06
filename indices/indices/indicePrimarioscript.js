let cantidadreg=document.querySelector(".content #cantreg");
let longitudreg=document.querySelector(".content #longreg");
let longitudinx=document.querySelector(".content #longind");
let capacidadxbloq=document.querySelector(".content #capbloq");

let btnenv=document.querySelector("#enviardatos");

let memoria=[];
let index=[];

// let ingresos = [];
// let registros = 0;

function obtenerBloque(bloques,registros,ubicacion){
    aux=0;
    for (let i = 1; i <= (bloques); i++) {
        if((ubicacion-1)>=aux && (ubicacion-1)<=(registros*i) ){
            inde=i;
        }
        aux=registros*i;
    }
    return inde-1;
}

function ingresar(key = null,element=null) {
    //aca se obtienen los datos
    if (!key)
        key = parseFloat(document.querySelector("#i-ach").value);
    if (!element)
        element = document.querySelector("#elemento").value;
    const hash = document.querySelector("#hash-opt").value;
    let ubicacion;
    switch (hash.toString()) {
        case "Cuadrado":
            ubicacion = hashCuadrado(key, ((numerobloqinx)*(numeroregindxbloq)));
            break;
        case "Plegamiento":
            ubicacion = hashPleg(key, ((numerobloqinx)*(numeroregindxbloq)));
            break;
        case "Truncamiento":
            let posiciones = [];
            for (let i = 1; i <= key.toString().length; i += 2)
                posiciones.push(i);
            ubicacion = hashTruc(key, posiciones);
            break;
        default:
            ubicacion = hashMod(key, ((numerobloqinx)*(numeroregindxbloq)));
            break;
    }
    let huboColision = true;
    let flag=true;
///aca el index del bloque
    let auxposcion=0;
    ind=obtenerBloque(numerobloqinx,numeroregindxbloq,ubicacion);
    // console.log(ubicacion-1);
    // console.log(ind);
    if (index[ind][ubicacion - 1][0] == undefined) {
            index[ind][ubicacion - 1][0] = key;
            huboColision = false;
            while(flag){
                //aca entro a la estructura prinçipal y agrego en las posiciones correspondientes
                // console.log(((ubicacion - 1)*(ind+1))-1);
                // console.log(auxposcion);
                if(memoria[((ubicacion - 1)*(ind+1))-1][auxposcion][0]==undefined){
                    memoria[((ubicacion - 1)*(ind+1))-1][auxposcion][0]=key;
                    memoria[((ubicacion - 1)*(ind+1))-1][auxposcion][1]=element;
                    flag=false;  
                }
                if(ubicacion<numerobloq){
                    ubicacion++;
                }else{
                    ubicacion=0;
                }
                if(auxposcion<numeroregxbloq){
                    auxposcion++;  
                }else{
                    auxposcion=0;
                }
                
            }
            
           
        };
    //esto pasa si hay colision entonces busca el siguiente espacio libre
    while(huboColision){
        if(ubicacion<(numeroregindxbloq)){
         ubicacion++;   
        }else{
            ubicacion=0;
            if(ind<(numerobloqinx)){
            ind++;
            }else{
                ind=0;
            }
            
        }
        
        if (index[ind][ubicacion - 1][0] == undefined) {
            index[ind][ubicacion - 1][0] = key;
            huboColision = false;
            while(flag){
                //aca entro a la estructura prinçipal y agrego en las posiciones correspondientes
                // console.log(((ubicacion - 1)*(ind+1))-1);
                // console.log(auxposcion);
                if(memoria[((ubicacion - 1)*(ind+1))-1][auxposcion][0]==undefined){
                    memoria[((ubicacion - 1)*(ind+1))-1][auxposcion][0]=key;
                    memoria[((ubicacion - 1)*(ind+1))-1][auxposcion][1]=element;
                    flag=false;  
                }
                if(ubicacion<numerobloq){
                    ubicacion++;
                }else{
                    ubicacion=0;
                }
                if(auxposcion<numeroregxbloq){
                    auxposcion++;  
                }else{
                    auxposcion=0;
                }
                
            }
        };
    };

    // for (let i = 0; i < (numerobloq*1.05); i++) {
    //     for (let j = 0; j < numeroregxbloq; j++) {
    //         console.log(memoria[i][j][1]); 
    //     }
    // }
    // for (let i = 0; i < (numerobloqinx); i++) {
    //     for (let j = 0; j < numeroregindxbloq; j++) {
    //       console.log(index[i][j][0]); 
    //     }
    // }
}

function eliminar() {
    const key = parseFloat(document.querySelector("#i-ach").value);
    const element = document.querySelector("#elemento").value;
    const hash = document.querySelector("#hash-opt").value;

    let contador=0;
    let ubicacion;
    switch (hash.toString()) {
        case "Cuadrado":
            ubicacion = hashCuadrado(key, ((numerobloqinx)*(numeroregindxbloq)));
            break;
        case "Plegamiento":
            ubicacion = hashPleg(key, ((numerobloqinx)*(numeroregindxbloq)));
            break;
        case "Truncamiento":
            let posiciones = [];
            for (let i = 1; i <= key.toString().length; i += 2)
                posiciones.push(i);
            ubicacion = hashTruc(key, posiciones);
            break;
        default:
            ubicacion = hashMod(key, ((numerobloqinx)*(numeroregindxbloq)));
            break;
    }
    let huboColision = true;
    let flag=true;
    let find=true;
///aca el index del bloque
    ///aca el index del bloque
    let auxposcion=0;
    ind=obtenerBloque(numerobloqinx,numeroregindxbloq,ubicacion);
    // console.log(ubicacion-1);
    // console.log(ind);
    if (index[ind][ubicacion - 1][0] == key) {
            while(flag){
                //aca entro a la estructura prinçipal y agrego en las posiciones correspondientes
                // console.log(((ubicacion - 1)*(ind+1))-1);
                // console.log(auxposcion);
                // console.log(auxposcion);
                if(memoria[((ubicacion - 1)*(ind+1))-1][auxposcion][1]!=undefined){
                    
                    if(memoria[((ubicacion - 1)*(ind+1))-1][auxposcion][1]==element){
                    find=false;
                    index[ind][ubicacion - 1][0] = undefined;
                    huboColision = false;
                    memoria[((ubicacion - 1)*(ind+1))-1][auxposcion][0]=undefined;
                    memoria[((ubicacion - 1)*(ind+1))-1][auxposcion][1]=undefined;
                    flag=false;  
                    }
                    
                }
                if(ubicacion<numerobloq){
                    ubicacion++;
                    contador++;
                }else{
                    ubicacion=1;
                    contador++;
                }
                if(auxposcion<numeroregxbloq-1){
                    auxposcion++;  
                }else{
                    auxposcion=0;
                }
                if(contador>numerobloq){
                    // flag=false;
                    break;
                }
                
            }
            
           
        };
    //esto pasa si hay colision entonces busca el siguiente espacio libre
    contador=0;
    while(huboColision){
        if(ubicacion<(numeroregindxbloq)){
         ubicacion++;   
         contador++;
        }else{
            ubicacion=1;
            contador++;
            if(ind<(numerobloqinx-1)){
            ind++;
            }else{
                ind=0;
            }
            if(contador>(numeroregindxbloq)){
                huboColision=false;
                break;
            }
            
        }
        // console.log(ind);
        // console.log(ubicacion-1);
        // contador=0;

        if (index[ind][ubicacion - 1][0] == key) {
            
            while(flag){
                //aca entro a la estructura prinçipal y agrego en las posiciones correspondientes
                // console.log(((ubicacion - 1)*(ind+1))-1);
                // console.log(auxposcion);
                if(memoria[((ubicacion - 1)*(ind+1))-1][auxposcion][1]==element){
                    find=false;
                    index[ind][ubicacion - 1][0] = undefined;
                    huboColision = false;
                    memoria[((ubicacion - 1)*(ind+1))-1][auxposcion][0]=undefined;
                    memoria[((ubicacion - 1)*(ind+1))-1][auxposcion][1]=undefined;
                    flag=false;  
                }
                if(ubicacion<numerobloq){
                    ubicacion++;
                    contador++;
                }else{
                    ubicacion=1;
                    contador++;
                }
                if(auxposcion<numeroregxbloq-1){
                    auxposcion++;  
                }else{
                    auxposcion=0;
                }
                if(contador>(numerobloq)){
                    // flag=false;
                    break;
                }
                
            }
        };
    };

    // for (let i = 0; i < (numerobloq*1.05); i++) {
    //     for (let j = 0; j < numeroregxbloq; j++) {
    //         console.log(memoria[i][j][1]); 
    //     }
    // }
    // console.log("aaaaa");
    // for (let i = 0; i < (numerobloqinx); i++) {
    //     for (let j = 0; j < numeroregindxbloq; j++) {
    //       console.log(index[i][j][0]); 
    //     }
    // }
    if(flag){
        console.log("elemento no encontrado");
    }
    
}

function buscar() {
    const key = parseFloat(document.querySelector("#i-ach").value);
    const hash = document.querySelector("#hash-opt").value;

    let contador=0;
    let ubicacion;
    switch (hash.toString()) {
        case "Cuadrado":
            ubicacion = hashCuadrado(key, ((numerobloqinx)*(numeroregindxbloq)));
            break;
        case "Plegamiento":
            ubicacion = hashPleg(key, ((numerobloqinx)*(numeroregindxbloq)));
            break;
        case "Truncamiento":
            let posiciones = [];
            for (let i = 1; i <= key.toString().length; i += 2)
                posiciones.push(i);
            ubicacion = hashTruc(key, posiciones);
            break;
        default:
            ubicacion = hashMod(key, ((numerobloqinx)*(numeroregindxbloq)));
            break;
    }
    let huboColision = true;
    let flag=true;
    let find=true;
///aca el index del bloque
    ///aca el index del bloque
    let auxposcion=0;
    ind=obtenerBloque(numerobloqinx,numeroregindxbloq,ubicacion);
    // console.log(ubicacion-1);
    // console.log(ind);
    if (index[ind][ubicacion - 1][0] == key) {
        console.log(memoria[((ubicacion - 1)*(ind+1))-1][auxposcion][1]);
        }else{
           console.log("no encontrado"); 
        }
    
    };

btnenv.addEventListener("click",()=>{
    //recibe los valores
    cantidadreg=parseInt(cantidadreg.value);
    longitudreg=parseInt(longitudreg.value);
    longitudinx=parseInt(longitudinx.value);
    capacidadxbloq=parseInt(capacidadxbloq.value);
    // cantidadreg=250000;
    // longitudreg=150;
    // longitudinx=15;
    // capacidadxbloq=8192;


//estructura principal datos

    //numero de registros x bloque en la estructura principal
    numeroregxbloq=Math.floor((capacidadxbloq)/(longitudreg));
    // console.log(numeroregxbloq);

    //numero de bloques en la estructura principal    
    numerobloq=Math.ceil((cantidadreg)/(numeroregxbloq));
    // console.log(numerobloq);

//estructura indice datos

    //numero de registros indices x bloque
    numeroregindxbloq=Math.floor((capacidadxbloq)/(longitudinx));
    // console.log(numeroregindxbloq);

    //numero de bloques en la estructura indices
    numerobloqinx=Math.ceil((numerobloq)/(numeroregindxbloq));
    // console.log(numerobloqinx);


//estructura principal
    //se crea la estructura con mas espacio de los registros por que no siempre va a se exacto
    //se crean los bloques y en los bloques se agrega la cantidad de registros x bloque
    //memoria[1][54][0] es la llave
    //memoria [1][54][1] es el dato
    for (let i = 0; i < (numerobloq*1.05); i++) {
        memoria.push([]);
        for (let j = 0; j < numeroregxbloq; j++) {
           memoria[i].push([]);
        // memoria[i]=new Array(2);
        }
    }

    // memoria[4630][53].push(4630);
    // memoria[4630][53].push(20);
    // console.log(memoria[4630][53][0]);

    // console.log(numeroregxbloq);

//estructura indice primario

//se crea la estructura indices con la misma cantidad de bloques
//index[4630][0] es la valor ref
//index[4630][1] es la key
for (let i = 0; i < (numerobloqinx); i++) {
    index.push([]);
    for (let j = 0; j < numeroregindxbloq; j++) {
       index[i].push([]);
    // index[i]=new Array(2);
    }
}
// console.log(index[1][2][0]);
// console.log(hashCuadrado(2,10));
    // console.log(cantidadreg);
    // console.log(longitudreg);
    // console.log(longitudinx);
    // console.log(capacidadxbloq);

});