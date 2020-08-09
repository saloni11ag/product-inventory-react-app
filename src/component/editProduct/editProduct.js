import React, { Component } from 'react';
import HeaderComponent from '../header/header';
import EditProductForm from '../editProductForm/editProductForm';

class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() { 
        return ( 
            <div>
                <HeaderComponent></HeaderComponent>
                <EditProductForm></EditProductForm>
            </div>
         );
    }
}
 
export default EditProduct;