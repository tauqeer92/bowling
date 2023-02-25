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
        expect(scores.readStrikeIndex()).toBe(0)
    })

    it('should return 0 when roll a spare', () => {
        const rolls = new Rolls()
        const scores = new Scores(rolls)
        rolls.addRoll(5)
        rolls.addRoll(5)
        rolls.addFrame()
        scores.strikeOrSpareIndex()
        expect(scores.readSpareIndex()).toBe(0)
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
        scores.strikeOrSpareIndex()
        expect(scores.readSpareIndex()).toBe(1)
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
        scores.strikeOrSpareIndex()
        expect(scores.readStrikeIndex(1))
    })
})

describe('Overall score after no strike', () => {
    it('should return 13', () => {
        const rolls = new Rolls()
        const scores = new Scores(rolls)
        rolls.addRoll(8)
        rolls.addRoll(1)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(2)
        rolls.addRoll(2)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        expect(scores.readScore()).toBe(13)
    })
})

describe('Overall score after strike', () => {
    
    it('should return 18 when roll a strike in first frame', () => {
        const rolls = new Rolls()
        const scores = new Scores(rolls)
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(2)
        rolls.addRoll(2)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        expect(scores.readScore()).toBe(18)
    })

    

    it('should return 16 when roll a strike in second frame', () => {
        const rolls = new Rolls()
        const scores = new Scores(rolls)
        rolls.addRoll(3)
        rolls.addRoll(3)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        expect(scores.readScore()).toBe(6)
    })

    it('should return 28 when roll a strike in second frame', () => {
        const rolls = new Rolls()
        const scores = new Scores(rolls)
        rolls.addRoll(3)
        rolls.addRoll(3)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(3)
        rolls.addRoll(3)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        expect(scores.readScore()).toBe(28)
    })

    it('should return 32 when roll a strike in second frame', () => {
        const rolls = new Rolls()
        const scores = new Scores(rolls)
        rolls.addRoll(3)
        rolls.addRoll(3)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(4)
        rolls.addRoll(4)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        expect(scores.readScore()).toBe(32)
    })

})

describe('Overall score after spare', () => {

    it('should return 22 when roll a spare in first frame', () => {
        const rolls = new Rolls()
        const scores = new Scores(rolls)
        rolls.addRoll(5)
        rolls.addRoll(5)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(4)
        rolls.addRoll(4)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        expect(scores.readScore()).toBe(22)
    })

    it('should return 20 when roll a spare in second frame', () => {
        const rolls = new Rolls()
        const scores = new Scores(rolls)
        rolls.addRoll(3)
        rolls.addRoll(3)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(5)
        rolls.addRoll(5)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(1)
        rolls.addRoll(2)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        expect(scores.readScore()).toBe(20)
    })

})

describe('Spare and a strike', () => {
    it('should return x', () => {
        const rolls = new Rolls()
        const scores = new Scores(rolls)
        rolls.addRoll(5)
        rolls.addRoll(5)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(1)
        rolls.addRoll(2)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        expect(scores.readScore()).toBe(36)
    })
})

describe('Two spares in a row', () => {
    it('should return 29 when roll 2 spares in a row', () => {
        const rolls = new Rolls()
        const scores = new Scores(rolls)
        rolls.addRoll(5)
        rolls.addRoll(5)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(5)
        rolls.addRoll(5)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(1)
        rolls.addRoll(2)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        expect(scores.readScore()).toBe(29)
    })

    it('should return 44 when roll 3 spares in a row', () => {
        const rolls = new Rolls()
        const scores = new Scores(rolls)
        rolls.addRoll(5)
        rolls.addRoll(5)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(5)
        rolls.addRoll(5)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(5)
        rolls.addRoll(5)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(1)
        rolls.addRoll(2)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        expect(scores.readScore()).toBe(44)
    })
})

describe('Two strikes in a row', () => {
    it('should return 40 when roll 2 strikes in a roll and then 2 and 2', () => {
        const rolls = new Rolls()
        const scores = new Scores(rolls)
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(2)
        rolls.addRoll(2)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        expect(scores.readScore()).toBe(40)
    })
})

describe('Three strikes in a row', () => {
    it('should return 40 when roll 2 strikes in a roll and then 2 and 2', () => {
        const rolls = new Rolls()
        const scores = new Scores(rolls)
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(10) 
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(2)
        rolls.addRoll(2)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        expect(scores.readScore()).toBe(70)
    })
})

describe('4 strikes in a row', () => {
    it('should return 110 when roll 4 strikes in a roll and then 4 and 4', () => {
        const rolls = new Rolls()
        const scores = new Scores(rolls)
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(4)
        rolls.addRoll(4)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        expect(scores.readScore()).toBe(110)
    })
})



describe('Overall frame scores', () => {
    it('should return 30', () => {
        const rolls = new Rolls()
        const scores = new Scores(rolls)
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        expect(scores.readListOfScores()).toEqual([30])
    })

    it('should return 40', () => {
        const rolls = new Rolls()
        const scores = new Scores(rolls)
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(2)
        rolls.addRoll(2)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        expect(scores.readListOfScores()).toEqual([22, 36, 40])
    })

    it('should return 30', () => {
        const rolls = new Rolls()
        const scores = new Scores(rolls)
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        expect(scores.readListOfScores()).toEqual([30])
    })

    it('should return 70', () => {
        const rolls = new Rolls()
        const scores = new Scores(rolls)
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(2)
        rolls.addRoll(2)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        expect(scores.readListOfScores()).toEqual([30, 52, 66, 70])

    })

    it('should return 121 when mix strikes and spares', () => {
        const rolls = new Rolls()
        const scores = new Scores(rolls)
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(5)
        rolls.addRoll(5)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(5)
        rolls.addRoll(5)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(5)
        rolls.addRoll(5)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(2)
        rolls.addRoll(2)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        expect(scores.readListOfScores()).toEqual([30, 55, 75, 90, 105, 117, 121])

    })
})

