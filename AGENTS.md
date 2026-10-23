# AGENTS.md — Entorno de práctica de JS

## Datos del proyecto

- Tema: Juego de la vida
- Materia o curso: repaso JS
- Documento fuente de consignas: `repaso.docx`
- Categoría o conjunto de ejercicios: hay muchos ejercicios básicos y uno avanzado que es el final. que ese último sea el principal y los otros ejercicios estén en una categoría como "Otros ejercicios"
- Numeración visible: El Juego de la Vida (como principal sin numeración), el resto de ejercicios respetando su numeración original
- Tecnologías: HTML, CSS y JavaScript vanilla, salvo que la consigna indique otras tecnologías.
- Ejecución: navegador moderno mediante live server, local storage

Los datos anteriores identifican el proyecto, pero no sustituyen la lectura del documento fuente.

## Objetivo

Preparar un sitio web claro, atractivo y responsive para organizar y resolver los ejercicios asignados.

El sitio debe facilitar el acceso a las consignas, permitir escribir las soluciones en archivos independientes y mostrar los resultados necesarios. No resolver los ejercicios durante la creación del entorno, salvo que el usuario lo solicite expresamente.

## Análisis obligatorio antes de editar

1. Inspeccionar la estructura y el contenido existentes.
2. Leer íntegramente el documento fuente indicado.
3. Identificar las categorías, secciones y consignas disponibles.
4. Seleccionar únicamente los ejercicios que cumplan el criterio indicado para este proyecto.
5. Registrar para cada ejercicio:
   - identificador o número original;
   - título original;
   - consigna completa;
   - destino de los resultados, si está indicado;
   - orden original.
6. Comparar el contenido extraído con el documento para confirmar que no se omitieron ejercicios.
7. Revisar archivos de ejercicios ya respondidos como referencia para el formato y la organización del código.
8. No crear ni modificar archivos hasta haber identificado de manera fiable los ejercicios seleccionados.

No elegir ejercicios por su dificultad aparente. No inventar ni corregir títulos, números o consignas. Conservar el texto y el orden originales.

Si el documento fuente no está disponible o no permite identificar con seguridad la selección, explicar el problema y no crear ejercicios basados en suposiciones.

## Reglas para preservar el trabajo existente

- Antes de sobrescribir un archivo, leerlo y conservar la información que siga siendo útil.
- No eliminar archivos existentes con contenido relevante.
- No modificar el documento fuente.
- Mantener las soluciones existentes.
- No convertir, reformatear ni reemplazar en bloque ejercicios respondidos sin comprobar su contenido.
- Seguir las preferencias de formato descritas en este archivo y las convenciones visibles en los ejercicios respondidos.

## Tecnologías y dependencias

Utilizar las tecnologías indicadas en «Datos del proyecto».

No instalar dependencias ni incorporar frameworks, bibliotecas, compiladores, gestores de paquetes o servicios externos, salvo solicitud expresa del usuario.

Mantener las rutas y los recursos necesarios dentro del proyecto. Si el entorno debe funcionar sin conexión, evitar fuentes, iconos, scripts y otros recursos remotos.

## Estructura del proyecto

Usar recursos compartidos y una carpeta numerada independiente para cada ejercicio. Las carpetas de ejercicios deben estar directamente en la raíz del proyecto, salvo que el usuario indique otra organización.

Estructura de referencia:

    /
    ├── AGENTS.md
    ├── README.md
    ├── [ARCHIVO_FUENTE]
    ├── index.html
    ├── assets/
    │   ├── css/
    │   │   └── styles.css
    │   └── js/
    │       └── main.js
    ├── ejercicio-XX/
    │   ├── index.html
    │   ├── css/
    │   │   └── styles.css
    │   └── js/
    │       └── script.js
    └── ...

Usar el número original en el nombre de la carpeta cuando exista. No renumerar para llenar huecos. Si no hay número original, elegir un identificador técnico estable y mantener visible el título original.

No es necesario que el título forme parte del nombre de la carpeta. Mostrarlo dentro de la página y en el índice.

Cada ejercicio debe tener su propio HTML, CSS y JavaScript. Los estilos y scripts generales deben estar en `assets/` y no duplicarse en cada carpeta.

## Página principal

Crear o actualizar `index.html` para que sea el punto de entrada del proyecto. Debe incluir:

- nombre y propósito del proyecto;
- tema o materia correspondiente;
- índice con todos los ejercicios seleccionados y sólo esos ejercicios;
- número o identificador original y título original de cada uno;
- enlaces funcionales a sus páginas;
- estado pendiente/resuelto cuando se utilice seguimiento de progreso;
- una presentación clara y adaptable a escritorio y móvil.

Cada tarjeta del índice debe ser un enlace completo. No colocar otro enlace interactivo dentro de la tarjeta.

Si el proyecto incluye una opción de importar o exportar el progreso, ubicarla discretamente al final de la página principal.

## Navegación

Todas las páginas deben tener navegación coherente y accesible por teclado.

