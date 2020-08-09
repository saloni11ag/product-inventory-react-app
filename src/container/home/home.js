import React, { Component } from 'react';
import HeaderComponent from '../../component/header/header';
import ProductDisplay from '../../component/productDisplay/productDisplay';

class HomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( <div>
            <HeaderComponent></HeaderComponent>
            {/* <SidebarComponent></SidebarComponent> */}
            <ProductDisplay></ProductDisplay>
            </div> );
    }
}
 
export default HomeComponent;