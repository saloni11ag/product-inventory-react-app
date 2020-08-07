import React, { Component } from 'react';
import './graphDetails.css';
import Chart from "react-google-charts";

class GraphDetailsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="chart">
                <Chart
                    className = "inventory-chart"
                    width={'500px'}
                    height={'400px'}
                    chartType="LineChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['x', this.props.product_name],
                        [0, 0],
                        [1, this.props.week1],
                        [2, this.props.week2],
                        [3, this.props.week3],
                        [4, this.props.week4],
                        [5, this.props.week5],
                        [6, this.props.week6],
                    ]}
                    options={{
                        hAxis: {
                            title: 'Week',
                        },
                        vAxis: {
                            title: 'Quantity',
                        },
                    }}
                    // rootProps={{ 'data-testid': '1' }}
                />
            </div>
        );

        // return (
        //     <div  style={{display: "inline"}}>
        //         <img src={graphsrc} alt="inventory-graph" height="450" className="inventory-chart" />
        //     </div>
        // );
    }
}

export default GraphDetailsComponent;