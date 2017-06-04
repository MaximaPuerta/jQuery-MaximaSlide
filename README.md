# jQuery-MaximaSlide
Plugin de jQuery - Slider de imágenes completamente adaptativo

Características:
- Control de tiempo
- Accesibilidad desde el teclado
- Mensajes/Captions
- Parallax
- Controles para ir adelante o atrás
- Loop infinito entre elementos

Éste plugin está en Beta, cualquier persona que desee aportar con el proyecto, estoy disponible a sus ayudas.
No conozco mucho sobre código profesional, sería de gran ayuda convertirlo en tal.

La estructura HTML requerida para que el plugin trabaje es la siguiente:

```html
<div class="MaximaSlide">
    <div class="controles">
        <button class="boton-anterior">&Precedes;</button>
        <button class="boton-siguiente">&Succeeds;</button>
    </div>
    <div class="slide-w">
        <div class="img-container">
            <div class="img-item" style="background-image: url(ubicacion_de_la_imagen)">
                <div class="mensaje">
                    <h1>Titulo del mensaje</h1>
                    <p>Subtítulo</p>
                </div>
            </div>
        </div>
    </div>
</div>
```

Si quieres más imágenes, sólo duplica el div ```<div class="img-item">``` y cambia su ```background-image```.
Puedes agregar tantas imágenes como gustes.

Para inicializar plugin:

```javascript
$(".clase-de-elemento").MaximaSlide();
```

Opciones del plugin:
```javascript
tiempoPaso: 3000, /* Tiempo entre cambio de imágenes */
accesibleTeclado: true, /* Indicar si quieres tener la posibilidad de pasar la imagen desde las flechas del teclado */
mensajes: true, /* Habilitar o inhabilitar los mensajes o captions en inglés */
parallax: false, /* Activar efecto Parallax en las imágenes */
mostrarControles: true, /* Mostrar los controles, debe estar especificado el HTML correspondiente, en caso contrario se desactivará automáticamente. */
```

Iré agregando características en base a los comentarios y sugerencias. :)

