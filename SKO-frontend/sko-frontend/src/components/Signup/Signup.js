import React, { Component } from 'react';

import checkIfAuth from '../../utils/checkIfAuth';
import { Link } from 'react-router-dom';
import { isAlpha, isEmail, isStrongPassword } from "validator";
import Axios from '../../utils/Axios';
import { toast } from 'react-toastify';

import "./Signup.css"

export class Signup extends Component {
    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",

        firstNameError: "",
        lastNameError: "",
        emailError: "",
        passwordError: "",

        isButtonDisabled: true,
        firstNameOnFocus: false,
        lastNameOnFocus: false,
        emailOnFocus: false,
        passwordOnFocus: false,
    };

    componentDidMount() {
        let isAuth = checkIfAuth();
        if (isAuth) {
            this.props.history.push('/login')
        }
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.isButtonDisabled === true) {
            if (
                this.state.firstNameOnFocus &&
                this.state.lastNameOnFocus &&
                this.state.emailOnFocus &&
                this.state.passwordOnFocus
            ) {
                if (
                    this.state.firstNameError.length === 0 &&
                    this.state.lastNameError.length === 0 &&
                    this.state.emailError.length === 0 &&
                    this.state.passwordError.length === 0
                ) {
                    this.setState({
                        isButtonDisabled: false,
                    });
                }
            }
        }
    };

    handleOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        }, () => {
            if (
                event.target.name === "firstName" ||
                event.target.name === "lastName"
            ) {
                this.handleFirstNameAndLastNameInput(event);
            }

            if (event.target.name === "email") {
                this.handleEmailInput();
            }

            if (event.target.name === "password") {
                this.handlePasswordInput();
            }
        }
        );
    };

    handleFirstNameAndLastNameInput = (event) => {
        if (this.state[event.target.name].length > 0) {
            if (isAlpha(this.state[event.target.name])) {
                this.setState({
                    [`${event.target.name}Error`]: "",
                });
            } else {
                this.setState({
                    [`${event.target.name}Error`]: `${event.target.placeholder} can only have alphabet`,
                    isButtonDisabled: true,
                });
            }
        } else {
            this.setState({
                [`${event.target.name}Error`]: `${event.target.placeholder} cannot be empty`,
                isButtonDisabled: true,
            });
        }
    };

    handleEmailInput = () => {
        if (this.state.email.length === 0) {
            this.setState({
                emailError: "Email cannot be empty",
                isButtonDisabled: true,
            });
        } else {
            if (isEmail(this.state.email)) {
                this.setState({
                    emailError: "",
                });
            } else {
                this.setState({
                    emailError: "Please, enter a valid email!",
                    isButtonDisabled: true,
                });
            }
        }
    };

    handlePasswordInput = () => {
        if (this.state.password.length === 0) {
            this.setState({
                passwordError: "Password cannot be empty",
                isButtonDisabled: true,
            });
        } else {
            if (isStrongPassword(this.state.password)) {
                this.setState({
                    passwordError: "",
                });
            } else {
                this.setState({
                    passwordError:
                        "Password must contains 1 uppercase, 1 lowercase, 1 special character, 1 number and minimul of 8 charactors long",
                    isButtonDisabled: true,
                });
            }
        }
    };

    handleInputOnFocus = (event) => {
        console.log(event.target.name);
        if (!this.state[`${event.target.name}OnFocus`]) {
            this.setState({
                [`${event.target.name}OnFocus`]: true,
            });
        }
    };

    handleOnSubmit = async (event) => {
        event.preventDefault();
        try {
            let obj = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
            }

            let success = await Axios.post('api/user/sign-up', obj)
            console.log(success)
            toast.success(`User created. Please log in`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (e) {
            toast.error(`${e.response.data.message}!`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    render() {
        const {
            firstName,
            lastName,
            email,
            password,
            firstNameError,
            lastNameError,
            emailError,
            passwordError,
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
                                    onFocus={this.handleInputOnFocus}
                                />
                                <div className="errorMessage">
                                    {firstNameError && firstNameError}
                                </div>
                            </div>
                        </div>

                        <div className="form-group-block">
                            <div className="block-container">
                                <label htmlFor="firstName">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    value={lastName}
                                    placeholder="Last Name"
                                    name="lastName"
                                    onChange={this.handleOnChange}
                                    // onBlur={this.handleOnBlur}
                                    onFocus={this.handleInputOnFocus}
                                />
                                <div className="errorMessage">
                                    {lastNameError && lastNameError}
                                </div>
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
                                    onFocus={this.handleInputOnFocus}
                                />
                                <div className="errorMessage">
                                    {emailError && emailError}
                                </div>
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
                                    onFocus={this.handleInputOnFocus}
                                />
                                <div className="errorMessage">
                                    {passwordError && passwordError}
                                </div>
                            </div>
                        </div>

                        <div className="button-container">
                            <button type="submit" disabled={this.state.isButtonDisabled}>
                                Continue
                            </button>
                        </div>

                        <div className='copyright'>
                            <p>
                                By clicking "Continue", I agree to the <a href='https://funny-wifi.com/static/wifi-images/rick-rolled.jpg' target="_blank" className='termsofservice'>Terms of Service</a>  and <a href='https://www.exterro.com/images/uploads/blogPosts/Baby-Yoda-LinkedIn.png' target="_blank" className='privacypolicy'>Privacy Policy</a>.
                            </p>
                            <div className='question'>
                                <p>
                                    Already have an account?
                                </p>
                                <Link to={{ pathname: "/login" }} className='signIn'>Sign In</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Signup
