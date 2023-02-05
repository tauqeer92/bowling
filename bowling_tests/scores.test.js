const Scores = require('../bowling/scores')
const Rolls = require('../bowling/rolls')

describe('Strike or spare index in frame array', () => {

    it('should return 0 when roll a strike', () => {
        const rolls = new Rolls()
        const scores = new Scores(rolls)
        rolls.addRoll(10)
        rolls.addFrame()
        scores.strikeOrSpareIndex()
        rolls.clearRolls()
        rolls.addRoll(4)
        rolls.addRoll(4)
        rolls.addFrame()
        expect(scores.readStrikeOrSpareIndex()).toBe(0)
    })

    it('should return 0 when roll a spare', () => {
        const rolls = new Rolls()
        rolls.addRoll(5)
        rolls.addRoll(5)
        rolls.addFrame()
        const scores = new Scores(rolls)
        expect(scores.strikeOrSpareIndex()).toBe(0)
    })

    it('should return 1 when roll a spare', () => {
        const rolls = new Rolls()
        rolls.addRoll(4)
        rolls.addRoll(4)
        rolls.addFrame()
        rolls.clearRolls()
        rolls.addRoll(5)
        rolls.addRoll(5)
        rolls.addFrame()
        const scores = new Scores(rolls)
        expect(scores.strikeOrSpareIndex()).toBe(1)
    })


    it('should return 1 roll a strike', () => {
        const rolls = new Rolls()
        rolls.addRoll(4)
        rolls.addRoll(4)
        rolls.addFrame()
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        const scores = new Scores(rolls)
        expect(scores.strikeOrSpareIndex(1))
    })
})

describe('Bonus score after strike or spare', () => {
    
    it('should return 18 when roll a strike', () => {
        const rolls = new Rolls()
        const scores = new Scores(rolls)
        rolls.addRoll(10)
        rolls.addFrame()
        scores.strikeOrSpareIndex()
        rolls.clearRolls()
        rolls.addRoll(2)
        rolls.addRoll(2)
        rolls.addFrame()
        rolls.clearRolls()
        expect(scores.calculate()).toBe(18)
    })

    it('should return 22 when roll a spare', () => {
        const rolls = new Rolls()
        const scores = new Scores(rolls)
        rolls.addRoll(5)
        rolls.addRoll(5)
        rolls.addFrame()
        scores.strikeOrSpareIndex()
        rolls.clearRolls()
        rolls.addRoll(4)
        rolls.addRoll(4)
        rolls.addFrame()
        rolls.clearRolls()
        expect(scores.calculate()).toBe(22)
    })
})


