import React, { Component } from 'react'
import "./Home.css"

export class Home extends Component {
    render() {
        return (
            <div>
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
            </div>
        )
    }
}

export default Home
