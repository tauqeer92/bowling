const Scores = require('./scores.js')
const Rolls = require('./rolls.js')

const rolls = new Rolls()
const scores = new Scores(rolls)

const Play = require('./play')

const play = new Play(rolls, scores)

play.roll()