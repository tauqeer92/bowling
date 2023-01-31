const Rolls = require('../bowling/rolls')

describe('Roll Count', () => {
    it('should return 0', () => {
        const rolls = new Rolls()
        expect(rolls.rollCount()).toBe(0)
    })
    it('should throw error when input 3 rolls', () => {
        const rolls = new Rolls()
        rolls.roll(1)
        rolls.roll(7)
        expect(() => rolls.roll(3)).toThrow(Error)
    })
})

describe('Correct rolls', () => {
    it('should return 0', () => {
        const rolls = new Rolls()
        expect(rolls.rollCount()).toBe(0)
    })
    it('should should display 1,7', () => {
        const rolls = new Rolls()
        rolls.roll(1)
        rolls.roll(7)
        expect(rolls.showRolls()).toEqual([1,7])
    })
})

