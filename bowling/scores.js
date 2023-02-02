const Rolls = require('../bowling/rolls')

class Scores {

    constructor (rolls) {
        this.rolls = rolls
        this.score = 0
        this.strikeIndex = null
        this.spareIndex = null
        this.bonusIndex = []
    }

    strikeOrSpareIndex() {

        this.rolls.addFrame()
        this.rolls.frameScore()
        
        
        if (this.rolls.showRolls() == 10 && this.rolls.rollCount == 1) {
            console.log('A')
            this.score += this.rolls.showRolls()[0]
            this.strikeIndex = this.rolls.showFrames().indexOf(this.rolls.showRolls())
            this.rolls.clearRolls
            this.rolls.clearFrameScore
            return `This is strike index ${this.strikeIndex}`
        }

        else if (this.rolls.rollCount() == 2 && this.rolls.readFrameScore() == 10) {
            console.log('B')
            this.spareIndex = this.rolls.showFrames().indexOf(this.rolls.showRolls())
            this.score += this.rolls.frameScore
            this.rolls.clearFrameScore
            return `This is spare index ${this.spareIndex}`
        }

        else {
            console.log('C')

            this.score += this.rolls.frameScore
            this.rolls.clearFrameScore
        }

        
    }
}

const rolls = new Rolls()
rolls.addRoll(10)
// rolls.addRoll(5)
rolls.frameScore()
// rolls.frameScore()
const scores = new Scores(rolls)
console.log(`This is the frameScore ${rolls.readFrameScore()}`)
console.log(scores.strikeOrSpareIndex())
console.log(`This is the rolls array ${rolls.showRolls()}`)
console.log(`This is the frames array ${rolls.showFrames()}`)
console.log(`This is the roll count ${rolls.rollCount()}`)


module.exports = Scores

