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
        this.frameScore.shift()
    }

    calculateBonusAfterOneStrike() {
        const lastElementListOfScores = this.listOfScores[this.listOfScores.length - 1]
        console.log('Calculating bonus After One Strike')
        const lastIndex = this.frameScore[this.frameScore.length - 1]
        const total= this.sum(lastIndex)
        const first = parseInt(this.frameScore[0]) + parseInt(total)
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
        const sum = this.sum(this.frameScore[this.frameScore.length - 1])
        console.log(`This is the list of scoresssssss ${this.listOfScores}`)
        console.log(`This is the frame scoresssssss ${this.frameScore}`)

        console.log(`This is the sum ${this.sum(this.frameScore[this.frameScore.length - 1])}`)

        if (sum != 10) {
            console.log(`It didnt equal 10`)
            this.totalAndAddToListOfScores()
        }

    }

    new(array) {
        this.frameScore.push(array)
        let sum = 0
        this.frameScore[this.frameScore.length - 1].forEach((number) => {
            console.log(this.frameScore)
            sum += parseInt(number)
        })
        return sum



    }

    calculateBonusAfterTwoStrikes() {
        console.log(`called calculate bonus after 2 strikes`)
        console.log(`This is the frame score ${this.frameScore}`)
        let first = parseInt(this.frameScore[0])
        console.log(`This is first element ${first}`)
        const b = parseInt(this.frameScore[1]) + parseInt(this.frameScore[2])
        console.log(`This is the second element ${this.frameScore[1]}`)
        console.log(`This is the third element ${this.frameScore[2]}`)
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
            console.log('AAAAAAAAAA')
            const newElement = total + this.listOfScores[this.listOfScores.length - 1]
            console.log(`This is new element ${newElement}`)
            this.listOfScores.push(parseInt(newElement))
            this.frameScore.shift()
        }

        else {
            console.log('BBBBBBBBBBB')
            this.listOfScores.push(parseInt(total))
            this.frameScore.shift()
            console.log(`This is the list of scores in calculate bonus after 2 strikes ${this.listOfScores}`)

        }

        
        if (!this.frameScore.includes(10)) {
            this.sum(this.frameScore) // might need to index ? Test this
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
                        this.score += bonusFrameScore * 2 // this doesn't apply anymore
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

    calculateStrikeTenthFrame() {
        const firstTwoRolls = this.rolls.showRolls().slice(0, 2)
    }

    calculateSpare() {
        let number = 0
        const spareBonusFrameIndex = this.readSpareIndex() + 1
        const spareFrameIndex = this.readSpareIndex()
        const bonusFrame = this.rolls.showFrames()[spareBonusFrameIndex]
        const spareFrame = this.rolls.showFrames()[spareFrameIndex]
        console.log(`This is the spare index ${this.spareIndex}`)
        if (this.rolls.showFrames().includes(bonusFrame)) {
            console.log('x')
            console.log(`This is the frame Score ${this.frameScore}`)
            
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
            console.log(`This is the frame score ${this.frameScore}`)
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
        console.log(`This is the list of scores ${this.listOfScores}`)
        console.log(`This is the frame scores ${this.frameScores}`)

    }

    calculateSpareAndStrike() {
        if (this.frameScore[0].length == 2) {
            this.frameScore.push(this.rolls.showRolls())
            console.log(`This is the frame score ${this.frameScore}`)
            const first = this.sum(this.frameScore[0])
            console.log(`This is firsttttttt ${first}`)
            const total = first + parseInt(this.frameScore[1])
            console.log(`This is total ${total}`)
            this.frameScore.shift()
            this.spareIndex = null
            if (this.listOfScores.length > 0) {
                console.log('Hiya')
                this.listOfScores.push(this.listOfScores[this.listOfScores.length - 1] + total)
            }
            else {
                this.listOfScores.push(total)
            }

            console.log(`This is the frame score ${this.frameScore}`)
            console.log(`This is the list of scores ${this.listOfScores}`)

        }

        else {
            this.calculateStrike()
        }
        
    }

    calculate() {
        console.log('')
        console.log('Start of calculate function')
        if (this.strikeIndex == null || this.spareIndex == null) {
            console.log('Called strike or spare Index')
            this.strikeOrSpareIndex()
        }

        if (this.strikeIndex != null && this.spareIndex != null) {
            console.log('HELLOOOOOOO')
            this.calculateSpareAndStrike()
        }

        else if (this.strikeIndex != null && this.spareIndex == null) {
            console.log(`Theres a strike index`)
            this.calculateStrike()
        }
        

        else if (this.spareIndex != null && this.strikeIndex == null) {
            console.log(`There is a spare index`)
            this.calculateSpare()
           
        }

        else {
           
            const sum = this.sum(this.rolls.showRolls())
            const lastElement = this.listOfScores[this.listOfScores.length - 1]
            console.log(`This is sum ${sum}`)
            console.log(`This is last element ${lastElement}`)
            if (this.listOfScores.length > 0) {
                const total = this.listOfScores[this.listOfScores.length - 1] + sum
                this.listOfScores.push(total)
                this.rolls.clearFrameScore()
            }

            else {
                this.listOfScores.push(sum)
                this.rolls.clearFrameScore()

            }
            
            console.log(`This is the list of scores ${this.listOfScores}`)
        }

        console.log(`This is the frame score ${this.frameScore}`)

    }


    readScore() {
        return this.listOfScores[this.listOfScores.length - 1]
    }
}


const rolls = new Rolls()
const scores = new Scores(rolls)
rolls.addRoll(1)
rolls.addRoll(4)
rolls.addFrame()
scores.calculate()
rolls.clearRolls()
rolls.addRoll(4)
rolls.addRoll(5)
rolls.addFrame()
scores.calculate()
rolls.clearRolls()
rolls.addRoll(6)
rolls.addRoll(4)
rolls.addFrame()
scores.calculate()
rolls.clearRolls()
rolls.addRoll(5)
rolls.addRoll(5)
rolls.addFrame()
scores.calculate()
rolls.clearRolls()
rolls.addRoll(10)
rolls.addFrame()
scores.calculate()
rolls.clearRolls()
rolls.addRoll(0)
rolls.addRoll(1)
rolls.addFrame()
scores.calculate()
rolls.clearRolls()
rolls.addRoll(7)
rolls.addRoll(3)
rolls.addFrame()
scores.calculate()
rolls.clearRolls()
rolls.addRoll(6)
rolls.addRoll(4)
rolls.addFrame()
scores.calculate()
rolls.clearRolls()
rolls.addRoll(10)
rolls.addFrame()
scores.calculate()
rolls.clearRolls()
rolls.addRoll(2)
rolls.addRoll(8)
rolls.addFrame()
scores.calculate()
rolls.clearRolls()
rolls.addRoll(6)
rolls.addFrame()
scores.calculate()
rolls.clearRolls()
console.log(scores.readListOfScores())
console.log(scores.readScore())
// console.log(scores.frameScore)
// console.log(scores.new([5,5]))

module.exports = Scores