En el inicio, ofrecer una acción clara para comenzar, si existe un orden de ejercicios. En cada ejercicio, mostrar únicamente los controles de navegación que tengan sentido, por ejemplo «Anterior» y «Siguiente».

No incluir una lista extensa de enlaces a cada ejercicio en la barra superior cuando las tarjetas del inicio ya cumplen esa función.

Mantener rutas relativas correctas desde la raíz y desde cada carpeta. Marcar claramente la página o el ejercicio actual cuando corresponda.

## Página de cada ejercicio

Cada página debe mostrar:

- número o identificador original junto con el título;
- consigna completa y fiel a la fuente;
- estado pendiente/resuelto y su control, si se utiliza seguimiento;
- área de resultados;
- indicación «(ver en consola)» cuando la consigna indique que la salida va a la consola;
- navegación anterior/siguiente, cuando corresponda.

Mantener el contenido compacto. La consigna y el resultado deben ser los elementos principales. No crear un editor de código en la página.

No añadir tips, pistas, algoritmos, pseudocódigo orientado a la solución ni resultados ficticios. No añadir controles específicos de la solución, salvo que la consigna los requiera para presentar la interfaz del ejercicio.

## Archivos JavaScript de los ejercicios

Crear un archivo JavaScript independiente por ejercicio.

Los archivos nuevos deben ser plantillas vacías, con un comentario breve que identifique dónde escribir la solución. No incluir funciones de ejemplo, cálculos, pruebas con respuestas conocidas ni código que resuelva total o parcialmente el ejercicio.

Enlazar los scripts al final del `<body>`, justo antes de su cierre. Usar `type="module"` cuando el ejercicio o el proyecto necesite `import`/`export`; no quitar ese atributo para evitar errores de carga.

Usar rutas relativas correctas. Comprobar cómo se ejecutarán los módulos en el navegador elegido. Los navegadores suelen bloquear módulos ES al abrir archivos directamente con `file://`; en ese caso, usar el servidor estático ya previsto por el usuario, como Live Server, y explicar este requisito en el README.

El JavaScript compartido debe limitarse a la interfaz general, la navegación y el seguimiento del estado. No debe incluir soluciones de ejercicios.

## Seguimiento de progreso

Cuando el proyecto incluya estados de ejercicios:

- mostrar y permitir cambiar el estado en la página de cada ejercicio;
- reflejar el mismo estado en la tarjeta del índice;
- guardar automáticamente en `localStorage`;
- ofrecer importación y exportación de un JSON con todos los estados únicamente en la página principal, en una zona discreta;
- validar el archivo JSON antes de reemplazar los estados existentes;
- informar al usuario si el almacenamiento local no está disponible.

No mostrar controles de importación de archivos en las páginas individuales.

## Diseño y legibilidad

Crear un diseño sencillo, moderno, atractivo, compacto y responsive. Usar una tipografía neutral del sistema, buen contraste, fondos propios para los bloques de texto y estados claros para interacción y foco.

Centralizar los estilos comunes en `assets/css/styles.css`. Mantener las hojas CSS de cada ejercicio pequeñas y limitadas a reglas específicas.

Formatear todo el código para facilitar su lectura:

- sangría consistente de dos espacios en HTML y JavaScript;
- etiquetas y bloques anidados en líneas separadas;
- atributos repartidos en varias líneas cuando una etiqueta se vuelva difícil de leer;
- CSS con una regla por línea y bloques separados;
- líneas en blanco entre secciones relacionadas;
- sin minificar ni comprimir manualmente HTML, CSS o JavaScript;
- conservar el estilo legible de los ejercicios respondidos que el usuario haya formateado manualmente.

No cambiar el formato de los ejercicios existentes sin revisarlos y conservar su lógica.

## README

Crear o actualizar `README.md` en español. Documentar:

- el propósito y tema del proyecto;
- el criterio de selección de ejercicios;
- la estructura de carpetas;
- cómo abrir el proyecto en el entorno previsto;
- cómo acceder y navegar entre ejercicios;
- dónde escribir las soluciones;
- cómo consultar los resultados en pantalla o consola;
- cómo se conserva y transfiere el progreso, si aplica;
- las limitaciones de módulos ES al abrir archivos con `file://`, si aplica;
- las restricciones técnicas del proyecto.

## Revisión final

Antes de terminar, comprobar e informar:

- cuáles ejercicios se incluyeron y que pertenecen al conjunto seleccionado;
- que se conservan su numeración, orden, títulos y consignas;
- que cada ejercicio tenga sus archivos independientes;
- que las rutas y enlaces existan;
- que cada página tenga el área de resultados correspondiente;
- que los scripts estén enlazados al final del `<body>`;
- que el código nuevo esté formateado de forma legible;
- que no se hayan agregado dependencias no autorizadas;
- que los ejercicios nuevos no estén resueltos;
- cualquier limitación o ambigüedad que no se haya podido verificar.

No afirmar que una comprobación se realizó si no se hizo.