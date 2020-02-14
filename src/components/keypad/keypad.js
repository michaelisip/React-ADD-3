import React, { Component } from 'react'

import './keypad.css'

class Keypad extends Component {

  constructor(props) {
    super(props)
    this.state = {
      digit: this.props.digit
    }
    this.keypadClicked = this.keypadClicked.bind(this)
    this.clearPlayerAnswer = this.clearPlayerAnswer.bind(this)
  }

  keypadClicked() {
    this.props.onClick(this.state.digit)
  }

  clearPlayerAnswer() {
    this.props.onClick()
  }

  render() {
    if (this.props.digit) {
      return (
          <button className="btn btn-dark rounded-0 keypad" onClick={this.keypadClicked} >
            <h1> {this.state.digit} </h1>
          </button>
      )
    }
    return (
      <button className="btn btn-dark rounded-0 text-danger keypad clear" onClick={this.clearPlayerAnswer} >
        <h1> C </h1>
      </button>
    )
  }
}

export default Keypad