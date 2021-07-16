import React, { Component } from 'react'

import {isAlpha, isEmail, isAlphanumeric, isStrongPassword} from "validator"


export class Signup extends Component {
    state ={
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
            <div className='container'>
                <div className='title'>Sign up</div>
                
            </div>
        )
    }
}

export default Signup
