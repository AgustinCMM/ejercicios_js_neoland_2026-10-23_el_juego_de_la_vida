//Eventos y manejo del DOM
import {
  normalizarNumeroYRango,
  sincronizarNumerosConRangos,
  sincronizarRangoDesdeNumero,
  calcularSiguienteGeneracion,
  dibujarCelulas,
  generarTableroConfigurado
} from "./functions.js";

export function inicializarApp() {
    const matriz = document.getElementById("matriz-celulas");
    const btnEmpezar = document.getElementById("btn-empezar");
    const btnReiniciar = document.getElementById("btn-reiniciar");

    const inputFilas = document.getElementById("cambiar-filas");
    const inputColumnas = document.getElementById("cambiar-columnas");
    const inputPorcentajeVivas = document.getElementById("porcentaje-vivas");

    const inputFilasNumero = document.getElementById("filas-valor");
    const inputColumnasNumero = document.getElementById("columnas-valor");
    const inputPorcentajeVivasNumero = document.getElementById("porcentaje-vivas-valor");
    const controles = [
        { rango: inputFilas, numero: inputFilasNumero },
        { rango: inputColumnas, numero: inputColumnasNumero },
        { rango: inputPorcentajeVivas, numero: inputPorcentajeVivasNumero },
    ];

    const actualizarValores = () => sincronizarNumerosConRangos(
        inputFilas,
        inputColumnas,
        inputPorcentajeVivas,
        inputFilasNumero,
        inputColumnasNumero,
        inputPorcentajeVivasNumero
    );

    actualizarValores();

    //Variable que contiene la matriz bidimensional con todas las células con valor true o false
    let celulas = generarTableroConfigurado(
        inputFilas,
        inputColumnas,
        inputPorcentajeVivas,
        matriz
    );

    let intervalo = null;
    let arrastrando = false;
    let ultimaCelulaPintada = null;

    const alternarCelula = (celula) => {
        const indiceFila = Number(celula.dataset.fila);
        const indiceColumna = Number(celula.dataset.columna);

        if (
            !Number.isInteger(indiceFila) ||
            !Number.isInteger(indiceColumna) ||
            typeof celulas[indiceFila]?.[indiceColumna] !== "boolean"
        ) {
            return;
        }

        const nuevoEstado = !celulas[indiceFila][indiceColumna];
        celulas[indiceFila][indiceColumna] = nuevoEstado;
        celula.classList.toggle("viva", nuevoEstado);
        celula.classList.toggle("muerta", !nuevoEstado);
    };

    matriz.addEventListener("pointerdown", (event) => {
        if (event.button !== 0) return;

        const celula = event.target.closest(".celula");

        if (!celula) return;

        arrastrando = true;
        ultimaCelulaPintada = celula.id;
        alternarCelula(celula);
    });

    matriz.addEventListener("pointerover", (event) => {
        if (!arrastrando || !(event.buttons & 1)) return;

        const celula = event.target.closest(".celula");

        if (!celula || celula.id === ultimaCelulaPintada) return;

        ultimaCelulaPintada = celula.id;
        alternarCelula(celula);
    });

    window.addEventListener("pointermove", (event) => {
        if (!arrastrando) return;

        if (!(event.buttons & 1)) {
            arrastrando = false;
            ultimaCelulaPintada = null;
            return;
        }

        const celula = event.target instanceof Element
            ? event.target.closest(".celula")
            : null;

        if (!celula || !matriz.contains(celula)) {
            ultimaCelulaPintada = null;
        }
    });

    const finalizarDibujo = () => {
        arrastrando = false;
        ultimaCelulaPintada = null;
    };

    window.addEventListener("pointerup", finalizarDibujo);
    window.addEventListener("pointercancel", finalizarDibujo);
    window.addEventListener("blur", finalizarDibujo);

    const aplicarConfiguracion = () => {
        if (intervalo !== null) {
            clearInterval(intervalo);
            intervalo = null;
        }

        celulas = generarTableroConfigurado(
            inputFilas,
            inputColumnas,
            inputPorcentajeVivas,
            matriz
        );
    };

    controles.forEach(({ rango, numero }) => {
        rango.addEventListener("input", () => {
            actualizarValores();
            aplicarConfiguracion();
        });

        numero.addEventListener("input", () => {
            sincronizarRangoDesdeNumero(numero, rango);
        });

        numero.addEventListener("change", () => {
            normalizarNumeroYRango(numero, rango);
            actualizarValores();
            aplicarConfiguracion();
        });
    });

    btnEmpezar.addEventListener("click", () => {
        if (intervalo !== null) return;

        intervalo = setInterval(() => {
            celulas = calcularSiguienteGeneracion(celulas);
            dibujarCelulas(celulas, matriz);
        }, 100);
    });

    btnReiniciar.addEventListener("click", () => {
        aplicarConfiguracion();
    });
}
