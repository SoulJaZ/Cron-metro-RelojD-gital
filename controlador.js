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

  let watch = document.querySelector("#watch");
  watch.innerHTML = `${hh}:${mm}:${ss}`;


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

      valorHhIngresado = valorHhIngresado + value;

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


// Intrrucciones que crea función que agrega un cronómetro al arreglo y actualiza la vista.
function agregarCronometro(horas, minutos, segundos){
  cronometros.push({horas, minutos, segundos});
  actualizarDisplayCronometros();
}


// Instrucciones para actualizar el dato que se ve en los campos de los inputs HH, MM, SS.
function actualizarDisplayCronometros() {
  
  //
  let contenedor = document.querySelector("#cronometros-contenedor");
  contenedor.innerHTML = "";

  contenedor.className = "grid grid-cols-1 gap-2";

  if (cronometros.length > 0) {
    //Mostrar el último cronómetro agregado en los inputs
    
    let ultimoCronometro = cronometros[cronometros.length - 1];

    document.querySelector("#displayNuevaHH").value =
      (ultimoCronometro.horas < 10 ? "0" : "") + ultimoCronometro.horas;
    document.querySelector("#displayNuevoMM").value =
      (ultimoCronometro.minutos < 10 ? "0" : "") + ultimoCronometro.minutos;
    document.querySelector("#displayNuevoSS").value =
      (ultimoCronometro.segundos < 10 ? "0" : "") + ultimoCronometro.segundos;
  }


  // Instrucción para crear un ciclo que itere sobre cada elemento en el arreglo "cronometros", "cronometro" representa cada objeto del arreglo, index representa el indice de cada objeto del arreglo.
  cronometros.forEach((cronometro, index) =>{

    // Crear un elemento div. 
    let cronometroDiv = document.createElement("div");

    // Añadir clase cronometro al elemento div.

    cronometroDiv.className = "cronometro text-white  py-1 px-2 rounded font-bold border-9  grid grid-cols-3 gap-1 flex items-center";

    // Agregar CSS para el color del texto.


    // Utilizar interpolación de cadenas (template literals) para construir la cadena de texto:
    let textoCronometro = `Cronómetro ${index + 1}: ${cronometro.horas < 10 ? "0": ""} ${cronometro.horas}:${cronometro.minutos < 10 ? "0": ""}${cronometro.minutos}:${cronometro.segundos < 10 ? "0": ""}${cronometro.segundos}`;
    cronometroDiv.textContent = textoCronometro;

    // Crear botón de eliminar con texto.
    /*let btnEliminarTexto = document.createElement("button");
    btnEliminarTexto.textContent = "Eliminar";
    btnEliminarTexto.className = "bg-red-800 hover:bg-red-600 text-white py-1 px-2 rounded font-bold text-xl border-9";
    btnEliminarTexto.onclick = () => eliminarCronometro(index);
    */
   
    // Crear botón de detener cronómetro.
    let btnDetener = document.createElement("button");
    btnDetener.className ="bg-yellow-500 hover:bg-yellow-300 text-white  py-2 px-5 rounded flex items-center justify-center";
    btnDetener.onclick = () => detenerCronometro(index);
  
    let DetenerSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="pause-circle" width="16" height="16">
      <path fill-rule="evenodd" d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0ZM5.5 5.5A.5.5 0 0 1 6 5h.5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5H6a.5.5 0 0 1-.5-.5v-5Zm4-.5a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h.5a.5.5 0 0 0 .5-.5v-5A.5.5 0 0 0 10 5h-.5Z" clip-rule="evenodd" />
    </svg>`;
    btnDetener.innerHTML = DetenerSVG;


    // Crear botón eliminar con icono SGV.
    let btnEliminarSVG = document.createElement("button");
    btnEliminarSVG.className = "bg-red-800 hover:bg-red-600 py-2 px-5 rounded flex items-center justify-center";
    btnEliminarSVG.onclick = () => eliminarCronometro(index);
    
    let svgIcono = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="bi bi-trash" width="16" height="16">
            <path d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z"/>
        </svg>`;
    btnEliminarSVG.innerHTML = svgIcono;
    

    // Agregar el botón configurado al elemento contenedor especificado en el HTML (contenedor). Este es un contendor general donde toodos los cronómetros serán mostrados. 
    // cronometroDiv.appendChild(btnEliminarTexto);
    cronometroDiv.appendChild(btnDetener);
    cronometroDiv.appendChild(btnEliminarSVG);
    

    // Agregar el div configurado al elemento contenedor especificado en el HTML (contenedor). Este es un contenedor general donde todos los cronómetros serán mostrados.
    contenedor.appendChild(cronometroDiv);
  });
}

