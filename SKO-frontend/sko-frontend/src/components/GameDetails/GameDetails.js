import React, { Component } from 'react'
import axios from 'axios'
import "./GameDetails.css"

export class GameDetails extends Component {
    state = {
        name: '',
        background_image: '',
        description: '',
        movie_count: '',
        rating: '',
        playtime: '',
        achievements_count: '',
        released: '',
        platforms: [],
        website: '',
    };

    async componentDidMount() {


        try {
            console.log(this.props)
            let result = await axios.get(`
            https://api.rawg.io/api/games/${this.props.match.params.game}?key=6a456b24916a4165a3ab90808cf6d07c`)
            console.log(result)

                // console.log(result.data.description)
            this.setState({
                description: result.data.description_raw,
                background_image: result.data.background_image,
                movie_count: result.data.movie_count,
                rating: result.data.rating,
                name: result.data.name,
                playtime: result.data.playtime,
                achievements_count: result.data.achievements_count,
                released: result.data.released,
                platforms: result.data.platforms,
                website: result.data.website,
            })
            console.log(this.state.platforms)

        } catch (e) {
            console.log(e)
        }
    }

    render() {
        const {description, background_image, name, movie_count,rating, playtime, achievements_count, released, platforms, website}=this.state
        return (
            <div>
                <div className='mainPage'>
                    <div className='trailer-images'>
                        <div className='trailer'>
                            {movie_count}
                        </div>
                        <div className='images'>
                            Images / screenshots_count: need to map through them.
                        </div>
                    </div>
                    <div className='infoCenter'>
                        
                        <div className='poster' >
                            <img className= 'poster' src = {background_image}/>
                        </div>

                        <div className='gameInfo'>
                            <h3>Info </h3>
                            <div>Name: {name}</div>
                            <div>Rating: {rating}</div>
                            <div>Playtime: {playtime}</div>
                            <div>
                                Platforms:{" "}
                                {this.state.platforms.map((item) => { 
                                    
                                    return (
                                        <span key={item.platform.id}>
                                            <li>
                                                {item.platform.name} 
                                            </li>
                                        </span>
                                    );
                                        
                                })} 
                            </div>
                            <div>Achievements count: {achievements_count}</div>
                            <div>Released: {released}</div>
                            <a className = 'purchase' href={website} target='_blank'> Purchase </a>
                        </div>

                    </div>
                </div>

                <div className='bottomPage'>

                    <div className="description">
                        {description}
                    </div>

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
