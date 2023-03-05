const Rolls = require('./rolls')
class Scores {

    constructor (rolls) {
        this.rolls = rolls
        this.score = 0
        this.strikeIndex = null
        this.spareIndex = null
        this.listOfScores = []
        this.frameScore = []
        this.frameCount = 0
    }

    calculateFrameScore(array) {
        let sum = 0
        array.forEach((number) => {
            sum += parseInt(number)
        })
        return sum

    }

    addToListOfScores (score) {
        this.listOfScores.push(score)
        this.frameScore.shift()

    }

    findStrikeOrSpareIndex() {
        const totalFrameScore = this.calculateFrameScore(this.rolls.showRolls())

        if (this.rolls.rollCount() == 1) {
            if (this.strikeIndex == null) {
                
                
                if (totalFrameScore == 10) {
                    this.strikeIndex = this.rolls.showFrames().indexOf(this.rolls.showRolls())
                    return this.strikeIndex
    
                }
            }
        }

        else if (this.rolls.rollCount() == 2) {
            if (this.spareIndex == null) {
                if (totalFrameScore == 10) {
                    this.spareIndex = this.rolls.showFrames().indexOf(this.rolls.showRolls())
                    return this.spareIndex
                }
            }
        }
        
        
        else {
            return null
        }
    }

    readStrikeIndex() {
        return this.strikeIndex
    }

    readSpareIndex() {
        return this.spareIndex
    }

    readListOfScores() {
        return this.listOfScores
    }

    readScore() {
        return this.listOfScores[this.listOfScores.length - 1]
    }

    totalAndAddToListOfScores() {
        const sum = this.calculateFrameScore(this.frameScore[this.frameScore.length - 1])
        const lastFrameScore = this.listOfScores[this.listOfScores.length - 1]
        const total = parseInt(sum) + parseInt(lastFrameScore)
        this.addToListOfScores(total)
    }

    calculateBonusAfterOneStrike() {
        const lastElementListOfScores = this.listOfScores[this.listOfScores.length - 1]
        const strikeFrame = parseInt(this.frameScore[0])
        const nonStrike = this.frameScore[this.frameScore.length - 1]
        const nonStrikeFrameScore = this.calculateFrameScore(nonStrike)
        const total =  strikeFrame + nonStrikeFrameScore
        if (this.listOfScores.length > 0) {
            const newTotal = lastElementListOfScores + total
            this.addToListOfScores(parseInt(newTotal))
        }
        else {
            this.addToListOfScores(total)
        }
        this.strikeIndex = null
        const lastScoreInFrameScore = this.calculateFrameScore(this.frameScore[this.frameScore.length - 1])

        if (lastScoreInFrameScore != 10) {
            this.totalAndAddToListOfScores()
        }

    }

    calculateBonusAfterTwoStrikes() {
        let firstStrike = this.frameScore[0]
        const secondStrike = this.frameScore[1]
        const nonStrike = parseInt(this.frameScore[2])
        const total = secondStrike + parseInt(nonStrike)
        firstStrike += total
        if (this.listOfScores.length > 0) {
            const frameScore = firstStrike + this.listOfScores[this.listOfScores.length - 1]
            this.addToListOfScores(parseInt(frameScore))
            if (!this.frameScore.includes(10)) {
                this.strikeIndex = null
            }
        }

        else {
            this.addToListOfScores(parseInt(firstStrike))
        }
     

    }

    calculateBonusAfterThreeStrikes() {
        
        let firstStrike = this.frameScore[0]
        let secondStrike = parseInt(this.frameScore[1])
        let thirdStrike = parseInt(this.frameScore[2])
        let total = firstStrike += (secondStrike + thirdStrike)
        if (this.listOfScores.length > 0) {
            const score = total + this.listOfScores[this.listOfScores.length - 1]
            this.addToListOfScores(parseInt(score))
        }

        else {
            
            this.addToListOfScores(parseInt(total))
        }

        
        if (!this.frameScore.includes(10)) {
            const nonStrike = this.calculateFrameScore(this.frameScore)
            this.addToListOfScores(parseInt(nonStrike))
        }
    }


