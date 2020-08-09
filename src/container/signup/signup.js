import React, { Component } from 'react';
import './signup.css';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class SignupComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            emailid: '',
            password: '',
            errors: {}
        }
    }

    changeHandler = (event) => {
        // console.log(event.target)
        let name = event.target.name;
        let val = event.target.value;
        this.setState({ [name]: val });
        console.log(this.state)
        // this.handleValidation()
    }

    handleValidation() {
        let firstname = this.state.firstname;
        let lastname = this.state.lastname
        let emailid = this.state.emailid
        let password = this.state.password
        let errors = {};
        let formIsValid = true;

        //First Name
        if (firstname.length < 3) {
            formIsValid = false;
            errors["firstname"] = "Cannot be less than length 3";
        }

        if (typeof firstname !== "undefined") {
            if (!firstname.match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["firstname"] = "Only letters";
            }
        }

        //Last Name
        if (lastname.length < 3) {
            formIsValid = false;
            errors["lastname"] = "Cannot be less than length 3";
        }

        if (typeof lastname !== "undefined") {
            if (!lastname.match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["lastname"] = "Only letters";
            }
        }

        //Email
        if (!emailid) {
            formIsValid = false;
            errors["emailid"] = "Cannot be empty";
        }

        if (typeof emailid !== "undefined") {
            let lastAtPos = emailid.lastIndexOf('@');
            let lastDotPos = emailid.lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && emailid.indexOf('@@') == -1 && lastDotPos > 2 && (emailid.length - lastDotPos) > 2)) {
                formIsValid = false;
                errors["emailid"] = "Email is not valid";
            }
        }

        //Password
        if (password.length < 5) {
            formIsValid = false;
            errors["password"] = "Cannot be less than 5 characters";
        }

        if (typeof password !== "undefined") {
            if (!password.match(/^[0-9a-zA-Z]+$/)) {
                formIsValid = false;
                errors["password"] = "Should contain letter and numbers";
            }
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    contactSubmit = (e) => {
        e.preventDefault();

        if (this.handleValidation()) {
            console.log("Form submitted");
            this.registerUser();
        } else {
            console.log("Form has errors.");
        }
    }
    registerUser = (event) => {
        console.log("submit clicked!!")
        console.log(this.state)
        let reqBody = {
            "first_name": this.state.firstname,
            "last_name": this.state.lastname,
            "email_id": this.state.emailid,
            "password": this.state.password,
        }
        axios.post('http://localhost:3000/allUsers', reqBody)
            .then(
                response => {
                    console.log(response);
                    this.props.history.push('/home');
                    // this.props.history.push('/')
                }, error => {
                    console.error(error);
                }
            )
        // event.preventDefault()
        alert("User created")
    }
    render() {
        return (
            <div style={{ height: "100%", width: "100%" }} >
                <div >
                    <div id="signup-form">
                        <header id="signup-header">SIGN-UP</header>
                        <form onSubmit={this.contactSubmit}>
                            <fieldset className="signupform-legend">
                                <legend >FirstName</legend>
                                <input type="text" className="input-tag" name="firstname" autoComplete="off"
                                onChange={this.changeHandler} title="Name should consists of letters and more than length 3" required/>
                                <span style={{ color: "red", fontSize: "14px" }}>{this.state.errors["firstname"]}</span>
                            </fieldset>
                            <br />
                            <fieldset className="signupform-legend">
                                <legend >LastName</legend>
                                <input type="text" className="input-tag" name="lastname" autoComplete="off"
                                onChange={this.changeHandler} title="Name should consists of letters and more than length 3" required/>
                                <span style={{ color: "red", fontSize: "14px" }}>{this.state.errors["lastname"]}</span>
                            </fieldset>
                            <br />
                            <fieldset className="signupform-legend">
                                <legend >Eamil Id</legend>
                                <input type="text" className="input-tag" name="emailid" autoComplete="off"
                                onChange={this.changeHandler} required/>
                                <span style={{ color: "red", fontSize: "14px" }}>{this.state.errors["emailid"]}</span>
                            </fieldset>
                            <br />
                            <fieldset className="signupform-legend">
                                <legend >Password</legend>
                                <input type="password" className="input-tag" name="password" 
                                onChange={this.changeHandler} title="Should have atleast 5 characters" required/>
                                <span style={{ color: "red", fontSize: "14px" }}>{this.state.errors["password"]}</span>
                            </fieldset>
                            <br />
                            <button id="signup-submit" >REGISTER</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(SignupComponent);