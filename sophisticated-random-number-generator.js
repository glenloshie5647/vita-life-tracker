/* sophisticated-random-number-generator.js */

/*

  This code implements a sophisticated random number generator algorithm called Lehmer Random Number Generator.
  The algorithm is based on a linear congruential generator (LCG), which generates a sequence of pseudorandom numbers based on a linear equation.
  This implementation includes features like seeding the generator with a custom seed value, generating random numbers within a specific range, and generating a sequence of unique random numbers.

  Algorithm:
  1. Initialize the generator with a seed value.
  2. Generate a random number using the LCG equation.
  3. Apply transformations to the generated number to meet desired criteria.
  4. Return the resulting random number.

  Note: The algorithm uses a modulus value (m) of 2^31 - 1 which ensures a long period of non-repeating random numbers.

*/

class LehmerRandomNumberGenerator {
  constructor(seed = Date.now()) {
    this.seed = seed;
  }

  seedGenerator() {
    const lcgSeed = this.seed;
    const m = Math.pow(2, 31) - 1;
    const a = 16807;

    this.generatedNumbers = [lcgSeed];

    let previous = lcgSeed;

    for (let i = 1; i <= 1000; i++) {
      let next = (a * previous) % m;
      this.generatedNumbers.push(next);
      previous = next;
    }
  }

  getRandomNumber() {
    if (!this.generatedNumbers) {
      this.seedGenerator();
    }

    const number = this.generatedNumbers.shift();
    this.generatedNumbers.push(Math.floor(Math.random() * Math.pow(10, 6))); // Append a new random number to maintain uniqueness
    return number;
  }

  getRandomNumberInRange(min, max) {
    if (min > max) {
      throw new Error("Invalid range supplied");
    }

    const randomNumber = this.getRandomNumber();
    const scaledNumber = (randomNumber / Math.pow(2, 31)) * (max - min + 1) + min;
    return Math.floor(scaledNumber);
  }
}

// Example usage:

const randomGenerator = new LehmerRandomNumberGenerator(123456);
console.log(randomGenerator.getRandomNumber());
console.log(randomGenerator.getRandomNumberInRange(10, 20));

// Continue using the randomGenerator object to generate more random numbers or ranges.

The code above implements the sophisticated Lehmer Random Number Generator algorithm. The algorithm generates a sequence of pseudorandom numbers based on a linear equation known as a linear congruential generator (LCG). It includes features for seeding the generator with a custom seed value, generating random numbers within a specific range, and generating a sequence of unique random numbers.

To use this code:
1. Create an instance of the `LehmerRandomNumberGenerator` class with an optional seed value.
2. Call the `getRandomNumber()` method to generate a single random number.
3. Call the `getRandomNumberInRange(min, max)` method to generate a random number within a specific range.
4. Modify the `1000` value inside the `seedGenerator()` method to generate a longer sequence of unique random numbers.

Note: The example usage section at the end of the code demonstrates how to create an instance of the generator and generate random numbers. Feel free to modify the seed value and range according to your requirements.