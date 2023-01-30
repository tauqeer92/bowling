class Rolls {
    constructor () {
        this.rolls = []

    }

    roll(score) {
        this.rolls.push(score)
    }

    roll_count() {
        return this.rolls.length
    }


}

module.exports = Rolls;