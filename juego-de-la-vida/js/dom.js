//Eventos y manejo del DOM
import {
  generarCelulas,
  dibujarCelulas
} from "./functions.js";

export function inicializarApp() {
    const matriz = document.getElementById("matriz-celulas");
    const btnEmpezar = document.getElementById("btn-empezar");
    const btnReiniciar = document.getElementById("btn-reiniciar");
    //Variable que contiene la matriz bidimensional con todas las células con valor true o false
    let celulas = generarCelulas();
    let nuevoEstado = dibujarCelulas(celulas, matriz);
    celulas = nuevoEstado;

    let intervalo = null;

    btnEmpezar.addEventListener("click", () => {
    if (intervalo !== null) return;

    intervalo = setInterval(() => {
        celulas = dibujarCelulas(celulas, matriz);
    }, 500);
    });
}