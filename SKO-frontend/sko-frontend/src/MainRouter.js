import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/Login/Login"
import Nav from "./components/Nav/Nav"
import Signup from './components/Signup/Signup';
import Home from "./components/Home/Home"
import GameDetails from './components/GameDetails/GameDetails';
import PlatformDetails from "./components/PlatformDetails/PlatformDetails"

function MainRouter(props) {
    return (
        <Router>
            <Nav user={props.user} handleUserLogout={props.handleUserLogout}/>
            <>
                <Route exact path="/sign-up" component={Signup}  />
                <Route
                    exact
                    path="/login"
                    render={(routerProps) => (
                        <Login {...routerProps} handleUserLogin={props.handleUserLogin} />
                    )}
                />
                <Route exact path='/platform-search/:platform' component={PlatformDetails} />
                <Route exact path="/game-detail/:game" component={GameDetails} />
                <Route exact path="/" component={Home} />
            </>
        </Router>
    )
}

export default MainRouter

//handles all of my components