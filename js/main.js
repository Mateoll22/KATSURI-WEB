// 1. Seleccionamos TODOS los botones que tengan la clase "btn-pedir"
const botonesPedir = document.querySelectorAll('.btn-pedir');

// 2. Definimos tu número de WhatsApp (sin el signo +, solo el código de país y el número)
const numeroWhatsApp = "593995684344";

// Contadores directos en tarjetas (Chocobombas) con precio en el botón
document.querySelectorAll('.contador-card').forEach(bloque => {
    const tarjeta = bloque.closest('.card-producto');
    const btnMenos = bloque.querySelector('.btn-menos-card');
    const btnMas = bloque.querySelector('.btn-mas-card');
    const spanCant = bloque.querySelector('.cantidad-valor');
    const btnPedir = tarjeta.querySelector('.btn-pedir');
    const precioUnit = parseFloat(btnPedir.dataset.precio);

    function actualizarBoton(cant) {
        btnPedir.innerText = `PEDIR — $${(cant * precioUnit).toFixed(2)}`;
    }

    // Muestra el precio en el botón desde que carga la página
    actualizarBoton(1);

    btnMas.addEventListener('click', () => {
        const nuevaCant = parseInt(spanCant.innerText) + 1;
        spanCant.innerText = nuevaCant;
        actualizarBoton(nuevaCant);
    });

    btnMenos.addEventListener('click', () => {
        const actual = parseInt(spanCant.innerText);
        if (actual > 1) {
            const nuevaCant = actual - 1;
            spanCant.innerText = nuevaCant;
            actualizarBoton(nuevaCant);
        }
    });
});

