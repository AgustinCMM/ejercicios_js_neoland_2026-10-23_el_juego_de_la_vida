//Funciones

//Función para crear cada célula y su estado (true o false)
export function generarCelulas(filas = 20, columnas = 30, porcentajeVivas = 50) {
    const totalCelulas = [];

    for (let i = 0; i < filas; i++) {
        totalCelulas[i] = [];
        for (let j = 0; j < columnas; j++) {
            totalCelulas[i][j] = Math.random() < porcentajeVivas / 100;
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
//Función para mostrar en pantalla todas las células agregándolas a el contenedor de la matriz según su estado (viva o muerta)
export function dibujarCelulas(totalCelulas, matriz) {
    const fragmento = document.createDocumentFragment();
    let nuevoEstado = []

    totalCelulas.forEach((fila, indiceFila) => {
        nuevoEstado[indiceFila] = [];
        fila.forEach((estadoVivo, indiceColumna) => {
            nuevoEstado[indiceFila][indiceColumna] = [];
            const celula = document.createElement("div");
            celula.className = estadoVivo ? "celula viva" : "celula muerta";
            celula.id = `c-${indiceFila}-${indiceColumna}`;

            fragmento.appendChild(celula);

            let vecinasVivas = evaluarVecinas(totalCelulas, indiceFila, indiceColumna);
            nuevoEstado[indiceFila][indiceColumna] = evaluarCondiciones(estadoVivo, vecinasVivas);
        });
    });
    matriz.replaceChildren(fragmento);
    return nuevoEstado;
}

export function generarTableroConfigurado(
    inputFilas,
    inputColumnas,
    inputPorcentajeVivas,
    matriz
) {
    const filas = Number(inputFilas.value);
    const columnas = Number(inputColumnas.value);
    const porcentajeVivas = Number(inputPorcentajeVivas.value);
    const celulas = generarCelulas(filas, columnas, porcentajeVivas);

    return dibujarCelulas(celulas, matriz);
}

export function sincronizarNumerosConRangos(
    inputFilas,
    inputColumnas,
    inputPorcentajeVivas,
    valorFilas,
    valorColumnas,
    valorPorcentajeVivas
) {
    valorFilas.value = inputFilas.value;
    valorColumnas.value = inputColumnas.value;
    valorPorcentajeVivas.value = inputPorcentajeVivas.value;
}

export function sincronizarRangoDesdeNumero(inputNumero, inputRango) {
    const valor = inputNumero.valueAsNumber;

    if (!Number.isInteger(valor) || !inputNumero.validity.valid) {
        return false;
    }

    inputRango.value = String(valor);
    return true;
}

export function normalizarNumeroYRango(inputNumero, inputRango) {
    const minimo = Number(inputRango.min);
    const maximo = Number(inputRango.max);
    const valorIngresado = inputNumero.valueAsNumber;
    const valorBase = Number.isFinite(valorIngresado)
        ? Math.round(valorIngresado)
        : Number(inputRango.value);
    const valorFinal = Math.min(maximo, Math.max(minimo, valorBase));

    inputNumero.value = String(valorFinal);
    inputRango.value = String(valorFinal);
}

//Función para conocer el estado de las células vecinas
function evaluarVecinas(celulas, fil, col) {
    let vecinasVivas = [];

    for (let fVecina=-1; fVecina<=1; fVecina++) {
        for (let cVecina=-1; cVecina<=1; cVecina++) {

            if (fVecina==0 && cVecina==0) {
                continue;
            }

            const filaVecina = fil + fVecina;
            const columnaVecina = col + cVecina;
            //Evalúa los bordes de la matriz
            if (
                filaVecina < 0 ||
                filaVecina >= celulas.length ||
                columnaVecina < 0 ||
                columnaVecina >= celulas[filaVecina].length
            ) {
                continue;
            }

            if (celulas[filaVecina][columnaVecina]) {
                vecinasVivas.push(true);
            }
        }
    }

    return vecinasVivas;
}
//Función para evaluar los estados de las células y aplicar la actualización de su estado
function evaluarCondiciones(celulas, vecinasVivas) {
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
