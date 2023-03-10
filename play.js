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
                for (let i = 0; i <= this.individualFrame.length; i++) {
                    // if theres a strike
                    console.log(i)
                    // && this.rolls.calculateFrameScore(this.rolls.showRolls()) >= 10 && this.rolls.rollCount() == 2
                    // && this.individualFrame[i].querySelector('.rolls .roll.two').innerHTML != "" 

                    // this loop stops at 9, if we click again, it will go on to 10 and there is no indexed frame 10

                    if (i == 9 && this.individualFrame[i].querySelector('.rolls .roll.one').innerHTML != "" && this.individualFrame[i].querySelector('.rolls .roll.two').innerHTML != "") {
                        console.log('WHY AINT IT WORKING')
                        let amount = this.rolls.showLatestRoll()
                        console.log(`This is the amount ${amount}`)
                        this.rolls.addRoll(parseInt(score.value))
                        this.rolls.addFrame()
                        this.scores.calculate()
                        console.log('1')
                        console.log(`This is the frame score ${this.rolls.calculateFrameScore(this.rolls.showRolls())}`)
                        
                        if (this.rolls.calculateFrameScore(amount) >= 10 && amount.length == 2) {
                            console.log('AYE')
                            this.individualFrame[i].querySelector('.roll.three').append(score.value)
                            this.rolls.clearFrameScore()
                            break
                        }
                        
                    }


                    if (this.individualFrame[i].querySelector('.rolls .roll.one').innerHTML == "" && this.individualFrame[i].querySelector('.rolls .roll.two').innerHTML == "" && score.value == 10) {
                        console.log('x')
                        this.individualFrame[i].querySelector('.roll.two').append(score.value)
                        this.rolls.addRoll(parseInt(score.value))
                        this.rolls.addFrame()
                        this.scores.calculate()
                        this.rolls.clearRolls()
                        this.index.push(i)
                        console.log(`THIS. IS. INDEX ${this.index}`)
                        break
                    }
                    // if theres a normal roll it adds it to roll one if its not 10
                    else if (this.individualFrame[i].querySelector('.rolls .roll.one').innerHTML == "" && this.individualFrame[i].querySelector('.rolls .roll.two').innerHTML == "" && score.value != 10) {
                        console.log('A')
                        this.individualFrame[i].querySelector('.roll.one').append(score.value)
                        this.rolls.addRoll(parseInt(score.value))
                        break
                    }
                    // if there's a normal roll it adds it to roll two if its not 10
                    else if (this.individualFrame[i].querySelector('.rolls .roll.one').innerHTML != "" && this.individualFrame[i].querySelector('.rolls .roll.two').innerHTML == "" && score.value != 10) {
                        console.log('B')
                        this.individualFrame[i].querySelector('.roll.two').append(score.value)
                        console.log(`This is the read score ${this.scores.readScore()}`)
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

                if (this.index.length > 0) {
                    for (let i = 0; i < this.index.length; i++) {
                        console.log(`THIS IS THE INDEXXX ${this.index[i]}`)
                        console.log(`This is the index ${this.index[i]}`)
                        if (this.scores.readListOfScores()[this.index[i]] != undefined) {
                            console.log('Hellooooooooooooooooo')
                            console.log(`This is the list of scores ${this.scores.readListOfScores()}`)
                            console.log(`This is the score in list of scores ${this.scores.readListOfScores()[this.index[i]]}`)
                            console.log(`This the indexed list of scores ${this.scores.readListOfScores()[this.index[i]]}`)
                            this.individualFrame[this.index[i]].querySelector('.frame-score').append(this.scores.readListOfScores()[this.index[i]])
                            console.log(`This is the index before the shift ${this.index[i]}`)
                            this.index[i] = null
                            console.log(`This is index list ${this.index}`)
                            console.log(`This is the index ${this.index[i]}`)
        
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