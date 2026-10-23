# Repaso de JavaScript: El Juego de la Vida

Entorno web para organizar y resolver los ejercicios del repaso de JS de la Clase 9. El Juego de la Vida de Conway es el ejercicio principal; los demás están disponibles en «Otros ejercicios».

## Criterio y orden de selección

Se incluyen los 20 ejercicios anteriores al ejercicio final y el ejercicio final, tal como aparecen en repaso.docx:

- **Ejercicio principal, sin numeración:** «💀 FINAL BOSS: El Juego de la Vida (Conway's Game of Life)».
- **Parte 1: Desarrollo Práctico (Crea la Solución):** los ejercicios originales 1 al 10. El documento define la numeración como una lista decimal; se conserva en tarjetas, páginas y nombres de carpeta (`ejercicio-1` a `ejercicio-10`).
- **Parte 2: Análisis de Código (Lee, Explica y Corrige):** los ejercicios originales 11 al 20, con su numeración.

Las páginas conservan los títulos, las consignas, las indicaciones y los fragmentos de código de la fuente. Los resultados aparecen en el área de cada ejercicio; donde la consigna muestra salida en consola, la página lo indica.

## Estructura

    /
    ├── AGENTS.md
    ├── README.md
    ├── repaso.docx
    ├── index.html
    ├── assets/
    │   ├── css/styles.css
    │   └── js/main.js
    ├── ejercicio-1/ ... ejercicio-10/
    ├── ejercicio-11/ ... ejercicio-20/
    └── juego-de-la-vida/

Cada carpeta de ejercicio contiene index.html, css/styles.css y js/script.js. Los estilos comunes y el seguimiento del progreso están en assets/.

## Abrir el sitio

1. Abre esta carpeta en Visual Studio Code.
2. Abre el index.html de la raíz con Live Server.
3. Accede a las consignas desde las tarjetas. En cada ejercicio, usa «Anterior» y «Siguiente» para recorrer el orden del documento.

Usa Live Server para abrir el sitio y mantén la misma dirección local cada vez que vuelvas. El script JavaScript independiente de cada ejercicio se carga como módulo ES; al abrir páginas directamente con file://, los navegadores pueden bloquear su carga. El progreso de localStorage también depende del origen del navegador.

## Dónde escribir y consultar resultados

Escribe la solución de cada ejercicio en el archivo independiente js/script.js de su carpeta. Los archivos nuevos contienen solo un comentario identificador. Añade estilos específicos, si los necesitas, en el css/styles.css de ese ejercicio. Los recursos generales se mantienen en assets/.

La página de cada ejercicio tiene un área de resultados vacía para mostrar lo que pida la consigna. En los ejercicios cuya salida corresponde a console.log, consulta la consola de las herramientas de desarrollo del navegador; la página lo señala con «(ver en consola)».

## Progreso

El control de cada página marca el ejercicio como pendiente o resuelto y guarda el estado en localStorage. En la parte inferior del índice puedes exportar el progreso a JSON o importar un archivo. El archivo se valida antes de aplicar sus estados. Si el navegador no permite usar almacenamiento local, el sitio lo informa.

## Tecnologías

HTML, CSS y JavaScript vanilla. No se añaden dependencias, frameworks ni recursos remotos.
