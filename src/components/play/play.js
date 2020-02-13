import React, { Component } from 'react'

class Play extends Component {

    constructor(props) {
        super(props)
        this.state = {
            gameClock: 60,
            guestClock: 10,
            score: 0,
            randomNumber: '',
            playerAnswer: ''
        }
        this.generateNewRandomNumber = this.generateNewRandomNumber.bind(this)
        this.updateClocks = this.updateClocks.bind(this)
        this.resetGuessClock = this.resetGuessClock.bind(this)
        this.updatePlayerAnswer = this.updatePlayerAnswer.bind(this)
        this.submitAnswer = this.submitAnswer.bind(this)
        this.gameOver = this.gameOver.bind(this)
    }

    componentDidMount() {
        this.updateClocks()
        this.generateNewRandomNumber()
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

    updatePlayerAnswer(e) {
        const playerAnswer = e.target.value
        this.setState({
            playerAnswer: playerAnswer
        })
        if(playerAnswer.toString().length === 4) {
            this.submitAnswer()
        }
    }

    submitAnswer(playerAnswer) {
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
            // Correct Answer
        } else {
            console.error("No")
            // Wrong answer
        }
        this.resetGuessClock()
    }

    gameOver() {
        console.error("Game over")
    }

    render() {
        return (
            <div className="container">
                Gametime: {this.state.gameClock + ` `}

                { this.props.location.playerName + ` ` }
                { this.state.randomNumber + ` ` }

                Turntime: {this.state.guestClock}

                <input 
                    type="number"
                    name="answer"
                    value={this.state.playerAnswer}
                    onChange={this.updatePlayerAnswer}
                    autoFocus
                />
            </div>
        )
    }
}

export default Play