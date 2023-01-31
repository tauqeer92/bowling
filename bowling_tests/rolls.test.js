const Rolls = require('../bowling/rolls')

describe('Frame Count', () => {
    it('should return 0', () => {
        const rolls = new Rolls()
        expect(rolls.frameCount()).toBe(0)
    })

    it('should return 0 when input 1 roll', () => {
        const rolls = new Rolls()
        rolls.addRoll(1)
        expect(rolls.frameCount()).toBe(0)
    })

    it('should return 1 frame when input 2 rolls', () => {
        const rolls = new Rolls()
        rolls.addRoll(1)
        rolls.addRoll(7)
        expect(rolls.frameCount()).toBe(1)
    })
    it('should return 2 frames when input 4 rolls', () => {
        const rolls = new Rolls()
        rolls.addRoll(1)
        rolls.addRoll(7)
        expect(rolls.frameCount()).toBe(1)
    })
})

describe('Frames array', () => {
    it('should return rolls 5 and 1', () => {
        const rolls = new Rolls()
        rolls.addRoll(5)
        rolls.addRoll(1)
        expect(rolls.showFrames()).toEqual([[5, 1]])
    })

    it('should should display 1,7 when accessing last frame', () => {
        const rolls = new Rolls()
        rolls.addRoll(1)
        rolls.addRoll(7)
        expect(rolls.showLatestRoll()).toEqual([1,7])
    })
})

describe('Accurate rolls in 1 frame', () => {
    it('should return 2 rolls', () => {
        const rolls = new Rolls()
        rolls.addRoll(2)
        expect(rolls.showRolls()).toEqual([2])
    })
        
    it('should show 3 when roll for thrid time', () => {
        const rolls = new Rolls()
        rolls.addRoll(1)
        rolls.addRoll(7)
        rolls.addRoll(3)
        expect(rolls.showRolls()).toEqual([3])
    })

})

describe('Roll Count', () => {
    it('should return 0', () => {
        const rolls = new Rolls()
        expect(rolls.rollCount()).toBe(0)
    })

    it('should return 1', () => {
        const rolls = new Rolls()
        rolls.addRoll(1)
        expect(rolls.rollCount()).toBe(1)
    })
})

