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
    }

    sumAndRemove (array) {
        let sum = 0
        while (array.length > 0) {
            array.forEach((number) => {
                sum += parseInt(number)
            })
        }

        return sum
    }

    sum(array) {
        let sum = 0
        array.forEach((number) => {
            sum += parseInt(number)
        })
        return sum

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

    readListOfScores() {
        return this.listOfScores
    }

    totalAndAddToListOfScores() {
        console.log(`This is the first element in the frame score ${this.frameScore[0]}`)
        console.log(`This is the frame score ${this.frameScore}`)
        console.log('A')
        const sum = this.sum(this.frameScore[this.frameScore.length - 1])
        console.log(`This is the sum ${parseInt(sum)}`) 
        const lastElement = this.listOfScores[this.listOfScores.length - 1]
        const total = parseInt(sum) + parseInt(lastElement)
        this.listOfScores.push(parseInt(total))
    }

    calculateBonusAfterOneStrike() {
        const lastElementListOfScores = this.listOfScores[this.listOfScores.length - 1]
        console.log('Calculating bonus After One Strike')
        const lastIndex = this.frameScore[this.frameScore.length - 1]
        const total= this.sum(lastIndex)
        const first = this.frameScore[0] + total
        console.log(`This is first ${first}`)
        if (this.listOfScores.length > 0) {
            const newTotal = this.listOfScores[this.listOfScores.length - 1] + first
            this.listOfScores.push(parseInt(newTotal))
        }
        else {
            this.listOfScores.push(parseInt(first))

        }
        this.frameScore.shift()
        this.strikeIndex = null
        console.log(`This is the list of scoresssssss ${this.listOfScores}`)
        
        this.totalAndAddToListOfScores()

    }

    calculateBonusAfterTwoStrikes() {
        console.log(`called calculate bonus after 2 strikes`)
        console.log(`This is the frame score ${this.frameScore}`)
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
            console.log(`This is the list of scores in calculate bonus after 2 strikes ${this.listOfScores}`)

        }
     

    }

    calculateThreeStrikes() {
        console.log(`Called 3 strikes method`)
        this.frameScore.push(parseInt(this.rolls.showRolls()))
        console.log(`This is the frame score ${this.frameScore}`)
        let total = this.frameScore[0] += (parseInt(this.frameScore[1]) + parseInt(this.frameScore[2]))
        console.log(`This is total ${total}`)
    

        if (this.listOfScores.length > 0) {
            const newElement = total + this.listOfScores[0]
            console.log(`This is new element ${newElement}`)
            this.listOfScores.push(parseInt(newElement))
            this.frameScore.shift()
        }

        else {
            this.listOfScores.push(parseInt(total))
            this.frameScore.shift()
            console.log(`This is the list of scores in calculate bonus after 2 strikes ${this.listOfScores}`)

        }

        
        if (!this.frameScore.includes(10)) {
            this.sum(this.frameScore)
            this.listOfScores.push(parseInt(sum))
        }

        console.log(`This is the score in 3 strikes ${this.readScore()}`)
        console.log(`This is the list of scores ${this.listOfScores}`)
        console.log(`This is frame score ${this.frameScore}`)
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
                    console.log(`This is the frame score ${this.frameScore}`)
                    
                   
                    if (this.frameScore.length == 2) {
                        console.log('About to call bonusAfterOneStrike')
                        this.calculateBonusAfterOneStrike()
                    }

                    else if (this.frameScore.length == 3) {
                        console.log('Bbbbbbbbb')
                        
                        this.calculateBonusAfterTwoStrikes()
                       
                        if (this.frameScore.includes(10)) {
                            console.log(`This is the frame score ${this.frameScore}`)
                            this.calculateBonusAfterOneStrike()
                            console.log(`This is the list of scores ${this.listOfScores}`)
                            
                        }
                    }
                    else {
                        console.log('C')
                        console.log(`This is frame score ${this.frameScore}`)
                        const bonusFrameScore = this.rolls.calculateFrameScore(bonusFrame)
                        this.score += bonusFrameScore * 2
                        this.rolls.clearFrameScore()
                    }
                }
            }

            else {
                console.log(`added to frame score`)
                this.frameScore.push(parseInt(this.rolls.showRolls()))
                console.log(`This is the frame score ${this.frameScore}`)
            }

    }

    calculateSpare() {
        const spareBonusIndex = this.readSpareIndex() + 1
        const bonusFrame = this.rolls.showFrames()[spareBonusIndex]
        if (this.rolls.showFrames().includes(bonusFrame)) { 
            const firstRoll = bonusFrame[0]
            const score = (this.rolls.calculateFrameScore(bonusFrame))
            const bonusScore = firstRoll + score
            const bonus = this.score+=(firstRoll + score)
            if (score == 10) {
                this.spareIndex = spareBonusIndex
                this.rolls.clearFrameScore()
            }
            else {
                this.spareIndex = null
            }
            return this.score
        }

    }

    calculate() {
        console.log('')
        console.log('Start of calculate function')
        if (this.strikeIndex == null || this.spareIndex == null) {
            console.log('Called strike or spare Index')
            this.strikeOrSpareIndex()
        }

        if (this.strikeIndex != null) {
            console.log(`Theres a strike index`)
            this.calculateStrike()
        }
        

        else if (this.spareIndex != null) {
            this.calculateSpare()
           
        }

        else {
           
            const sum = this.sum(this.rolls.showRolls())
            this.listOfScores.push(sum)
            console.log(`This is the list of scores ${this.listOfScores}`)
        }

    }


    readScore() {
        return this.listOfScores[this.listOfScores.length - 1]
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
rolls.addRoll(10)
rolls.addFrame()
scores.calculate()
rolls.clearRolls()
rolls.addRoll(4)
rolls.addRoll(4)
rolls.addFrame()
scores.calculate()
rolls.clearRolls()
console.log(scores.readListOfScores())
console.log(scores.readScore())

module.exports = Scores

