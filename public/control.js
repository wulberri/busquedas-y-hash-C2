
function control(){

    let arreglo = false;
    let digsTam = false;
    let htmlElements = {}
    let pasosInterval = false;

    let filaHeadTemplate = `<div class="fila head">
        <div class="col-i">i</div>
        <div class="col-k">Clave</div>
    </div>`
    const filaTemplate = (indice,valor) =>
        `<div class="col-i">${indice}</div>
        <div class="col-k">
            <input class="i-numero2" value='${valor}' type="text">
            <button class="btn-eliminar">Eliminar</button>
        </div>`

    inicializarEventos();
    
    function formatoEnTabla(valor){
        let str = '0'.repeat(digsTam)+valor
        return str.substring(str.length-digsTam)
    }


    function inicializarEventos(){
        htmlElements.nInput = document.querySelector('#i-n');
        htmlElements.inputAddClave = document.querySelector('#i-ac');
        htmlElements.tablarArr = document.querySelector('#tabla-arr');
        htmlElements.hashOpt = document.querySelector('#hash-opt');
        htmlElements.inputHash = document.querySelector('#i-ach');
        htmlElements.busqOpt = document.querySelector('#busq-opt');
        htmlElements.inputBusq = document.querySelector('#i-busq');
        htmlElements.checkboxVerPasos = document.querySelector('#cb-verP');
        htmlElements.inputTiempo = document.querySelector('#i-t');
        htmlElements.avisos = document.querySelector('#avisos');
        document.querySelector('#btn-iniciar-arr').addEventListener('click', eventIniciarArr);
        document.querySelector('#btn-rellenar').addEventListener('click', eventRellenar);
        document.querySelector('#btn-agregar-clave').addEventListener('click', eventAgregarClave);
        document.querySelector('#btn-agrega-clave-hash').addEventListener('click', eventAgregarHash);
        document.querySelector('#btn-buscar').addEventListener('click', eventBusqueda);
    }

    function eventIniciarArr(){
        let n = parseInt(htmlElements.nInput.value);
        if(n <= 0){
            throw 'n invalido'
        }
        arreglo = new Arreglo(n);
        digsTam = n.toString().length;
        dibujarArreglo();
    }

    function eventRellenar(){
        if(typeof(arreglo) == 'object'){
            for(let i=0; i<arreglo.tam; i++){
                arreglo.array[i] = i+1;
            }
            dibujarArreglo();
        }
    }

    function eventAgregarClave(){
        if(arreglo){
            try{
                let valor = parseInt(htmlElements.inputAddClave.value);
                if(isNaN(valor)){
                    throw 'Clave invalida';
                }
                htmlElements.inputsTabla[arreglo.add(valor)].value = formatoEnTabla(valor);
            }
            catch(e){
                htmlElements.avisos.textContent = "ERROR: "+e;
            }
        }
    }

    function eventAgregarHash(){
        let opt = parseInt(htmlElements.hashOpt.selectedOptions[0].value);
        let clave = parseInt(htmlElements.inputHash.value);
        let hash;
        switch (opt) {
            case 1:
                hash = hashMod(clave, arreglo.tam);
                break;
                case 2:
                    hash = hashCuadrado(clave, arreglo.tam);
                break;
                case 3:
                    hash = hashPleg(clave, arreglo.tam);
                    break;
                    case 4:
                        let posiciones = [];
                        for(let i=1; i<=digsTam; i+=2){
                            posiciones.push(i);
                }
                hash = hashTruc(clave,posiciones);
                break;
                
                default:
                    break;
                }
        try{
            arreglo.sset(hash, clave);
            htmlElements.inputsTabla[hash-1].value = clave;
            htmlElements.avisos.textContent = "Clave agregada en el indice: "+hash;
        }
        catch(e){
            htmlElements.avisos.textContent = "ERROR: "+e;
        }
    }
    
    function eventBusqueda(){
        let clave = parseInt(htmlElements.inputBusq.value)
        let opt = parseInt(htmlElements.busqOpt.selectedOptions[0].value);
        let pasos = htmlElements.checkboxVerPasos.checked;
        let t = parseFloat(htmlElements.inputTiempo.value);
        arreglo.array = arreglo.array.filter((e)=>!!e)
        
        if(pasos){
            clearInterval(pasosInterval);
            let tiempo = t*1000;
            let paso = false;
            let filaAnt, fila;
            if(opt == 2){
                arreglo.array = arreglo.array.sort((a,b)=>a-b)
            }
            pasosInterval = setInterval(()=>{
                if(opt == 1){
                    paso = paso ? paso.next() : arreglo.busquedaSecuencialG(clave);
                }
                else {
                    paso = paso ? paso.next() : arreglo.busquedaBinariaG(clave);
                }
                if(paso.completado){
                    if(paso.valor != -1){
                        htmlElements.avisos.textContent = 'Clave encontrada en la posición: '+paso.valor;
                    }
                    else {
                        htmlElements.avisos.textContent = 'Clave NO encontrada';
                    }
                    clearInterval(pasosInterval);
                }
                filaAnt = fila;
                fila = htmlElements.inputsTabla[paso.valor-1].parentElement.parentElement;
                fila.classList.add('activa');
                setTimeout(()=>fila.classList.remove('activa'), 1000)
                if(filaAnt){
                    filaAnt.classList.remove('activa');
                }
            }, tiempo);
        }
        else {
            let indice;
            if(opt == 1){
                indice = arreglo.busquedaSecuencial(clave);
            }
            else {
                arreglo.array = arreglo.array.sort((a,b)=>a-b)
                indice = arreglo.busquedaBinaria(clave);
            }
            if(indice != -1){
                htmlElements.avisos.textContent = 'Clave encontrada en la posición: '+indice;
            }
            else {
                htmlElements.avisos.textContent = 'Clave NO encontrada';
            }
        }
        dibujarArreglo();
    }

    function dibujarArreglo(){
        htmlElements.tablarArr.innerHTML = filaHeadTemplate;
        htmlElements.inputsTabla = []
        let largoTam = arreglo.tam.toString().length
        for(let i=0; i<arreglo.tam; i++){
            let elem = arreglo.array[i];
            let valor;
            if(elem == 0 || elem == undefined){
                valor = '';
            }
            else {
                valor = formatoEnTabla(elem);
            }
            let fila = document.createElement('div');
            fila.classList.add('fila');
            fila.innerHTML = filaTemplate(i+1, valor.substring(valor.length-largoTam));
            let inputFila = fila.querySelector('.i-numero2');
            inputFila.addEventListener('input', ()=>{actualizarPosArr(i)});
            htmlElements.inputsTabla.push(inputFila);
            fila.querySelector('.btn-eliminar').addEventListener('click', ()=>{eliminarPosArr(i)});
            htmlElements.tablarArr.appendChild(fila);
        };
    }

    function actualizarPosArr(ind){
        let valor = parseInt(htmlElements.inputsTabla[ind].value);
        arreglo.array[ind] = valor;
    }
    
    function eliminarPosArr(ind){
        htmlElements.inputsTabla[ind].value = '';
        arreglo.array[ind] = undefined;

    }
}

window.addEventListener('load', () => {
    control();
})
