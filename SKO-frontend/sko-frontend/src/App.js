import React, { Component } from 'react'
import MainRouter from "./MainRouter";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
