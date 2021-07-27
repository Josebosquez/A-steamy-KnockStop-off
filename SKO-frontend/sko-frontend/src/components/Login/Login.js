import React, { Component } from 'react'
import { toast } from "react-toastify";
import { isEmpty } from "validator";
import jwtDecode from "jwt-decode";
import checkIfAuth from '../../utils/checkIfAuth';
import setAxiosAuthToken from "../../utils/setAxiosAuthToken";
import axios from "../../utils/Axios"

export class Login extends Component {
    state = {
        email: '',
        password: '',
        emailError: '',
        passwordError: '',
        canSubmit: true,
    };

    async componentDidMount() {
        let isAuth = checkIfAuth(); 
        if (isAuth) {
            this.props.history.push("/");
        }
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.canSubmit === true) {
            if (this.state.emailOnFocus && this.state.passwordOnFocus) { 
                if ( 
                    this.state.emailError.length === 0 &&
                    this.state.passwordError.length === 0
                ) {
                    this.setState({ 
                        canSubmit: false,
                    });
                } else {
                    this.setState({
                        canSubmit: true,
                    });
                }
            }
        }
    };

    handleOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        },
            () => {
                if (event.target.name === "email") {
                    if (isEmpty(this.state.email)) {
                        this.setState({
                            emailError: "Email cannot be empty",
                            canSubmit: true,
                        });
                    } else {
                        this.setState({
                            emailError: ""
                        })
                    }
                }

                if (event.target.name === "password") {
                    if (isEmpty(this.state.password)) {
                        this.setState({
                            passwordError: "Password cannot be empty",
                            canSubmit: true,
                        });
                    } else {
                        this.setState({
                            passwordError: "",
                        });
                    }
                }
            })
        // console.log(event.target.value)
    };

    handleInputOnFocus = (event) => {
        if (!this.state[`${event.target.name}OnFocus`]) { // if focus is set to false, 
            this.setState({
                [`${event.target.name}OnFocus`]: true, // set focus to true,
            });
        }
    };

    handleOnSubmit = async (event) => {
        event.preventDefault(); 
        
        try {
            let result = await axios.post('/api/user/login',
                { 
                    email: this.state.email,
                    password: this.state.password
                });
            let jwtToken = result.data.payload;
            console.log(jwtToken)

            setAxiosAuthToken(jwtToken)

            let decodedToken = jwtDecode(jwtToken); 
            console.log(decodedToken) 

            this.props.handleUserLogin(decodedToken) 

            window.localStorage.setItem('jwtToken', jwtToken) 

            this.props.history.push('/') 

            toast.success(`Welcome `, { 
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.log(this.props)

        } catch (e) {
            console.log(e)
            // if (e.response.status === 429) {
            //     toast.error(e.response.data) 
            // } 
            // else {
                toast.error(e.response.data.payload, { 
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    // }

    render() {
        const {
            email,
            passwordError,
            emailError,
            password,
            canSubmit,
        } = this.state
        return (
            <div className="container">
                <div className="form-text">Login</div>

                <div className="form-div">
                    <form className="form" onSubmit={this.handleOnSubmit}> {/* handles our on submit function */}
                        <div className="form-group-block">
                            <div className="block-container">
                                <label htmlFor="email">Email</label> {/* email input box */}
                                <input
                                    type="email"  //  the type for our form to recognize if it requires other validations.
                                    id="email" // for css
                                    placeholder="Email"
                                    name="email" // in our handleOnChange Func, if its email, change the value to match our input text
                                    value={email} // our value is changed based on our handleOnChange func
                                    onChange={this.handleOnChange} // allows use to use the handleonchange func
                                    onFocus={this.handleInputOnFocus} // if it is false, set to true
                                    autoFocus  // makes the cursor focus on the first name inputbox.
                                />
                                <div className="errorMessage">{emailError && emailError}</div> {/* err catch block */}
                            </div>
                        </div>

                        <div className="form-group-block">
                            <div className="block-container">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="text"
                                    id="password" //will be password when we deploy instead of text.
                                    placeholder="Password"
                                    name="password"
                                    value={password}
                                    onFocus={this.handleInputOnFocus}
                                    onChange={this.handleOnChange}
                                />
                                <div className="errorMessage">
                                    {passwordError && passwordError}
                                </div>
                            </div>
                        </div>

                        <div className="button-container">
                            <button type="submit" disabled={canSubmit}> {/* submit button */}
                                Submit
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        )
    }
}

export default Login
