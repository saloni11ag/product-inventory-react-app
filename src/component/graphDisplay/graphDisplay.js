import React, { Component } from 'react';
import GraphDetailsComponent from '../graphDetails/graphDetails';
import './graphDisplay.css';
import axios from 'axios';

class GraphDisplayComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            product_name: '',
            week1: '',
            week2: '',
            week3: '',
            week4: '',
            week5: '',
            week6: '',
            allInventory: [],
            withId: ''
        }
    }

    componentWillMount() {
        var pathArray = window.location.href.split("/");
        let id = pathArray[4]
        // console.log(pathArray)
        // console.log("id"+id);
        if (id === undefined) {
            console.log("no id")
            this.setState({ withId: false })
            this.getAllInventoryInfo()
        }
        else {
            console.log(id)
            this.setState({ withId: true })
            this.getInventoryInfo(id)
        }
    }

    getAllInventoryInfo = () => {
        axios.get('http://localhost:3000/inventory/')
            .then(
                response => {
                    //console.log(response.data)
                    this.setState({
                        allInventory: response.data
                    })
                    // console.log(this.state)
                }, error => {
                    console.error(error);
                }
            )
    }

    getInventoryInfo = (id) => {
        axios.get('http://localhost:3000/inventory/' + id)
            .then(
                response => {
                    //console.log(response.data)
                    this.setState({
                        id: id,
                        product_name: response.data.product_name,
                        week1: response.data.week1,
                        week2: response.data.week2,
                        week3: response.data.week3,
                        week4: response.data.week4,
                        week5: response.data.week5,
                        week6: response.data.week6
                    })
                    // console.log(this.state)
                }, error => {
                    console.error(error);
                }
            )
    }

    rendorAllGraphs = () => {
        return this.state.allInventory.map(obj => {
            return (
                <div className="graph-col">
                    <GraphDetailsComponent
                        key={obj.id}
                        product_name={obj.product_name}
                        week1={obj.week1}
                        week2={obj.week2}
                        week3={obj.week3}
                        week4={obj.week4}
                        week5={obj.week5}
                        week6={obj.week6}
                    ></GraphDetailsComponent>
                </div>
            )
        })
    }
    render() {
        if (this.state.withId) {
            return (
                <div>
                    <div className="dashboard-page">
                        <GraphDetailsComponent
                            key={this.state.id}
                            product_name={this.state.product_name}
                            week1={this.state.week1}
                            week2={this.state.week2}
                            week3={this.state.week3}
                            week4={this.state.week4}
                            week5={this.state.week5}
                            week6={this.state.week6}
                        ></GraphDetailsComponent>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="graph-row">{this.rendorAllGraphs()}</div>
            );
        }
    }
}

export default GraphDisplayComponent;
