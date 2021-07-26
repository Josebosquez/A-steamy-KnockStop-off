import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"

import "./PlatformDetails.css"

export class PlatformDetails extends Component {
    state = {
        platform: '',
        platformName: '',
        searchBar: '',
        searchedGameArray: [],
        searchBarErr: "",
        searchedPlatformArray: [],
        trending: [],
        bestGenreGames: [],
        coronaGames: [],
    }

    async componentDidMount() {
        console.log(this.props)
        try {
            let result = await axios.get(`https://api.rawg.io/api/games?key=${process.env.REACT_APP_KEY}&platforms=${this.props.match.params.platform}`)

            let platformName = result.data.results[0].platforms.filter((item) => {
                return item.platform.id == this.props.match.params.platform
            })
            
            let trending = await axios.get(`https://api.rawg.io/api/games?key=${process.env.REACT_APP_KEY}&dates=2021-07-01,2021-12-31&platforms=${this.props.match.params.platform}&ordering=-added&page=1&page_size=1`)

            let genre = await axios.get(`https://api.rawg.io/api/games?key=${process.env.REACT_APP_KEY}&platforms=${this.props.match.params.platform}&metacritic=90,100&page=1&page_size=10`)

            let genre1 = await axios.get(`https://api.rawg.io/api/games?key=${process.env.REACT_APP_KEY}&platforms=${this.props.match.params.platform}&dates=2020-01-01,2021-07-01&metacritic=85,100&page=1&page_size=10`)

            this.setState({
                platform: this.props.match.params.platform,
                platformName: platformName[0].platform.name,
                trending: trending.data.results,
                bestGenreGames: genre.data.results,
                coronaGames: genre1.data.results,
            }, () => {
                console.log(this.state.trending)
                console.log(result);
                console.log(this.state.searchedGameArray);
            });

        } catch (e) {
            console.log(e);
        }
    }

    //write logic for axios call here.
    handleOnEnter = async (event) => {
        event.preventDefault()

        try {
            let searchedGame = await axios.get(`https://api.rawg.io/api/games?key=${process.env.REACT_APP_KEY}&search=${this.state.searchBar}&platforms=${this.state.platform}`)

            console.log(searchedGame)
            console.log(searchedGame.data.count)

            if (searchedGame.data.count === 0) {
                this.setState({
                    searchBarErr: `this platform does not support the video game ${this.state.searchBar}`
                })
            } else {
                this.setState({
                    searchedGameArray: searchedGame.data.results,
                    searchBarErr: '',
                })

            }
            console.log(this.state);


        } catch (error) {
            console.log(error)
        }
    }

    handleOnChange = (event) => {
        this.setState({
            searchBar: event.target.value
        })
    }

    handleRandomTitle = async () => {
        try {
            let searchedGame = await axios.get(`https://api.rawg.io/api/genres?key=${process.env.REACT_APP_KEY}&metacritic=95,100`)

            console.log(searchedGame.data.results.name)

            this.setState({
                randomTitle: searchedGame.data.results.name
            })

            console.log(this.state);

        } catch (error) {
            console.log(error)
        }
    }

    handlePlatformSearch = async () => {
        try {
            let result = await axios.get(`https://api.rawg.io/api/platforms?key=${process.env.REACT_APP_KEY}`)
            console.log(result)
            this.setState({
                searchedPlatformArray: result.data.results
            })
            console.log(result.data.results)
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        const { searchBarErr, platformName } = this.state
        return (
            <div>

                <div className='platformMain'>
                    <div className='platforminput-trending'>

                        <div className='platformName'>{platformName} Platform</div>

                        <div className='platforminput'>
                            <form className='platforminput'>
                                <input
                                    onChange={this.handleOnChange}
                                    placeholder='Search bar'
                                />
                                <button onClick={this.handleOnEnter}>Enter</button>
                            </form>

                            <div className="platformerrorMessage">
                                {searchBarErr && searchBarErr}
                            </div>
                        </div>

                        <div className='platformsearchedGameResults'>
                            {this.state.searchedGameArray.map((item, i) => {
                                if (i < 20) {
                                    return <Link key={i} to={{
                                        pathname: `/game-detail/${item.id}`
                                    }}>
                                        <div className='searchResults'>
                                            <img className='platformimg' src={item.background_image} alt={item.background_image} />
                                            <p className='platformsearchResultsText'>{item.name}</p>
                                        </div>
                                    </Link>
                                }
                            })}
                        </div>

                        <p className='filteredTitle'>
                            Upcoming games.
                        </p>
                        <div className='platformtrending'>
                            {this.state.trending.map((item, i) => {
                                return <Link key={i} to={{ pathname: `/game-detail/${item.id}` }}>
                                    <div className='trending'>

                                        <div className='left'>
                                            <img className='trendingImg' src={item.background_image} alt={item.background_image} />
                                        </div>
                                        <div className='right'>
                                            <p className='trendingGameTitle'>
                                                Name of game: {item.name}
                                            </p>
                                            <p className='trendingGameTitle'>
                                                Release date: {item.released}
                                            </p>
                                            <p className='trendingGameTitle'>
                                                Consoles: platforms go here
                                            </p>
                                            <p className='trendingGameTitle'>
                                                Esrb rating: item.ratings
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            })}

                        </div>
                    </div>

                    <div className='row'>
                        <p className='filteredTitle'>Best Rated Games of All Time!</p>
                        <div className='row1'>
                            {this.state.bestGenreGames.map((item, i) => {
                                return <div className='rowResults'>
                                    <Link key={i} to={{ pathname: `/game-detail/${item.id}` }}>
                                        <img className='img' src={item.background_image} alt={item.background_image} />
                                        <p className='searchResultsText'>{item.name}</p>
                                    </Link>
                                </div>
                            })}
                        </div>
                    </div>

                    <div className='row'>
                        <p className='filteredTitle'>Corona Virus Games!</p>

                        <div className='row1'>
                            {this.state.coronaGames.map((item, i) => {
                                return <div className='rowResults'>
                                    <Link key={i} to={{ pathname: `/game-detail/${item.id}` }}>
                                        <img className='img' src={item.background_image} alt={item.background_image} />
                                        <p className='searchResultsText'>{item.name}</p>
                                    </Link>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PlatformDetails


//in order to get movie name at the top i need to do session storage. run by ginny or pak.