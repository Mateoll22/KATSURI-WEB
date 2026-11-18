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