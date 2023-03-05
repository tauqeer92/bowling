// const Scores = require('../backend/bowling/scores.js')
// const Rolls = require('../backend/bowling/rolls.js')

// const rolls = new Rolls()
// const scores = new Scores(rolls)

class Play {
    constructor() {
        this.scores = document.querySelectorAll('.score');
        this.rolls = document.querySelectorAll('.roll')
        
    }

    roll() {
        
        this.scores.forEach(score => {
            score.addEventListener('click', () => {
                console.log('Hello')
                let i = 0
                for (let i = 0; i < this.rolls.length; i++) {
                    if (this.rolls[i].innerHTML == "") {
                        console.log('A')
                        console.log(i)
                        this.rolls[i].append(score.value)
                        break
                    }
                }
            })
        })

    }
}


module.exports = Play;