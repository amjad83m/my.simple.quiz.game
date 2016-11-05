# my.simple.quiz.game
JavaScript Module - Week 3 Assignment - My Simple Quiz Game

This is my own JS implementation of a simple online quiz game. I'm using objects and JSON to create and store the
quiz data (each Quiz object consists of a question, 4 possible answers, and a right answer). I'm also using a custom
timer to create a deadline for each question, keeping track of the moment when the user answers, and then calculate a 
corresponding score. The questions in this version are all about Computer Science but new question and topics can be 
added easily (planned future update).

## Usage
The UI is so descriptive, you start the game by clicking the "Start Game" button, and you can reset the game by
pressing it again (starting a new game and ignoring the current one). Each question has a limit of 20 seconds to
be answered. If not, the score of this question is 0 and the next question is loaded automatically.
When answering, the score of the question is calculated according to the time when it was answered, as follows:

* 5 seconds or less, score is 10 (highest score)
* Between 6 and 10 seconds, score is 8
* Between 11 and 15 seconds, score is 6
* Between 16 and 20 seconds, score is only 4 (lowest score)

When there are no more questions, the game ends, and the total score is displayed.

## History
* 4/11/2016 The initial version.

## Planned Updates
* Adding the possibility to choose how many questions there are for each time the game is played.
* Adding the possibility to choose different quiz subjects (categories).
* Adding the possibility to register users (membership), and keeping track of their score.
* Adding the possibility to add valid questions/answers to the game by registered users.

## Live Version
You can test a working demo [here](https://amjad83m.github.io/my.simple.quiz.game/).

## Credits
Code and design by [Amjad Muhammad](https://github.com/amjad83m).
