class Play {
    constructor(rolls, scores) {
        this.pins = document.querySelectorAll('.score');
        this.frameRolls = document.querySelectorAll('.roll')
        this.frameScore = document.querySelectorAll('.frame-score')
        this.totalScore = document.querySelector('.total-score')
        this.rolls = rolls
        this.scores = scores
    }

    // When I score 10, it's not added to list of scores yet, so this.scores.readScore() is undefined
    // If I index the roll in the rolls class array this.frames, if there's multiple 10's in the array, it will just index the first one
    // I need to make the score unique in this class, by having an array of objects
    // Or I can use the div by finding out which frame it is, index the the list of scores array if it exists and it to the frame score

    roll() {
        console.log(this.frameScore)
        this.pins.forEach(score => {
            score.addEventListener('click', () => {
                for (let i = 0; i < this.frameRolls.length; i++) {
                    if (this.frameRolls[i].innerHTML == "") {
                        this.frameRolls[i].append(score.value)
                        break
                    }
                }
                this.rolls.addRoll(parseInt(score.value))

                if (this.rolls.rollCount() == 2) {
                    console.log('A')
                    console.log(`This is the frame score ${this.rolls.showFrames()}`)
                    this.rolls.addFrame()
                    this.scores.calculate()
                    this.rolls.clearRolls()
                    console.log(this.rolls.showFrames())
                    console.log(this.scores.readScore())
                    for (let i = 0; i < this.frameScore.length; i++) {
                        if (this.frameScore[i].innerHTML == "") {
                            this.frameScore[i].append(this.scores.readScore())
                            break
                        }
                    
                    }
                    this.totalScore.innerHTML = this.scores.readScore()
                }
                
            })
        })

    }
}


module.exports = Play;