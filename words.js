var Letter = require('./letter.js')

function Word (wrd) {
  let selection = this
  this.word = wrd
  this.letters = []
  this.wordFound = false

  this.getLetters = function () {
    for (var i = 0; i < selection.word.length; i++) {
      var newLetter = new Letter(selection.word[i])
      this.letters.push(newLetter)
    }
  }

  this.wordCheck = function () {
    if (this.letters.every(function (lttr) {
      return lttr.appear === true
    })) {
      this.wordFound = true
      return true
    }
  }
  this.checkLetter = function (guessedLetter) {
    let whatToReturn = 0
    this.letters.forEach(function (lttr) {
      if (lttr.letter === guessedLetter) {
        lttr.appear = true
        whatToReturn++
      }
    })
    return whatToReturn
  }
  this.wordShow = function () {
    let display = ''
    selection.letters.forEach(function (lttr) {
      let currentLetter = lttr.letterShow()
      display += currentLetter
    })
    return display
  }
}
module.exports = Word
