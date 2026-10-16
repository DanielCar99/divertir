# Divertir - sitio web editable

Este paquete contiene la página web completa de Divertir.

## Editar en Visual Studio Code

1. Abre la carpeta `divertir-web` en Visual Studio Code.
2. Los archivos principales están dentro de `dist`:
   - `index.html`: textos y estructura de la página.
   - `styles.css`: colores, tamaños y diseño visual.
   - `app.js`: filtros, buscador, fichas y enlaces de WhatsApp.
   - `products.json`: nombres, referencias y categorías de los 40 productos.
   - `assets/products`: fotografías del catálogo.
3. Para ver los cambios fácilmente, abre `dist/index.html` con la extensión **Live Server** de Visual Studio Code.

## Cambiar un producto

Edita su registro en `dist/products.json`. La propiedad `source` debe coincidir con el nombre de una imagen guardada en `dist/assets/products`.

## Cambiar el contacto

Busca `573108856165` en `dist/index.html` y `dist/app.js` y sustitúyelo por el nuevo número, incluyendo el código del país y sin espacios.

## Publicación

Editar estos archivos no actualiza automáticamente la versión publicada. Puedes devolver el ZIP modificado para que se revise y publique nuevamente.
