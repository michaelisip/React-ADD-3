import React, { Component } from 'react'

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            playerName: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handlePlayerNameChange = this.handlePlayerNameChange.bind(this)
    }

    handleSubmit(e) {
        this.props.history.push({
            pathname: '/play',
            playerName: this.state.playerName
        })
    }

    handlePlayerNameChange(e) {
        this.setState({
            playerName: e.target.value
        })
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <input 
                        type="text" 
                        name="playerName"
                        value={this.state.playerName}
                        onChange={this.handlePlayerNameChange}
                        required
                        />
                    <button 
                        type="submit"
                    > Start </button>
                </form>
            </div>
        )
    }
}

export default Home