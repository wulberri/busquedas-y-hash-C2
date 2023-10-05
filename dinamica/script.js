let cubetas = 0;
let registros = 0;
let ampliamineto = 0.0;
let reduccion = 0.0;
let doble = 0;
let mitad = 0;
let tipo = "";
let estructura;

let ingresos = [];
const colisiones = [];

function actualizarTabla() {
    const tabla = document.createElement("table");
    let regMax = 0;
    estructura.map(cubeta => {
        if(cubeta.length > regMax){
            regMax = cubeta.length;
        }
        return cubeta;
    })
    for (let i = 0; i < regMax; i++) {
        const fila = document.createElement("tr");
        for (let j = 0; j < cubetas; j++) {
            const celda = document.createElement("td");
            celda.style.height = "5vh";
            celda.style.width = "5vh";
            celda.className = "fila";
            if(i <= registros-1){
                console.log(i,j, estructura[j][i])
                celda.style.border = "2px dashed white";
            }
            celda.textContent = estructura[j][i] != undefined ? estructura[j][i] : '';
            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }
    const tablaAnterior = document.querySelector("#tabla-arr");
    tablaAnterior.innerHTML = "";
    tablaAnterior.appendChild(tabla);
}

function iniciar() {
    ingresos = []
    cubetas = parseInt(document.querySelector("#cubetas").value);
    doble = cubetas;
    registros = parseInt(document.querySelector("#reg").value);
    ampliamineto = parseFloat(document.querySelector("#porexp").value);
    reduccion = parseFloat(document.querySelector("#porred").value);
    tipo = document.querySelector("#hash").value.toString();

    estructura = new Array(cubetas);
    for (let i = 0; i < cubetas; i++)
        estructura[i] = new Array(registros);

    actualizarTabla();
}

function ingresar(key = null, verificando = false) {
    if (!key)
        key = parseFloat(document.querySelector("#i-ach").value);
    const hash = document.querySelector("#hash-opt").value;
    let ubicacion;
    switch (hash.toString()) {
        case "Cuadrado":
            ubicacion = hashCuadrado(key, cubetas);
            break;
        case "Plegamiento":
            ubicacion = hashPleg(key, cubetas);
            break;
        case "Truncamiento":
            let posiciones = [];
            for (let i = 1; i <= key.toString().length; i += 2)
                posiciones.push(i);
            ubicacion = hashTruc(key, posiciones);
            break;
        default:
            ubicacion = hashMod(key, cubetas);
            break;
    }
    let huboColision = true;
    for (let index = 0; index < registros; index++) {
        if (estructura[ubicacion - 1][index] == undefined) {
            estructura[ubicacion - 1][index] = key;
            huboColision = false;
            break;
        };
    };
    if (huboColision){
        // colisiones.push(key);
        estructura[ubicacion-1].push(key);
    };
    if (!ingresos.includes(key))
        ingresos.push(key);
    actualizarTabla();
    if(!verificando){
        rectificarDensidadOcupacion();
    };
    document.querySelector("#i-ach").focus();
}

function eliminar() {
    const key = parseFloat(document.querySelector("#i-ach-eli").value);
    const hash = document.querySelector("#hash-opt-eli").value;
    let ubicacion;
    switch (hash.toString()) {
        case "Cuadrado":
            ubicacion = hashCuadrado(key, cubetas);
            break;
        case "Plegamiento":
            ubicacion = hashPleg(key, cubetas);
            break;
        case "Truncamiento":
            let posiciones = [];
            for (let i = 1; i <= key.toString().length; i += 2)
                posiciones.push(i);
            ubicacion = hashTruc(key, posiciones);
            break;
        default:
            ubicacion = hashMod(key, cubetas);
            break;
    }
    for (let index = 0; index < registros; index++) {
        if (estructura[ubicacion - 1][index] == key) {
            estructura[ubicacion - 1][index] = undefined;
            break;
        };
    };
    if (ingresos.includes(key))
        ingresos.splice(ingresos.indexOf(key), 1);
    actualizarTabla();
    rectificarDensidadOcupacion();
}

function buscar() {
    const key = parseFloat(document.querySelector("#i-ach-bus").value);
    const hash = document.querySelector("#hash-opt-bus").value;
    let ubicacion;
    switch (hash.toString()) {
        case "Cuadrado":
            ubicacion = hashCuadrado(key, cubetas);
            break;
        case "Plegamiento":
            ubicacion = hashPleg(key, cubetas);
            break;
        case "Truncamiento":
            let posiciones = [];
            for (let i = 1; i <= key.toString().length; i += 2)
                posiciones.push(i);
            ubicacion = hashTruc(key, posiciones);
            break;
        default:
            ubicacion = hashMod(key, cubetas);
            break;
    }
    let elemento;
    for (let index = 0; index < registros; index++) {
        if (estructura[ubicacion - 1][index] == key) {
            elemento = key;
            break;
        };
    };
    if(elemento){
        document.querySelector("#elemento-encontrado").innerHTML = "Elemento encontrado: "+key.toString();
    } else {
        document.querySelector("#elemento-encontrado").innerHTML = "Elemento no encontrado";
    };
}

function rectificarDensidadOcupacion() {
    let numRegsOcup = ingresos.length;
    let disponibles = registros * cubetas;
    if (numRegsOcup / disponibles >= ampliamineto) {
        // if (mitad === 0 && tipo === "Parcial") {
        if (tipo === "Parcial") {
            let auxmitad = parseInt(cubetas / 2);
            doble = cubetas;
            cubetas = cubetas + auxmitad;
            estructura = new Array(cubetas);
            for (let i = 0; i < cubetas; i++)
                estructura[i] = new Array(registros);
            for (let j = 0; j < ingresos.length; j++) {
                const element = ingresos[j];
                ingresar(element, true);
            };
            mitad = 1;
        } else {
            cubetas = cubetas * 2;
            estructura = new Array(cubetas);
            for (var i = 0; i < cubetas; i++)
                estructura[i] = new Array(registros);
            for (let index = 0; index < ingresos.length; index++) {
                const element = ingresos[index];
                ingresar(element, true);
            };
            mitad = 0;
        };
    } else if (numRegsOcup/cubetas >= reduccion) {
        // if (mitad === 0 && tipo === "Parcial") {
        if (tipo === "Parcial") {
            let nuevasCubetas = parseInt(cubetas*0.75);
            if(nuevasCubetas <= 1){
                return
            }
            cubetas = nuevasCubetas;
            estructura = new Array(cubetas);
            for (let i = 0; i < cubetas; i++)
                estructura[i] = new Array(registros);
            for (let j = 0; j < ingresos.length; j++) {
                const element = ingresos[j];
                ingresar(element, true);
            };
            mitad = 1;
        } else {
            let nuevasCubetas = cubetas/2;
            if(nuevasCubetas <= 1){
                return
            }
            cubetas = nuevasCubetas;
            estructura = new Array(cubetas);
            for (var i = 0; i < cubetas; i++)
                estructura[i] = new Array(registros);
            for (let index = 0; index < ingresos.length; index++) {
                const element = ingresos[index];
                ingresar(element, true);
            };
            mitad = 0;
        };
    };
};