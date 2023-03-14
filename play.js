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

    

    roll() {
        this.pins.forEach(score => {
            score.addEventListener('click', () => {
                for (let i = 0; i <= this.individualFrame.length - 1; i++) {
                    console.log(`THISSSSSSS ISSSSSSSS I ${i} `)

                    // console.log(`This is read scores ${this.scores.readListOfScores()}`)
                    
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

                        // second roll, if the rolls add up to be more than or equal to 10. its not added to a frame, if isn't, it's added to a frame
                        else if (this.individualFrame[i].querySelector('.rolls .roll.one').innerHTML != "" && this.individualFrame[i].querySelector('.rolls .roll.two').innerHTML == "") {
                            this.individualFrame[i].querySelector('.roll.two').append(score.value)
                            let firstRoll = this.rolls.showRolls()[0]
                            let total = parseInt(firstRoll) + parseInt(score.value)
                            console.log(`This is total ${total}`)
                            if (total >= 10) {
                                this.rolls.addRoll(parseInt(score.value))
                            }
                            else {
                                this.rolls.addRoll(parseInt(score.value))
                                this.rolls.addFrame()
                                this.scores.calculate()
                                this.rolls.clearRolls()
                                this.individualFrame[i].querySelector('.frame-score').append(this.scores.readScore())
                                break
                            }
                        }

                        else if (this.individualFrame[i].querySelector('.rolls .roll.one').innerHTML != "" && this.individualFrame[i].querySelector('.rolls .roll.two').innerHTML != "") {
                            let amount = this.rolls.showRolls()
                        
                            
                            
                            
                            if (this.rolls.calculateFrameScore(amount) >= 10 && amount.length == 2) {
                                this.rolls.addRoll(parseInt(score.value))
                                this.rolls.addFrame()
                                this.scores.calculate()
                                
                                this.individualFrame[i].querySelector('.roll.three').append(score.value)
                                this.rolls.clearFrameScore()
                                this.individualFrame[i].querySelector('.frame-score').append(this.scores.readScore())
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
                        }
                        // if there's a normal roll in the second roll in 10th frame
                        else if (this.individualFrame[i].querySelector('.rolls .roll.one').innerHTML != "" && this.individualFrame[i].querySelector('.rolls .roll.two').innerHTML == "") {
                            this.individualFrame[i].querySelector('.roll.two').append(score.value)
                            this.rolls.addRoll(parseInt(score.value))
                            this.rolls.addFrame()
                            this.scores.calculate()
                            this.rolls.clearRolls()
                        }

                        // the third roll in the tenth frame if you score a strike in the first
                        // else if (this.individualFrame[i].querySelector('.rolls .roll.one').innerHTML != "" && this.individualFrame[i].querySelector('.rolls .roll.two').innerHTML != "") {
                        //     this.individualFrame[i].querySelector('.roll.three').append(score.value)
                        //     this.rolls.addRoll(parseInt(score.value))
                        //     this.rolls.addFrame()
                        //     this.scores.calculate()
                        //     this.rolls.clearRolls()
                        //     // this.individualFrame[i].querySelector('.frame-score').append(this.scores.readScore())
                        //     break
                        // }

                        
                       

                        
                        // if there's a spare, in the second roll in 10th frame, adds it to the third roll div
                       

                        

                       

                        

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
                                break

                            } else {
                                this.rolls.clearRolls()
                                this.rolls.clearRolls()
                                this.rolls.clearFrameScore()
                                this.individualFrame[i].querySelector('.frame-score').append(this.scores.readScore())
                                break
                            }
                            
                        }

                    }


                    
                }

                if (this.index.length > 0) {
                    console.log('A')
                    for (let i = 0; i <= this.index.length; i++) {
                        
                        if (this.scores.readListOfScores()[this.index[i]] != undefined) {
                            
                            this.individualFrame[this.index[i]].querySelector('.frame-score').append(this.scores.readListOfScores()[this.index[i]])
                            
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