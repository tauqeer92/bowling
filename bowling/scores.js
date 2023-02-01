const Rolls = require('../bowling/rolls')

class Scores {

    constructor (rolls) {
        this.rolls = rolls
        this.score = 0
    }

    readScore () {
        const frames = this.rolls.showFrames()
        for (let frame of frames) {
            for (let score of frame) {
                this.score += score

            }
        }
        return this.score
    }
}

// const rolls = new Rolls()
// rolls.addRoll(5)
// rolls.addRoll(5)
// rolls.addRoll(4)
// rolls.addRoll(4)
// const scores = new Scores(rolls)
// console.log(scores.readScore())

module.exports = Scores

