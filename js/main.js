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


// --- LÓGICA DEL MODAL PARA ELEGIR GALLETAS ---
const modal = document.getElementById('modal-galleta');
const cerrarModal = document.getElementById('cerrar-modal');
const modalTitulo = document.getElementById('modal-titulo');
const selectTamano = document.getElementById('select-tamano');
const campoRelleno = document.getElementById('campo-relleno');
const selectRelleno = document.getElementById('select-relleno');
const modalPrecioValor = document.getElementById('modal-precio-valor');
const btnConfirmar = document.getElementById('btn-confirmar-pedido');
const botonesElegir = document.querySelectorAll('.btn-elegir');

let productoActual = { nombre: '', tipo: '', precioPeq: '', precioGra: '' };

function actualizarPrecioModal() {
    const precio = selectTamano.value === 'Pequeña' ? productoActual.precioPeq : productoActual.precioGra;
    modalPrecioValor.innerText = `$${precio}`;
}

botonesElegir.forEach(boton => {
    boton.addEventListener('click', (evento) => {
        const tarjeta = evento.target.closest('.card-producto');
        productoActual.nombre = tarjeta.querySelector('h4').innerText;
        productoActual.tipo = boton.dataset.tipo;
        productoActual.precioPeq = boton.dataset.peq;
        productoActual.precioGra = boton.dataset.gra;

        modalTitulo.innerText = productoActual.nombre;
        selectTamano.value = 'Pequeña';

        // Muestra el selector de relleno solo si es galleta con relleno
        campoRelleno.style.display = productoActual.tipo === 'con-relleno' ? 'block' : 'none';

        actualizarPrecioModal();
        modal.classList.add('activo');
    });
});

// Cambia el precio en vivo cuando cambian de tamaño
selectTamano.addEventListener('change', actualizarPrecioModal);

// Cerrar modal con la X o haciendo clic afuera
cerrarModal.addEventListener('click', () => modal.classList.remove('activo'));
modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('activo');
});

// Enviar el pedido completo a WhatsApp
btnConfirmar.addEventListener('click', () => {
    const tamano = selectTamano.value;
    const precio = modalPrecioValor.innerText;
    let mensaje = `¡Hola KATSURI! 🌸 Me gustaría pedir: ${productoActual.nombre} - Tamaño: ${tamano}`;

    if (productoActual.tipo === 'con-relleno') {
        mensaje += ` - Relleno: ${selectRelleno.value}`;
    }

    mensaje += ` (${precio}). ¿Sigue disponible?`;

    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsApp, '_blank');
    modal.classList.remove('activo');
});

const previewRelleno = document.getElementById('preview-relleno');

// Relaciona el texto exacto de cada <option> con su archivo de imagen
const imagenesRellenos = {
    "Manjar": "manjar.jpg",
    "Cheesecake": "cheesecake.jpg",
    "Masmelos": "masmelos.jpeg",
    "Nutella": "nutella.jpg",
    "Kinder": "kinder.jpg",
    "Nucita": "nucita.webp",
    "Galak": "galak.webp",
    "Oreo": "oreo.jpg",
    "Mermelada de mora": "mora.jpg"
};

function actualizarImagenRelleno() {
    const rellenoElegido = selectRelleno.value;
    const archivo = imagenesRellenos[rellenoElegido];
    previewRelleno.src = `assets/img/rellenos/${archivo}`;
    previewRelleno.alt = `Relleno de ${rellenoElegido}`;
}

// Cambia la foto cada vez que el cliente elige otro relleno
selectRelleno.addEventListener('change', actualizarImagenRelleno);

// --- LÓGICA DEL MODAL PARA DONAS GRANDES (SOLO TOPPINGS) ---
const modalDona = document.getElementById('modal-dona');
const cerrarModalDona = document.getElementById('cerrar-modal-dona');
const modalDonaTitulo = document.getElementById('modal-dona-titulo');
const checksToppings = document.querySelectorAll('.check-topping');
const modalDonaPrecio = document.getElementById('modal-dona-precio');
const btnConfirmarDona = document.getElementById('btn-confirmar-dona');
const botonesElegirDona = document.querySelectorAll('.btn-elegir-dona');

