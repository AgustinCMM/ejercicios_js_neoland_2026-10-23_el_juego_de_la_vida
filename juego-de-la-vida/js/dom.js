//Eventos y manejo del DOM
import {
  generarCelulas,
  dibujarCelulas,
  evaluarCondiciones,
} from "./functions.js";

export function inicializarApp() {
    const matriz = document.getElementById("matriz-celulas");
    const btnEmpezar = document.getElementById("btn-empezar");
    const btnReiniciar = document.getElementById("btn-reiniciar");
    //Variable que contiene la matriz bidimensional con todas las células con valor true o false
    let celulas = generarCelulas();

    btnEmpezar.addEventListener('click', ()=> {
        dibujarCelulas(celulas, matriz);
    })
}