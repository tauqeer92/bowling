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
        console.log('Start of strike or spare index function')
        console.log('')
        console.log(`This is the individual frame score ${this.rolls.calculateFrameScore()}`) // here 10's getting added
        console.log(`This is the indexed frame ${this.rolls.showFrames()[this.rolls.frames.length - 1]}`)
        // this.rolls.addFrame()
        
        
        if (this.rolls.showRolls() == 10 && this.rolls.rollCount() == 1) {
            console.log('A, strike or spare index')
            this.score += this.rolls.showRolls()[0] // it gets added here
            this.strikeIndex = this.rolls.showFrames().indexOf(this.rolls.showRolls())
            console.log(`This is the strike index ${this.strikeIndex}`)
            this.rolls.clearFrameScore()
            return this.strikeIndex
        }

        else if (this.rolls.readFrameScore() == 10 && this.rolls.rollCount() == 2) {
            console.log('B, strike or spare index')
            this.spareIndex = this.rolls.showFrames().indexOf(this.rolls.showRolls())
            this.score += this.rolls.readFrameScore()
            console.log(`This is the score ${this.score}`)
            this.rolls.clearFrameScore()
            // return `This is spare index ${this.spareIndex}`
            return this.spareIndex
        }

        else {
            this.rolls.clearFrameScore()
            return 'No strike or spare , strike or spare index'
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
        this.strikeOrSpareIndex() // i need to reset the index
        console.log('')
        console.log('Start of calculate function')
        if (this.strikeIndex != null) {
            console.log('A')
            // console.log(`This is the index ${this.readStrikeOrSpareIndex()}`)
            console.log(`This is all the frames ${this.rolls.showFrames()}`)
            const doubleFrame = this.rolls.showFrames()[this.readStrikeOrSpareIndex() + 1] // do I need this?
            if (doubleFrame != undefined) {
                console.log(`This is the individual frame thats getting doubled ${doubleFrame}`)
                const doubled = (this.rolls.calculateFrameScore())*2 // do i need to add doubleFrame here as an argument ?
                console.log(`This is the individual frame after it's doubled ${doubled}`)
                this.strikeIndex = null
                // console.log(this.score)
                // console.log(this.score += doubled)
                // console.log('calculate')
                return this.score += doubled
            }

            else {

                console.log(`This is the overall score ${this.score}`)
            }
            
        }
        // in the if condition, i need to make it so if there's no array after strike frame, then it doesn't double the strike score

        else if (this.spareIndex != null) { // we need a condition if the spare index has been used, we need an array, when we're done, clear it
            const doubleRoll = this.rolls.showFrames()[this.readStrikeOrSpareIndex() + 1]
            if (doubleRoll != undefined) { // because this is undefined 
                console.log(`This is the frame which is getting doubled ${doubleRoll}`)
                const firstRoll = this.rolls.showLatestRoll()[0]
                const score = (this.rolls.calculateFrameScore())
                const bonus = this.score+=(firstRoll + score)
                return this.score
            }

            else {
                console.log(`This is the spare index ${this.spareIndex}`)
                console.log(`This is the overall score ${this.score}`)
            }
            
        }
        // return this.rolls.showFrames()

        else {
            console.log(`This is the individual frames that is not a strike ${this.rolls.showFrames()}`)
            // console.log(`This is the non strike score ${this.rolls.calculateFrameScore()}`)
            const added = this.score += this.rolls.calculateFrameScore() // do I need to add calculate after every addRoll
            console.log(this.score)
            this.rolls.clearFrameScore()
            return added
        }

    }

    readScore() {
        return this.score
    }
}

const rolls = new Rolls()
const scores = new Scores(rolls)
rolls.addRoll(5)
rolls.addRoll(5)
rolls.addFrame()
scores.calculate()
rolls.clearRolls()
rolls.addRoll(5)
rolls.addRoll(5)
rolls.addFrame()
scores.calculate()
rolls.clearRolls()
rolls.addRoll(1)
rolls.addRoll(2)
rolls.addFrame()
scores.calculate()
rolls.clearRolls()
console.log(scores.readScore())


module.exports = Scores

