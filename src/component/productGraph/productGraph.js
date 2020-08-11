import React, { Component } from 'react';
import Chart from "react-google-charts";
import axios from 'axios'
import './productGraph.css'

class ProductGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allCategories: []
        }
    }

    componentWillMount() {
        this.getAllCategories()
    }

    getAllCategories = () => {
        axios.get('http://localhost:3000/allCategories')
            .then(response => {
                // console.log(response.data)
                this.setState({ allCategories: response.data })
                console.log(this.state.allCategories);
                const chartData = [['Category', 'Stock Available']]
                this.state.allCategories.map(obj => {
                    chartData.push([obj.category_name, obj.stock])
                })
                this.setState({
                    chartData: chartData,
                })
                console.log(this.state.chartData);
            }, error => {
                console.error(error);
            })
    }



    render() {
        return (
            <div>
                <Chart
                    width={'400px'}
                    height={'300px'}
                    chartType="PieChart"
                    className = "product-graph-size"
                    loader={<div>Loading Chart</div>}
                    data={this.state.chartData}
                    options={{
                        title: 'Stock Availabilty',
                        // Just add this option
                        is3D: true,
                    }}
                    rootProps={{ 'data-testid': '2' }}
                />
            </div>
        );
    }
}

export default ProductGraph;