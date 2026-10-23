//Eventos y manejo del DOM
import {
  normalizarNumeroYRango,
  sincronizarNumerosConRangos,
  sincronizarRangoDesdeNumero,
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
            celulas = dibujarCelulas(celulas, matriz);
        }, 100);
    });

    btnReiniciar.addEventListener("click", () => {
        aplicarConfiguracion();
    });
}
