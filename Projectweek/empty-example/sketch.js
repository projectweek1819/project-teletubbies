let bolletjes = new Array(8);
let moveDone = false;
let posFirst = -1;
let posSecond = -1;
let score = 0;

var font, fontsize = 40;

function setup() {
    createCanvas(641, 721);

    textSize(fontsize);
    textAlign(CENTER, CENTER);

    createGame();
    removeChains(bolletjes);
    collapse(bolletjes);
    score = 0;
}

function draw() {
    background(220);
    fill(220);
    for (var x = 0; x < width; x += 640 / 8) {
        for (var y = 0; y < height; y += 640 / 8) {
            strokeWeight(1);
            line(x, 0, x, height);
            line(0, y, width, y);
        }
    }
    rect(0, 640, 640, 80);
    textAlign(LEFT);
    drawWords();

    drawBolletjes();
    removeChains(bolletjes);
    collapse(bolletjes);
}

function breedte() {
    return bolletjes[0].length;
}

function hoogte() {
    return bolletjes.length;
}

function createGame(){
    for (let v = 0 ; v < hoogte() ; v++){
        bolletjes[v] = new Array(8);
    }
    fillArray(bolletjes);
    removeChains(bolletjes);
    collapse(bolletjes);
}

function fillArray(){
    for (let v = 0 ; v < hoogte() ; v++){
        for (let h = 0 ; h < breedte() ; h++){
            bolletjes[v][h] = Math.ceil(Math.random() * 4);
        }
    }
}

function refillArray() {
    for (let v = 0 ; v < hoogte() ; v++){
        for (let h = 0 ; h < breedte() ; h++){
            if (bolletjes[v][h] === 0) {
                bolletjes[v][h] = Math.ceil(Math.random() * 4);
            }
        }
    }
}

function drawBolletjes(){
    let offset = 80;
    let center = 40;
    for (let v = 0 ; v < hoogte() ; v++){
        for (let h = 0 ; h < breedte() ; h++){
            let x = h * offset + center;
            let y = v * offset + center;
            switch (bolletjes[v][h]) {
                case 0:
                    fill(255, 255,255);
                    break;
                case 1:
                    fill(255, 0, 0);
                    break;
                case 2:
                    fill(0, 255, 0);
                    break;
                case 3:
                    fill(0, 0, 255);
                    break;
                case 4:
                    fill(0, 255, 255);
                    break;
            }
            ellipse(x, y, 69, 69);
        }
    }
}

function mouseReleased() {
    let currentPos = {x: Math.floor(mouseX / 80), y: Math.floor(mouseY/ 80)};
    if (posFirst === -1){
        let x = Math.floor(mouseX / 80);
        let y = Math.floor(mouseY/ 80);
        posFirst = currentPos;
    }
    else if(posSecond === -1){
        let x = Math.floor(mouseX / 80);
        let y = Math.floor(mouseY/ 80);
        posSecond = {x: x, y: y};
        swap();
    }
}

function swap(){
    moveDone = true;
    let horDiff = Math.abs(posFirst.x - posSecond.x);
    let verDiff = Math.abs(posFirst.y - posSecond.y);
    if (horDiff <= 1 && verDiff <= 1 && !(horDiff >= 1 && verDiff >= 1)){
        let hold = bolletjes[posFirst.y][posFirst.x];
        bolletjes[posFirst.y][posFirst.x] = bolletjes[posSecond.y][posSecond.x];
        bolletjes[posSecond.y][posSecond.x] = hold;
        if (checkHorizontal() && checkVertical()) {
            let hold = bolletjes[posFirst.y][posFirst.x];
            bolletjes[posFirst.y][posFirst.x] = bolletjes[posSecond.y][posSecond.x];
            bolletjes[posSecond.y][posSecond.x] = hold;
        }
        removeChains(bolletjes);
    }
    posFirst = -1;
    posSecond = -1;
}

function horizontalChainAt(grid, position) {
    let X = position.x;
    let Width = breedte(grid);

    function checkNextJewell(grid, position, color)
    {
        let result = 1;
        while(position.x < Width && color == grid[position.y][position.x])
        {
            result += 1;
            position.x += 1;
        }
        position.x = X;
        position.x -= 1;
        while(position.x >= 0 && color == grid[position.y][position.x] )
        {
            result += 1;
            position.x -= 1;
        }
        position.x = X;
        return result;
    }

    let result;
    let color;
    color = grid[position.y][position.x];
    position.x += 1;
    result = checkNextJewell(grid, position, color)
    return result;
}

function verticalChainAt(grid, position) {
    let Y = position.y;
    let Height = hoogte(grid);

    function checkNextJewell(grid, position, color)
    {
        let result = 1;
        while(position.y < Height && color == grid[position.y][position.x])
        {
            result += 1;
            position.y += 1;
        }
        position.y = Y;
        position.y -= 1;
        while(position.y >= 0 && color == grid[position.y][position.x] )
        {
            result += 1;
            position.y -= 1;
        }
        position.y = Y;
        return result;
    }

    let result;
    let color;
    color = grid[position.y][position.x];
    position.y += 1;
    result = checkNextJewell(grid, position, color);
    return result;
}

function removeChains(grid) {
    const positions = [];
    const result = {};
    const w = breedte(grid);
    const h = hoogte(grid);
    for (let y = 0; y !== h; ++y) {
        let x = 0;
        while (x < w) {
            const n = horizontalChainAt(grid, { x, y });
            if (n > 2) {
                for (let i = 0; i !== n; ++i) {
                    positions.push({ x: x + i, y });
                }
            }
            x += n;
        }
    }
    for (let x = 0; x !== w; ++x) {
        let y = 0;
        while (y < h) {
            const n = verticalChainAt(grid, { x, y });
            if (n > 2) {
                for (let i = 0; i !== n; ++i) {
                    positions.push({ x, y: y + i });
                }
            }
            y += n;
        }
    }
    for (const position of positions) {
        const { x, y } = position;
        const color = grid[y][x];
        result[color] = (result[color] || 0) + 1;
    }
    for (const { x, y } of positions) {
        grid[y][x] = 0;
        if (moveDone) {
            score += 10;
        }
    }
    return result;
}

function collapse(grid){
    for (let h = 0 ; h < breedte(grid) ; h++){
        for (let v = 0 ; v < hoogte(grid)-1 ; v++) {
            for (let v = 0; v < hoogte(grid); v++) {
                if (grid[v][h] === 0 && v !== 0) {
                    grid[v][h] = grid[v - 1][h];
                    grid[v - 1][h] = 0;
                }
            }
        }
    }
    refillArray();
}

function checkVertical(){
    return !(verticalChainAt(bolletjes, posFirst) >=3 || verticalChainAt(bolletjes, posSecond) >=3);
}

function checkHorizontal() {
    return  !(horizontalChainAt(bolletjes, posFirst) >=3 || horizontalChainAt(bolletjes, posSecond) >=3);
}

function drawWords() {
    fill(0);
    text(score.toString(), 50, 680);
}