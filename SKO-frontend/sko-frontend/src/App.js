import React, { Component } from 'react'
import MainRouter from "./MainRouter";

export class App extends Component {
state={
  user: null
}

  render() {
    return (
      <>

        <MainRouter user={this.state.user}/>
      
      </>

    )
  }
}

export default App