describe('Full game', () => {
    it('should return 142', () => {
        const rolls = new Rolls()
        const scores = new Scores(rolls)
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(4)
        rolls.addRoll(4)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(7)
        rolls.addRoll(3)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(1)
        rolls.addRoll(4)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(6)
        rolls.addRoll(3)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(1)
        rolls.addRoll(1)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(2)
        rolls.addRoll(3)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        expect(scores.readScore()).toBe(142)
    })

    it('should return 65', () => {
        const rolls = new Rolls()
        const scores = new Scores(rolls)
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(3)
        rolls.addRoll(2)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(5)
        rolls.addRoll(4)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(3)
        rolls.addRoll(2)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(1)
        rolls.addRoll(1)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(2)
        rolls.addRoll(5)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(6)
        rolls.addRoll(3)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(7)
        rolls.addRoll(2)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(1)
        rolls.addRoll(1)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(1)
        rolls.addRoll(1)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        expect(scores.readScore()).toBe(65)
    })

    it('should return 217', () => {
        const rolls = new Rolls()
        const scores = new Scores(rolls)
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(1)
        rolls.addRoll(1)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(1)
        rolls.addRoll(1)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        expect(scores.readScore()).toBe(217)
    })
})

describe('Extra roll if scored spare in 10th frame', () => {
    it('should return 252', () => {
        const rolls = new Rolls()
        const scores = new Scores(rolls)
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate() 
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate() 
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate() 
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate() 
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate() 
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate() 
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate() 
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate() 
        rolls.clearRolls()
        rolls.addRoll(5)
        rolls.addRoll(5)
        rolls.addFrame()
        scores.calculate() 
        rolls.clearRolls()
        rolls.addRoll(5)
        rolls.addRoll(5)
        rolls.addRoll(2)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        expect(scores.readScore()).toBe(252)
    })

    it('should return 149 when score frame in 10th frame', () => {
        const rolls = new Rolls()
        const scores = new Scores(rolls)
        rolls.addRoll(5)
        rolls.addRoll(5)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(5)
        rolls.addRoll(5)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(5)
        rolls.addRoll(5)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(5)
        rolls.addRoll(5)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(5)
        rolls.addRoll(5)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(5)
        rolls.addRoll(5)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(5)
        rolls.addRoll(5)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(5)
        rolls.addRoll(5)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(5)
        rolls.addRoll(5)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(5)
        rolls.addRoll(5)
        rolls.addRoll(4)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        expect(scores.readScore()).toBe(149)
    })

    it('should return 133, have 3rd roll at the end of 10th frame because scored spare in 2nd roll', () => {
        const rolls = new Rolls()
        const scores = new Scores(rolls)
        rolls.addRoll(1)
        rolls.addRoll(4)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(4)
        rolls.addRoll(5)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(6)
        rolls.addRoll(4)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(5)
        rolls.addRoll(5)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(0)
        rolls.addRoll(1)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(7)
        rolls.addRoll(3)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(6)
        rolls.addRoll(4)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(2)
        rolls.addRoll(8)
        rolls.addRoll(6)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        expect(scores.readScore()).toBe(133)
    })

})

describe('Extra roll if scored strike in 10th frame', () => {
    it('should return 300', () => {
        const rolls = new Rolls()
        const scores = new Scores(rolls)
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate() 
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate() 
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate() 
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate() 
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate() 
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate() 
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate() 
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate() 
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate() 
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addRoll(10)
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        expect(scores.readScore()).toBe(300)
    })
    

    it('should return 245', () => {
        const rolls = new Rolls()
        const scores = new Scores(rolls)
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate() 
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate() 
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate() 
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate() 
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate() 
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate() 
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate() 
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate() 
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate() 
        rolls.clearRolls()
        rolls.addRoll(1)
        rolls.addRoll(1)
        rolls.addFrame()
        scores.calculate() 
        rolls.clearRolls()
        expect(scores.readScore()).toBe(245)
    })

    it('should return 273', () => {
        const rolls = new Rolls()
        const scores = new Scores(rolls)
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate() 
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate() 
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate() 
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate() 
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate() 
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate() 
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate() 
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate() 
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate() 
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addRoll(1)
        rolls.addRoll(1)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        expect(scores.readScore()).toBe(273)
    })

    it('should return 130, have 3rd roll at the end of 10th frame because scored strike in 1st roll of last frame', () => {
        const rolls = new Rolls()
        const scores = new Scores(rolls)
        rolls.addRoll(1)
        rolls.addRoll(4)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(4)
        rolls.addRoll(5)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(6)
        rolls.addRoll(4)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(5)
        rolls.addRoll(5)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(0)
        rolls.addRoll(1)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(7)
        rolls.addRoll(3)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(6)
        rolls.addRoll(4)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        rolls.addRoll(10)
        rolls.addRoll(1)
        rolls.addRoll(1)
        rolls.addFrame()
        scores.calculate()
        rolls.clearRolls()
        expect(scores.readScore()).toBe(130)
    })

})


