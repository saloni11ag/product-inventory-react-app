import React, { Component } from 'react';
import HeaderComponent from '../../component/header/header';
import GraphDisplayComponent from '../../component/graphDisplay/graphDisplay'
import SidebarComponent from '../../component/sidebar/sidebar';

class DashboardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <HeaderComponent></HeaderComponent>
                <GraphDisplayComponent></GraphDisplayComponent>
            </div>
         );
    }
}
 
export default DashboardComponent;