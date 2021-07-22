import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// import { isAlpha, isEmail, isAlphanumeric, isStrongPassword } from "validator"

import "./Signup.css"

export class Signup extends Component {
    state = {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    }

    handleOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(event.target.value)
    }

    render() {
        const {
            firstName,
            lastName,
            username,
            email,
            password,
            confirmPassword,
        } = this.state

        return (
            <div className="container">
                <div className="form-text">Sign up</div> 

                <div className="form-div">
                    <form className="form" onSubmit={this.handleOnSubmit}>  
                        <div className="form-group-block">
                            <div className="block-container">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    value={firstName}
                                    placeholder="First Name"
                                    name="firstName"
                                    onChange={this.handleOnChange}
                                    autoFocus
                                // onBlur={this.handleOnBlur} // if we click here, and dont type, throws err in the firstNameError below.
                                // onFocus={this.handleInputOnFocus} // if it is false, set to true
                                />

                            </div>
                        </div>

                        <div className="form-group-block">
                            <div className="block-container">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    value={lastName}
                                    placeholder="Last Name"
                                    name="lastName"
                                    onChange={this.handleOnChange}
                                // onBlur={this.handleOnBlur}
                                // onFocus={this.handleInputOnFocus}
                                />
                            </div>
                        </div>

                        <div className="form-group-block">
                            <div className="block-container">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    id="email"
                                    value={email}
                                    placeholder="Email"
                                    onChange={this.handleOnChange}
                                    name="email"
                                // onBlur={this.handleOnBlur}
                                // onFocus={this.handleInputOnFocus}
                                />
                            </div>
                        </div>

                        <div className="form-group-block">
                            <div className="block-container">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="text"
                                    id="password"
                                    value={password}
                                    placeholder="Password"
                                    onChange={this.handleOnChange}
                                    name="password"
                                // onBlur={this.handleOnBlur}
                                // onFocus={this.handleInputOnFocus}
                                />
                                {/* <div className="errorMessage">
                                    {passwordError && passwordError}
                                </div> */}
                            </div>
                        </div>

                        <div className="button-container">
                            <button type="submit" disabled={this.state.isButtonDisabled}>
                                Continue
                            </button>
                        </div>

                        <div className='copyright'>
                            <p>
                                By clicking "Continue", I agree to the <Link className='termsofservice'>Terms of Service</Link>  and <Link className='privacypolicy'>Privacy Policy</Link>.
                            </p>
                            <div className='question'>
                                <p>
                                Already have an account? 
                            </p>
                                <Link className='signIn'>Sign In</Link>
                                </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Signup
