class Entity {
    constructor() {
        this.stats = {
            health: 100,
            attack: 10,
            defense: 5
        };
        this.isDead = false;
    }

    takeDamage(amount) {
        if (this.isDead) {
            return;
        }

        this.stats.health -= Math.max(0, amount - this.stats.defense);
        if (this.stats.health <= 0) {
            this.stats.health = 0;
            this.isDead = true;
            this.onDeath();
        }
    }

    onDeath() {
        console.log("The entity has died.");
    }
}