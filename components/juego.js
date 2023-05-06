//contiene una lista de pares de palabras. Cada par consiste en una palabra a adivinar y una pista para esa palabra
const palabras = [["Atlantic", "An ocean"],
["computer", "A machine"],
["apple", "A fruit"],
["square", "Public space"],
["cherry", "A fruit"],
["coffee", "A drink"],
["cat", "An animal"],
["cake", "A dessert"],
["school", "Place to study"],
["radio", "A machine"],
["ball", "Sport equipment"]];

//la palabra que se está adivinando
let palabra = "";

//un número aleatorio que se utiliza para seleccionar una palabra de la lista de palabras
let rand;

//un array que se utiliza para almacenar la palabra a adivinar, pero con guiones bajos en lugar de letras
let oculta = [];

//el elemento HTML en el que se muestra la palabra a adivinar con guiones bajos
const hueco = document.getElementById("palabra");

//Contador de intentos
let cont = 6;

//un array de botones que representan las letras del alfabeto
const buttons = document.getElementsByClassName('letra');

//el botón "RESET" que se utiliza para reiniciar el juego
const btnInicio = document.getElementById("reset");

// para obtener una referencia al elemento del botón "Mostrar mensaje" en el HTML y lo asigna a la variable showMessageBox.
const showMessageButton = document.getElementById("show-message");

//obtener una referencia al elemento del cuadro de diálogo de mensaje en el HTML y lo asigna a la variable messageBox.
const messageBox = document.getElementById("message-box");

//para seleccionar el elemento del botón "Cerrar" en el HTML con la clase CSS .close y lo asigna a la variable closeMessageButton.
const closeMessageButton = document.querySelector(".close");


// ### FUNCIONES ###
//una función que elige una palabra aleatoria de la lista de palabras y la almacena en la variable palabra
function generaPalabra() {
  rand = Math.floor(Math.random() * 10);  //genera un número aleatorio entre 0 y 9 
  palabra = palabras[rand][0].toUpperCase(); //selecciona una palabra y almacenarla en la variable. La palabra se convierte a mayúsculas para asegurarse de que coincida con las letras ingresadas por el usuario. 
  console.log(palabra);
}

//Funcion para pintar los guiones de la palabra:
//una función que crea un array de guiones bajos (num representa la longitud de la palabra) 
//y lo muestra en el elemento HTML hueco.
function pintarGuiones(num) { // que recibe un número como parámetro
  for (let i = 0; i < num; i++) {
    oculta[i] = "_"; //crea un array llamado oculta de longitud num y asigna a cada elemento del array el valor de _
  }
  hueco.innerHTML = oculta.join(""); //toma un elemento con el id hueco y le asigna el resultado de unir todos los elementos del array oculta en una cadena
}                                    //utilizando el método join con una cadena vacía como separador.
 


//Generar abecedario:
//una función que genera botones de letras en el elemento HTML abcdario.
function generaABC(a, z) {
  document.getElementById("abcdario").innerHTML = "";
  let i = a.charCodeAt(0), j = z.charCodeAt(0);
  let letra = "";
  for (; i <= j; i++) {
    letra = String.fromCharCode(i).toUpperCase();
    document.getElementById("abcdario").innerHTML += `<button value="${letra}" onclick='intento("${letra}")' class="letra" id="${letra}">${letra}</button>`;
    if (i == 110) {
      document.getElementById("abcdario").innerHTML += `<button value="Ñ" onclick='intento("Ñ")' class="letra" id="Ñ">Ñ</button>`;
    }
  }
}

// Chequear intento
function intento(letra) {
  document.getElementById(letra).disabled = true;
  if(palabra.indexOf(letra) != -1) {
    for(var i=0; i<palabra.length; i++) {
      if(palabra[i]==letra) oculta[i] = letra;
    }
    hueco.innerHTML = oculta.join(""); 
  }else{
    cont--;
    document.getElementById("intentos").innerHTML = cont;
    document.getElementById("image"+cont).classList.add("fade-in");
  }
  compruebaFin();
  setTimeout(function () { 
    document.getElementById("acierto").classList.remove("acierto", "verde", "rojo"); 
  }, 800);
}

//una función que comprueba si el juego ha terminado.
// Compruba si ha finalizado
function compruebaFin() {
  if( oculta.indexOf("_") == -1 ) {
    document.getElementById("msg-final").innerHTML = "CONGRATULATIONS !!";
    document.getElementById("msg-final").className += "zoom-in";
    document.getElementById("palabra").className += " encuadre";
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
    document.getElementById("reset").innerHTML = "RESET";
    btnInicio.onclick = function() { location.reload() };
  }else if( cont == 0 ) {
    document.getElementById("msg-final").innerHTML = "Game Over";
    document.getElementById("msg-final").className += "zoom-in";
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
    document.getElementById("reset").innerHTML = "RESET";
    btnInicio.onclick = function () { location.reload() };
  }
}

//una función que muestra la pista correspondiente a la palabra a adivinar en el elemento HTML hueco-pista.
function pista() {
  let pista = palabras[rand][1];
  document.getElementById("hueco-pista").innerHTML = pista;
}

//Cuando el botón con el id "show-message" es clickeado, se ejecuta una función anónima que cambia el estilo de la 
//caja de mensajes para que se muestre
showMessageButton.addEventListener("click", function() {
  messageBox.style.display = "block";
});

//Cuando el botón con la clase "close" es clickeado, se ejecuta otra función anónima que 
//cambia el estilo de la caja de mensajes para que se oculte (display: none).
closeMessageButton.addEventListener("click", function() {
  messageBox.style.display = "none";
});

//si se hace clic en cualquier lugar de la ventana (window), la tercera función anónima verifica si el elemento clickeado 
//es la caja de mensajes. Si es así, la caja de mensajes se oculta.
window.addEventListener("click", function(event) {
  if (event.target === messageBox) {
    messageBox.style.display = "none";
  }
});

//llama a las funciones necesarias
function inicio() {
  generaPalabra();
  pintarGuiones(palabra.length);
  generaABC("a","z");
  cont = 6;
  document.getElementById("intentos").innerHTML=cont;
}

// Iniciar
window.onload = inicio();


