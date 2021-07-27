import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"

import "./Home.css"

export class Home extends Component {
    state = {
        searchBar: '',
        searchedGameArray: [],
        // randomTitle: [],
        searchedPlatformArray: [],
        bestGenreGames: [],
        coronaGames: [],
        trending: [],
        trendingPlatforms: [],
        trendingESRB: [],
    }

    async componentDidMount() {
        try {
            let trending = await axios.get(`https://api.rawg.io/api/games?key=${process.env.REACT_APP_KEY}&dates=2021-07-01,2021-12-31&ordering=-added&page=1&page_size=1`)

            let genre = await axios.get(`https://api.rawg.io/api/games?key=${process.env.REACT_APP_KEY}&metacritic=90,100&page=1&page_size=10`)
            // console.log(genre)

            let genre1 = await axios.get(`https://api.rawg.io/api/games?key=${process.env.REACT_APP_KEY}&dates=2020-01-01,2021-07-01&metacritic=85,100&page=1&page_size=10`)

            let platformSearch = await axios.get(`https://api.rawg.io/api/platforms?key=${process.env.REACT_APP_KEY}`)

            this.setState({
                bestGenreGames: genre.data.results,
                coronaGames: genre1.data.results,
                trending: trending.data.results,
                searchedPlatformArray: platformSearch.data.results
            }, () => {
                console.log(this.state.trending)
            })
        } catch (e) {
            console.log(e)
        }
    }

    //write logic for axios call here.
    handleOnEnter = async (event) => {
        event.preventDefault()

        try {
            let searchedGame = await axios.get(`https://api.rawg.io/api/games?key=${process.env.REACT_APP_KEY}&search=${this.state.searchBar}&page_size=100`)

            console.log(searchedGame.data.results)

            this.setState({
                searchedGameArray: searchedGame.data.results
            })

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

    render() {
        return (
            <div>
                <div className='main'>
                    <div className='top'>
                        <div className='allPlatforms'>
                            <p className='filteredTitle'>Platforms</p>

                            <div className='searchedPlatformResults'>
                                <ol>
                                    {this.state.searchedPlatformArray.map((item, i) => {
                                        return <div className='platformResults'>
                                            <Link key={i} to={{ pathname: `/platform-search/${item.id}` }}>
                                                <li className='searchResultsList'>
                                                    {item.name}
                                                </li>
                                            </Link>
                                        </div>
                                    })}
                                </ol>
                            </div>
                        </div>

                        <div className='input-trending'>
                            <div className='input'>
                                <form className='input'>
                                    <input
                                        onChange={this.handleOnChange}
                                        placeholder='Search bar'
                                    />
                                    <button onClick={this.handleOnEnter}>Enter</button>
                                </form>

                            </div>

                            <div className='searchedGameResults'>
                                {this.state.searchedGameArray.map((item, i) => {
                                    if (i < 20) {
                                        return <Link key={i} to={{
                                            pathname: `/game-detail/${item.id}`
                                        }}>
                                            <div className='searchResults'>
                                                <img className='img' src={item.background_image} />
                                                <p className='searchResultsText'>{item.name}</p>
                                            </div>
                                        </Link>
                                    }
                                })}
                            </div>

                            <p className='filteredTitle'>
                                Upcoming games.
                            </p>

                            <div className='trending'>
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
                                                    Consoles: {item.platforms.map((item) => {
                                                        return <li >
                                                            {item.platform.name}
                                                        </li>
                                                    })}
                                                </p>
                                                <p className='trendingGameTitle'>
                                                    {/* Esrb rating: {item.esrb_rating} */}
                                                    {/* Esrb rating: {item.platforms.map((item) => {
                                                        return <li>
                                                            {item.platform.name}
                                                        </li>
                                                    })} */}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                })}

                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <p className='filteredTitle'>Best Rated Games of All Time!</p>

                        <div className='row1'>

                            {this.state.bestGenreGames.map((item, i) => {
                                return <div key={i} className='rowResults'>
                                    <Link to={{ pathname: `/game-detail/${item.id}` }}>
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
                                return <div key={i} className='rowResults'>
                                    <Link to={{ pathname: `/game-detail/${item.id}` }}>
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

export default Home

// if i click on a circle - onclick function, then render me a game search page. in this page, i want a similiar scenario as the home page.