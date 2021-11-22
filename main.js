 //1. Esta function retorna el 'value' ingresado en el <input>, es decir el valor del Prestamo Solicitado. Se setea el local storage
function prestamo() {
    montoPrestamo = parseInt(document.getElementById("prestamo").value);
    localStorage.setItem('montoPrestamo', montoPrestamo);
    return montoPrestamo;
}

//2. Esta function retorna el 'value' ingresado en el <select>, es decir el valor de cuantas cuotas elige.
function CantCuotas() {
    let cantidadCuotas = parseInt(document.getElementById("cantCuotas").value);
    localStorage.setItem('cantidadCuotas', cantidadCuotas);
    return cantidadCuotas;
}

//3. Esta function retorna el 'value' ingresado en el <select>, es decir el valor de Tipo de Cuota (18% o 25% de interés)
function tipoCuota() {
    let tipoCuota = parseFloat(document.getElementById("tipoCuota").value);
    localStorage.setItem('tipoCuota', tipoCuota);
    return tipoCuota;
}


// esta funcion se ejecuta al presionar el boton Limpiar, sirve para limpiar los inputs y el LocalStorage
function limpiarInputs() {
    let elementoMonto = document.getElementById('prestamo');
    let cantidadCuotas = document.getElementById("cantCuotas");
    let tipoDeCuota = document.getElementById("tipoCuota");
    elementoMonto.value = "";
    cantidadCuotas.value = "";
    tipoDeCuota.value = "";

    //eliminamos la info que teniamos guardados en el LOCAL STORAGE
    localStorage.removeItem('montoPrestamo');
    localStorage.removeItem('cantidadCuotas');
    localStorage.removeItem('tipoCuota');
    while(ImprimirTabla.firstChild) {
        ImprimirTabla.removeChild(ImprimirTabla.firstChild);
       }

    while(divExportBtn.firstChild) {
        divExportBtn.removeChild(divExportBtn.firstChild);
        console.log('estoy ejecutandome y eliminando el boton de exportar cronograma =D');
       }
  }


//elementos de DOM//

const btnCalcular = document.querySelector('.btnCalcular');
const btnLimpiar = document.querySelector('.btnLimpiar');
const ImprimirTabla =   document.querySelector(".table-cronograma");
const divExportBtn = document.querySelector('.div-btn');

//al escuchar el evento 'click' se calcula la simulacion del prestamo
btnCalcular.addEventListener('click', () => {
    let elementoMonto = document.getElementById('prestamo');
    let cantidadCuotas = document.getElementById("cantCuotas").value;
    let tipoDeCuota = document.getElementById("tipoCuota").value;

    if((elementoMonto.value >= 3000) && (!isNaN(cantidadCuotas)) && (!isNaN(tipoDeCuota))) {
        calcularCronograma(prestamo(), tipoCuota(), CantCuotas());
        console.log(elementoMonto.value);
    }
    else {
        alert("Favor completa correctamente los datos!");
    }  
});

//al escuchar el evento 'click' se limpian los inputs

btnLimpiar.addEventListener('click', () => {
    limpiarInputs();
    console.log('limpiando el formulario');
});

function calcularCronograma(monto, interes, tiempo) {
//este bucle  sirve para limpiar la tabla cronograma
         while(ImprimirTabla.firstChild) {
         ImprimirTabla.removeChild(ImprimirTabla.firstChild);
        }

    let fecha = [];
    let fechaActual = Date.now();
    //hacemos uso de la libreria MomentJS, para el manejo de Fechas
    let mes_actual = moment(fechaActual);
    mes_actual.add(1, 'month');
    let pagoInteres = 0, pagoCapital = 0, cuota = 0;

    //Se hace uso del metodo de amortización frances para calcular la cuota
    cuota = monto * (Math.pow(1 + interes/100, tiempo)*interes/100)/(Math.pow(1 +interes/100, tiempo) - 1);
    console.log(ImprimirTabla);

    //usamos un bucle for para iterar los valores de cada mes del cronograma de pagos
    for(let i = 1; i <=  tiempo; i++) {
        pagoInteres = parseFloat(monto*(interes/100));
        pagoCapital = cuota - pagoInteres;
        monto = parseFloat(monto - pagoCapital);

        fecha[i] = mes_actual.format('DD-MM-YYYY');
        mes_actual.add(1, 'month');

        const row = document.createElement('tr');
        
        row.innerHTML =  `
                        <td>${fecha[i]}</td>
                        <td>${cuota.toFixed(2)}</td>
                        <td>${pagoCapital.toFixed(2)}</td>
                        <td>${pagoInteres.toFixed(2)}</td>
                        <td>${monto.toFixed(2)}</td>
                         `;
        ImprimirTabla.appendChild(row);
    }
//llamando a la funcion
    addBtnExport();
}

function validar() {
    if($('#prestamo').val().length == 0) {
        alert('No completaste este dato');
        return false;
    }
}
//Añadiendo JQUERY

// 1. Se crea el btn para exportar el cronograma de pagos del credito
function addBtnExport() {
    
    var button = '<button type="button" class="btn btn-danger btn-lg mt-2 btnCalcular fw-bold createPDF" id="createPDF">Exportar Cronograma</button>';
    $('.div-btn').append(button);
    console.log('existe un primer hijo');

}

// 2. el Boton escucha el evento click y ejecuta la funcion createPDF()

const botonPDF = document.querySelector('.div-btn');

if(botonPDF) {
    botonPDF.addEventListener("click", () => {
        console.log('estoy funcionando');
        createPDF();
    });
}
else {
    console.log(' no estoy funcionando');
}


// function createPDF(), funcion que genera el dcto .pdf para exportar o imprimir

function createPDF() {
    var sTable = document.getElementById('table-cronograma').innerHTML;
    var detail = `<table>            
                <tr>
                    <td>Prestamo solicitado:</td>
                    <td>${prestamo()}</td>
                </tr>
                <tr>
                    <td>Cantidad de Cuotas:</td>
                    <td>${CantCuotas()}</td>
                </tr>
                <tr>
                    <td>Tipo de Cuota:</td>
                    <td>${tipoCuota()}</td>
                </tr>
            </table>`

    var style = `<style>
                    table {width: 100%;font: 17px Calibri;}
                    table, th, td, tr {border: solid 1px #DDD; border-collapse: collapse;
                    padding: 2px 3px;text-align: center;}    
                </style>`;


    // CREATE A WINDOW OBJECT.
    var win = window.open('', '', 'height=700,width=700');

    win.document.write('<html><head>');
    win.document.write('<title>Simulacion de Tu Préstamo</title>');   // <title> FOR PDF HEADER.
    win.document.write(style);          // ADD STYLE INSIDE THE HEAD TAG.
    win.document.write('</head>');
    win.document.write('<body>');
    win.document.write('<br>');
    win.document.write('<br>');
    win.document.write(detail);
    win.document.write('<br>'); 
    win.document.write('<br>'); 
    win.document.write('<br>');    
    win.document.write(sTable);         // THE TABLE CONTENTS INSIDE THE BODY TAG.
    win.document.write('</body></html>');

    win.document.close(); 	// CLOSE THE CURRENT WINDOW.

    win.print();    // PRINT THE CONTENTS.
}
