import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/Login/Login"
import Nav from "./components/Nav/Nav"
import Signup from './components/Signup/Signup';
import Home from "./components/Home/Home"

function MainRouter(props) {
    return (
        <Router>
            <Nav />
            <>  
                
                <Route exact path="/sign-up" component={Signup} />
                <Route
                    exact
                    path="/login"
                    render={(routerProps) => (
                        <Login {...routerProps} handleUserLogin={props.handleUserLogin} />
                    )}
                />
                <Route exact path="/" component={Home} />
            </>
        </Router>
    )
}

export default MainRouter

//handles all of my components