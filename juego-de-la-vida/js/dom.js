//Eventos y manejo del DOM
import {
  generarCelulas,
  dibujarCelulas,
  evaluarCondiciones,
} from "./functions.js";

export function inicializarApp() {
    const matriz = document.getElementById("matriz-celulas");

    let celulas = generarCelulas();
    dibujarCelulas(celulas, matriz);
}