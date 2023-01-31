const Rolls = require('../bowling/rolls')


class Frames {
    constructor() {
        this.frames = []
    }

    addRolls(rolls) {
        this.frames.push(rolls)
    }


    frameCount() {
        return this.frames.length
    }

    showFrames() {

        return this.frames.map((roll) => {
            console.log(roll.showRolls())

        })
    }
}

// const frame = new Frames()
// const rolls = new Rolls()
// rolls.roll(5)
// rolls.roll(5)
// frame.addRolls(rolls)
// rolls.roll(5)
// rolls.roll(5)
// frame.addRolls(rolls)
// console.log(frame.showFrames())


module.exports = Frames;

