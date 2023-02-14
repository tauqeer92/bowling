const Rolls = require('../bowling/rolls')

class Scores {

    constructor (rolls) {
        this.rolls = rolls
        this.score = 0
        this.strikeIndex = null
        this.spareIndex = null
        this.listOfScores = []
        this.waitingArea = {}
        this.frames = this.rolls.showFrames()
        this.frameTotal = 0
        this.frameScore = []
    }

    sum (array) {
        let sum = 0
        while (array.length > 0) {
            array.forEach((number) => {
                console.log(`This is number ${number}`)
                sum += parseInt(number)
            })
            console.log(`This is sum ${sum}`)

        }

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
            
            if (this.rolls.showFrames().includes(bonusFrame)) {
                const previous = this.rolls.showFrames()[beforeCurrentBonus]
                if (bonusFrame.length < 2) {
                            this.strikeIndex = bonusFrameIndex
                            if (this.frameScore.length == 2) {
                                this.frameScore.push(parseInt(this.rolls.showRolls()))
                                console.log('B')
                                console.log(`This is the first element ${this.frameScore[0]}`)
                                console.log(`This is the second element ${this.frameScore[1]}`)
                                console.log(`This is the third element ${this.frameScore[2]}`)
                                this.frameScore[0] += (parseInt(this.frameScore[1]) + parseInt(this.frameScore[2]))
                                this.listOfScores.push(parseInt(this.frameScore[0]))
                                this.frameScore.shift()
                                if (!this.frameScore.includes(10)) {
                                    this.sum(this.frameScore)
                                    this.listOfScores.push(parseInt(sum))
                                }
                                // write a for loop here
                            }

                            else {
                                console.log('Hi')
                                this.frameScore.push(parseInt(this.rolls.showRolls()))
                                this.strikeIndex = bonusFrameIndex
                            }
                            console.log(`This is the strike index ${this.strikeIndex}`)
                            console.log(`This is the score ${this.score}`)
                            console.log(`This is the list of scores ${this.listOfScores}`)
                            console.log(`This is the frame scores ${this.frameScore}`)
                }
                       
        
                else {
                    console.log('C')
                    console.log(`This is the rolls ${this.rolls.showRolls()}`)
                    this.frameScore.push(this.rolls.showRolls())
                    console.log(`This is frame score ${this.frameScore}`)
                    
                    if (this.frameScore.length == 2) {
                        console.log(`This is frame score ${this.frameScore}`)
                        const lastIndex = this.frameScore[this.frameScore.length - 1]
                        console.log(`This is lastIndex ${lastIndex}`)
                        const total= this.sum(lastIndex)
                        console.log(`This is total ${parseInt(total)}`)
                        console.log(`This is the last frame ${this.frameScore[this.frameScore.length - 1]}`)
                        const first = this.frameScore[0] + total
                        this.listOfScores.push(parseInt(first))
                        this.strikeIndex = null


                    }

                    else if (this.frameScore.length == 3) {
                        console.log('J')
                        console.log(`This is frame score ${this.frameScore}`)
                        const b = parseInt(this.frameScore[1]) + parseInt(this.frameScore[2])
                        let first = parseInt(this.frameScore[0])
                        console.log(`This is b ${b}`)
                        first += b
                        console.log(`This is first ${first}`)
                        console.log(`This is the list of scores ${this.listOfScores}`)
                        if (this.listOfScores.length > 0) {
                            const newElement = first + this.listOfScores[0]
                            this.listOfScores.push(parseInt(newElement))
                            this.frameScore.shift()
                            this.strikeIndex = null
                            this.rolls.clearFrameScore()
                        }

                        else {
                            this.listOfScores.push(parseInt(first))
                            this.frameScore.shift()

                        }
                        
                        
                        console.log(`This is the frame score array ${this.frameScore}`)
                        console.log(`This is the list of scores ${this.listOfScores}`)
                        console.log(`This is the frame score array length ${this.frameScore.length}`)
                        if (this.frameScore.includes(10)) {
                            console.log('Ping')
                            console.log(`This is the first element ${this.frameScore[0]}`)
                            console.log(`This is the second element ${this.frameScore[1]}`)
                            const total = this.frameScore[0] += (parseInt(this.rolls.calculateFrameScore(this.frameScore[1])))
                            const newTotal = this.listOfScores[this.listOfScores.length - 1] + total
                            this.listOfScores.push(parseInt(newTotal))
                            this.frameScore.shift()
                            console.log(`This is the list of scores ${this.listOfScores}`)

                            if (!this.frameScore.includes(10)) {
                                this.rolls.clearFrameScore()
                                console.log(`This is the first element ${this.frameScore[0]}`)
                                const j = this.rolls.calculateFrameScore(this.frameScore[0])
                                const x = this.listOfScores[this.listOfScores.length - 1]
                                console.log(`This is x ${x}`)
                                console.log(`This is j ${j}`)
                                const hello = x + j
                                this.listOfScores.push(parseInt(hello))
                                this.frameScore.shift()
                            }
                        }
                    }
                    else {
                        const bonusFrameScore = this.rolls.calculateFrameScore(bonusFrame)
                        this.score += bonusFrameScore * 2
                        this.rolls.clearFrameScore()
                    }
                }
            }

            else {
                this.frameScore.push(parseInt(this.rolls.showRolls()))
                console.log(`Ping! This is the frame scores ${this.frameScore}`)
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
rolls.addRoll(5)
rolls.addRoll(5)
rolls.addFrame()
scores.calculate()
rolls.clearRolls()
rolls.addRoll(2)
rolls.addRoll(2)
rolls.addFrame()
scores.calculate()
rolls.clearRolls()
console.log(scores.readListOfScores())
console.log(scores.readScore())

module.exports = Scores

