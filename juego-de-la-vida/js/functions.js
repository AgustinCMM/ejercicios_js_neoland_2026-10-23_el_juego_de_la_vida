//Funciones
export function generarCelulas() {
    const filas = 20;
    const columnas = 20;
    const totalCelulas = [];

    for (let i = 0; i < filas; i++) {
        totalCelulas[i] = [];
        for (let j = 0; j < columnas; j++) {
            totalCelulas[i][j] = Math.random() < 0.5;
        }
    }

    const matriz = document.getElementById("matriz-celulas");
    if (matriz) {
        matriz.className = `matriz-celulas matriz-celulas--${filas}x${columnas}`;
        matriz.style.setProperty("--filas", filas);
        matriz.style.setProperty("--columnas", columnas);
    }

    return totalCelulas;
}

export function dibujarCelulas(totalCelulas, matriz) {
    const fragmento = document.createDocumentFragment();

    totalCelulas.forEach((fila) => {
        fila.forEach((estadoVivo) => {
            const celula = document.createElement("div");
            celula.className = estadoVivo ? "celula viva" : "celula muerta";

            fragmento.appendChild(celula);
        });
    });

    matriz.replaceChildren(fragmento);
}

export function evaluarCondiciones(celulas, vecinasVivas) {
    let c = celulas;
    let v = vecinasVivas;
    const viva = true;
    const muerta = false;

    if (c==viva && v.length<2) {
        c = muerta;
    } else if (c==viva && (v.length==2 || v.length==3)) {
        c = viva;
    } else if (c==viva && v.length>3) {
        c = muerta;
    } else if (c==muerta && v.length==3) {
        c = viva;
    } else {
        c = c;
    }
    return c;
}
