import InputComponent from "../input.js";

class Player extends Entity {
    constructor(game, initialX, initialY) {
        this.game = game;
        this.x = initialX;
        this.y = initialY;
        this.sprite = '@';
        this.facing = 'up';
        this.lastPunchTime = 0;
        this.punchCooldown = 1000;

        this.stats = {
            health: 100,
            attack: 5
        }

        this.inventory = { trees: 0, stones: 0 };

        this.inputComponent = new InputComponent(this);

        this.game.grid.updateCell(this.x, this.y, this.sprite);
    }

    canPunch() {
        const currentTime = Date.now();
        return (currentTime - this.lastPunchTime) >= this.punchCooldown;
    }

    move(x, y) {
        if (this.game.grid.isValidPosition(this.x + x, this.y + y)) {
            this.game.grid.updateCell(this.x, this.y, '.');
            this.x += x;
            this.y += y;
            this.game.grid.updateCell(this.x, this.y, this.sprite);
            this.game.render();
        }

        this.updateFacing(x, y);
    }

    updateFacing(dx, dy) {
        switch (true) {
            case dx > 0:
                this.facing = 'right';
                break;
            case dx < 0:
                this.facing = 'left';
                break;
            case dy > 0:
                this.facing = 'down';
                break;
            case dy < 0:
                this.facing = 'up';
                break;
        }
    }
    
    rotate(direction) {
        if (['up', 'down', 'left', 'right'].includes(direction)) {
            this.facing = direction;
            this.game.render();
        }
    }    

    punch() {
        if (this.canPunch()) {
            this.lastPunchTime = Date.now();

            // Define surrounding cells with relative positions
            const surroundingCells = [
                { dx: -1, dy: 0 }, // left
                { dx: 1, dy: 0 }, // right
                { dx: 0, dy: -1 }, // up
                { dx: 0, dy: 1 }, // down
            ];

            for (const { dx, dy } of surroundingCells) {
                const cellX = this.x + dx;
                const cellY = this.y + dy;

                if (cellX >= 0 && cellX < this.game.grid.width && cellY >= 0 && cellY < this.game.grid.height) {
                    const cell = this.game.grid.cells[cellY][cellX];

                    if (cell === 'T') {
                        this.inventory.trees++;
                        this.game.uiManager.updateInventory('trees', this.inventory.trees);
                    } else if (cell === 'S') {
                        this.inventory.stones++;
                        this.game.uiManager.updateInventory('stones', this.inventory.stones);
                    }
                }
            }

            this.game.render();
        }
    }
}

export default Player;