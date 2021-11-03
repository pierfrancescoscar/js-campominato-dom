
// L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// I numeri nella lista delle bombe non possono essere duplicati.
// In seguito l’utente clicca su ogni cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve scoprire tutte le bombe e comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.

// Refs

const playBtn = document.querySelector('.play');
const chooseLevel = document.getElementById('difficoltà');
const wrapGrid = document.querySelector('.wrap-grid');

// Set grid
playBtn.addEventListener('click', () => {
    // Reset content
    wrapGrid.innerHTML = '';
    // // Set grid dimension
    const gridDimension = chooseLevel.value;
    let squareNumber;
    let squarePerSide;
    
    switch (gridDimension) {
        case '1':
            squareNumber = 100;
            squarePerSide = 10;
            break;
        case '2':
            squareNumber = 81;
            squarePerSide = 9;
            break;
        case '3':
            squareNumber = 49;
            squarePerSide = 7;
    }

        // Generating bombs

        const bombList = generateBombs(squareNumber, 16);
        console.log('Generated bombs: ', bombList);

        // Creating attempts list

        const attempts = [];
        const maxAttempts = squareNumber - bombList.length;
        console.log('Possible attempts: ', maxAttempts);

        // Set grid with element html

        const grid = document.createElement('div');
        grid.classList.add('grid');

        // Insert grid

        wrapGrid.append(grid);

        // Gen grid square

        for (let i = 1; i <= squareNumber; i++) {
            const squareList = i;
            const square = createGridSquare(squareList, squarePerSide);
            grid.append(square);
            // Gen click event to square
            square.addEventListener('click', () => {
                // Click event with apposite function made by us
                squareClick(square, bombList, attempts, maxAttempts);
            })
        }

})



// Functions - Generate a random number
function randomNumber (min, max) {
    return Math.floor( Math.random() * (max - min + 1) ) + min;
}

// Functions - Creating squares for our grid

function createGridSquare(num, squares) {

    // Create node square
    const node = document.createElement('div');
    node.classList.add('square');
    node.style.width = `calc(100% / ${squares})`;
    node.style.height = `calc(100% / ${squares})`;

    // Create node text
    const span = document.createElement('span');
    span.append(num);

    // Square + text
    node.append(span);

    return node;
}

// Functions - Generating bomb list

function generateBombs(totCells, totBombs) {
    // 16 random numbers without double usability
    const bombs = [];

    // Loop
    while (bombs.length < totBombs) {   
    // Generating a random number
    const bomb = randomNumber(1, totCells);
    // Checking if the number isn't unique and not in the bomb list
    if (!bombs.includes(bomb)) {
        bombs.push(bomb);
    }
    }
    return bombs;
}

//  Functions - Events on clicking our squares

function squareClick(square, bombList, attempts, maxAttempts) {

}



