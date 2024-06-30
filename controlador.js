// IMPORTS



let cronometros = []; //Arreglo para guardar los cronometos.
let valorHhIngresado = "";
let valorMmIngresado = "";
let valorSsIngresado = "";


// Instrucciones que crea función para obtener los valores de la hora que se consegue a tráves de los métodos (getHours, getMinutes, getSeconds) de la función Date. Que se invoca en la inialización de la variable date.
function horaActual() {
  let date = new Date();
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();

  // Formato de valores de tiempo para que siempre se presenten con dos dígitos. 

  // Añadir un "0" delante de hh si es menor que 10, de lo contrario mantener hh tal cual
  hh = hh < 10 ? "0" + hh : hh;
  
  // Añadir un "0" delante de mm si es menor que 10, de lo contrario mantener hh tal cual
  mm = mm < 10 ? "0" + mm : mm;
  
  // Añadir un "0" delante de ss si es menor que 10, de lo contrario mantener hh tal cual
  ss = ss < 10 ? "0" + ss : ss;
  
  // Concatenar hh, mm y ss con ":" en el medio para formar el tiempo en formato hh:mm:ss
  let tiempo = hh + ":" + mm + ":" + ss;

  let watch = document.querySelector("#watch");
  watch.innerHTML = tiempo;
}

// Instrucciones para agregar una función que permita agregar los valores de los botónes del cronómetro y los muestre en los inputs (HH, MM, SS).
function agregarCronometroInputs(value) {
  // Crear instrucción para condicionar si el botón 'Borrar' es oprimido.
  if (value === "Borrar") {
    valorHhIngresado = "";
    valorMmIngresado = "";
    valorSsIngresado = "";
  } else {
    // Agregar valores seleccionados a la cadena que le corresponde. Sólo dos dígitos permitidos.
    if (valorHhIngresado.length < 2) {
      valorHhIngresado = valorHhIngresado + value;5
    }
    if (valorMmIngresado.length < 2) {
      valorMmIngresado = valorMmIngresado + value;
    }
    if (valorSsIngresado.length < 2) {
      valorSsIngresado = valorSsIngresado + value;
    }
  }

  // Instrucciones que actualizan el campo de entrada con los valores ingresado por medio de los botones.
  document.querySelector("#displayNuevaHH").value = valorHhIngresado;
  document.querySelector("#displayNuevoMM").value = valorMmIngresado;
  document.querySelector("#displayNuevoSS").value = valorSsIngresado;
}

// Instrucciones para validar sí los inputs están vacios.
function validarInputs() {
  return (
    valorHhIngresado.length === 2 &&
    valorMmIngresado.length === 2 &&
    valorSsIngresado.length === 2
  );
}

// Instrucciones para crear función que agrega un nuevo crónometro.
function agregarCronometro() {
  
  if(!validarInputs()){
    alert("Por favor ingrese un valor válido para HH, MM, SS.");
    return;
  }

  let nuevoCronometro = {
    horas: parseInt(valorHhIngresado, 10),
    minutos: parseInt(valorMmIngresado, 10),
    segundos: parseInt(valorSsIngresado, 10),
    enEjecucion: true
  };

  // Agregar el nuevo crónmetro al arreglo.
  cronometros.push(nuevoCronometro);
  valorHhIngresado = "";
  valorMmIngresado = "";
  valorSsIngresado = "";

  document.querySelector("#displayNuevaHH").value = "";
  document.querySelector("#displayNuevoMM").value = "";
  document.querySelector("#displayNuevoSS").value = "";

  // Actualizar los inputs del HTML con el tiempo del nuevo cronómetro.
  actualizarDisplayCronometros();
}

// Instrucciones para actualizar el dato que se ve en los campos de los inputs HH, MM, SS.
function actualizarDisplayCronometros() {
  
  //
  let contenedor = document.querySelector("#cronometros-contenedor");
  contenedor.innerHTML = "";

 /* if (cronometros.length > 0) {
    //Mostrar el último cronómetro agregado en los inputs
    
    let ultimoCronometro = cronometros[cronometros.length - 1];

    document.querySelector("#displayNuevaHH").value =
      (ultimoCronometro.horas < 10 ? "0" : "") + ultimoCronometro.horas;
    document.querySelector("#displayNuevoMM").value =
      (ultimoCronometro.minutos < 10 ? "0" : "") + ultimoCronometro.minutos;
    document.querySelector("#displayNuevoSS").value =
      (ultimoCronometro.segundos < 10 ? "0" : "") + ultimoCronometro.segundos;
  }
 */
  // Instrucción para crear un ciclo que itere sobre cada elemento en el arreglo "cronometros", "cronometro" representa cada objeto del arreglo, index representa el indice de cada objeto del arreglo.
  cronometros.forEach((cronometro, index) =>{

    // Crear un elemento div. 
    let cronometroDiv = document.createElement("div");

    // Añadir clase cronometro al elemento div.
    cronometroDiv.className = "cronometro";

    // Agregar CSS para el color del texto.
    cronometroDiv.style.color = "black";

    // Añadir margen inferior para separar los cronómetros
    cronometroDiv.style.marginBottom = "10px";

    // Utilizar interpolación de cadenas (template literals) para construir la cadena de texto:
    cronometroDiv.innerHTML = `Cronómetro ${index + 1}: ${cronometro.horas < 10 ? "0": ""} ${cronometro.horas}:${cronometro.minutos < 10 ? "0": ""}${cronometro.minutos}:${cronometro.segundos < 10 ? "0": ""}${cronometro.segundos}`;
    
    // Agregar el div recién creado y configurado al elemento contenedor especificado en el HTML (contenedor). Este es un contenedor general donde todos los cronómetros serán mostrados.
    contenedor.appendChild(cronometroDiv);
  });

}

// Instrucción para actualizar el valor de los elementos de arreglo Cronómetros.
function actualizarCronometros() {

  cronometros.forEach((cronometro) =>{
    if(cronometro.enEjecucion){
      cronometro.segundos--;
      if(cronometro.segundos < 0){
        cronometro.segundos = 59
        cronometro.minutos--;
      }
      if(cronometro.minutos < 0){
        cronometro.minutos = 59
        cronometro.horas--;
      }
    }
    });

  actualizarDisplayCronometros();
}

// Instrucción que crea una función que detiene los crónometros. 
function detenerCronometro(){
  cronometros.forEach((cronometros) =>{
    cronometros.enEjecucion = false;
  });
}

// Instrucción que crea una función que reanuda los cronómetros.
function reanudarCronometro(){
  cronometros.forEach((cronometros) =>{
    cronometros.enEjecucion = true;
  });
}


//Se crea un Event Listener para los botones de detener y seguir, para que cada bóton seleccionado a través de la función querySelector;
// escuche que se hace clic en los botones y ejecutan las funciones (detenerCronometro, reanudarCronometro).
document.querySelector("#btn-detener").addEventListener("click", detenerCronometro);
document.querySelector("#btn-seguir").addEventListener("click", reanudarCronometro);
//Se crea un Event listener para el botón de agregar crónometro.
document.querySelector("#btn-agregar").addEventListener("click", agregarCronometro);

// Agregar el Event Listener para que por medio de un ciclo ForEach, cada botón seleccionado a través de la función querySelector;
// escuche que se hace clic en los botones y ejecuta la función agregarCronometroInputs.
document.querySelectorAll('.bg-gray-200').forEach(button => {
  button.addEventListener("click", function () {
    agregarCronometroInputs(this.textContent.trim());
  });
});



setInterval(actualizarCronometros, 1000);
setInterval(horaActual, 1000);
