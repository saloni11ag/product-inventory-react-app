import React, { Component } from 'react';
import './productDetails.css'
import { Link, withRouter } from 'react-router-dom';

class ProductDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productid: ''
        }
    }

    editProductClick = (event) => {
        this.props.history.push(`/editProduct/${this.props.id}`)
        // this.props.history.push({
        //     pathname: `/editProduct/${this.props.id}`, 
        //     state: {productid: this.props.id}
        // })
        event.preventDefault()
    }
    deleteClick = () => {
        this.props.deleteProduct(this.props.id)
    }

    productClick = () => {
        console.log("product clicked")
        console.log("id" + this.props.id)
        this.props.history.push(`/dashboard/${this.props.id}`)
    }
    render() {
        return (
            <div style={{ display: "inline" }}>
                <div className="card">
                    <div style={{ cursor: "pointer" }} onClick={this.productClick}>
                    <img src={this.props.img} alt="product-img" width="100%" height="360px" />
                    <div className="product-container">
                        <h4><b>Product Name: {this.props.name}</b></h4>
                        <p>Price: {this.props.price}$</p>
                        <p>Quantity: {this.props.quantity}</p>
                    </div>
                    </div>
                    <button className="button button1" onClick={this.editProductClick}>Edit</button>
                    <button className="button button2" onClick={this.deleteClick}>Delete</button>
                </div>
            </div>
        );
    }
}

export default withRouter(ProductDetails);