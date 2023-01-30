class Rolls {
    constructor () {
        this.rolls = []
    }

    roll_count() {
        return this.rolls.length
    }

    roll(score) {
        if (this.roll_count() < 2) {
            this.rolls.push(score)
        }
        
        else {
            throw new Error('Too Many Rolls')
        }
    }

}

// throw new Error('Maximum amount of rolls reached')

// const rolls = new Rolls()
// rolls.roll(1)
// rolls.roll(7)
// const third = rolls.roll(3)
// console.log(third)

module.exports = Rolls;

