import Grid from "./grid.js";
import Player from "./player.js";

class Game {
    constructor(containerId, gridSize) {
        this.container = document.getElementById(containerId);

        this.grid = new Grid(gridSize.width, gridSize.height);
        this.player = new Player(this, 6, 9);

        this.dayNightCycle = new DayNightCycle(this);
        this.setupEventListeners();
        this.uiManager = new UIManager();

        this.grid.placeObstacles('T', Math.floor(this.grid.width * this.grid.height * 0.05));
        this.grid.placeObstacles('S', Math.floor(this.grid.width * this.grid.height * 0.02));

        this.render();
    }

    render() {
        const darkness = this.dayNightCycle.checkCycle();
        this.container.style.backgroundColor = `rgba(0, 0, 0, ${darkness})`;
        this.container.textContent = this.grid.toString();
    }

    setupEventListeners() {
        window.addEventListener('keydown', event => this.handleKeyPress(event));
    }

    handleKeyPress(event) {
        this.player.inputComponent.handleInput(event);
    }
}

class DayNightCycle {
    constructor(game) {
        this.isDay = true;
        this.time = 0;
        this.cycleDuration = 10;
        this.game = game;
        this.startCycle();
    }

    startCycle() {
        setInterval(() => {
            this.time = (this.time + 100) % (2 * this.cycleDuration);
            this.checkCycle();
            this.game.render()
        }, this.cycleDuration);
    }

    checkCycle() {
        const dayPercentage = Math.abs(this.time % (2 * this.cycleDuration) - this.cycleDuration) / this.cycleDuration;

        if (dayPercentage === 0.6 && this.isDay) {
            this.isDay = false;
            this.game.uiManager.showNotification('Night is fast approaching…');
        } else if (dayPercentage === 0.2 && !this.isDay) {
            this.isDay = true;
            this.game.uiManager.showNotification('The sunlight breaks through, day has arrived');
        }

        //return dayPercentage;
    }
}

class UIManager {
    constructor() {
        this.notifbar = document.getElementById('notifications-container');
    }

    showNotification(message) {
        this.notifbar.textContent = message;
        setTimeout(() => this.notifbar.textContent = '', 5000);
    }

    updateInventory(...params) {
        console.log('inventory updated', params);
    }
}

const game = new Game('game-container', { width: 20, height: 10 });

game.uiManager.showNotification('this is a test!')