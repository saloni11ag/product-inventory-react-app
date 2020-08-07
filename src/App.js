import React from 'react';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';
import LoginComponent from './container/login/login';
import SignupComponent from './container/signup/signup'
import HomeComponent from './container/home/home';
import DashboardComponent from './container/dashboard/dashboard';
import AddProduct from './component/addProduct/addProduct';
import EditProduct from './component/editProduct/editProduct';

function App() {
  return (
    <div className="App">
      <Switch>
       <Route exact path="/" render={() => <LoginComponent></LoginComponent>} />
       {/* <Route exact path="/" component={LoginComponent} /> */}
       <Route exact path="/sign-up" component={SignupComponent} />
       <Route exact path="/home" component={HomeComponent} /> 
       <Route exact path="/dashboard/" component={DashboardComponent} /> 
       <Route exact path="/dashboard/:id" component={DashboardComponent} /> 
       <Route exact path="/addProduct" component={AddProduct} /> 
       <Route exact path="/editProduct/:id" render={() => <EditProduct />} /> 
      </Switch>
    </div>
  );
}

export default App;
