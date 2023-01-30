const Frame = require('../bowling/frames')
const Rolls = require('../bowling/rolls')
const Score = require('../bowling/scores')

describe('Frame Count', () => {
    it('should return 0', () => {
        const frame = new Frame()
        expect(frame.frame_count()).toBe(0)
    })
    it('should return 1', () => {
        const frame = new Frame()
        const rolls = new Rolls()
        frame.add_frame()
        expect(frame.frame_count()).toBe(0)
    })
})