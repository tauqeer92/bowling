class Rolls {
    
    constructor () {
        this.frames = []
        this.rolls = []
        this.frameScores = 0
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

    calculateFrameScore(frames) {
        for (let score of frames) {
            this.frameScores += score
        }

        return this.frameScores
    }

    clearFrameScore() {
        this.frameScores = 0
    }

    clearFrame() {
        this.clearFrameScore()
        this.clearRolls()
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
// rolls.addRoll(10)
// rolls.addFrame()
// rolls.clearRolls()
// rolls.addRoll(4)
// rolls.addRoll(4)
// rolls.addFrame()
// rolls.clearRolls()
// console.log(`This is frames ${rolls.showFrames()}`)
// console.log(`This is the last frame ${rolls.showLatestRoll()}`)
// console.log(`This is the frame score ${rolls.calculateFrameScore(rolls.showLatestRoll)}`)
// rolls.addRoll(4)
// rolls.addRoll(4)
// rolls.addFrame()
// console.log(rolls.showFrames())
// console.log(`This is the rolls length ${rolls.showLatestRoll().length}`)
// console.log(rolls.frameCount())
// console.log(rolls.index())
// console.log(rolls.showRolls())
// rolls.addRoll(3)
// rolls.addRoll(3)
// rolls.addRoll(7)
// rolls.addRoll(7)
// rolls.addRoll(7)
// rolls.addRoll(7)
// rolls.addRoll(4)
// console.log(rolls.calculateFrameScore())
// console.log(rolls.rollCount())


module.exports = Rolls;

