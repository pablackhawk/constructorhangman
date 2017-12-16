// Dependencies
const inquirer = require('inquirer')
const isLetter = require('is-letter')
var Word = require('./words.js')
var Game = require('./game.js')
let hangmanDisplay = Game.newWord.hangman

// set maxListener
require('events').EventEmitter.prototype._maxListeners = 100

let hangman = {
  wordBank: Game.newWord.wordList,
  guessesLeft: 10,
  guessedLetters: [],
  display: 0,
  currentWord: null,
  startGame: function () {
    let selection = this
    if (this.guessedLetters.length > 0) {
      this.guessedLetters = []
    }
    inquirer.prompt([{
      name: 'play',
      type: 'confirm',
      message: 'Would you like to play?'
    }]).then(function (answer) {
      if (answer.play) {
        selection.newGame()
      } else {
        console.log('Ok....')
      }
    })
  },
  newGame: function () {
    if (this.guessesLeft === 10) {
      console.log('Here we gooooo!')
      console.log('-------------------')
      let randomNum = Math.floor(Math.random() * this.wordBank.length)
      this.currentWord = new Word(this.wordBank[randomNum])
      this.currentWord.getLetters()
      console.log(this.currentWord.wordShow())
      this.keepPromptingUser()
    } else {
      this.resetGuessesLeft()
      this.newGame()
    }
  },
  resetGuessesLeft: function () {
    this.guessesLeft = 10
  },
  keepPromptingUser: function () {
    let selection = this
    inquirer.prompt([{
      name: 'chosenLetter',
      type: 'input',
      message: 'Choose a letter!: ',
      validate: function (value) {
        if (isLetter(value)) {
          return true
        } else {
          return false
        }
      }
    }]).then(function (ltr) {
      let letterReturned = (ltr.chosenLetter).toUpperCase()
      let alreadyGuessed = false
      for (var i = 0; i < selection.guessedLetters.length; i++) {
        if (letterReturned === selection.guessedLetters[i]) {
          alreadyGuessed = true
        }
      }
      if (alreadyGuessed === false) {
        selection.guessedLetters.push(letterReturned)
        let found = selection.currentWord.checkLetter(letterReturned)
        if (found === 0) {
          console.log('Incorrect letter.')
          selection.guessesLeft--
          selection.display++
          console.log('Guesses left: ' + selection.guessesLeft)
          console.log(hangmanDisplay[(selection.display) - 1])
          console.log('\n-------------------')
          console.log(selection.currentWord.wordShow())
          console.log('\n-------------------')
          console.log('Letters guessed: ' + selection.guessedLetters)
        } else {
          console.log('Correct!')
          if (selection.currentWord.wordCheck() === true) {
            console.log(selection.currentWord.wordShow())
            console.log('Congratulations! You won!')
          } else {
            console.log('Guesses left: ' + selection.guessesLeft)
            console.log(selection.currentWord.wordShow())
            console.log('\n-------------------')
            console.log('Letters used: ' + selection.guessedLetters)
          }
        }
        if (selection.guessesLeft > 0 && selection.currentWord.wordFound === false) {
          selection.keepPromptingUser()
        } else if (selection.guessesLeft === 0) {
          console.log('Game Over!')
          console.log('The word was: ' + selection.currentWord.word)
        }
      } else {
        console.log('You\'ve already used that letter. Try again.')
        selection.keepPromptingUser()
      }
    })
  }
}

hangman.startGame()
