// Schrijf hier je code
function width(grid) {
    return grid[0].length;
}

function height(grid) {
    return grid.length;
}

function isInside(grid, position){
    if (position.x < width(grid) && position.x >= 0 && position.y < height(grid) && position.y >= 0) return true;
    else return false;
}

function swap(grid, p , q){
    let hold = grid[p.y][p.x];
    grid[p.y][p.x] = grid[q.y][q.x];
    grid[q.y][q.x] = hold;
}

function horizontalChainAt(grid, position) {
    let X = position.x;
    let Width = width(grid);

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
    let Height = height(grid);

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
    result = checkNextJewell(grid, position, color)
    return result;
}

function removeChains(grid) {
    const positions = [];
    const result = {};
    const w = width(grid);
    const h = height(grid);
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
        grid[y][x] = '';
    }
    return result;
}

function collapse(grid){
    for (let h = 0 ; h < width(grid) ; h++){
        for (let v = 0 ; v < height(grid) ; v++) {
            for (let v = 0; v < height(grid); v++) {
                if (grid[v][h] === "" && v !== 0) {
                    grid[v][h] = grid[v - 1][h];
                    grid[v - 1][h] = "";
                }
            }
        }
    }
}