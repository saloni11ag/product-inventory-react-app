import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginComponent from './container/login/login';
import SignupComponent from './container/signup/signup'
import HomeComponent from './container/home/home';
import DashboardComponent from './container/dashboard/dashboard';
import AddProduct from './component/addProduct/addProduct';
import EditProduct from './component/editProduct/editProduct';
import AddCategory from './component/addCategory/addCategory';

class Routing extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (<Switch>
            <Route exact path="/" component={LoginComponent} />
            {/* <Route exact path="/" component={LoginComponent} /> */}
            <Route exact path="/sign-up" component={SignupComponent} />
            <Route exact path="/home" component={HomeComponent} />
            <Route exact path="/dashboard/" component={DashboardComponent} />
            <Route exact path="/dashboard/:id" component={DashboardComponent} />
            <Route exact path="/addProduct" component={AddProduct} />
            <Route exact path="/addCategory" component={AddCategory} />
            <Route exact path="/editProduct/:id" component ={EditProduct} />
        </Switch>);
    }
}

export default Routing;