    calculateStrike() {
            const bonusFrameIndex = this.readStrikeIndex() + 1
            const bonusFrame = this.rolls.showFrames()[bonusFrameIndex]
            
            if (this.rolls.showFrames().includes(bonusFrame)) {
                if (bonusFrame.length < 2) {
                            this.strikeIndex = bonusFrameIndex
                            if (this.frameScore.length == 2) {
                                this.frameScore.push(parseInt(this.rolls.showRolls()))
                                this.calculateBonusAfterThreeStrikes() 
                            }

                            else {    
                                this.frameScore.push(parseInt(this.rolls.showRolls()))
                            }
                }
                       
                else {
                    this.frameScore.push(this.rolls.showRolls()) 
                   
                    if (this.frameScore.length > 0 && this.frameScore.length <= 2) {
                        this.calculateBonusAfterOneStrike()
                    }

                    else {
                        this.calculateBonusAfterTwoStrikes()
                       
                        if (this.frameScore.includes(10)) {
                            
                            this.calculateBonusAfterOneStrike()
                            
                        }
                    }
                }
            }

            else {
                
                this.frameScore.push(parseInt(this.rolls.showRolls()))
                
            }

    }

    calculateStrikeTenthFrame() {
        
        this.frameScore.push(this.rolls.showRolls())
        
        if (this.frameScore[0] == 10 && this.frameScore[1] == 10) {
            const firstStrike = this.frameScore[0]
            const secondStrike = this.frameScore[0]
            const firstStrikeBonus = this.frameScore[2][0]
            const total = (parseInt(firstStrike) + parseInt(secondStrike)) + parseInt(firstStrikeBonus)
            const lastElement = this.listOfScores[this.listOfScores.length - 1]
            const sum = total + lastElement
            this.addToListOfScores(sum)
        }
        const strikeRoll = parseInt(this.frameScore[0])
        const bonusFrame = this.calculateFrameScore(this.frameScore[1].slice(0,2))
        const total = strikeRoll + bonusFrame
        const lastElement = this.listOfScores[this.listOfScores.length - 1]
        const sum = total + lastElement
        this.addToListOfScores(sum)
        const twoBonusRolls = this.calculateFrameScore(this.frameScore[0])
        const newSum = twoBonusRolls + this.listOfScores[this.listOfScores.length - 1]
        this.addToListOfScores(newSum)

    }

    calculateSpare() {
        const spareBonusFrameIndex = this.readSpareIndex() + 1
        const spareFrameIndex = this.readSpareIndex()
        const bonusFrame = this.rolls.showFrames()[spareBonusFrameIndex]
        const spareFrame = this.rolls.showFrames()[spareFrameIndex]
        if (this.rolls.showFrames().includes(bonusFrame)) {
            this.frameScore.push(bonusFrame)
            const firstRoll = bonusFrame[0]
            const spareFrameScore = (this.calculateFrameScore(spareFrame))
            const bonusScore = firstRoll + spareFrameScore
            if (this.listOfScores.length > 0) {
                const lastElement = this.listOfScores[this.listOfScores.length - 1]
                const total = lastElement + bonusScore
                this.addToListOfScores(total)
            }

            else {
                this.addToListOfScores(bonusScore)
                
            }
            if (this.calculateFrameScore(bonusFrame) == 10) {
                this.spareIndex = spareBonusFrameIndex
            }
            else {
                this.spareIndex = null
                if (this.frameScore.length > 0) {
                    this.totalAndAddToListOfScores()
                }
            }
        }

        else {
            this.frameScore.push(spareFrame)
        }
    }

    calculateSpareAndStrike() {
        if (this.frameScore[0].length == 2) {
            this.frameScore.push(this.rolls.showRolls())
            const first = this.calculateFrameScore(this.frameScore[0])
            const total = first + parseInt(this.frameScore[1])
            this.frameScore.shift()
            this.spareIndex = null
            if (this.listOfScores.length > 0) {
                this.listOfScores.push(this.listOfScores[this.listOfScores.length - 1] + total)
            }
            else {
                this.listOfScores.push(total)
            }
        }

        else {
            this.calculateStrike()
        }
        
    }

    calculate() {
        this.frameCount += 1
        if (this.strikeIndex == null || this.spareIndex == null) {
            this.findStrikeOrSpareIndex()
        }

        if (this.strikeIndex != null  && this.frameCount == 10) {
            this.calculateStrikeTenthFrame()
        }

        else if (this.strikeIndex != null && this.spareIndex != null) {
            this.calculateSpareAndStrike()
        }

        else if (this.strikeIndex != null && this.spareIndex == null) {
            this.calculateStrike()
        }
        

        else if (this.spareIndex != null && this.strikeIndex == null) {
            this.calculateSpare()
           
        }

        else {
           
            const sum = this.calculateFrameScore(this.rolls.showRolls())
            const lastElementOfListOfScores = this.listOfScores[this.listOfScores.length - 1]
            if (this.listOfScores.length > 0) {
                const total = lastElementOfListOfScores + sum
                this.addToListOfScores(total)
            }

            else {
                this.addToListOfScores(sum)
            }
        }
    }
}

module.exports = Scores