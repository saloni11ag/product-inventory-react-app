import React, { Component } from 'react';
import './header.css'
import { Link } from 'react-router-dom';

class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() {
        var pathArray = window.location.href.split("/");
        let pathName = pathArray[3]
        console.log(pathName)
        this.setState({pathName: pathName})
    }
    render() {
        return (
            <div>
                <header>
                    <ul id="navbar">
                        <li className="navbar-items"><Link className="navbar-items-links" to="/home"
                            >HOME</Link></li>
                        {this.state.pathName !== 'dashboard' && <li className="navbar-items"><Link className="navbar-items-links" to="/dashboard">DASHBOARD</Link></li>}
                        <li className="navbar-items" style={{float:"right", borderLeft:"1px solid #bbb"}}><Link className="navbar-items-links"
                            to="/">LOGOUT</Link></li>
                        {/* <li className="navbar-items" style={{float:"right", borderLeft:"1px solid #bbb"}}><Link className="navbar-items-links"
                            to="#profile">PROFILE</Link></li> */}
                         {/* <li className="navbar-items"><Link className="navbar-items-links" to="/home"
                             style={{float:"right",  borderLeft:"1px solid #bbb"}}
                            >HOME</Link></li> */}
                    </ul>
                </header>
            </div>
        );
    }
}

export default HeaderComponent;