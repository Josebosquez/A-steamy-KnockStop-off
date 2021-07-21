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
    }

    //write logic for axios call here.
    handleOnEnter = async (event) => {
        event.preventDefault()

        try {
            let searchedGame = await axios.get(`https://api.rawg.io/api/games?key=6a456b24916a4165a3ab90808cf6d07c&search=${this.state.searchBar}`)

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
            let searchedGame = await axios.get(`https://api.rawg.io/api/genres?key=6a456b24916a4165a3ab90808cf6d07c&metacritic=95,100`)

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
            let result = await axios.get('https://api.rawg.io/api/platforms?key=6a456b24916a4165a3ab90808cf6d07c')
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

                        <div className='trending'>
                            Trending
                        </div>
                    </div>

                    <div className='platforms'>
                        <ul>
                            {/* <Link  to={{
                                pathname: `/platform-search/${}`}} 
                                onClick={this.handlePlatformSearch}>
                                Nintendo Switch
                            </Link> */}
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
                            </Link>
                        </ul>
                    </div>

                    <div className='allPlatforms' onClick={this.handlePlatformSearch}>
                        Click here for additional platforms
                    </div>

                    <div className='searchedPlatformResults'>
                        <ol>
                        {this.state.searchedPlatformArray.map((item, i) => {
                            return <Link key={i} to={{ pathname: `/platform-search/${item.id}` }}>
                                <div className='platformResults'>
                                        <li className='searchResultsList'>{item.name}</li>
                                </div>
                            </Link>
                        })}
                        </ol>
                    </div>

                    <div className='row'>
                        <p className='filteredTitle'>Best Rated Games of All Time!</p>
                        <div>
                            First row goes here, will have smaller li's that go throughout
                        </div>
                    </div>

                    <div className='row'>
                        <p className='filteredTitle'>Filtered by Genre</p>
                        <div>
                            Second row goes here, will have smaller li's that go throughout
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home

//if i click on the additional platforms box, then i should make an api call to grab the list of platforms.
    // make an array in the state and push them into it. 
        // render the array with a map.
            // the map will have link tags that push us to a different page.
                // the different page will use the search basic game with platforms as a key.


// if i click on a circle - onclick function, then render me a game search page. in this page, i want a similiar scenario as the home page.