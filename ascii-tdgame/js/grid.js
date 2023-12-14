class Grid {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.cells = Array.from({ length: height }, () => Array.from({ length: width }, () => '.'));
    }

    placeObstacles(obstacle, count) {
        while (count > 0) {
            const x = Math.floor(Math.random() * this.width);
            const y = Math.floor(Math.random() * this.height);

            if (this.cells[y][x] === '.') {
                this.cells[y][x] = obstacle;
                count--;
            }
        }
    }

    isValidPosition(x, y) {
        return x >= 0 && x < this.width && y >= 0 && y < this.height && this.cells[y][x] === '.';
    }

    updateCell(x, y, value) {
        this.cells[y][x] = value;
    }

    toString() {
        return this.cells.map(row => row.join('  ')).join('\n');
    }
}

export default Grid;