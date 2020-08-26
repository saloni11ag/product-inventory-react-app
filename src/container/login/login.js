import React, { Component } from 'react';
import './login.css';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allUsers: [],
            email_id: '',
            password: '',
            error: ''
        }
    }

    componentWillMount() {
        this.getAllUsers()
    }
    loginClick = () => {
        // this.props.history.push('/home')
    }
    getAllUsers = () => {
        axios.get('http://localhost:3000/allUsers')
            .then(response => {
                // console.log(response.data)
                this.setState({ allUsers: response.data })
            }, error => {
                console.error(error);
            })
    }

    changeHandler = (event) => {
        // console.log(event.target)
        let name = event.target.name;
        let val = event.target.value;
        this.setState({ [name]: val });
        // console.log(this.state)
    }

    handleValidation = () => {
        let loginValid = true;
        var tempUser = this.state.allUsers.filter(user => {
            return user.email_id === this.state.email_id && user.password === this.state.password
        })
        // console.log(tempUser)
        if(tempUser.length === 0){
            // console.log("invalid username or password")
            loginValid = false
            this.setState({error: "Invalid username or password"});
        }
        return loginValid
    }

    submitForm = (e) => {
        e.preventDefault();

        if(this.handleValidation()){
        //    console.log("login validated");
           this.props.history.push('/home')
        }else{
           console.log("invalid username or password");
        }
    }
    render() {
        return (
            <div style={{ height: "100%", width: "100%" }}>
                <div>
                    <div id="login-form">
                        <header data-testid="login" id="login-header">LOG-IN</header>
                        <form onSubmit={this.submitForm}>
                            <label style={{marginLeft:"5px"}}>EmailId</label>
                            <fieldset className="form-legend">
                                {/* <legend>EmailId</legend> */}
                                <input type="text" name="email_id" className="logininput-tag" 
                                onChange={this.changeHandler} autoComplete="off" placeholder="Enter Email Id..." />
                            </fieldset>
                            <br />
                            <label style={{marginLeft:"5px"}}>Password</label>
                            <fieldset className="form-legend">
                                {/* <legend>Password</legend> */}
                                <input type="password" name="password" className="logininput-tag" onChange={this.changeHandler}  placeholder="Enter Password..." />
                            </fieldset>
                            <br />
                            <button id="login-submit">LOGIN</button>
                            <span style={{color: "red", fontSize: "14px"}}>{this.state.error}</span>
                            <br />
                            <p style={{ marginTop: "50px" }}>New User, <Link to="/sign-up" style={{ color: "black" }}><b>REGISTER </b></Link>
             here</p>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(LoginComponent);