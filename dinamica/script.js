let cubetas = 0;
let registros = 0;
let ampliamineto = 0.0;
let reduccion = 0.0;
let doble = 0;
let mitad = 0;
let tipo = "";
let estructura;

const ingresos = [];
const colisiones = [];

function actualizarTabla() {
    const tabla = document.createElement("table");
    for (let i = 0; i < registros; i++) {
        const fila = document.createElement("tr");
        for (let j = 0; j < cubetas; j++) {
            const celda = document.createElement("td");
            celda.className = "fila";
            celda.style.height = "5vh";
            celda.style.width = "5vh";
            celda.style.border = "2px dashed white";
            celda.textContent = estructura[j][i];
            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }
    const tablaAnterior = document.querySelector("#tabla-arr");
    tablaAnterior.innerHTML = "";
    tablaAnterior.appendChild(tabla);
}

function iniciar() {
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

function ingresar(key = null) {
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
    if (huboColision)
        colisiones.push(key);
    if (!ingresos.includes(key))
        ingresos.push(key);
    actualizarTabla();
    rectificarDensidadOcupacion();
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
    if (((ingresos.length + colisiones.length) / (registros * cubetas)) > ampliamineto) {
        if (mitad === 0 && tipo === "Parcial") {
            let auxmitad = parseInt(cubetas / 2);
            doble = cubetas;
            estructura = new Array(cubetas + auxmitad);
            cubetas = cubetas + auxmitad;
            for (let i = 0; i < cubetas; i++)
                estructura[i] = new Array(registros);
            for (let j = 0; j < ingresos.length; j++) {
                const element = ingresos[j];
                ingresar(element);
            };
            mitad = 1;
        } else {
            estructura = new Array(doble * 2);
            cubetas = doble * 2;
            for (var i = 0; i < cubetas; i++)
                estructura[i] = new Array(registros);
            for (let index = 0; index < ingresos.length; index++) {
                const element = ingresos[index];
                ingresar(element);
            };
            mitad = 0;
        };
    } else if (((ingresos.length + colisiones.length) / cubetas) > reduccion) {
        if (mitad === 0 && tipo === "Parcial") {
            estructura = new Array(doble);
            cubetas = doble;
            for (let i = 0; i < cubetas; i++)
                estructura[i] = new Array(registros);
            for (let j = 0; j < ingresos.length; j++) {
                const element = ingresos[j];
                ingresar(element);
            };
            mitad = 1;
        } else {
            estructura = new Array(doble / 2);
            cubetas = doble / 2;
            for (var i = 0; i < cubetas; i++)
                estructura[i] = new Array(registros);
            for (let index = 0; index < ingresos.length; index++) {
                const element = ingresos[index];
                ingresar(element);
            };
            mitad = 0;
        };
    };
};