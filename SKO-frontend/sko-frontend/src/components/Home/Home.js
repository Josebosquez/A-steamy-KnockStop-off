import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import "./Home.css"

export class Home extends Component {
    render() {
        return (
            <div>

                <div className='main'>
                    <div className='input-trending'>

                        <div className='input'>
                            <form className='input'>
                                <input
                                    placeholder='Search bar'
                                />
                                <button>Enter</button>
                            </form>

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
                            {/* <li>
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
                            </li> */}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home
