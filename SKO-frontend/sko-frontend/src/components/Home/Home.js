import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import axios from "axios"

import "./Home.css"

export class Home extends Component {
    state = {
        searchBar: '',
        searchedGameArray: [],
        // randomTitle: [],
        searchedPlatformArray: [],
        bestGenreGames: [],
        coronaGames:[],
        trending: [],
    }

    async componentDidMount() {
        try {
            let genre = await axios.get(`https://api.rawg.io/api/games?key=${process.env.REACT_APP_KEY}&metacritic=90,100&page=1&page_size=10`)
            console.log(genre)

            let genre1 = await axios.get(`https://api.rawg.io/api/games?key=${process.env.REACT_APP_KEY}&dates=2020-01-01,2021-07-01&metacritic=85,100&page=1&page_size=10`)

            let trending = await axios.get(`https://api.rawg.io/api/games?key=${process.env.REACT_APP_KEY}&dates=2021-07-01,2021-12-31&ordering=-added`)

            this.setState({
                bestGenreGames: genre.data.results,
                coronaGames: genre1.data.results,
                trending: trending.data.results,
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
            let searchedGame = await axios.get(`https://api.rawg.io/api/games?key=${process.env.REACT_APP_KEY}&search=${this.state.searchBar}`)

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
        const { searchedGameArray, searchedPlatformArray } = this.state

        return (
            <div>
                <div className='main'>
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
                            <div className='left'>
hello
                            </div>

                            <div className='right'>
                            <p className='trendingGameTitle'>
                                Name of game: 
                            </p>
                            <p className='trendingGameTitle'>
                                Release date: 
                            </p>
                            <p className='trendingGameTitle'>
                                Consoles: 
                            </p>
                            <p className='trendingGameTitle'>
                                Esrb rating: 
                            </p>
                            </div>
                        </div>
                    </div>

                    <div className='platforms'>
                        <ul>

                            {/* <Link  to={{
                                pathname: `platform-search/:platform`}}
                                onClick={this.handleOnPlatformClick}>
                                Nintendo Switch
                            </Link>
                            <Link>
                                PC
                            </Link>
                            <Link>
                                PS5 
                            </Link>
                            <Link>
                                PS4
                            </Link>
                            <Link>
                                XBox Ser. X
                            </Link>
                            <Link>
                                XBox 1
                            </Link> */}
                        </ul>
                    </div>

                    <div className='allPlatforms' onClick={this.handlePlatformSearch}>
                        Have a specific game system? Click me for more options
                    </div>

                    <div className='searchedPlatformResults'>
                        <ol>
                            {this.state.searchedPlatformArray.map((item, i) => {
                                return <Link key={i} to={{ pathname: `/platform-search/${item.id}` }}>
                                    <div className='platformResults'>

                                        <li className='searchResultsList'>
                                            {item.name}
                                        </li>

                                    </div>
                                </Link>
                            })}
                        </ol>
                    </div>

                    <div className='row'>
                        <p className='filteredTitle'>Best Rated Games of All Time!</p>

                        <div className='row1'>
                            
                                {this.state.bestGenreGames.map((item, i) => {
                                    return <div className='rowResults'>
                                        <Link key={i} to={{ pathname: `/game-detail/${item.id}` }}>
                                                <img className='img' src={item.background_image} alt={item.background_image}/>
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
                                                <img className='img' src={item.background_image} alt={item.background_image}/>
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