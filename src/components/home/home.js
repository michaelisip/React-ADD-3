import React, { Component } from 'react'

import './home.css'

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
                <button id="help" className="btn btn-dark btn-sm"> Help </button>
                <div className="d-flex justify-content-center flex-column h-100">
                    <h1 id="title" className="text-center mb-5"> ADD 3! </h1>
                    <form onSubmit={this.handleSubmit} className="w-100 align-self-center">
                        <div className="input-group input-group-lg">
                            <input 
                                type="text" 
                                name="playerName"
                                className="form-control input-lg text-center"
                                placeholder="Player Name"
                                value={this.state.playerName}
                                onChange={this.handlePlayerNameChange}
                                autoComplete="off"
                                required
                                />
                        </div>
                        <button 
                            type="submit"
                            className="btn btn-primary btn-block btn-sm w-50 mx-auto mt-3"
                        > Play Now! </button>
                    </form>
                </div>
                <div id="about">
                    <small><i> Developed by: <strong> Michael John Isip </strong> </i></small>
                </div>
            </div>
        )
    }
}

export default Home