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

        console.log(`This is the frame score ${this.rolls.readFrameScore()}`)
        console.log(`This is show rolls ${this.rolls.showRolls()}`)
        console.log(`This is the rolls length ${this.rolls.showLatestRoll()}`)
        this.rolls.calculateFrameScore()
        // this.rolls.addFrame()
        
        
        if (this.rolls.showRolls() == 10 && this.rolls.rollCount() == 1) {
            console.log('A')
            this.score += this.rolls.showRolls()[0]
            this.strikeIndex = this.rolls.showFrames().indexOf(this.rolls.showRolls())
            // return `This is strike index ${this.strikeIndex}`
            return this.strikeIndex
        }

        else if (this.rolls.readFrameScore() == 10 && this.rolls.rollCount()== 2) {
            console.log('B')
            this.spareIndex = this.rolls.showFrames().indexOf(this.rolls.showRolls())
            this.score += this.rolls.frameScore
            // return `This is spare index ${this.spareIndex}`
            return this.spareIndex
        }

        else {
            console.log('C')

            this.score += this.rolls.frameScore
            this.rolls.clearFrameScore
        }


        
    }
}

// const rolls = new Rolls()
// rolls.addRoll(4)
// rolls.addRoll(4)
// rolls.addFrame()
// rolls.clearRolls()
// rolls.addRoll(5)
// rolls.addRoll(5)
// rolls.calculateFrameScore()
// rolls.calculateFrameScore()
// const scores = new Scores(rolls)
// console.log(scores.strikeOrSpareIndex())
// console.log(`This is the frameScore ${rolls.readFrameScore()}`)
// console.log(`This is the rolls array ${rolls.showRolls()}`)
// console.log(`This is the frames array ${rolls.showFrames()}`)
// console.log(`This is the roll count ${rolls.rollCount()}`)


module.exports = Scores

