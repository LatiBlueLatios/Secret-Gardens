// TODO: Work on this tomorrow

const puzzleInput = [
    { hand: 'T6JTT', bid: 716 }
]; // make a txt file reader

const cardValueMap = { '2': 1, '3': 2, '4': 3, '5': 4, '6': 5, '7': 6, '8': 7, '9': 8, 'T': 9, 'J': 10, 'Q': 11, 'K': 12, 'A': 13 };

const evaluateHand = (hand) => {
    const cards = hand.split('').sort((a, b) => cardValueMap[b] - cardValueMap[a]);
    const counts = cards.reduce((acc, card) => (acc[card] = (acc[card] || 0) + 1, acc), {});
    const types = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const sortedByFrequencyThenValue = types.flatMap(([card, count]) => Array(count).fill(card));
    const rank = types[0][1] === 4 ? 1
        : types[0][1] === 3 && types[1]?.[1] === 2 ? 2
            : types[0][1] === 3 ? 3
                : types[0][1] === 2 && types[1]?.[1] === 2 ? 4
                    : types[0][1] === 2 ? 5
                        : 6; // wtf did I do
    return { rank, cards: sortedByFrequencyThenValue.map(card => cardValueMap[card]) };
};

const handComparator = (a, b) => {
    const rankDiff = a.rank - b.rank;
    if (rankDiff !== 0) return rankDiff;
    for (let i = 0; i < a.cards.length; i++) {
        if (a.cards[i] !== b.cards[i]) return b.cards[i] - a.cards[i];
    }
    return 0;
};

const evaluatedHands = puzzleInput.map(input => ({ ...evaluateHand(input.hand), bid: input.bid }));
evaluatedHands.sort(handComparator);

const totalWinnings = evaluatedHands.reduce((acc, hand, index) => acc + hand.bid * (index + 1), 0);

console.log('Total winnings:', totalWinnings);
