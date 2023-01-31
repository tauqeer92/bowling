class Rolls {
    constructor () {
        this.rolls = []
    }

    rollCount() {
        return this.rolls.length
    }

    roll(score) {
        if (this.rollCount() < 2) {
            this.rolls.push(score)
        }
        
        else {
            throw new Error('Too Many Rolls In One Frame')
        }
    }

    showRolls() {
        return this.rolls
    }

    clearRolls() {
        this.rolls = []
    }

}

// throw new Error('Maximum amount of rolls reached')

// const rolls = new Rolls()
// rolls.roll(1)
// rolls.roll(7)
// console.log(rolls.showRolls())

module.exports = Rolls;