let donaActual = { nombre: '', precioBase: 0 };

function actualizarPrecioDona() {
    let total = donaActual.precioBase;

    checksToppings.forEach(check => {
        if (check.checked) {
            total += parseFloat(check.dataset.precio);
        }
    });

    modalDonaPrecio.innerText = `$${total.toFixed(2)}`;
}

// Abrir modal capturando nombre y precio de la tarjeta donde se hizo clic
botonesElegirDona.forEach(boton => {
    boton.addEventListener('click', (evento) => {
        const tarjeta = evento.target.closest('.card-producto');
        donaActual.nombre = tarjeta.querySelector('h4').innerText;
        donaActual.precioBase = parseFloat(boton.dataset.precio);

        modalDonaTitulo.innerText = donaActual.nombre;
        checksToppings.forEach(check => check.checked = false);

        actualizarPrecioDona();
        modalDona.classList.add('activo');
    });
});

// Recalcular precio al marcar o desmarcar toppings
checksToppings.forEach(check => check.addEventListener('change', actualizarPrecioDona));

// Cerrar modal
cerrarModalDona.addEventListener('click', () => modalDona.classList.remove('activo'));
modalDona.addEventListener('click', (e) => {
    if (e.target === modalDona) modalDona.classList.remove('activo');
});

// Enviar pedido a WhatsApp
btnConfirmarDona.addEventListener('click', () => {
    const precio = modalDonaPrecio.innerText;

    const toppingsElegidos = [];
    checksToppings.forEach(check => {
        if (check.checked) toppingsElegidos.push(check.value);
    });

    const textoToppings = toppingsElegidos.length > 0
        ? toppingsElegidos.join(', ')
        : 'Sin toppings';

    const mensaje = `¡Hola KATSURI! 🌸 Me gustaría pedir: ${donaActual.nombre} - Toppings: ${textoToppings} (${precio}). ¿Sigue disponible?`;
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

    window.open(urlWhatsApp, '_blank');
    modalDona.classList.remove('activo');
});


// --- LÓGICA DEL MODAL PARA CHOCO OREOS ---
const modalOreo = document.getElementById('modal-oreo');
const cerrarModalOreo = document.getElementById('cerrar-modal-oreo');
const selectCantidadOreo = document.getElementById('select-cantidad-oreo');
const checksCobertura = document.querySelectorAll('.check-cobertura');
const modalOreoPrecio = document.getElementById('modal-oreo-precio');
const btnConfirmarOreo = document.getElementById('btn-confirmar-oreo');
const botonesElegirOreo = document.querySelectorAll('.btn-elegir-oreo');

function actualizarPrecioOreo() {
    const opcionSeleccionada = selectCantidadOreo.options[selectCantidadOreo.selectedIndex];
    const precio = parseFloat(opcionSeleccionada.dataset.precio);
    modalOreoPrecio.innerText = `$${precio.toFixed(2)}`;
}

// Abrir modal y reiniciar opciones
botonesElegirOreo.forEach(boton => {
    boton.addEventListener('click', () => {
        selectCantidadOreo.selectedIndex = 0;
        checksCobertura.forEach(check => check.checked = false);
        actualizarPrecioOreo();
        modalOreo.classList.add('activo');
    });
});

// Actualizar precio al cambiar entre Unidad y Pack de 3
selectCantidadOreo.addEventListener('change', actualizarPrecioOreo);

// Cerrar modal
cerrarModalOreo.addEventListener('click', () => modalOreo.classList.remove('activo'));
modalOreo.addEventListener('click', (e) => {
    if (e.target === modalOreo) modalOreo.classList.remove('activo');
});

