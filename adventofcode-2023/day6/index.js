const puzzleInput = [
    { time: 47, distance: 400 },
    { time: 98, distance: 1213 },
    { time: 66, distance: 1011 },
    { time: 98, distance: 1540 }
];

const waysToBeatRecords = puzzleInput.map(race => {
    let ways = 0;

    for (let holdTime = 1; holdTime < race.time; holdTime++) {
        let speed = holdTime;
        let travelTime = race.time - holdTime;
        let distance = speed * travelTime;

        if (distance > race.distance) {
            ways++;
        }
    }

    return ways;
});

const productOfWays = waysToBeatRecords.reduce((acc, val) => acc * val, 1);

console.log('Number of ways you could beat the record in each race:', waysToBeatRecords);
console.log('Product of all ways:', productOfWays); //Answer: 1660968