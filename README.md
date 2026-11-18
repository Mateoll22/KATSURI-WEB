```markdown

# 🍪 KATSURI — Catálogo Web & Pedidos de Postres

> *"Postres hechos con el corazón"*

Landing page y catálogo interactivo diseñado para **KATSURI**, un emprendimiento de repostería artesanal. Permite a los clientes explorar el menú por categorías, ver una galería dinámica de productos y realizar pedidos directos o personalizados mediante **WhatsApp** con un solo clic.

🌐 **Demo en vivo:** [Ver página aquí](https://katsuriec.netlify.app/)

---

## ✨ Características Principales

* **Catálogo Categorizado y Responsivo:** Menú organizado mediante Flexbox con tarjetas uniformes (`300px`) que se adaptan automáticamente al tamaño de la pantalla.
  * *Galletas Tipo New York* (con listado general de rellenos disponibles).
  * *Donas y Mini Donitas*.
  * *Chocolatería* (Chocobombas y Choco Oreos).
  * *Churros y Berlinesas*.
* **Pedidos Directos a WhatsApp:** Cada producto cuenta con un botón **"PEDIR"** que captura automáticamente el nombre del postre seleccionado y abre un chat de WhatsApp con un mensaje prellenado.
* **Pedidos Personalizados:** Sección de contacto con enlace directo a WhatsApp para cotizar diseños y temáticas a medida, además de acceso a redes sociales (TikTok).
* **Galería Slider Automatizada:** Carrusel de imágenes en el *Hero* gestionado dinámicamente desde JavaScript con transiciones automáticas cada 3 segundos.
* **Navegación Fluida:** Barra de navegación fija (*sticky*) con desplazamiento suave (*smooth scroll*) entre secciones.

---

## 🛠️ Tecnologías Utilizadas

* **HTML5:** Estructura semántica (*One-Page*).
* **CSS3:** Variables personalizadas (`:root`), Flexbox, transiciones y diseño limpio sin frameworks externos.
* **JavaScript (Vanilla):** Manipulación del DOM, generación dinámica de enlaces a la API web de WhatsApp (`wa.me`) y control del carrusel de imágenes.

---

## 📂 Estructura del Proyecto

```text
katsuri-web/
│
├── index.html              # Estructura principal y catálogo de productos
├── css/
│   └── style.css           # Estilos, paleta de colores KATSURI y diseño responsivo
├── js/
│   └── main.js             # Lógica de pedidos por WhatsApp y slider automático
└── assets/
    └── img/
        ├── fondo/          # Imágenes del carrusel principal
        ├── galletas/       # Fotos de la categoría Galletas
        ├── donas/          # Fotos de la categoría Donas y Mini Donitas
        ├── chocobombas/    # Fotos de la categoría Chocolatería
        └── churros_berlinesas/ # Fotos de Churros y Berlinesas

```

---

## 📈 Escalabilidad: Cómo añadir nuevos productos o secciones

El proyecto está diseñado para crecer fácilmente a medida que el menú de **KATSURI** incorpore nuevos postres o temporadas:

1. **Agregar un nuevo producto:**
Duplica cualquier bloque `<article class="card-producto">` dentro de la categoría deseada en `index.html` y actualiza la imagen, el título (`<h4>`), la descripción y el precio. El botón de WhatsApp detectará el nuevo nombre automáticamente sin tocar `main.js`.
2. **Agregar una nueva categoría al menú:**
* Crea un nuevo contenedor `<div class="nueva-categoria">` dentro de `<section id="menu">` en `index.html`, incluyendo su `<div class="titulo-seccion">` y sus tarjetas.
* Agrega la clase `.nueva-categoria` a la regla Flexbox existente en `css/style.css` (`.galletas, .donas, .chocolateria, .nueva-categoria`).


3. **Actualizar las fotos del slider principal:**
Guarda las nuevas imágenes en `assets/img/fondo/` y añade sus nombres al arreglo `fotosGaleria` en `js/main.js`.

---


## 👨‍💻 Autor

Desarrollado por **Mateo Llugcha** — *Ingeniero de Software & UI/UX*

* **GitHub:** [Tu Perfil](https://github.com/Mateoll22)
* **LinkedIn:** [Tu LinkedIn](https://www.linkedin.com/in/mateo-llugcha/)


