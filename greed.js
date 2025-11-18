const _ = require("lodash");

function score(dice) {
    const counts = _.groupBy(dice);
  
    let score = 0;
  
    _.forEach(counts, (count, value) => {
      const val = parseInt(value, 10);
      const tripletCount = Math.floor(count.length / 3);
      const remainder = count.length % 3;
  
      if (val === 1) {
        score += (tripletCount * 1000) + (remainder * 100);
      } else if (val === 5) {
        score += (tripletCount * 500) + (remainder * 50);
      } else {
        if (tripletCount > 0) {
          score += val * 100 * tripletCount;
        }
      }
    });
  
    return score;
  }

// Example usage:
const diceValues = [1, 1, 1, 5, 1];
const totalScore = score(diceValues);

console.log("Total score:", totalScore);

// Example with text score:
const secondDiceValues = [1, 1, 1, 3, 1];
const secondTotalScore = score(secondDiceValues);

console.log("Total score 2:", secondTotalScore);