// Enviar pedido a WhatsApp
btnConfirmarOreo.addEventListener('click', () => {
    const cantidad = selectCantidadOreo.value;
    const precio = modalOreoPrecio.innerText;

    const coberturasElegidas = [];
    checksCobertura.forEach(check => {
        if (check.checked) coberturasElegidas.push(check.value);
    });

    const textoCobertura = coberturasElegidas.length > 0
        ? coberturasElegidas.join(' y ')
        : 'A elección';

    const mensaje = `¡Hola KATSURI! 🌸 Me gustaría pedir: CHOCO OREOS (${cantidad}) - Cobertura: ${textoCobertura} (${precio}). ¿Sigue disponible?`;
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

    window.open(urlWhatsApp, '_blank');
    modalOreo.classList.remove('activo');
});

// --- LÓGICA DEL MODAL PARA BERLINESAS (CONTADORES + DESCUENTO POR MAYOR) ---
const modalBerlinesa = document.getElementById('modal-berlinesa');
const cerrarModalBerlinesa = document.getElementById('cerrar-modal-berlinesa');
const filasSabores = document.querySelectorAll('#modal-berlinesa .sabor-fila');
const berlinesaTotalCant = document.getElementById('berlinesa-total-cant');
const berlinesaTotalPrecio = document.getElementById('berlinesa-total-precio');
const btnConfirmarBerlinesa = document.getElementById('btn-confirmar-berlinesa');
const botonesElegirBerlinesa = document.querySelectorAll('.btn-elegir-berlinesa');

function actualizarTotalBerlinesas() {
    let cantidadTotal = 0;

    filasSabores.forEach(fila => {
        const cant = parseInt(fila.querySelector('.cantidad-valor').innerText);
        cantidadTotal += cant;
    });

    // Descuento automático: 6 o más salen a $0.80 c/u, menos de 6 a $1.00 c/u
    const precioUnitario = cantidadTotal >= 6 ? 0.80 : 1.00;
    const totalPagar = cantidadTotal * precioUnitario;

    berlinesaTotalCant.innerText = cantidadTotal;
    berlinesaTotalPrecio.innerText = `$${totalPagar.toFixed(2)}`;
}

// Botones + y - de cada sabor
filasSabores.forEach(fila => {
    const btnMenos = fila.querySelector('.btn-menos');
    const btnMas = fila.querySelector('.btn-mas');
    const spanCant = fila.querySelector('.cantidad-valor');

    btnMas.addEventListener('click', () => {
        spanCant.innerText = parseInt(spanCant.innerText) + 1;
        actualizarTotalBerlinesas();
    });

    btnMenos.addEventListener('click', () => {
        const actual = parseInt(spanCant.innerText);
        if (actual > 0) {
            spanCant.innerText = actual - 1;
            actualizarTotalBerlinesas();
        }
    });
});

// Abrir modal y reiniciar todos los contadores a 0
botonesElegirBerlinesa.forEach(boton => {
    boton.addEventListener('click', () => {
        filasSabores.forEach(fila => {
            fila.querySelector('.cantidad-valor').innerText = '0';
        });
        actualizarTotalBerlinesas();
        modalBerlinesa.classList.add('activo');
    });
});

// Cerrar modal
cerrarModalBerlinesa.addEventListener('click', () => modalBerlinesa.classList.remove('activo'));
modalBerlinesa.addEventListener('click', (e) => {
    if (e.target === modalBerlinesa) modalBerlinesa.classList.remove('activo');
});

// Enviar pedido a WhatsApp
btnConfirmarBerlinesa.addEventListener('click', () => {
    const totalCant = parseInt(berlinesaTotalCant.innerText);

    if (totalCant === 0) {
        alert('Por favor elige al menos 1 berlinesa antes de pedir.');
        return;
    }

    const detalleSabores = [];
    filasSabores.forEach(fila => {
        const cant = parseInt(fila.querySelector('.cantidad-valor').innerText);
        if (cant > 0) {
            detalleSabores.push(`${cant} de ${fila.dataset.sabor}`);
        }
    });

    const precio = berlinesaTotalPrecio.innerText;
    const mensaje = `¡Hola KATSURI! 🌸 Me gustaría pedir ${totalCant} BERLINESAS RELLENAS (${detalleSabores.join(', ')}) - Total: ${precio}. ¿Sigue disponible?`;
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

    window.open(urlWhatsApp, '_blank');
    modalBerlinesa.classList.remove('activo');
});