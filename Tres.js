let tablero = [];
let turno = 0;
let simbolo = ['X', 'O'];
let quienGano = [0, 0];

function colocarTablero() {
    yaEnPartida = false;
    var gridContainer = document.querySelector('#tablero');
    //var elementoTurno = document.querySelector('#turno');
    for (var fila = 1; fila <= 3; fila++) {
        tablero[fila] = [];
        for (var columna = 1; columna <= 3; columna++) {
            var div = document.createElement('div');
            div.classList.add('celda');
            div.setAttribute('onclick', 'colocarFicha(this)');
            div.setAttribute('onmouseover', 'sombra(this)');
            div.setAttribute('onmouseout', 'quitarSombra(this)');
            div.setAttribute('data-columna', columna);
            div.setAttribute('data-fila', fila);
            if (fila === 1 || fila == 2) {
                div.style.borderBottom = '2px solid black';
            }
            if (columna == 2 || columna === 3) {
                div.style.borderLeft = '2px solid black';
            }
            gridContainer.appendChild(div);
            tablero[fila][columna] = div;
        }
    }
    console.log(tablero);
}

function colocarFicha(elemento) {
    if (!ganar() && elemento.innerHTML === '') {
        if (turno % 2 === 0) {
            elemento.innerHTML = simbolo[0];
            turno++;
        } else {
            elemento.innerHTML = simbolo[1];
            turno++;
        }
    }
    if (ganar()) {
        var ganador = '';
        if (quienGano[0] === 1) {
            ganador = 'Gano la X <br>';
        } else if (quienGano[1] === 1) {
            ganador = 'Gano el O <br>';
        }
        mostrarGanador(ganador, 'resultados');
    }
    console.log("Turno " + turno);
    if (turno === 9) {
        var ganador = 'Empate<br>';
        mostrarGanador(ganador, 'resultados');
    }
}

function reiniciar(elemento) { //Me costo mas hacer el reinciar que todo el juego :(
    turno = 0;
    quienGano = [0, 0];
    var tablero = document.getElementById('tablero');
    while (tablero.firstChild) {
        tablero.removeChild(tablero.firstChild);
    }
    var resultados = document.getElementById('resultados');
    var reiniciar = document.getElementById('reiniciar');
    var textoReiniciar = "";
    elemento.innerHTML = textoReiniciar;
    resultados.removeChild(reiniciar);
    resultados.innerHTML = textoReiniciar;
    colocarTablero();
}

function mostrarGanador(variable, elementoId) {
    var elemento = document.getElementById(elementoId);
    var reiniciar = document.createElement('button');
    elemento.innerHTML = variable;
    reiniciar.setAttribute('onclick', 'reiniciar(this)');
    var textoReiniciar = document.createTextNode('Reiniciar');
    reiniciar.id = 'reiniciar'; //Ya no se mas nombres :(
    textoReiniciar.id = 'textoReiniciar';
    reiniciar.appendChild(textoReiniciar)

    elemento.appendChild(reiniciar);
}

function ganar() {
    for (let jugador of simbolo) {
        for (let i = 1; i <= 3; i++) {
            if (tablero[i][1].innerHTML === jugador &&
                tablero[i][2].innerHTML === jugador &&
                tablero[i][3].innerHTML === jugador) {
                if (jugador === 'X') {
                    quienGano[0]++;
                } else {
                    quienGano[1]++;
                }
                return true;
            }
        }
        for (let j = 1; j <= 3; j++) {
            if (tablero[1][j].innerHTML === jugador &&
                tablero[2][j].innerHTML === jugador &&
                tablero[3][j].innerHTML === jugador) {
                if (jugador === 'X') {
                    quienGano[0]++;
                } else {
                    quienGano[1]++;
                }
                return true;
            }
        }
        if ((tablero[1][1].innerHTML === jugador &&
            tablero[2][2].innerHTML === jugador &&
            tablero[3][3].innerHTML === jugador) ||
            (tablero[1][3].innerHTML === jugador &&
                tablero[2][2].innerHTML === jugador &&
                tablero[3][1].innerHTML === jugador)) {
            if (jugador === 'X') {
                quienGano[0]++;
            } else {
                quienGano[1]++;
            }
            return true;
        }
    }
    return false;
}


function sombra(elemento) {
    if (elemento.innerHTML !== 'O' && elemento.innerHTML !== 'X') {
        if (turno % 2 === 0) {
            elemento.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        } else {
            elemento.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        }
    }
}

function quitarSombra(elemento) {
    elemento.style.backgroundColor = '';
}
