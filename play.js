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



    roll() {
        this.pins.forEach(score => {
            score.addEventListener('click', () => {
                for (let i = 0; i <= this.individualFrame.length - 1; i++) {
                    
                    if (i == 9) {

                        if (this.individualFrame[i].querySelector('.rolls .roll.three').innerHTML != "") {
                            break
                        }
                        // if it's the first strike in 10th frame
                        else if (this.individualFrame[i].querySelector('.rolls .roll.one').innerHTML == "" && this.individualFrame[i].querySelector('.rolls .roll.two').innerHTML == "" && score.value == 10) {
                            this.individualFrame[i].querySelector('.roll.one').append(score.value)
                            this.rolls.addRoll(parseInt(score.value))
                            this.index.push(i)
                        }

                        else if (this.individualFrame[i].querySelector('.rolls .roll.one').innerHTML == "" && this.individualFrame[i].querySelector('.rolls .roll.two').innerHTML == "" && score.value != 10) {
                            console.log('ABC')
                            this.individualFrame[i].querySelector('.roll.one').append(score.value)
                            this.rolls.addRoll(parseInt(score.value))
                            this.hidePins(score.value)
                        }

                        // second roll, if the rolls add up to be more than or equal to 10. its not added to a frame, if isn't, it's added to a frame
                        // this is checking if you can do a third roll
                        else if (this.individualFrame[i].querySelector('.rolls .roll.one').innerHTML != "" && this.individualFrame[i].querySelector('.rolls .roll.two').innerHTML == "") {
                            this.individualFrame[i].querySelector('.roll.two').append(score.value)
                            let firstRoll = this.rolls.showRolls()[0]
                            let total = parseInt(firstRoll) + parseInt(score.value)
                            
                            if (total >= 10) {
                                this.rolls.addRoll(parseInt(score.value))
                                this.resetPins()
                            }
                            else {
                                this.rolls.addRoll(parseInt(score.value))
                                this.rolls.addFrame()
                                this.scores.calculate()
                                this.rolls.clearRolls()
                                this.individualFrame[i].querySelector('.frame-score').append(this.scores.readScore())
                                this.addFinalScore()
                                break
                            }
                        }

                        // this handles the third roll

                        else if (this.individualFrame[i].querySelector('.rolls .roll.one').innerHTML != "" && this.individualFrame[i].querySelector('.rolls .roll.two').innerHTML != "") {
                            
                            let amount = this.rolls.showRolls()
                            if (this.rolls.calculateFrameScore(amount) >= 10) {
                                this.rolls.addRoll(parseInt(score.value))
                                this.rolls.addFrame()
                                this.scores.calculate()
                                this.individualFrame[i].querySelector('.roll.three').append(score.value)
                                this.rolls.clearFrameScore()
                                this.individualFrame[i].querySelector('.frame-score').append(this.scores.readScore())
                                this.addFinalScore()
                                break
                            }

                            else {
                                break
                            }

                        }

                         // if there's a normal roll in the first roll in 10th frame
                        else if (this.individualFrame[i].querySelector('.rolls .roll.one').innerHTML == "" && this.individualFrame[i].querySelector('.rolls .roll.two').innerHTML == "") {
                            this.individualFrame[i].querySelector('.roll.one').append(score.value)
                            this.rolls.addRoll(parseInt(score.value))
                            this.hidePins(score.value)
                        }
                        // if there's a normal roll in the second roll in 10th frame
                        else if (this.individualFrame[i].querySelector('.rolls .roll.one').innerHTML != "" && this.individualFrame[i].querySelector('.rolls .roll.two').innerHTML == "") {
                            this.individualFrame[i].querySelector('.roll.two').append(score.value)
                            this.rolls.addRoll(parseInt(score.value))
                            this.rolls.addFrame()
                            this.scores.calculate()
                            this.rolls.clearRolls()
                            this.resetPins()
                        }
                        
                    }

                    else {

                        // if there's a strike in a frame
                        if (this.individualFrame[i].querySelector('.rolls .roll.one').innerHTML == "" && this.individualFrame[i].querySelector('.rolls .roll.two').innerHTML == "" && score.value == 10) {
                        
                     
                            this.individualFrame[i].querySelector('.roll.two').append(score.value)
                            this.rolls.addRoll(parseInt(score.value))
                            this.rolls.addFrame()
                            this.scores.calculate()
                            this.rolls.clearRolls()
                            this.index.push(i)
                            break
                        
                        }
                        // if theres a normal roll it adds it to roll one if its not 10
                        else if (this.individualFrame[i].querySelector('.rolls .roll.one').innerHTML == "" && this.individualFrame[i].querySelector('.rolls .roll.two').innerHTML == "" && score.value != 10) {
                            
                            this.individualFrame[i].querySelector('.roll.one').append(score.value)
                            this.rolls.addRoll(parseInt(score.value))
                            this.hidePins(score.value)
                            break
                        }
                        // if there's a normal roll it adds it to roll two if its not 10
                        else if (this.individualFrame[i].querySelector('.rolls .roll.one').innerHTML != "" && this.individualFrame[i].querySelector('.rolls .roll.two').innerHTML == "" && score.value != 10) {
                            
                            this.individualFrame[i].querySelector('.roll.two').append(score.value)
                            
                            this.rolls.addRoll(parseInt(score.value))
                            this.rolls.addFrame()
                            this.scores.calculate()
                                
                            if (this.rolls.calculateFrameScore(this.rolls.showRolls()) == 10 && this.rolls.rollCount() == 2) {
                                this.rolls.clearRolls()
                                this.rolls.clearFrameScore()
                                this.index.push(i)
                                this.resetPins()
                                break

                            } else {
                                this.rolls.clearRolls()
                                this.rolls.clearFrameScore()
                                this.individualFrame[i].querySelector('.frame-score').append(this.scores.readScore())
                                this.totalScore.innerHTML = this.scores.readScore()
                                this.resetPins()
                                break
                            }
                            
                        }

                    }


                    
                }

                if (this.index.length > 0) {
                    for (let i = 0; i <= this.index.length; i++) {
                        
                        if (this.scores.readListOfScores()[this.index[i]] != undefined) {
                            
                            this.individualFrame[this.index[i]].querySelector('.frame-score').append(this.scores.readListOfScores()[this.index[i]])
                            this.totalScore.innerHTML = this.scores.readScore()
                            
                            this.index[i] = null
                            
                            
                        }

                        else {
                            console.log('YOOOOOOOO')
                        }
    
                    }
                }
                
            })
        })

    }
}


module.exports = Play;