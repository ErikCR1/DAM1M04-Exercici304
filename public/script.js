const mida = 100; // Define el tamaño en píxeles de cada pieza (100x100 px).
let moviments = 0; // Contador para saber cuántos clics válidos ha hecho el usuario.
let tauler = [[1, 2, 3], [4, 5, 6], [7, 8, 0]]; // La "matriz" del juego. El 0 es el hueco vacío.

function dibuixar() {
    const elTauler = document.getElementById('tauler'); // Busca el contenedor del puzzle en el HTML.
    elTauler.innerHTML = ''; // Borra todo lo que haya dentro para redibujar de cero.
    
    for (let f = 0; f < 3; f++) { // Bucle para recorrer las filas (0, 1, 2).
        for (let c = 0; c < 3; c++) { // Bucle para recorrer las columnas (0, 1, 2).
            let valor = tauler[f][c]; // Obtiene el número que hay en esa posición actual.
            if (valor !== 0) { // Si el número NO es 0 (el hueco), creamos una pieza.
                let div = document.createElement('div'); // Crea un nuevo elemento <div>.
                div.className = 'peca'; // Le asigna la clase CSS "peca".
                
                
                // Calcula la posición X del fondo: usa el resto (%) para saber la columna original.
                let posX = -((valor - 1) % 3) * 100; 
                // Calcula la posición Y del fondo: usa la división entera para saber la fila original.
                let posY = -Math.floor((valor - 1) / 3) * 100; 
                
                div.style.backgroundPosition = `${posX}px ${posY}px`; // Aplica el recorte de la imagen.
                // Posiciona la pieza en la cuadrícula usando coordenadas X, Y basadas en f y c.
                div.style.transform = `translate(${c * mida}px, ${f * mida}px)`; 
                
                div.onclick = () => intentarMoure(f, c); // Si haces clic, intenta mover esta pieza.
                elTauler.appendChild(div); // Añade la pieza al contenedor.
            }
        }
    }
}

function intentarMoure(f, c) {
    let buit = trobarBuit(); // Primero localiza dónde está el 0 (el hueco).
    let df = Math.abs(f - buit.f); // Distancia absoluta entre filas (clic vs hueco).
    let dc = Math.abs(c - buit.c); // Distancia absoluta entre columnas (clic vs hueco).

    // La suma de distancias debe ser 1 (significa que están pegados arriba, abajo o lados).
    if (df + dc === 1) { 
        tauler[buit.f][buit.c] = tauler[f][c]; // El valor de la pieza clicada pasa al hueco.
        tauler[f][c] = 0; // Donde estaba la pieza, ahora queda el hueco (0).
        moviments++; // Sumamos uno al contador.
        document.getElementById('comptador').innerText = `Moviments: ${moviments}`; // Actualiza el texto en pantalla.
        dibuixar(); // Refresca visualmente el tablero.
        comprovarVictoria(); // Mira si el usuario ya ha terminado.
    }
}

function trobarBuit() {
    for (let f = 0; f < 3; f++) // Recorre filas.
        for (let c = 0; c < 3; c++) // Recorre columnas.
            if (tauler[f][c] === 0) return {f, c}; // Si encuentra el 0, devuelve sus coordenadas como objeto.
}

function barrejar() {
    for (let i = 0; i < 100; i++) { // Repite 100 veces un movimiento aleatorio.
        let buit = trobarBuit(); // Localiza el hueco.
        let ops = []; // Array de opciones de movimiento posibles.
        if (buit.f > 0) ops.push({f: buit.f - 1, c: buit.c}); // Puede venir una pieza de arriba.
        if (buit.f < 2) ops.push({f: buit.f + 1, c: buit.c}); // Puede venir una pieza de abajo.
        if (buit.c > 0) ops.push({f: buit.f, c: buit.c - 1}); // Puede venir una pieza de la izquierda.
        if (buit.c < 2) ops.push({f: buit.f, c: buit.c + 1}); // Puede venir una pieza de la derecha.
        
        // Elige una de esas opciones al azar.
        let desti = ops[Math.floor(Math.random() * ops.length)];
        // Intercambia los valores (mueve la pieza al hueco).
        tauler[buit.f][buit.c] = tauler[desti.f][desti.c];
        tauler[desti.f][desti.c] = 0;
    }
}

function resetJoc() {
    moviments = 0;
    document.getElementById('comptador').innerText = `Moviments: ${moviments}`;
    tauler = [[1, 2, 3], [4, 5, 6], [7, 8, 0]];
    barrejar();
    dibuixar();
}

function comprovarVictoria() {
    const solucio = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    const actual = tauler.flat();
    if (actual.every((v, i) => v === solucio[i])) {
        alert(`Has guanyat en ${moviments} moviments!`);
    }
}

document.getElementById('btn-reset').onclick = resetJoc;
resetJoc();