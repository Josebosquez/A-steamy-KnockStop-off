import React, { Component } from 'react'
import axios from 'axios'
import "./GameDetails.css"

export class GameDetails extends Component {
    state = {
        bigImage: '',
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
        screenshotsArray: [],
        id: '',
        screenshotsArrayImg: '',
        genre: '',

    };

    async componentDidMount() {
        try {
            console.log(this.props)
            let result = await axios.get(`
            https://api.rawg.io/api/games/${this.props.match.params.game}?key=6a456b24916a4165a3ab90808cf6d07c`)
            console.log(result)


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
                id: result.data.id,
                genre: result.data.genres,
            })
            let screenshots = await axios.get(`https://api.rawg.io/api/games/${this.state.id}/screenshots?key=6a456b24916a4165a3ab90808cf6d07c`)

            // need to change this screen shots to use the id not the hardcoded one
            this.setState({
                screenshotsArray: screenshots.data.results,
                screenshotsArrayImg: screenshots.data.results.image,
                bigImage: screenshots.data.results[0].image
            })
            console.log(screenshots.data.results)

        } catch (e) {
            console.log(e)
        }
    }

    handleOnImgClick = async (event) => {
        console.log(this.state.screenshotsArrayImg)
        this.setState({
            bigImage: this.state.id
        })
    }

    render() {
        const {
            description,
            background_image,
            name,
            rating,
            playtime,
            achievements_count,
            released,
            bigImage,
        } = this.state

        return (
            <div>
                <div className='mainPage'>
                    <div className='trailer-images'>
                        <div className='trailer'>
                            <img className='bigImage' src={bigImage} alt={bigImage} />
                        </div>
                        <div className='images'>
                            {this.state.screenshotsArray.map((item) => {
                                return <div key={item.id} className='imagesDiv'>
                                    <li>
                                        <img className='screenshotImg' src={item.image} alt={item.image} onClick={this.handleOnImgClick} />
                                    </li>
                                </div>
                            })}

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
                                Available Stores:{" "}
                                <div className='storeSize'>
                                    {this.state.stores.map((item) => {
                                        return (
                                            <span key={item.store.id}>
                                                <a href={`https://${item.store.domain}`} target='_blank' rel="noreferrer">
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
                        <div>
                            <p>Rating Information</p>
                            <div>
                                Ersb: esrb_rating.name
                            </div>
                            <div>
                                ratings: map.
                                ratings_count:
                            </div>
                            <div className='platform'>
                                Genre(s):{" "}
                                {/* <div className='platformSize'>
                                    {this.state.genre.map((item) => {
                                        return (
                                            <span key={item.genre.id}>
                                                <li>
                                                    {item.genre.name}
                                                </li>
                                            </span>
                                        );
                                    })}
                                </div> */}
                            </div>
                        </div>
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
