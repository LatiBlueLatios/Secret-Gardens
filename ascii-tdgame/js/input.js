class InputComponent {
    constructor(player) {
        this.player = player;
        this.commands = {
            'ArrowLeft': () => this.player.move(-1, 0),
            'ArrowRight': () => this.player.move(1, 0),
            'ArrowUp': () => this.player.move(0, -1),
            'ArrowDown': () => this.player.move(0, 1),
            ' ': () => this.player.punch()
        };
    }

    handleInput(event) {
        const command = this.commands[event.key];
        if (command) {
            command();
        }
    }
}

export default InputComponent;