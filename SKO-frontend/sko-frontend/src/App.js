import React, { Component } from 'react'
import MainRouter from "./MainRouter";
import { ToastContainer } from 'react-toastify';
import setAxiosAuthToken from "../src/utils/setAxiosAuthToken"
import jwtDecode from "jwt-decode";

import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    user: null
  }

  handleUserLogin = (user) => {
    this.setState({
      user: {
        email: user.email
      }
    })
  }

  handleUserLogout = () => {
    window.localStorage.removeItem('jwtToken')
    setAxiosAuthToken(null)
    this.setState({
      user: null,
    })
  }

  componentDidMount() {
    let getJwtToken = window.localStorage.getItem('jwtToken')
    if (getJwtToken) {
      const currentTime = Date.now() / 1000;
      let decodedJWTToken = jwtDecode(getJwtToken)
      if (decodedJWTToken.exp < currentTime) {
        this.handleUserLogout()
      } else {
        this.handleUserLogin(decodedJWTToken)
      }
    }
  }

  render() {
    return (
      <>
        <ToastContainer />
        <MainRouter
          user={this.state.user}
          handleUserLogin={this.handleUserLogin}
          handleUserLogout={this.handleUserLogout} />
      </>

    )
  }
}

export default App
