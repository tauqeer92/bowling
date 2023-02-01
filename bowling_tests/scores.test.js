const Scores = require('../bowling/scores')
const Rolls = require('../bowling/rolls')

describe('Score in first frame', () => {
    it('should return 0', () => {
        const rolls = new Rolls()
        const scores = new Scores(rolls)
        expect(scores.readScore()).toBe(0)
    })

})