// Botones PEDIR directos
botonesPedir.forEach(boton => {
    boton.addEventListener('click', (evento) => {
        const tarjeta = evento.target.closest('.card-producto');
        const nombrePostre = tarjeta.querySelector('h4').innerText;
        const spanCant = tarjeta.querySelector('.cantidad-valor');

        let mensaje = '';
        if (spanCant) {
            const cant = parseInt(spanCant.innerText);
            const precioUnit = parseFloat(boton.dataset.precio || 0);
            const total = (cant * precioUnit).toFixed(2);
            mensaje = `¡Hola KATSURI! 🌸 Me gustaría pedir: ${cant}x ${nombrePostre} ($${total}). ¿Sigue disponible?`;
        } else {
            mensaje = `¡Hola KATSURI! 🌸 Me gustaría pedir: ${nombrePostre}. ¿Sigue disponible?`;
        }

        const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
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
    let precio = parseFloat(
        selectTamano.value === 'Pequeña' ? productoActual.precioPeq : productoActual.precioGra
    );

    // Si es galleta con relleno, sumamos el extra del relleno elegido (0 o 0.50)
    if (productoActual.tipo === 'con-relleno') {
        const opcionRelleno = selectRelleno.options[selectRelleno.selectedIndex];
        precio += parseFloat(opcionRelleno.dataset.extra || 0);
    }

    modalPrecioValor.innerText = `$${(precio * cantidadGalleta).toFixed(2)}`;
}

// 1. ESTO VA AFUERA (se declara una sola vez)
const btnGalletaMenos = document.getElementById('galleta-menos');
const btnGalletaMas = document.getElementById('galleta-mas');
const spanGalletaCant = document.getElementById('galleta-cant');
let cantidadGalleta = 1;

btnGalletaMas.addEventListener('click', () => {
    cantidadGalleta++;
    spanGalletaCant.innerText = cantidadGalleta;
    actualizarPrecioModal();
});

btnGalletaMenos.addEventListener('click', () => {
    if (cantidadGalleta > 1) {
        cantidadGalleta--;
        spanGalletaCant.innerText = cantidadGalleta;
        actualizarPrecioModal();
        
    }
});

// 2. ESTO ES SOLO PARA ABRIR EL MODAL Y REINICIAR A 1
botonesElegir.forEach(boton => {
    boton.addEventListener('click', (evento) => {
        const tarjeta = evento.target.closest('.card-producto');
        productoActual.nombre = tarjeta.querySelector('h4').innerText;
        productoActual.tipo = boton.dataset.tipo;
        productoActual.precioPeq = boton.dataset.peq;
        productoActual.precioGra = boton.dataset.gra;

        modalTitulo.innerText = productoActual.nombre;
        selectTamano.value = 'Pequeña';

        // Reiniciamos la cantidad a 1 cada vez que abren una galleta
        cantidadGalleta = 1;
        spanGalletaCant.innerText = 1;

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
    let mensaje = `¡Hola KATSURI! 🌸 Me gustaría pedir: ${cantidadGalleta}x ${productoActual.nombre} - Tamaño: ${tamano}`;

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
selectRelleno.addEventListener('change', () => {
    actualizarImagenRelleno();
    actualizarPrecioModal();
});

// --- LÓGICA DEL MODAL PARA DONAS GRANDES (TOPPINGS + CANTIDAD) ---
const modalDona = document.getElementById('modal-dona');
const cerrarModalDona = document.getElementById('cerrar-modal-dona');
const modalDonaTitulo = document.getElementById('modal-dona-titulo');
const checksToppings = document.querySelectorAll('.check-topping');
const modalDonaPrecio = document.getElementById('modal-dona-precio');
const btnConfirmarDona = document.getElementById('btn-confirmar-dona');
const botonesElegirDona = document.querySelectorAll('.btn-elegir-dona');

// 1. Variables y botones del contador (AFUERA del forEach)
const btnDonaMenos = document.getElementById('dona-menos');
const btnDonaMas = document.getElementById('dona-mas');
const spanDonaCant = document.getElementById('dona-cant');
let cantidadDona = 1;

let donaActual = { nombre: '', precioBase: 0 };

function actualizarPrecioDona() {
    let total = donaActual.precioBase;

    checksToppings.forEach(check => {
        if (check.checked) {
            total += parseFloat(check.dataset.precio);
        }
    });

    // Multiplica el precio unitario (dona + toppings) por la cantidad
    modalDonaPrecio.innerText = `$${(total * cantidadDona).toFixed(2)}`;
}

// Eventos de + y -
btnDonaMas.addEventListener('click', () => {
    cantidadDona++;
    spanDonaCant.innerText = cantidadDona;
    actualizarPrecioDona();
});

btnDonaMenos.addEventListener('click', () => {
    if (cantidadDona > 1) {
        cantidadDona--;
        spanDonaCant.innerText = cantidadDona;
        actualizarPrecioDona();
    }
});

// 2. Abrir modal capturando nombre, precio y reiniciando la cantidad a 1
botonesElegirDona.forEach(boton => {
    boton.addEventListener('click', (evento) => {
        const tarjeta = evento.target.closest('.card-producto');
        donaActual.nombre = tarjeta.querySelector('h4').innerText;
        donaActual.precioBase = parseFloat(boton.dataset.precio);

        modalDonaTitulo.innerText = donaActual.nombre;
        checksToppings.forEach(check => check.checked = false);

        cantidadDona = 1;
        spanDonaCant.innerText = 1;

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

// Enviar pedido a WhatsApp con la cantidad incluida
btnConfirmarDona.addEventListener('click', () => {
    const precio = modalDonaPrecio.innerText;

    const toppingsElegidos = [];
    checksToppings.forEach(check => {
        if (check.checked) toppingsElegidos.push(check.value);
    });

    const textoToppings = toppingsElegidos.length > 0
        ? toppingsElegidos.join(', ')
        : 'Sin toppings';

    const mensaje = `¡Hola KATSURI! 🌸 Me gustaría pedir: ${cantidadDona}x ${donaActual.nombre} - Toppings: ${textoToppings} (${precio}). ¿Sigue disponible?`;
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

// =========================================
// LÓGICA DEL CARRITO DE COMPRAS
// =========================================

// 1. ESTADO: Aquí se guardan los productos que el cliente va agregando
let carrito = [];

const btnAbrirCarrito = document.getElementById('btn-abrir-carrito');
const modalCarrito = document.getElementById('modal-carrito');
const cerrarModalCarrito = document.getElementById('cerrar-modal-carrito');
const carritoContador = document.getElementById('carrito-contador');
const carritoLista = document.getElementById('carrito-lista');
const carritoTotal = document.getElementById('carrito-total');
const btnEnviarCarrito = document.getElementById('btn-enviar-carrito');

// 2. FUNCIÓN PARA AGREGAR AL CARRITO
function agregarAlCarrito(descripcion, precio) {
    carrito.push({ descripcion, precio });
    actualizarCarritoUI();

    // Pequeño efecto visual en el botón flotante para confirmar que se agregó
    btnAbrirCarrito.style.transform = 'scale(1.2)';
    setTimeout(() => btnAbrirCarrito.style.transform = '', 200);
}

// 3. FUNCIÓN PARA DIBUJAR EL CARRITO EN PANTALLA Y SUMAR EL TOTAL
function actualizarCarritoUI() {
    carritoContador.innerText = carrito.length;

    // Si está vacío, mostramos el mensaje inicial
    if (carrito.length === 0) {
        carritoLista.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío.</p>';
        carritoTotal.innerText = '$0.00';
        return;
    }

    carritoLista.innerHTML = '';
    let total = 0;

    carrito.forEach((item, indice) => {
        total += item.precio;

        // Creamos la fila de cada producto con su botón de borrar
        const div = document.createElement('div');
        div.classList.add('carrito-item');
        div.innerHTML = `
            <div class="carrito-item-info">
                <span>${item.descripcion}</span>
                <span class="carrito-item-precio">$${item.precio.toFixed(2)}</span>
            </div>
            <button type="button" class="btn-eliminar-item" data-indice="${indice}" title="Quitar">🗑️</button>
        `;
        carritoLista.appendChild(div);
    });

    carritoTotal.innerText = `$${total.toFixed(2)}`;

    // Activamos los botones de eliminar (🗑️) que acabamos de crear
    document.querySelectorAll('.btn-eliminar-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const indice = parseInt(e.target.dataset.indice);
            carrito.splice(indice, 1); // Borra 1 elemento en esa posición
            actualizarCarritoUI();     // Vuelve a dibujar la lista actualizada
        });
    });
}

// Abrir y cerrar el modal del carrito
btnAbrirCarrito.addEventListener('click', () => modalCarrito.classList.add('activo'));
cerrarModalCarrito.addEventListener('click', () => modalCarrito.classList.remove('activo'));
modalCarrito.addEventListener('click', (e) => {
    if (e.target === modalCarrito) modalCarrito.classList.remove('activo');
});

// -----------------------------------------
// 4. CONECTAR TODOS LOS BOTONES "+🛒"
// -----------------------------------------

// A) Tarjetas directas (Cajas, Mini Donas, Chocobombas, Churros)
document.querySelectorAll('.btn-agregar-card').forEach(boton => {
    boton.addEventListener('click', (evento) => {
        const tarjeta = evento.target.closest('.card-producto');
        const nombre = tarjeta.querySelector('h4').innerText;
        const btnPedir = tarjeta.querySelector('.btn-pedir');
        const precioUnit = parseFloat(btnPedir.dataset.precio || 0);
        const spanCant = tarjeta.querySelector('.cantidad-valor');

        // Si la tarjeta tiene contador (Chocobombas), multiplicamos por su cantidad
        const cant = spanCant ? parseInt(spanCant.innerText) : 1;
        const subtotal = cant * precioUnit;
        const descripcion = cant > 1 ? `${cant}x ${nombre}` : nombre;

        agregarAlCarrito(descripcion, subtotal);
    });
});

// B) Desde el Modal de Galletas
document.getElementById('btn-carrito-galleta').addEventListener('click', () => {
    const tamano = selectTamano.value;
    // Quitamos el "$" del texto del total para convertirlo en número
    const precio = parseFloat(modalPrecioValor.innerText.replace('$', ''));
    let descripcion = `${cantidadGalleta}x ${productoActual.nombre} (${tamano}`;

    if (productoActual.tipo === 'con-relleno') {
        descripcion += `, Relleno: ${selectRelleno.value}`;
    }
    descripcion += ')';

    agregarAlCarrito(descripcion, precio);
    modal.classList.remove('activo');
});

// C) Desde el Modal de Donas Grandes
document.getElementById('btn-carrito-dona').addEventListener('click', () => {
    const precio = parseFloat(modalDonaPrecio.innerText.replace('$', ''));
    const toppings = [];
    checksToppings.forEach(check => {
        if (check.checked) toppings.push(check.value);
    });

    const textoToppings = toppings.length > 0 ? toppings.join(', ') : 'Sin toppings';
    const descripcion = `${cantidadDona}x ${donaActual.nombre} (${textoToppings})`;

    agregarAlCarrito(descripcion, precio);
    modalDona.classList.remove('activo');
});

// D) Desde el Modal de Choco Oreos
document.getElementById('btn-carrito-oreo').addEventListener('click', () => {
    const cantidad = selectCantidadOreo.value;
    const precio = parseFloat(modalOreoPrecio.innerText.replace('$', ''));
    const coberturas = [];
    checksCobertura.forEach(check => {
        if (check.checked) coberturas.push(check.value);
    });

    const textoCobertura = coberturas.length > 0 ? coberturas.join(' y ') : 'A elección';
    const descripcion = `CHOCO OREOS (${cantidad} - ${textoCobertura})`;

    agregarAlCarrito(descripcion, precio);
    modalOreo.classList.remove('activo');
});

// E) Desde el Modal de Berlinesas
document.getElementById('btn-carrito-berlinesa').addEventListener('click', () => {
    const totalCant = parseInt(berlinesaTotalCant.innerText);

    if (totalCant === 0) {
        alert('Por favor elige al menos 1 berlinesa antes de agregar al carrito.');
        return;
    }

    const detalleSabores = [];
    filasSabores.forEach(fila => {
        const cant = parseInt(fila.querySelector('.cantidad-valor').innerText);
        if (cant > 0) detalleSabores.push(`${cant} de ${fila.dataset.sabor}`);
    });

    const precio = parseFloat(berlinesaTotalPrecio.innerText.replace('$', ''));
    const descripcion = `${totalCant}x BERLINESAS RELLENAS (${detalleSabores.join(', ')})`;

    agregarAlCarrito(descripcion, precio);
    modalBerlinesa.classList.remove('activo');
});

// -----------------------------------------
// 5. ENVIAR TODO EL CARRITO A WHATSAPP
// -----------------------------------------
btnEnviarCarrito.addEventListener('click', () => {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío. Agrega al menos un postre primero.');
        return;
    }

    let mensaje = '¡Hola KATSURI! 🌸 Me gustaría hacer el siguiente pedido:\n\n';
    carrito.forEach(item => {
        mensaje += `• ${item.descripcion} — $${item.precio.toFixed(2)}\n`;
    });
    mensaje += `\n*Total: ${carritoTotal.innerText}*\n¿Sigue disponible?`;

    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsApp, '_blank');

    // Vaciamos el carrito y cerramos el modal después de enviar
    carrito = [];
    actualizarCarritoUI();
    modalCarrito.classList.remove('activo');
});