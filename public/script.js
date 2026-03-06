const mida = 100;
let tauler = [[1, 2, 3], [4, 5, 6], [7, 8, 0]];


function barrejar() {
    for (let i = 0; i < 100; i++) {
        let buit = trobarBuit();
        let veins = [];
        if (buit.f > 0) veins.push({ f: buit.f - 1, c: buit.c });
        if (buit.f < 2) veins.push({ f: buit.f + 1, c: buit.c });
        if (buit.c > 0) veins.push({ f: buit.f, c: buit.c - 1 });
        if (buit.c < 2) veins.push({ f: buit.f, c: buit.c + 1 });

        let desti = veins[Math.floor(Math.random() * veins.length)];
        tauler[buit.f][buit.c] = tauler[desti.f][desti.c];
        tauler[desti.f][desti.c] = 0;
    }
}

function trobarBuit() {
    for (let f = 0; f < 3; f++) {
        for (let c = 0; c < 3; c++) {
            if (tauler[f][c] === 0) return { f, c };
        }
    }
}

function dibuixar() {
    const elTauler = document.getElementById('tauler');
    elTauler.innerHTML = '';
    

    if (tauler[0][0] === 1 && tauler[0][1] === 2 && tauler[0][2] === 3 &&
        tauler[1][0] === 4 && tauler[1][1] === 5 && tauler[1][2] === 6 &&
        tauler[2][0] === 7 && tauler[2][1] === 8) {
        elTauler.innerHTML = "<h1>Has guanyat! 🎉</h1>";
        return;
    }

    for (let f = 0; f < 3; f++) {
        for (let c = 0; c < 3; c++) {
            const valor = tauler[f][c];
            if (valor !== 0) {
                const peca = document.createElement('div');
                peca.innerText = valor;
                peca.style.position = 'absolute';
                peca.style.left = (c * mida) + 'px';
                peca.style.top = (f * mida) + 'px';
                peca.style.width = (mida - 4) + 'px';
                peca.style.height = (mida - 4) + 'px';
                peca.style.border = '2px solid black';
                peca.style.backgroundColor = 'lightblue';
                peca.onclick = () => intentarMoure(f, c);
                elTauler.appendChild(peca);
            }
        }
    }
}

function intentarMoure(f, c) {
    const buit = trobarBuit();
    const dif = Math.abs(f - buit.f) + Math.abs(c - buit.c);
    if (dif === 1) {
        tauler[buit.f][buit.c] = tauler[f][c];
        tauler[f][c] = 0;
        dibuixar();
    }
}

barrejar();
dibuixar();