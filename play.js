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

    addFirstRoll(frame, score) {
        this.individualFrame[frame].querySelector('.roll.one').append(score)
        this.rolls.addRoll(parseInt(score))
        this.hidePins(score)
    }

    addStrike(frame, score) {
        this.individualFrame[frame].querySelector('.roll.two').append(score)
        this.rolls.addRoll(parseInt(score))
        this.rolls.addFrame()
        this.scores.calculate()
        this.rolls.clearRolls()
        this.index.push(frame)
    }

    addFrame(frame, score) {
        console.log('ABC')
        this.rolls.addRoll(parseInt(score))
        this.rolls.addFrame()
        this.scores.calculate()
        this.rolls.clearRolls()
        this.individualFrame[frame].querySelector('.frame-score').append(this.scores.readScore())
        this.addFinalScore()
        this.resetPins()

    }

    addSpare(frame) {
        
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
        if (parseInt(score) != 10) {
            this.individualFrame[frame].querySelector('.frame-score').append(this.scores.readScore())
        }
        

    }

    tenthFrame(i, score) {
        
            if (this.individualFrame[i].querySelector('.rolls .roll.three').innerHTML != "") {
                console.log('A')
                
            }
            // if it's the first strike in 10th frame
            else if (this.individualFrame[i].querySelector('.rolls .roll.one').innerHTML == "" && this.individualFrame[i].querySelector('.rolls .roll.two').innerHTML == "" && score == 10) {
                console.log('B')
                this.individualFrame[i].querySelector('.roll.one').append(score)
                this.rolls.addRoll(parseInt(score))
                this.index.push(i)
            }

            else if (this.individualFrame[i].querySelector('.rolls .roll.one').innerHTML == "" && this.individualFrame[i].querySelector('.rolls .roll.two').innerHTML == "" && score != 10) {
                console.log('C')
                this.individualFrame[i].querySelector('.roll.one').append(score)
                this.rolls.addRoll(parseInt(score))
                this.hidePins(score)
            }

            // second roll, if the rolls add up to be more than or equal to 10. its not added to a frame, if isn't, it's added to a frame
            // this is checking if you can do a third roll
            else if (this.individualFrame[i].querySelector('.rolls .roll.one').innerHTML != "" && this.individualFrame[i].querySelector('.rolls .roll.two').innerHTML == "") {
                console.log('D')
                this.individualFrame[i].querySelector('.roll.two').append(score)
                let firstRoll = this.rolls.showRolls()[0]
                let total = parseInt(firstRoll) + parseInt(score)
                
                if (total >= 10) {
                    this.rolls.addRoll(parseInt(score))
                    this.resetPins()
                }
                else {
                    this.addFrame(i, score)
                    
                }
            }

            // this handles the third roll

            else if (this.individualFrame[i].querySelector('.rolls .roll.one').innerHTML != "" && this.individualFrame[i].querySelector('.rolls .roll.two').innerHTML != "") {
                
                let amount = this.rolls.showRolls()
                if (this.rolls.calculateFrameScore(amount) >= 10) {
                    this.addThirdRoll(i, score)
                    
                    
                }
            }

            // if there's a normal roll in the first roll in 10th frame
            else if (this.individualFrame[i].querySelector('.rolls .roll.one').innerHTML == "" && this.individualFrame[i].querySelector('.rolls .roll.two').innerHTML == "") {
                this.individualFrame[i].querySelector('.roll.one').append(score)
                this.rolls.addRoll(parseInt(score.value))
                this.hidePins(score)
            }
        
    

    }

    calculate(score) {
        for (let i = 0; i <= this.individualFrame.length - 1; i++) {
            console.log(`This is ${i}`)
            if (i != 9 ) {
                if (this.individualFrame[i].querySelector(`.rolls .roll.one`).innerHTML == "" && this.individualFrame[i].querySelector('.rolls .roll.two').innerHTML == "" && score == 10) {
                    console.log(`This is the frames ${this.individualFrame.forEach(frame => {console.log(frame)})}`)
                                
                    this.addStrike(i, score)
                    break
                    
                
                }
                // if theres a normal roll it adds it to roll one if its not 10
                else if (this.individualFrame[i].querySelector('.rolls .roll.one').innerHTML == "" && this.individualFrame[i].querySelector('.rolls .roll.two').innerHTML == "" && score != 10) {
                    
                    this.addFirstRoll(i, score)
                    break
                    
                }
                // if there's a normal roll it adds it to roll two if its not 10
                else if (this.individualFrame[i].querySelector('.rolls .roll.one').innerHTML != "" && this.individualFrame[i].querySelector('.rolls .roll.two').innerHTML == "" && score != 10) {
                    
                    this.individualFrame[i].querySelector('.roll.two').append(score)
                    
                    
                    this.rolls.addRoll(parseInt(score))
                    this.rolls.addFrame()
                    this.scores.calculate()
                    if (this.rolls.calculateFrameScore(this.rolls.showRolls()) == 10 && this.rolls.rollCount() == 2) {
                        this.addSpare(i)
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

            else {
                this.tenthFrame(i, score)
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