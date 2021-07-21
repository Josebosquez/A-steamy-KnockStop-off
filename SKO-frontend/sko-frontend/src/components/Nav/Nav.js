import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import "./Nav.css";

export class nav extends Component {

    render() {
        return (
            <nav className='Navbar'>
                <div className="h1-logo">
                    <img className='trainLogo' src='' />
                    <NavLink to='/' className='navlink'>
                        <div>
                            A Steamy Stop Knock-Off!
                        </div>
                    </NavLink>
                </div>
                <div className='nav-right-side'>
                    <ul>

                        <li>
                            {this.props.user ? (
                                <NavLink activeClassName="selected" to='/logout' onClick={this.props.handleUserLogout}>Logout </NavLink>
                            ) : (
                                <NavLink activeClassName="selected" to='/sign-up'>Sign Up </NavLink>)
                            }
                        </li>
                        <li>
                            {this.props.user ? (
                                <NavLink activeClassName="selected navlink" to='/logout' onClick={this.props.handleUserLogout}>Logout </NavLink>
                            ) : (
                                <NavLink activeClassName="selected navlink" to='/login'>Login </NavLink>)
                            }
                        </li>
                    </ul>
                </div>

            </nav>
        )
    }
}

export default nav