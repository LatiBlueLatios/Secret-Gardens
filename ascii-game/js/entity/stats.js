class Stats {
    constructor() {
        // Ensure initialStats is an object, if not, default to an empty object
        initialStats = initialStats instanceof Object ? initialStats : {};

        // Assign initialStats properties to the instance
        Object.assign(this, initialStats);
    }
}

// Example Usage:
/*
const stats = new Stats({
  health: 100,
  defense: 5
})

const stats2 = new Stats({
  health: 50,
  defense: 5,
  defensePercent: 20
})
*/