// Instrucción para eliminar un cronómetro dentro del arreglo.
function eliminarCronometro(index){
  // Verificar si el indice es valido
  if(index >= 0 && index < cronometros.length){
    // usar splice para eliminar el elemento en el índice especificado. 
    cronometros.splice(index, 1);
    // Llamar a una función para actualzar la vista o realizar otras acciones.
    actualizarDisplayCronometros();
  }else{
    console.error('Índice fuera de rango');
  }
}

// Instrucción para actualizar el valor de los elementos del arreglo Cronómetros.
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
function detenerCronometro(index){
  if(index >= 0 && index < cronometros.length){
    cronometros.forEach((cronometros) =>{
      cronometros.enEjecucion = false;

      actualizarDisplayCronometros();
    });
  }else{
    console.error("Índice fuera de rango");
  }
  
}

// Instrucción que crea una función que reanuda los cronómetros.
function reanudarCronometro(){
  cronometros.forEach((cronometros) =>{
    cronometros.enEjecucion = true;
  });
}


// Event listeners para botones de detener, reanudar y agregar cronómetro.

document.querySelector("#btn-seguir").addEventListener("click", reanudarCronometro);
document.querySelector("#btn-agregar").addEventListener("click", agregarCronometroUser);

    cronometroDiv.className = "cronometro";

    // Utilizar interpolación de cadenas (template literals) para construir la cadena de texto:
    cronometroDiv.innerHTML = `Cronómetro ${index + 1}: ${cronometro.horas < 10 ? "0": ""} ${cronometro.horas}:${cronometro.minutos < 10 ? "0": ""}${cronometro.minutos}:${cronometro.segundos < 10 ? "0": ""}${cronometro.segundos}`;
    
    // Agregar el div recién creado y configurado al elemento contenedor especificado en el HTML (contenedor). Este es un contenedor general donde todos los cronómetros serán mostrados.
    contenedor.appendChild(cronometroDiv);
  });
  console.log("HI");
}
// Instrucción para actualizar el valor de los elementos de arreglo Cronómetros.
function actualizarCronometros() {
  cronometros.forEach((cronometro) => {
    cronometros.segundos++;
    if (cronometros.segundos >= 60) {
      cronometros.segundos = 0;
      cronometros.minutos++;
    }
    if (cronometros.minutos >= 60) {
      cronometros.minutos = 0;
      cronometros.horas++;
    }
  });
  actualizarDisplayCronometros();
}
//Se crea un Event listener para el botón de agregar crónometro.
document
  .querySelector("#btn-agregar")
  .addEventListener("click", agregarCronometro);


// Agregar el Event Listener para que por medio de un ciclo ForEach, cada botón seleccionado a través de la función querySelector;
// escuche que se hace clic en los botones y ejecuta la función agregarCronometroInputs.
document.querySelectorAll('.bg-gray-200').forEach(button => {
  button.addEventListener("click", function () {
    agregarCronometroInputs(this.textContent.trim());
  });
});


setInterval(actualizarCronometros, 1000);
setInterval(horaActual, 1000);
