// Stores letters
var Letter = function (letter) {
  this.letter = letter
  // Checks to see if letter can be displayed
  this.appear = false

  this.letterShow = function () {
    if (this.letter === ' ') {
      // Error checks to make sure blank not read as false
      this.appear = true
      return ' '
    } else if (this.appear === false) {
      return '_'
    } else {
      return this.letter
    }
  }
}

module.exports = Letter
