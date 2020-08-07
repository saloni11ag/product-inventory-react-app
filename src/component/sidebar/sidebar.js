import React, { Component } from 'react';
import './sidebar.css';

class SidebarComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <div className="sidenav">
                    <a href="#">Categories</a>
                    <form className="filter-checkbox">
                        <input type="checkbox" id="Electronics" name="Electronics" value="Electronics" />
                        <label for="Electronics"> Electronics</label><br />
                        <input type="checkbox" id="Clothing" name="Clothing" value="Clothing" />
                        <label for="Clothing"> Clothing</label><br />
                    </form>
                    <a href="#">Price</a>
                    <form className="filter-checkbox">
                        <input type="checkbox" id="price1" name="price1" value="price1" />
                        <label for="price1"> Rs. 500 to 1000</label><br />
                        <input type="checkbox" id="price1" name="price1" value="price1" />
                        <label for="price1"> Rs. 1000 to 2000</label><br />
                    </form>
                </div>
            </div>
        );
    }
}

export default SidebarComponent;