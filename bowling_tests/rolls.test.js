const Rolls = require('../bowling/rolls')

describe('Roll Count', () => {
    it('should return 0', () => {
        const rolls = new Rolls()
        expect(rolls.roll_count()).toBe(0)
    })
})