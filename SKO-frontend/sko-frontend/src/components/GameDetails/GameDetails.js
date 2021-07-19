import React, { Component } from 'react'
import axios from 'axios'
import "./GameDetails.css"

export class GameDetails extends Component {
    state = {
        name: ''
    };

    async componentDidMount() {
        try {
            console.log(this.props)
            let result = await axios.get(`https://api.rawg.io/api/games?key=6a456b24916a4165a3ab90808cf6d07c&search=${this.props}`)

        } catch (e) {
            console.log(e)
        }
    }

    render() {
        return (
            <div>
                <div className='mainPage'>
                        <div className='trailer-images'>
                            <div className='trailer'>
                                trailer
                            </div>
                            <div className='images'>
                                Images
                            </div>
                        </div>
                        <div className='infoCenter'>
                            <div className='poster'>
                                Poster
                            </div>
                            <div className='gameInfo'>
                                Info
                            </div>
                        </div>
                </div>
                <div className='bottomPage'>
                    <div className='reviews'>
                        Reviews
                    </div>
                    <div>
                        another one
                    </div>
                </div>
            </div>
        )
    }
}

export default GameDetails
