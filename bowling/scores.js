const Rolls = require('../bowling/rolls')

class Scores {

    constructor (rolls) {
        this.rolls = rolls
        this.score = 0
        this.strikeIndex = null
        this.spareIndex = null
    }

    strikeOrSpareIndex() {

        console.log('Start of strike or spare index function')
        console.log('')
        // console.log(`This is the individual frame score ${this.rolls.calculateFrameScore()}`) // here 10's getting added
        // console.log(`This is the indexed frame ${this.rolls.showFrames()[this.rolls.frames.length - 1]}`)
        // console.log(`This is the rolls ${this.rolls.showRolls()}`)

        if (this.rolls.rollCount() == 1) {
            if (this.strikeIndex == null) {
                this.rolls.calculateFrameScore(this.rolls.showRolls())
                
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
                this.rolls.clearFrameScore()
            }
        }


        else if (this.rolls.rollCount() == 2) {
            if (this.spareIndex == null) {
                this.rolls.calculateFrameScore(this.rolls.showRolls())

                if (this.rolls.readFrameScore() == 10) {
                    this.score += this.rolls.readFrameScore()
                    this.spareIndex = this.rolls.showFrames().indexOf(this.rolls.showRolls())
                    console.log(`This is the spare index ${this.spareIndex}`)
                    console.log(`This is the score ${this.score}`)
                    this.rolls.clearFrameScore()
                    return this.spareIndex
                }

                else {
                    this.rolls.clearFrameScore()
                }
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
        // It calls strike or spare if either are null
        // 
        console.log('')
        console.log('Start of calculate function')
        if (this.strikeIndex == null || this.spareIndex == null) {
            console.log('Called strike or spare Index')
            this.strikeOrSpareIndex()
        }

        if (this.strikeIndex != null) {
            const doubleFrameIndex = this.readStrikeIndex() + 1 // why is this here? A: This is the frame thats getting doubled, this.strikeIndex is the frame which scores the 10, thats it
            const previousFrameIndex = this.rolls.showFrames().indexOf(this.rolls.showRolls()) - 1
            const previousPreviousFrameIndex = this.rolls.showFrames().indexOf(this.rolls.showRolls()) - 2
            const doubleFrame = this.rolls.showFrames()[doubleFrameIndex]
            if (this.rolls.showFrames().includes(doubleFrame)) {
                const beforeDouble = this.rolls.calculateFrameScore(doubleFrame)
                const previousFrame = this.rolls.showFrames()[previousFrameIndex]
                const previousPreviousFrame = this.rolls.showFrames()[previousPreviousFrameIndex]
                console.log(`This is previous frame ${previousFrame}`)
                if (beforeDouble == 10 && previousFrame == 10  && previousPreviousFrame != 10) {
                    console.log('Z')
                    this.strikeIndex = doubleFrameIndex
                    const doubled = beforeDouble*2
                    this.score += doubled
                    console.log(`This is the score ${this.score}`)
                    this.rolls.clearFrameScore()
                }

                else if (beforeDouble == 10 && previousFrame == 10 && previousPreviousFrame == 10) {
                    console.log('A')
                    console.log(`This is previous frame first roll ${previousFrame[0]}`)
                    console.log(`This is the score before doubled ${this.score}`)
                    const doubled = (beforeDouble*2) + (beforeDouble)
                    this.score += doubled
                    console.log(`This is double frame ${doubleFrame}`)
                    console.log(`This is the score ${this.score}`)
                    this.strikeIndex = doubleFrameIndex
                    this.rolls.clearFrameScore()
                }

                else if (beforeDouble == 10 && previousFrame != 10 && previousPreviousFrame != 10) {
                    console.log('B')
                    console.log(`This is previous frame first roll ${previousFrame[0]}`)
                    const doubled = (beforeDouble*2)
                    this.score += doubled
                    this.strikeIndex = doubleFrameIndex
                    this.rolls.clearFrameScore()
                }
                
                else if (beforeDouble != 10 && previousFrame == 10 && previousPreviousFrame == 10) {
                    console.log('C')
                    console.log(`This is previous frame first roll ${previousFrame[0]}`)
                    const doubled = (beforeDouble*2) + (doubleFrame[0])
                    this.score += doubled
                    this.strikeIndex = null
                    this.rolls.clearFrameScore()
                }
                else {
                    console.log('D')
                    this.score += beforeDouble*2
                    this.strikeIndex = null
                }
            }
        }

        else if (this.spareIndex != null) {
            const spareBonusIndex = this.readSpareIndex() + 1
            const doubleFrame = this.rolls.showFrames()[spareBonusIndex]
            console.log('Hello2')
            console.log(spareBonusIndex)
            if (this.rolls.showFrames().includes(doubleFrame)) { // why isn't 1,2 included
                console.log(`This is the frame which is getting doubled11å ${doubleFrame}`) // I need to section this off
                const firstRoll = doubleFrame[0]
                const score = (this.rolls.calculateFrameScore(doubleFrame))
                console.log(`This is the score ${score}`)
                const bonusScore = firstRoll + score
                console.log(`This is the spare index ${this.spareIndex}`)
                console.log(`This is the spare bonus index ${spareBonusIndex}`)
                console.log(`This is double frame ${doubleFrame}`)
                const bonus = this.score+=(firstRoll + score)
                console.log(`This is the frame score ${this.rolls.readFrameScore()}`)
                if (score == 10) {
                    this.spareIndex = spareBonusIndex
                    this.rolls.clearFrameScore()
                }
                else {
                    console.log('x')
                    this.spareIndex = null
                }
                console.log(`This is the bonus score ${bonusScore}`)
                console.log(`This is the score overall ${this.score}`)
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
rolls.addRoll(10)
rolls.addFrame()
scores.calculate()
rolls.clearRolls()
rolls.addRoll(10)
rolls.addFrame()
scores.calculate()
rolls.clearRolls()
rolls.addRoll(10)
rolls.addFrame()
scores.calculate()
rolls.clearRolls()
rolls.addRoll(2)
rolls.addRoll(2)
rolls.addFrame()
scores.calculate()
rolls.clearRolls()
console.log(scores.readScore())


module.exports = Scores

