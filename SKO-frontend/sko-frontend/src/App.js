import React, { Component } from 'react'
import MainRouter from "./MainRouter";
import { ToastContainer } from 'react-toastify';

export class App extends Component {
state={
  user: null
}

  render() {
    return (
      <>
        <ToastContainer />
        <MainRouter user={this.state.user}/>
      
      </>

    )
  }
}

export default App
