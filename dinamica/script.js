let cubetas = 0;
let registros = 0;
let ampliamineto = 0.0;
let reduccion = 0.0;
let tipo = "";
let estructura;
let ingresos = [];

const avisos = document.querySelector("#avisos");

function obtenerUbicacion(id, key) {
    const hash = document.querySelector("#hash-opt" + id).value;
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
    return ubicacion;
}

function actualizarTabla() {
    const tabla = document.createElement("table");
    let regMax = 0;
    estructura.map(cubeta => {
        if (cubeta.length > regMax) {
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
            if (i <= registros - 1) {
                console.log(i, j, estructura[j][i])
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
    if(cubetas<1 || cubetas>100){
        avisos.innerHTML = "Cubetas debe ser un número entre 1 y 100";
        return;
    }
    registros = parseInt(document.querySelector("#reg").value);
    if(registros<1 || registros>100){
        avisos.innerHTML = "Registros debe ser un número entre 1 y 100";
        return;
    }
    ampliamineto = parseFloat(document.querySelector("#porexp").value);
    if(ampliamineto<0 || ampliamineto>1){
        avisos.innerHTML = "Densidad de ocupación de expansión debe ser un número entre 0 y 1";
        return;
    }
    reduccion = parseFloat(document.querySelector("#porred").value);
    if(reduccion<0 || reduccion>1){
        avisos.innerHTML = "Densidad de ocupación de reducción debe ser un número entre 0 y 1";
        return;
    }
    tipo = document.querySelector("#hash").value.toString();

    estructura = new Array(cubetas);
    for (let i = 0; i < cubetas; i++)
        estructura[i] = new Array(registros);

    actualizarTabla();
}

function ingresar(key = null, verificando = false) {
    if (!key){
        key = parseFloat(document.querySelector("#i-ach").value);
        if(key<0 || key>1000){
            avisos.innerHTML = "La clave debe ser un número entre 0 y 1000";
            return;
        }
    }
    const ubicacion = obtenerUbicacion("", key);
    let huboColision = true;
    for (let index = 0; index < registros; index++) {
        if (estructura[ubicacion - 1][index] == undefined) {
            estructura[ubicacion - 1][index] = key;
            huboColision = false;
            break;
        };
    };
    if (huboColision) {
        estructura[ubicacion - 1].push(key);
    };
    if (!ingresos.includes(key))
        ingresos.push(key);
    actualizarTabla();
    if (!verificando)
        rectificarDensidadOcupacion();
    document.querySelector("#i-ach").focus();
    document.querySelector("#avisos").innerHTML = "Elemento insertado: " + key.toString();
}

function eliminar() {
    const key = parseFloat(document.querySelector("#i-ach-eli").value);
    if(key<0 || key>1000){
        avisos.innerHTML = "La clave debe ser un número entre 0 y 1000";
        return;
    }
    const ubicacion = obtenerUbicacion("-eli", key);
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
    document.querySelector("#avisos").innerHTML = "Elemento eliminado: " + key.toString();
}

function buscar() {
    const key = parseFloat(document.querySelector("#i-ach-bus").value);
    if(key<0 || key>1000){
        avisos.innerHTML = "La clave debe ser un número entre 0 y 1000";
        return;
    }
    const ubicacion = obtenerUbicacion("-bus", key);
    let elemento;
    for (let index = 0; index < registros; index++) {
        if (estructura[ubicacion - 1][index] == key) {
            elemento = key;
            break;
        };
    };
    if (elemento) {
        document.querySelector("#avisos").innerHTML = "Elemento encontrado: " + key.toString();
    } else {
        document.querySelector("#avisos").innerHTML = "Elemento "+key.toString()+" no encontrado";
    };
}

function rellenarEstructura() {
    estructura = new Array(cubetas);
    for (let i = 0; i < cubetas; i++)
        estructura[i] = new Array(registros);
    for (let j = 0; j < ingresos.length; j++) {
        const element = ingresos[j];
        ingresar(element, true);
    };
}

function rectificarDensidadOcupacion() {
    const numRegsOcup = ingresos.length;
    const disponibles = registros * cubetas;
    if (numRegsOcup / disponibles >= ampliamineto) {
        if (tipo === "Parcial") {
            const auxmitad = parseInt(cubetas / 2);
            cubetas = cubetas + auxmitad;
        } else {
            cubetas = cubetas * 2;
        };
        rellenarEstructura();
    } else if (numRegsOcup / cubetas >= reduccion) {
        if (nuevasCubetas <= 1) {
            return
        }
        if (tipo === "Parcial") {
            const nuevasCubetas = parseInt(cubetas * 0.75);
            cubetas = nuevasCubetas;
        } else {
            let nuevasCubetas = cubetas / 2;
            cubetas = nuevasCubetas;
        };
        rellenarEstructura();
    };
};