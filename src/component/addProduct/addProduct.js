import React, { Component } from 'react';
import HeaderComponent from '../header/header';
import AddProductForm from '../addProductForm/addProductForm';

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <HeaderComponent></HeaderComponent>
                <AddProductForm></AddProductForm>
            </div>
         );
    }
}
 
export default AddProduct;