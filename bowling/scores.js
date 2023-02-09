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
        console.log('')
        console.log('Start of calculate function')
        if (this.strikeIndex == null || this.spareIndex == null) {
            console.log('Called strike or spare Index')
            this.strikeOrSpareIndex()
        }

        if (this.strikeIndex != null) {
            const beforeCurrentBonus = this.rolls.showFrames().indexOf(this.rolls.showRolls()) - 2
            const bonusFrameIndex = this.readStrikeIndex() + 1
            const bonusFrame = this.rolls.showFrames()[bonusFrameIndex]
            console.log(`This is the rolls ${this.rolls.showRolls()}`)
            console.log(`This is bonus frame ${bonusFrame}`)
            // console.log(`This is bonus frame length ${bonusFrame.length}`)
            console.log(`this is the frames ${this.rolls.showFrames()}`)
            console.log(`This is before current bonus ${this.rolls.showFrames()[beforeCurrentBonus]}`)
            if (this.rolls.showFrames().includes(bonusFrame)) {
                console.log('x')
                const previous = this.rolls.showFrames()[beforeCurrentBonus]
                if (bonusFrame.length < 2) {
                    console.log(`z`) // i need an if condition here if previous was 10 i need to multiply by 2 because it doesn't factor in the 2 rolls before
                        if (previous == 10) {
                            this.score += bonusFrame * 3
                            this.strikeIndex = bonusFrameIndex
                        }
                        else {
                            this.score += bonusFrame * 2
                            this.strikeIndex = bonusFrameIndex
                            console.log(`This is the strike index ${this.strikeIndex}`)
                            console.log(`This is the score ${this.score}`)

                        }
                        
                }
                       
        
                else {
                    console.log('C')
                    const bonusFrameScore = this.rolls.calculateFrameScore(bonusFrame)
                    console.log(`This is previous ${previous}`)
                    if (this.rolls.showFrames()[beforeCurrentBonus] == 10 && this.rolls.testRollCount(previous) == 1) {
                        console.log('A')
                        console.log(`This is the first roll of the first frame ${bonusFrame[0]}`)
                      console.log(`This is the frame score ${bonusFrameScore}`)
                      const bonus = bonusFrameScore * 2 + bonusFrame[0]
                      this.score += bonus
                      this.strikeIndex = null
                      this.rolls.clearFrameScore()
                    }
                    else {
                        this.score += bonusFrameScore * 2
                    }
                }
            }
               
        }
        

        else if (this.spareIndex != null) {
            const spareBonusIndex = this.readSpareIndex() + 1
            const bonusFrame = this.rolls.showFrames()[spareBonusIndex]
            console.log('Hello2')
            console.log(spareBonusIndex)
            if (this.rolls.showFrames().includes(bonusFrame)) { 
                console.log(`This is the frame which is getting doubled11å ${bonusFrame}`) 
                const firstRoll = bonusFrame[0]
                const score = (this.rolls.calculateFrameScore(bonusFrame))
                console.log(`This is the score ${score}`)
                const bonusScore = firstRoll + score
                console.log(`This is the spare index ${this.spareIndex}`)
                console.log(`This is the spare bonus index ${spareBonusIndex}`)
                console.log(`This is double frame ${bonusFrame}`)
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

