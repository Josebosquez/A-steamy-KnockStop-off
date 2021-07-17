import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom';
import "./Nav.css";

export class nav extends Component {
    render() {
        return (
            <nav className='Navbar'>
                <div className="h1-logo">
                    <h1>
                        A Steamy Stop Knock-Off! 
                    </h1>
                </div>
                <div className='nav-right-side'>
                    <ul>
                        <li>
                            Cart
                        </li>
                        <li>
                            {this.props.user ? (
                                <NavLink activeClassName="selected" to='/logout' onClick={this.props.handleUserLogout}>Logout </NavLink>
                            ) : (
                                <NavLink activeClassName="selected" to='/sign-up'>Sign Up </NavLink>)
                            }
                        </li>
                        <li>
                            {this.props.user ? (
                                <NavLink activeClassName="selected" to='/logout' onClick={this.props.handleUserLogout}>Logout </NavLink>
                            ) : (
                                <NavLink activeClassName="selected" to='/login'>Login </NavLink>)
                            }
                        </li>
                    </ul>
                </div>

            </nav>
        )
    }
}

export default nav
