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

        // console.log(`This is the frame score ${this.rolls.readFrameScore()}`)
        // console.log(`This is show rolls ${this.rolls.showRolls()}`)
        // console.log(`This is the latest roll ${this.rolls.showLatestRoll()}`)
        console.log(`This is the frame score ${this.rolls.calculateFrameScore()}`) // here 10's getting added
        // this.rolls.addFrame()
        
        
        if (this.rolls.showRolls() == 10 && this.rolls.rollCount() == 1) {
            console.log('A')
            this.score += this.rolls.showRolls()[0] // it gets added here
            this.strikeIndex = this.rolls.showFrames().indexOf(this.rolls.showRolls())
            // return `This is strike index ${this.strikeIndex}`
            this.rolls.clearFrameScore()
            return this.strikeIndex
        }

        else if (this.rolls.readFrameScore() == 10 && this.rolls.rollCount() == 2) {
            console.log('B')
            this.spareIndex = this.rolls.showFrames().indexOf(this.rolls.showRolls())
            this.score += this.rolls.readFrameScore()
            this.rolls.clearFrameScore()
            // return `This is spare index ${this.spareIndex}`
            return this.spareIndex
        }

        else {
            return 'No strike or spare'
        }
    }

    readStrikeOrSpareIndex() {
        if (this.strikeIndex != null) {
            return this.strikeIndex
        }

        else if (this.spareIndex != null) {
            return this.spareIndex
        }

        else {
            return 'No strike or spare'
        }
    }

    calculate() {
        if (this.strikeIndex != null) {
            console.log('A')
            // console.log(`This is the index ${this.readStrikeOrSpareIndex()}`)
            console.log(`This is the frames ${this.rolls.showFrames()}`)
            const doubleFrame = this.rolls.showFrames()[this.readStrikeOrSpareIndex() + 1] // do I need this?
            console.log(`This is the frame thats getting doubled ${doubleFrame}`)
            const doubled = (this.rolls.calculateFrameScore())*2 // do i need to add doubleFrame here as an argument ?
            console.log(`This is the frame thats getting doubled ${doubled}`)
            return this.score += doubled
        }

        else if (this.spareIndex != null) {
            const doubleRoll = this.rolls.showFrames()[this.readStrikeOrSpareIndex() + 1]
            const firstRoll = this.rolls.showLatestRoll()[0]
            const score = (this.rolls.calculateFrameScore())
            const bonus = this.score+=(firstRoll + score)
            return this.score
        }
        // return this.rolls.showFrames()

        else {
            this.score += this.rolls.calculateFrameScore
        }

    }
}

// const rolls = new Rolls()
// rolls.addRoll(10)
// rolls.addRoll(5)
// rolls.addRoll(5)
// rolls.addFrame()
// const scores = new Scores(rolls)
// console.log(scores.strikeOrSpareIndex())
// rolls.clearRolls()
// rolls.addRoll(4)
// rolls.addRoll(4)
// rolls.addFrame()
// rolls.clearRolls()
// console.log(rolls.showFrames())
// console.log(`This is the score ${scores.calculate()}`)
// rolls.clearRolls()
// rolls.addRoll(5)
// rolls.addRoll(5)
// rolls.calculateFrameScore()
// rolls.calculateFrameScore()

// console.log(`This is the frameScore ${rolls.readFrameScore()}`)
// console.log(`This is the rolls array ${rolls.showRolls()}`)
// console.log(`This is the frames array ${rolls.showFrames()}`)
// console.log(`This is the roll count ${rolls.rollCount()}`)


module.exports = Scores

