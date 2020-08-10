import React, { Component } from 'react';
import HeaderComponent from '../header/header';
import AddCategoryForm from '../addCategoryForm/addCategoryForm'

class AddCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <HeaderComponent></HeaderComponent>
                <AddCategoryForm></AddCategoryForm>
            </div>
         );
    }
}
 
export default AddCategory;