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
        console.log(this.frameScore)
        this.pins.forEach(score => {
            score.addEventListener('click', () => {
                for (let i = 0; i < this.individualFrame.length; i++) {
                    console.log('A')
                    if (this.individualFrame[i].querySelector('.rolls .roll.one').innerHTML == "" && this.individualFrame[i].querySelector('.rolls .roll.two').innerHTML == "" && score.value == 10) {
                        console.log('B')
                        this.individualFrame[i].querySelector('.roll.two').append(score.value)
                        this.rolls.addRoll(parseInt(score.value))
                        this.rolls.addFrame()
                        this.scores.calculate()
                        this.rolls.clearRolls()
                        console.log('C')
                        this.index.push(i)
                        break
                    }

                    else if (this.individualFrame[i].querySelector('.rolls .roll.one').innerHTML == "" && this.individualFrame[i].querySelector('.rolls .roll.two').innerHTML == "" && score.value != 10) {
                        this.individualFrame[i].querySelector('.roll.one').append(score.value)
                        this.rolls.addRoll(parseInt(score.value))
                        break
                    }

                    else if (this.individualFrame[i].querySelector('.rolls .roll.one').innerHTML != "" && this.individualFrame[i].querySelector('.rolls .roll.two').innerHTML == "" && score.value != 10) {
                        this.individualFrame[i].querySelector('.roll.two').append(score.value)
                        this.rolls.addRoll(parseInt(score.value))
                        this.rolls.addFrame()
                        this.scores.calculate()
                        this.rolls.clearRolls()
                        this.individualFrame[i].querySelector('.frame-score').append(this.scores.readScore())
                        break
                    }
                }

                if (this.index.length > 0) {
                    this.index.forEach(index => {
                        if (index != null && this.scores.readListOfScores()[index] != undefined) {
                            console.log('Hellooooooooooooooooo')
                            console.log(`This is the list of scores ${this.scores.readListOfScores()}`)
                            console.log(`This is the score in list of scores ${this.scores.readListOfScores()[index]}`)
                            this.individualFrame[index].querySelector('.frame-score').append(this.scores.readListOfScores()[index])
                            this.index.shift()
                            console.log(`This is the index ${this.index}`)
        
                        }
    
                    })
                }
                
                
                
            })
        })

    }
}


module.exports = Play;