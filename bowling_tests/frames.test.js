const Frame = require('../bowling/frames')
const Rolls = require('../bowling/rolls')
const Score = require('../bowling/scores')

describe('Frame Count', () => {
    it('should return 0', () => {
        const rolls = new Rolls()
        const frame = new Frame()
        expect(frame.frameCount()).toBe(0)
    })

    it('should return 1 frame when input 1 roll', () => {
        const rolls = new Rolls()
        const frame = new Frame()
        rolls.roll(1)
        frame.addRolls(rolls)
        expect(frame.frameCount()).toBe(1)
    })

    it('should return 1 frame when input 2 rolls', () => {
        const rolls = new Rolls()
        const frame = new Frame()
        rolls.roll(1)
        rolls.roll(7)
        frame.addRolls(rolls)
        expect(frame.frameCount()).toBe(1)
    })
    it('should return 2 frames when input 4 rolls', () => {
        const rolls = new Rolls()
        const frame = new Frame()
        rolls.roll(1)
        rolls.roll(7)
        frame.addRolls(rolls) // why do I input rolls here and as a dependency injection, way to simplify?
        rolls.roll(8)
        rolls.roll(9)
        frame.addRolls(rolls)
        expect(frame.frameCount()).toBe(2)
    })
})

describe('Accurate rolls in frame', () => {
    it('should return rolls 2 and 5', () => {
        const rolls = new Rolls()
        const frame = new Frame()
        rolls.roll(2)
        rolls.roll(5)
        frame.addRolls(rolls)
        expect(frame.showFrames()).toBe([[2,5]])

    })
})
