const Rolls = require('../bowling/rolls')

class Scores {

    constructor (rolls) {
        this.rolls = rolls
        this.score = 0
        this.strikeIndex = null
        this.spareIndex = null
        this.strikeScore = 0
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

        console.log('Hello')

        if (this.strikeIndex != null) {
            console.log('Triggered')
            const strikeBonusIndex = this.readStrikeIndex() + 1
            const doubleFrame = this.rolls.showFrames()[this.readStrikeIndex() + 1]
            if (this.rolls.showFrames().includes(this.rolls.showFrames()[strikeBonusIndex])) {
                console.log('A')
                console.log(`This is the score ${this.score}`)
                console.log(`This is the strike index at the beginning ${this.strikeIndex}`)
                console.log(`This is the frame score in rolls class ${this.rolls.readFrameScore()}`)
                console.log(`This is the individual frame thats getting doubled ${doubleFrame}`)
                const beforeDouble = this.rolls.calculateFrameScore(doubleFrame)
                // need to write condition if beforeDouble length is less than 2 need to look at the first roll of next frame
                console.log(`This is double frame length ${doubleFrame.length}`)
                const doubled = beforeDouble*2
                console.log(`This is the last frame ${this.rolls.showLatestRoll()}`)
                console.log(`This is the individual frame after it's doubled ${doubled}`)
                console.log(`This is all the frames ${this.rolls.showFrames()}`)
                console.log(`This is the score before double is added ${this.score}`)
                this.score += doubled
                if (doubleFrame.length < 2) {
                    // need to write condition if beforeDouble length is less than 2 need to look at the first roll of next frame
                    // if its less than 2 then add it to this.strikeScore
                    // then write a condition saying how this.strikeScore does not equal 0, index first roll and double, add it onto this.strikeScore and then add it onto final score
                    // we need to write a condition for if previous score is 10 and then look at next 2, if next one is only one, look at next one etc
                    // need to decide which one to do
                }

                if (beforeDouble == 10) {
                    this.strikeIndex = strikeBonusIndex
                    this.rolls.clearFrameScore()
                }
                else {
                    console.log('x')
                    this.strikeIndex = null
                }
                console.log(`This is the strike index at the end of if ${this.strikeIndex}`)
                console.log(`This is the score after doubled ${this.score}`)
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
rolls.addRoll(2)
rolls.addRoll(2)
rolls.addFrame()
scores.calculate()
rolls.clearRolls()
console.log(scores.readScore())


module.exports = Scores

