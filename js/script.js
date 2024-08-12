// Selecciona el elemento del canvas con el id "drawing-canvas"
let canvas = document.querySelector("#drawing-canvas");

// Ajusta la altura del canvas al tamaño de la ventana
canvas.height = window.innerHeight;
// Ajusta el ancho del canvas al tamaño de la ventana
canvas.width = window.innerWidth;

// Obtiene el contexto 2D del canvas para poder dibujar en él
let contx = canvas.getContext("2d");

// Establece el grosor de la línea de dibujo
contx.lineWidth = 5;
// Establece el color de la línea de dibujo
contx.strokeStyle = "black";

// Variables para almacenar las coordenadas previas del mouse
let prevX = null;
let prevY = null;

// Variable que indica si se está dibujando o no
let drawing = false;

// Evento para comenzar a dibujar cuando se presiona el botón del mouse
window.addEventListener("mousedown", (e) => (drawing = true));

// Evento para dejar de dibujar cuando se suelta el botón del mouse
window.addEventListener("mouseup", (e) => (drawing = false));

// Evento para dibujar cuando el mouse se mueve sobre el canvas
window.addEventListener("mousemove", (e) => {
    // Si no hay coordenadas previas o no se está dibujando, se actualizan las coordenadas y se termina la función
	if (prevX == null || prevY == null || !drawing) {
		prevX = e.clientX;
		prevY = e.clientY;
		return;
	}

    // Obtiene las nuevas coordenadas del mouse
	let mousX = e.clientX;
	let mousY = e.clientY;

    // Inicia un nuevo trazo
	contx.beginPath();
    // Mueve el cursor a la posición previa
	contx.moveTo(prevX, prevY);
    // Dibuja una línea desde la posición previa hasta la posición actual
	contx.lineTo(mousX, mousY);
    // Dibuja la línea en el canvas
	contx.stroke();

    // Actualiza las coordenadas previas con las coordenadas actuales del mouse
	prevX = e.clientX;
	prevY = e.clientY;
});

// Selecciona todos los elementos con la clase "colors"
let colorBoxes = document.querySelectorAll(".colors");

// Para cada color en "colorBoxes", agrega un evento que cambia el color del trazo al color de la caja
colorBoxes.forEach((box) => {
	box.addEventListener("click", () => {
		contx.strokeStyle = box.style.backgroundColor;
	});
});

// Selecciona el botón para limpiar el canvas
let clearBtn = document.querySelector(".clear-btn");

// Evento para limpiar todo el contenido del canvas cuando se hace clic en el botón de limpiar
clearBtn.addEventListener("click", () => {
	contx.clearRect(0, 0, canvas.width, canvas.height);
});

// Selecciona el botón para guardar el dibujo
let saveBtn = document.querySelector(".save-btn");

// Evento para guardar el dibujo como una imagen PNG cuando se hace clic en el botón de guardar
saveBtn.addEventListener("click", () => {
	console.log("yooo");  // Mensaje de depuración en la consola
	let data = canvas.toDataURL("image/png"); // Convierte el contenido del canvas a una URL de datos en formato PNG
	let a = document.createElement("a"); // Crea un elemento <a>
	a.href = data; // Establece el enlace del <a> con la URL de la imagen
	a.download = "sketch.png"; // Establece el nombre del archivo que se descargará
	a.click(); // Simula un clic en el enlace para iniciar la descarga
});

// Selecciona el selector de color personalizado
let colorPicker = document.querySelector("#color-picker");

// Evento para cambiar el color del trazo cuando el usuario selecciona un nuevo color
colorPicker.addEventListener("change", (e) => {
	contx.strokeStyle = e.target.value;
});

// Selecciona el control de grosor del pincel
let penWidth = document.querySelector("#pen-width");

// Evento para cambiar el grosor del pincel cuando el usuario ajusta el control
penWidth.addEventListener("change", (e) => {
	contx.lineWidth = e.target.value;
});
