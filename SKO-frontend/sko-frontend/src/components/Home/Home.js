import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import { ReactComponent as ArrowIcon } from '../../icons/arrow.svg';
import "./Home.css"
import axios from "axios"
// import { data } from 'browserslist';

export class Home extends Component {
    state = {
        searchBar: '',
        searchedGameArray: [],
        randomTitle: []
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

    render() {

        const { searchedGameArray } = this.state
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
                            <li>
                                Nintendo Switch
                            </li>
                            <li>
                                PC
                            </li>
                            <li>
                                PS5
                            </li>
                            <li>
                                PS4
                            </li>
                            <li>
                                XBox Series X
                            </li>
                            <li>
                                XBox 1
                            </li>
                        </ul>
                    </div>

                    <div className='allPlatforms'>
                        Click here for additional platforms
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
