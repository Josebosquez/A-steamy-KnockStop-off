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
    }

    async componentDidMount() {
        console.log(this.props)
        try {
            let result = await axios.get(`https://api.rawg.io/api/games?key=6a456b24916a4165a3ab90808cf6d07c&platforms=${this.state.platform}`)
            this.setState({
                platform: this.props.match.params.platform
            });
            console.log(result);
        } catch (e) {
            console.log(e);
        }
    }

    //write logic for axios call here.
    handleOnEnter = async (event) => {
        event.preventDefault()

        try {
            let searchedGame = await axios.get(`https://api.rawg.io/api/games?key=6a456b24916a4165a3ab90808cf6d07c&search=${this.state.searchBar}&platforms=${this.state.platform}`)

            console.log(searchedGame)
            console.log(searchedGame.data.count)
            
            if (searchedGame.data.count === 0) {
                this.setState({
                    searchBarErr: `this platform does not support the video game ${this.state.searchBar}`
                })
            } else{
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
        const { searchedGameArray, platform, searchBarErr } = this.state
        return (
            <div>

                <div className='platformMain'>
                    <div className='platforminput-trending'>

                        <div className='platformName'>The name of the platform {platform}</div>

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
                                            <img className='platformimg' src={item.background_image} />
                                            <p className='platformsearchResultsText'>{item.name}</p>
                                        </div>
                                    </Link>
                                }
                            })}
                        </div>

                        <div className='platformtrending'>
                            Trending
                        </div>
                    </div>



                    <div className='platformrow'>
                        <p className='platformfilteredTitle'>Best Rated Games of All Time!</p>
                        <div>
                            First row goes here, will have smaller li's that go throughout
                        </div>
                    </div>

                    <div className='platformrow'>
                        <p className='platformfilteredTitle'>Filtered by Genre</p>
                        <div>
                            Second row goes here, will have smaller li's that go throughout
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PlatformDetails


//in order to get movie name at the top i need to do session storage. run by ginny or pak.