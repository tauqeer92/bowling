const Rolls = require('../bowling/rolls')

class Scores {

    constructor (rolls) {
        this.rolls = rolls
        this.score = 0
        this.strikeIndex = null
        this.spareIndex = null
        this.listOfScores = []
        this.frames = this.rolls.showFrames()
        this.frameScore = []
        this.frameCount = 0
    }

    sum(array) {
        let sum = 0
        array.forEach((number) => {
            sum += parseInt(number)
        })
        return sum

    }

    strikeOrSpareIndex() {

        if (this.rolls.rollCount() == 1) {
            if (this.strikeIndex == null) {
                this.rolls.calculateFrameScore(this.rolls.showRolls())
                
                if (this.rolls.readFrameScore() == 10) {
                    this.score += this.rolls.readFrameScore()
                    this.strikeIndex = this.rolls.showFrames().indexOf(this.rolls.showRolls())
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
                    this.rolls.clearFrameScore()
                    return this.spareIndex
                }

                else {
                    this.rolls.clearFrameScore()
                }
            }
        }
        
        
        else {
            return 'No strike or spare , strike or spare index'
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

    totalAndAddToListOfScores() {
        const sum = this.sum(this.frameScore[this.frameScore.length - 1])
        const lastElement = this.listOfScores[this.listOfScores.length - 1]
        const total = parseInt(sum) + parseInt(lastElement)
        this.listOfScores.push(parseInt(total))
        this.frameScore.shift()
    }

    calculateBonusAfterOneStrike() {
        const lastElementListOfScores = this.listOfScores[this.listOfScores.length - 1]
        const lastIndex = this.frameScore[this.frameScore.length - 1]
        const total= this.sum(lastIndex)
        const first = parseInt(this.frameScore[0]) + parseInt(total)
        if (this.listOfScores.length > 0) {
            const newTotal = this.listOfScores[this.listOfScores.length - 1] + first
            this.listOfScores.push(parseInt(newTotal))
        }
        else {
            this.listOfScores.push(parseInt(first))

        }
        this.frameScore.shift()
        this.strikeIndex = null
        const sum = this.sum(this.frameScore[this.frameScore.length - 1])

        if (sum != 10) {
            this.totalAndAddToListOfScores()
        }

    }

    calculateBonusAfterTwoStrikes() {
        let first = parseInt(this.frameScore[0])
        const b = parseInt(this.frameScore[1]) + parseInt(this.frameScore[2])
        first += b
        if (this.listOfScores.length > 0) {
            const newElement = first + this.listOfScores[this.listOfScores.length - 1]
            this.listOfScores.push(parseInt(newElement))
            this.frameScore.shift()
            if (!this.frameScore.includes(10)) {
                this.strikeIndex = null
            }
        }

        else {
            this.listOfScores.push(parseInt(first))
            this.frameScore.shift()
        }
     

    }

    calculateThreeStrikes() {
        
        this.frameScore.push(parseInt(this.rolls.showRolls()))
        let total = this.frameScore[0] += (parseInt(this.frameScore[1]) + parseInt(this.frameScore[2]))
        if (this.listOfScores.length > 0) {
            const newElement = total + this.listOfScores[this.listOfScores.length - 1]
            this.listOfScores.push(parseInt(newElement))
            this.frameScore.shift()
        }

        else {
            
            this.listOfScores.push(parseInt(total))
            this.frameScore.shift()
            

        }

        
        if (!this.frameScore.includes(10)) {
            this.sum(this.frameScore) // might need to index ? Test this
            this.listOfScores.push(parseInt(sum))
        }
    }


    calculateStrike() {
        const beforeCurrentBonus = this.rolls.showFrames().indexOf(this.rolls.showRolls()) - 2
            const bonusFrameIndex = this.readStrikeIndex() + 1
            const bonusFrame = this.rolls.showFrames()[bonusFrameIndex]
            
            if (this.rolls.showFrames().includes(bonusFrame)) {
                const previous = this.rolls.showFrames()[beforeCurrentBonus]
                if (bonusFrame.length < 2) {
                    
                            this.strikeIndex = bonusFrameIndex

                            if (this.frameScore.length == 2) {
                                this.calculateThreeStrikes() 
                            }

                            else {
                                
                                this.frameScore.push(parseInt(this.rolls.showRolls()))
                            }
                }
                       
        
                else {
                    this.frameScore.push(this.rolls.showRolls()) 
                   
                    if (this.frameScore.length == 2) {
                        this.calculateBonusAfterOneStrike()
                    }

                    else if (this.frameScore.length == 3) {
                        this.calculateBonusAfterTwoStrikes()
                       
                        if (this.frameScore.includes(10)) {
                            
                            this.calculateBonusAfterOneStrike()
                            
                        }
                    }
                    else {
                        const bonusFrameScore = this.rolls.calculateFrameScore(bonusFrame)
                        this.score += bonusFrameScore * 2 // this doesn't apply anymore
                        this.rolls.clearFrameScore()
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
            const total = (parseInt(this.frameScore[0]) + parseInt(this.frameScore[1])) + parseInt(this.frameScore[2][0])
            const lastElement = this.listOfScores[this.listOfScores.length - 1]
            const sum = total + lastElement
            this.listOfScores.push(sum)
            this.frameScore.shift()
        }
        const frame = this.frameScore[1].slice(0,2)
        const strikeRoll = parseInt(this.frameScore[0])
        const bonusFrame = this.sum(this.frameScore[1].slice(0,2))
        const total = strikeRoll + bonusFrame
        const lastElement = this.listOfScores[this.listOfScores.length - 1]
        const sum = total + lastElement
        this.listOfScores.push(sum)
        this.frameScore.shift()
        const threeRollFrame = this.sum(this.frameScore[0])
        const newSum = threeRollFrame + this.listOfScores[this.listOfScores.length - 1]
        this.listOfScores.push(newSum)

    }

    calculateSpare() {
        let number = 0
        const spareBonusFrameIndex = this.readSpareIndex() + 1
        const spareFrameIndex = this.readSpareIndex()
        const bonusFrame = this.rolls.showFrames()[spareBonusFrameIndex]
        const spareFrame = this.rolls.showFrames()[spareFrameIndex]
        if (this.rolls.showFrames().includes(bonusFrame)) {
            this.frameScore.push(bonusFrame)
            const firstRoll = bonusFrame[0]
            const spareFrameScore = (this.rolls.calculateFrameScore(spareFrame))
            const bonusScore = firstRoll + spareFrameScore
            if (this.listOfScores.length > 0) {
                const lastElement = this.listOfScores[this.listOfScores.length - 1]
                const total = lastElement + bonusScore
                this.listOfScores.push(total)

            }

            else {
                this.listOfScores.push(bonusScore)
                
            }
            this.rolls.clearFrameScore()
            this.frameScore.shift()
            if (this.rolls.calculateFrameScore(bonusFrame) == 10) {
                this.spareIndex = spareBonusFrameIndex
                this.rolls.clearFrameScore()
            }
            else {
                this.spareIndex = null
            }
            if (this.frameScore.length > 0 && this.spareIndex == null) {
                this.totalAndAddToListOfScores()
            }
        }

        else {
            this.frameScore.push(spareFrame)
        }
    }

    calculateSpareAndStrike() {
        if (this.frameScore[0].length == 2) {
            this.frameScore.push(this.rolls.showRolls())
            const first = this.sum(this.frameScore[0])
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
            this.strikeOrSpareIndex()
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
           
            const sum = this.sum(this.rolls.showRolls())
            const lastElement = this.listOfScores[this.listOfScores.length - 1]
            if (this.listOfScores.length > 0) {
                const total = this.listOfScores[this.listOfScores.length - 1] + sum
                this.listOfScores.push(total)
                this.rolls.clearFrameScore()
            }

            else {
                this.listOfScores.push(sum)
                this.rolls.clearFrameScore()

            }
            
            
        }

    }


    readScore() {
        return this.listOfScores[this.listOfScores.length - 1]
    }
}

module.exports = Scores

