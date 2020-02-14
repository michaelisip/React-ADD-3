import React, { Component } from 'react'

import Keypad from '../keypad/keypad'
import './play.css'

class Play extends Component {

    constructor(props) {
        super(props)
        this.state = {
            gameClock: 60,
            guestClock: 4,
            score: 0,
            randomNumber: '',
            playerAnswer: '',
            playerName: localStorage.getItem("playerName") || this.props.location.playerName
        }
        this.generateNewRandomNumber = this.generateNewRandomNumber.bind(this)
        this.updateClocks = this.updateClocks.bind(this)
        this.resetGuessClock = this.resetGuessClock.bind(this)
        this.clearPlayerAnswer = this.clearPlayerAnswer.bind(this)
        this.keypadClicked = this.keypadClicked.bind(this)
        this.updatePlayerAnswer = this.updatePlayerAnswer.bind(this)
        this.submitAnswer = this.submitAnswer.bind(this)
        this.gameOver = this.gameOver.bind(this)
    }

    componentDidMount() {
        // this.updateClocks()
        this.generateNewRandomNumber()
        if (! localStorage.getItem("playerName")) {
          localStorage.setItem("playerName", this.props.location.playerName)
        }
    }

    generateNewRandomNumber() {
        this.setState({
            randomNumber: Math.floor(1000 + Math.random() * 9000)
        })
    }

    updateClocks() {
        this.interval = setInterval(() => {
            this.setState(({ gameClock, guestClock }) => ({
                gameClock: gameClock - 1,
                guestClock: guestClock - 1
            }))
            if (this.state.guestClock === 0) {
                this.resetGuessClock()
                this.generateNewRandomNumber()
            }
            if (this.state.gameClock === 0) {
                clearInterval(this.interval)
                this.gameOver()
            }
        }, 1000)
    }

    resetGuessClock() {
        this.setState({
            guestClock: 4,
            playerAnswer: ''
        })
        this.generateNewRandomNumber()
    }

    clearPlayerAnswer() {
      this.setState({
        playerAnswer: ''
      })
    }

    keypadClicked(value) {
      this.setState(({ playerAnswer }) => ({
        playerAnswer: playerAnswer.toString() + value.toString()
      }), () => {
        if(this.state.playerAnswer.toString().length === 4) {
            this.submitAnswer()
        }
      })
    }

    updatePlayerAnswer(e) {
      e.preventDefault()
      this.setState({
          playerAnswer: e.target.value
      }, () => {
          if(this.state.playerAnswer.toString().length === 4) {
              this.submitAnswer()
          }    
      })
    }

    submitAnswer() {
        const correctAnswer = this.state.randomNumber
                                .toString()
                                .split('')
                                .map((num) => {
                                    const digitAnswer = parseInt(num) + 3
                                    return digitAnswer > 9 ? digitAnswer - 10 : digitAnswer
                                })
                                .join("")

        if (this.state.playerAnswer === correctAnswer) {
            console.error("Yes")
            this.setState(({score}) => ({
                score: score + 1
            }))
        } else {
            console.error("No")
            // Wrong answer
        }
        this.resetGuessClock()
    }

    gameOver() {
        const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
        fetch(`${API_ENDPOINT}/scores`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: this.state.playerName,
            score: this.state.score
          })
        })
        .then((response) => console.log(response))
        .catch((err) => console.error(err))
    }

    render() {
        return (
            <div className="container">
                <div id="game-info">
                    <span> Gametime: {this.state.gameClock} </span>
                    <span> Score: {this.state.score} </span>
                </div>

                <div className="d-flex justify-content-center flex-column h-100">
                    <h1 className="text-center mb-5 random-number">
                        {this.state.randomNumber}
                    </h1>
                    <div className="input-group input-group-lg">
                        <input 
                            type="number"
                            name="answer"
                            className="form-control text-center"
                            value={this.state.playerAnswer}
                            onChange={this.updatePlayerAnswer}
                            autoFocus
                        />
                    </div>
                    <div id="keypads" className="align-self-end text-center mt-5">
                      <Keypad digit="1" onClick={this.keypadClicked} />
                      <Keypad digit="2" onClick={this.keypadClicked} />
                      <Keypad digit="3" onClick={this.keypadClicked} />
                      <Keypad digit="4" onClick={this.keypadClicked} />
                      <Keypad digit="5" onClick={this.keypadClicked} />
                      <Keypad digit="6" onClick={this.keypadClicked} />
                      <Keypad digit="7" onClick={this.keypadClicked} />
                      <Keypad digit="8" onClick={this.keypadClicked} />
                      <Keypad digit="9" onClick={this.keypadClicked} />
                      <Keypad digit="0" onClick={this.keypadClicked} />
                      <Keypad onClick={this.clearPlayerAnswer} />
                    </div>

                </div>
            </div>
        )
    }
}

export default Play