const Scores = require('../bowling/scores')
const Rolls = require('../bowling/rolls')

describe('Score in first frame', () => {

    it('should return 0', () => {
        const rolls = new Rolls()
        const scores = new Scores(rolls)
        expect(scores.calculateScore()).toBe(0)
    })

    it('should return 9', () => {
        const rolls = new Rolls()
        rolls.addRoll(5)
        rolls.addRoll(4)
        rolls.frameScore()
        const scores = new Scores(rolls)
        expect(scores.calculateAddFrame(9))
    })

    it('should return 0', () => {
        const rolls = new Rolls()
        rolls.addRoll(10)
        rolls.addRoll(2)
        rolls.addRoll(2)
        const scores = new Scores(rolls)
        expect(scores.calculateScore()).toBe(18)
    })

})