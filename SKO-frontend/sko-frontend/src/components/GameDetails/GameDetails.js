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
        stores: [],
        domain: "",
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
                stores: result.data.stores,
                // domain: result.data.stores.store.domain
            })
            console.log(this.state.platforms)
            console.log(result.data.stores.store.domain)

        } catch (e) {
            console.log(e)
        }
    }

    render() {
        const { description, background_image, name, movie_count, rating, playtime, achievements_count, released } = this.state
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
                            <img className='poster' src={background_image} alt={background_image} />
                        </div>

                        <div className='gameInfo'>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> Info </div>
                            <p>Name: {name}</p>
                            <p>Rating: {rating}</p>
                            <p>Playtime: {playtime}</p>
                            <div className='platform'>
                                Platforms:{" "}
                                <div className='platformSize'>
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
                            </div>
                            <p>Achievements count: {achievements_count}</p>
                            <p>Released: {released}</p>
                            <div className='store'>
                                Stores:{" "}
                                <div className='storeSize'>
                                    {this.state.stores.map((item) => {
                                        return (
                                            <span key={item.store.id}>
                                                <a href={item.store.domain} target='_blank' rel="noreferrer">
                                                    {item.store.name}
                                                </a>
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
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
