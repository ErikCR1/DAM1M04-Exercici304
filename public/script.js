const mida = 100;
let moviments = 0;
let tauler = [[1, 2, 3], [4, 5, 6], [7, 8, 0]];

function dibuixar() {
    const elTauler = document.getElementById('tauler');
    elTauler.innerHTML = '';
    
    for (let f = 0; f < 3; f++) {
        for (let c = 0; c < 3; c++) {
            let valor = tauler[f][c];
            if (valor !== 0) {
                let div = document.createElement('div');
                div.className = 'peca';
                

                let posX = -((valor - 1) % 3) * 100;
                let posY = -Math.floor((valor - 1) / 3) * 100;
                
                div.style.backgroundPosition = `${posX}px ${posY}px`;
                div.style.transform = `translate(${c * mida}px, ${f * mida}px)`;
                
                div.onclick = () => intentarMoure(f, c);
                elTauler.appendChild(div);
            }
        }
    }
}

function intentarMoure(f, c) {
    let buit = trobarBuit();
    let df = Math.abs(f - buit.f);
    let dc = Math.abs(c - buit.c);


    if (df + dc === 1) {
        tauler[buit.f][buit.c] = tauler[f][c];
        tauler[f][c] = 0;
        moviments++;
        document.getElementById('comptador').innerText = `Moviments: ${moviments}`;
        dibuixar();
        comprovarVictoria();
    }
}

function trobarBuit() {
    for (let f = 0; f < 3; f++) 
        for (let c = 0; c < 3; c++) 
            if (tauler[f][c] === 0) return {f, c};
}

function barrejar() {
    for (let i = 0; i < 100; i++) {
        let buit = trobarBuit();
        let ops = [];
        if (buit.f > 0) ops.push({f: buit.f - 1, c: buit.c});
        if (buit.f < 2) ops.push({f: buit.f + 1, c: buit.c});
        if (buit.c > 0) ops.push({f: buit.f, c: buit.c - 1});
        if (buit.c < 2) ops.push({f: buit.f, c: buit.c + 1});
        let desti = ops[Math.floor(Math.random() * ops.length)];
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