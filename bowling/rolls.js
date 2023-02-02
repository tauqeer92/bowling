class Rolls {
    constructor () {
        this.frames = []
        this.rolls = []
        this.frameScores = 0
        this.spareIndex = null
    }

    frameCount() {
        return this.frames.length
    }

    showFrames() {
        return this.frames 
    }
    
    addFrame() {
        this.frames.push(this.rolls)
    }

    readFrameScore() {
        return this.frameScores
    }

    frameScore() {
        for (let score of this.rolls) {
            this.frameScores += score
        }

        return this.frameScores
    }

    clearFrameScore() {
        this.frameScores = 0
    }

    index() {
        this.spareIndex = this.showFrames().indexOf(this.showRolls())
        return this.spareIndex
    }

    rollCount() {
        return this.rolls.length
    }

    addRoll(score) {
        this.rolls.push(score)
    }

    showRolls() {
        return this.rolls
    }

    showLatestRoll() {
        return this.frames[this.frames.length -1]
    }

    clearRolls() {
        this.rolls = []
    }

}


// const rolls = new Rolls()
// rolls.addRoll(5)
// rolls.addRoll(5)
// rolls.addFrame()
// console.log(rolls.frameCount())
// console.log(rolls.index())
// console.log(rolls.showRolls())
// console.log(rolls.showFrames())
// rolls.addRoll(3)
// rolls.addRoll(3)
// rolls.addRoll(7)
// rolls.addRoll(7)
// rolls.addRoll(7)
// rolls.addRoll(7)
// rolls.addRoll(4)
// console.log(rolls.frameScore())
// console.log(rolls.rollCount())


module.exports = Rolls;

