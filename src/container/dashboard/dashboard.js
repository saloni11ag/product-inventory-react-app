import React, { Component } from 'react';
import HeaderComponent from '../../component/header/header';
import GraphDisplayComponent from '../../component/graphDisplay/graphDisplay'

class DashboardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <HeaderComponent dashboard={true}></HeaderComponent>
                <GraphDisplayComponent></GraphDisplayComponent>
            </div>
         );
    }
}
 
export default DashboardComponent;