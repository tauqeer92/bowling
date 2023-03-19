class Play {
    constructor(rolls, scores) {
        this.pins = document.querySelectorAll('.score');
        this.individualFrame = document.querySelectorAll('.frame');
        this.frameRolls = document.querySelectorAll('.frame .rolls .roll');
        this.frameScore = document.querySelectorAll('.frame-score');
        this.totalScore = document.querySelector('.total-score');
        this.rolls = rolls;
        this.scores = scores;
        this.index = [];
    }

    hidePins(score) {
        if (score != 10) {
           for (let i = 0; i <= 10; i++) {
              if (i + parseInt(score) > 10) {
                document.querySelector(`button[value="${i}"]`).disabled = true
              }
           }
        }
    }

    resetPins() {
        this.pins.forEach(pin => {
            pin.disabled = false
        })
    }

    addFinalScore() {
        this.totalScore.innerHTML = this.scores.readScore()
    }

    handleFirstStrike(frame, score) {
        this.individualFrame[frame].querySelector('.roll.two').append(score)
        this.rolls.addRoll(parseInt(score))
        this.rolls.addFrame()
        this.scores.calculate()
        this.rolls.clearRolls()
        this.index.push(frame)
    }

    addFrame(frame, score) {
        this.rolls.addRoll(parseInt(score))
        console.log(this.rolls.showRolls())
        this.rolls.addFrame()
        this.scores.calculate()
        this.rolls.clearRolls()
        this.individualFrame[frame].querySelector('.roll.two').append(score);
        this.individualFrame[frame].querySelector('.frame-score').append(this.scores.readScore())
        this.addFinalScore()
        this.resetPins()

    }

    handleSpare(frame) {
        
        this.rolls.clearRolls()
        this.rolls.clearFrameScore()
        this.index.push(frame)
        this.resetPins()

    }

    addThirdRoll(frame, score) {
        this.rolls.addRoll(parseInt(score))
        this.rolls.addFrame()
        this.scores.calculate()
        this.individualFrame[frame].querySelector('.roll.three').append(score)
        this.rolls.clearFrameScore()
        this.addFinalScore()
        this.individualFrame[frame].querySelector('.frame-score').append(this.scores.readScore())
    }

    handleFirstTwoRollsLessThanTen(frame, score) {
        this.addFrame(frame, score);
    }
    
    handleFirstTwoRollsMoreThanTen(frame, score) {
        this.individualFrame[frame].querySelector('.roll.two').append(score);
        
            this.rolls.addRoll(parseInt(score));
            this.resetPins();
    }

    tenthFrame(frame, score) {

               
        if (this.isFirstRollInTenthFrame(frame)) {
            this.handleFirstRoll(frame, score)
        }

        else if (this.isSecondRoll(frame)) {
            if (this.isFirstTwoRollsMoreThanTen(frame, score)) {
                this.handleFirstTwoRollsMoreThanTen(frame, score)
            }
            else {
                this.handleFirstTwoRollsLessThanTen(frame, score)
            }
        }

        else { 
            if (!this.hasThirdRoll(frame) && this.isMoreThanTen(frame)) {
                this.addThirdRoll(frame, score)
            }
        }
    }

    isFirstTwoRollsLessThanTen(frame, score) {
        return this.individualFrame[frame].querySelector('.rolls .roll.one').innerHTML == "" &&
               this.individualFrame[frame].querySelector('.rolls .roll.two').innerHTML == "" &&
               score != 10;
    }

    isMoreThanTen(frame) {
        return this.rolls.calculateFrameScore(this.rolls.showRolls()) >= 10 && this.individualFrame[frame].querySelector('.rolls .roll.one').innerHTML != "" &&
        this.individualFrame[frame].querySelector('.rolls .roll.two').innerHTML != ""
    }
    
    
    isFirstTwoRollsMoreThanTen(frame, score) {
        return this.individualFrame[frame].querySelector('.rolls .roll.one').innerHTML != "" &&
               this.individualFrame[frame].querySelector('.rolls .roll.two').innerHTML == "" &&
               parseInt(this.rolls.showRolls()[0]) + parseInt(score) >= 10;
    }
    
    handleThirdRoll(frame, score) {
        let amount = this.rolls.showRolls();
        if (this.rolls.calculateFrameScore(amount) >= 10) {
            this.addThirdRoll(frame, score);
        }
    }
    

    isSecondRoll(frame) {
        return this.individualFrame[frame].querySelector('.rolls .roll.one').innerHTML != "" && this.individualFrame[frame].querySelector('.rolls .roll.two').innerHTML == ""
    }

    isFirstRollInTenthFrame(frame) {
        return this.individualFrame[frame].querySelector('.rolls .roll.one').innerHTML == ""

    }
    
    hasThirdRoll(frame) {
        return this.individualFrame[frame].querySelector('.rolls .roll.three').innerHTML != "";
    }
    
    isFirstStrike(frame, score) {
        return this.individualFrame[frame].querySelector('.rolls .roll.one').innerHTML == "" &&
               this.individualFrame[frame].querySelector('.rolls .roll.two').innerHTML == "" &&
               score == 10;
    }
    
    
    
    handleFirstRoll(frame, score) {
        this.individualFrame[frame].querySelector('.roll.one').append(score);
        this.rolls.addRoll(parseInt(score));
        this.hidePins(score);
    }

    isNoStrike(frame, score) {
        return this.individualFrame[frame].querySelector('.rolls .roll.one').innerHTML == "" && this.individualFrame[frame].querySelector('.rolls .roll.two').innerHTML == "" && score != 10
    }

    handleSecondRollInNormalFrame(frame, score) {
        this.individualFrame[frame].querySelector('.roll.two').append(score)
        this.rolls.addRoll(parseInt(score))
        this.rolls.addFrame()
        this.scores.calculate()
        if (this.rolls.calculateFrameScore(this.rolls.showRolls()) == 10 && this.rolls.rollCount() == 2) {
            this.handleSpare(frame)
            
            

        } else {
            this.rolls.clearRolls()
            this.rolls.clearFrameScore()
            this.individualFrame[frame].querySelector('.frame-score').append(this.scores.readScore())
            this.totalScore.innerHTML = this.scores.readScore()
            this.resetPins()
        }

    }
    

    calculate(score) {
        for (let frame = 0; frame <= this.individualFrame.length - 1; frame++) {
            if (frame != 9 ) {
                if (this.isFirstStrike(frame, score)) {
                    this.handleFirstStrike(frame, score)
                    break
                }
                
                else if (this.isNoStrike(frame, score)) {
                    
                    this.handleFirstRoll(frame, score)
                    break
                    
                }
                
                else {
                    if (this.isSecondRoll(frame, score)) {
                      this.handleSecondRollInNormalFrame(frame, score)
                      break 
                    }
                }
            }

            else {
                this.tenthFrame(frame, score)
            }
            
        }

    }



    roll() {
        this.pins.forEach(score => {
            score.addEventListener('click', () => {
                
                this.calculate(score.value)

                if (this.index.length > 0) {
                    for (let i = 0; i <= this.index.length; i++) {
                        if (this.scores.readListOfScores()[this.index[i]] != undefined) {
                            
                            this.individualFrame[this.index[i]].querySelector('.frame-score').append(this.scores.readListOfScores()[this.index[i]])
                            this.totalScore.innerHTML = this.scores.readScore()
                            
                            this.index[i] = null
                            
                            
                        }
    
                    }
                }
                
            })
        })

    }
}


module.exports = Play;