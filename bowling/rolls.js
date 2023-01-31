class Rolls {
    constructor () {
        this.frames = []
        this.rolls = []
    }

    frameCount() {
        return this.frames.length
    }

    rollCount() {
        return this.rolls.length
    }

    addRoll(score) {
        this.rolls.push(score)

        if (this.rollCount() == 2) {
            this.frames.push(this.rolls)
            this.rolls = []
        }
    }

    showRolls() {
        return this.rolls
    }

    showFrames() {
        return this.frames 
    }

    showLatestRoll() {
        return this.frames[this.frames.length -1]
    }

    clearRolls() {
        this.rolls = []
    }

}


// const rolls = new Rolls()
// rolls.addRoll(1)
// rolls.addRoll(1)
// rolls.addRoll(3)
// rolls.addRoll(3)
// rolls.addRoll(7)
// rolls.addRoll(7)
// rolls.addRoll(7)
// rolls.addRoll(7)
// rolls.addRoll(4)
// console.log(rolls.showFrames())
// console.log(rolls.showRolls())

module.exports = Rolls;

