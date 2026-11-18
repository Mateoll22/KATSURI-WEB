// 1. Seleccionamos TODOS los botones que tengan la clase "btn-pedir"
const botonesPedir = document.querySelectorAll('.btn-pedir');

// 2. Definimos tu número de WhatsApp (sin el signo +, solo el código de país y el número)
const numeroWhatsApp = "593995684344";

// 3. Recorremos cada botón para agregarle la función del "clic"
botonesPedir.forEach(boton => {
    boton.addEventListener('click', (evento) => {
        
        // a) Encontramos la tarjeta exacta donde el usuario hizo clic
        const tarjeta = evento.target.closest('.card-producto');
        
        // b) Extraemos el texto del <h4> (El nombre del postre)
        const nombrePostre = tarjeta.querySelector('h4').innerText;
        
        // c) Armamos el mensaje predeterminado
        const mensaje = `¡Hola KATSURI! 🌸 Me gustaría pedir: ${nombrePostre}. ¿Sigue disponible?`;
        
        // d) Convertimos el mensaje a un formato de enlace (para que lea los espacios y símbolos)
        const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
        
        // e) Abrimos WhatsApp en una pestaña nueva
        window.open(urlWhatsApp, '_blank');
    });
});


// 1. LA "CARPETA" VIRTUAL (Escribe aquí los nombres de tus fotos)
const fotosGaleria = [
    "1.jpeg", 
    "2.jpeg", 
    "3.jpeg",
    "4.jpeg",
    "5.jpeg",
    "6.jpeg",
    "7.jpeg"
]; // Deben estar dentro de assets/img/

const contenedorSlider = document.getElementById('slider-contenedor');
let indiceActual = 0;

// 2. INYECTAR LAS IMÁGENES AL HTML
fotosGaleria.forEach(foto => {
    const img = document.createElement('img');
    img.src = `assets/img/fondo/${foto}`;
    img.alt = `Postre KATSURI`;
    contenedorSlider.appendChild(img);
});

// 3. LA FUNCIÓN DE MOVIMIENTO
function moverSlider() {
    indiceActual++;
    
    // Si llega al final, reinicia a 0
    if (indiceActual >= fotosGaleria.length) {
        indiceActual = 0;
    }
    
    // Mueve la tira de fotos hacia la izquierda
    const desplazamiento = indiceActual * -100;
    contenedorSlider.style.transform = `translateX(${desplazamiento}%)`;
}

// 4. EL TEMPORIZADOR (Cambia cada 3 segundos)
setInterval(moverSlider, 3000);