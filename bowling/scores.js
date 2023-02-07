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

        console.log('Start of strike or spare index function')
        console.log('')
        // console.log(`This is the individual frame score ${this.rolls.calculateFrameScore()}`) // here 10's getting added
        console.log(`This is the indexed frame ${this.rolls.showFrames()[this.rolls.frames.length - 1]}`)
        console.log(`This is the rolls ${this.rolls.showRolls()}`)

        if (this.rolls.rollCount() == 2) {
            if (this.spareIndex == null) {
                this.rolls.calculateFrameScore(this.rolls.showRolls())

                if (this.rolls.readFrameScore() == 10) {
                    this.score += this.rolls.readFrameScore()
                    this.spareIndex = this.rolls.showFrames().indexOf(this.rolls.showRolls())
                    console.log(`This is the score ${this.score}`)
                    this.rolls.clearFrameScore()
                    return this.spareIndex
                }
                
                else {
                    this.rolls.clearFrameScore()
                }
            }
        }
        
        else if (this.rolls.rollCount() == 1) {
            if (this.spareIndex == null) {
                this.rolls.calculateFrameScore(this.rolls.showRolls())
            }

            if (this.rolls.readFrameScore() == 10) {
                this.score += this.rolls.readFrameScore()
                console.log('A, strike or spare index')
                this.strikeIndex = this.rolls.showFrames().indexOf(this.rolls.showRolls())
                console.log(`This is the strike index ${this.strikeIndex}`)
                this.rolls.clearFrameScore()
                return this.strikeIndex

            }
        }

        else {
            console.log('C')

            return 'No strike or spare , strike or spare index'
        }
    }

    readStrikeIndex() {
        return this.strikeIndex
    }

    readSpareIndex() {
        return this.spareIndex
    }

    calculate() {
        console.log('')
        console.log('Start of calculate function')
        if (this.strikeIndex == null) {
            console.log('Called strike or spare Index')
            this.strikeOrSpareIndex()
        }

        if (this.strikeIndex != null) {
            console.log('Triggered')
            const bonusIndex = [this.readStrikeIndex() + 1]
            const doubleFrame = this.rolls.showFrames()[this.readStrikeIndex() + 1]
            if (this.rolls.showFrames().includes(this.rolls.showFrames()[bonusIndex])) {
                console.log('A')
                console.log(`This is the score ${this.score}`)
                console.log(`This is the frame score in rolls class ${this.rolls.readFrameScore()}`)
                console.log(`This is the individual frame thats getting doubled ${doubleFrame}`)
                const doubled = (this.rolls.calculateFrameScore(doubleFrame))*2
                console.log(`This is the last frame ${this.rolls.showLatestRoll()}`)
                console.log(`This is the individual frame after it's doubled ${doubled}`)
                this.strikeIndex = null
                console.log(`This is all the frames ${this.rolls.showFrames()}`)
                console.log(`This is the score before double is added ${this.score}`)
                this.score += doubled
                console.log(`This is the score after doubled ${this.score}`)
            }
        }

        else if (this.spareIndex != null) {
            const doubleFrame = this.rolls.showFrames()[this.readSpareIndex() + 1]
            if (this.rolls.showFrames().includes(doubleFrame)) {
                console.log(`This is the frame which is getting doubled ${doubleFrame}`)
                const firstRoll = doubleFrame[0]
                const score = (this.rolls.calculateFrameScore(doubleFrame))
                const bonus = this.score+=(firstRoll + score)
                return this.score 
            }
        }

        else {
            console.log(`This is the individual frames that is not a strike ${this.rolls.showFrames()}`)
            const added = this.score += this.rolls.calculateFrameScore(this.rolls.showRolls())
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
rolls.addRoll(3)
rolls.addRoll(3)
rolls.addFrame()
scores.calculate()
rolls.clearRolls()
rolls.addRoll(10)
rolls.addFrame()
scores.calculate()
rolls.clearRolls()
console.log(scores.readScore())


module.exports = Scores

