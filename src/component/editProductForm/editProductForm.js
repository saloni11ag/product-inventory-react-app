import React, { Component } from 'react';
import './editProductForm.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class EditProductForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category_name: '',
            product_name: '',
            product_img: '',
            product_price: '',
            product_quantity: '',
            errors: {}
        }
    }
    componentWillMount() {
        // const { id } = this.props.match.params;
        // console.log(this.props);
        var pathArray = window.location.href.split("/");
        // console.log("patharray"+pathArray)
        let id = pathArray[4]
        this.getProductInfo(id)
    }

    getProductInfo = (id) => {
        axios.get('http://localhost:3000/allProducts/' + id)
            .then(
                response => {
                    // console.log(response.data)
                    this.setState({
                        id: id,
                        category_name: response.data.category_name,
                        product_name: response.data.product_name,
                        product_price: response.data.product_price,
                        product_quantity: response.data.product_quantity,
                        product_img: response.data.product_img
                    })
                    // console.log(this.state)
                }, error => {
                    console.error(error);
                }
            )
        axios.get('http://localhost:3000/inventory/' + id)
            .then(
                response => {
                    // console.log(response.data)
                    this.setState({ inventoryInfo: response.data })
                    console.log(this.state.inventoryInfo)
                }, error => {
                    console.error(error);
                }
            )
    }

    changeHandler = (event) => {
        // console.log(this.state.product.product_name)
        let name = event.target.name;
        let val = event.target.value;
        this.setState({ [name]: val });
        console.log(this.state)
    }

    handleValidation() {
        let productname = this.state.product_name;
        let productquantity = this.state.product_quantity
        let productprice = this.state.product_price
        let errors = {};
        let formIsValid = true;
        console.log(productname);
        //Name
        if (productname.length < 3) {
            formIsValid = false;
            errors["productname"] = "Cannot be less than length 3";
        }

        if (typeof productname !== "undefined") {
            if (!productname.match(/^[a-zA-Z\s]*$/)) {
                formIsValid = false;
                errors["productname"] = "Only letters";
            }
        }

        //productquantity
        if (!productquantity) {
            formIsValid = false;
            errors["productquantity"] = "Cannot be empty";
        }

        if (productquantity === "0") {
            formIsValid = false;
            errors["productquantity"] = "Should be more than 0";
        }

        if (typeof productquantity !== "undefined") {
            if (productquantity.match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["productquantity"] = "Only Numbers";
            }
        }
        //productprice
        if (!productprice) {
            formIsValid = false;
            errors["productprice"] = "Cannot be empty";
        }

        if (typeof productprice !== "undefined") {
            if (productprice.match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["productprice"] = "Only numbers";
            }
        }
        this.setState({ errors: errors });
        return formIsValid;
    }

    contactSubmit = (e) => {
        e.preventDefault();

        if (this.handleValidation()) {
            console.log("Form submitted");
            this.submitClicked();
        } else {
            console.log("Form has errors.");
        }
    }

    submitClicked = (event) => {
        console.log("submit clicked!!")
        let inventoryInfo = this.state.inventoryInfo
        let inventoryreqBody
        // console.log(this.state.product_img);
        let imgPath = this.state.product_img.substr(0, 6);
        let imgsrc = this.state.product_img.substr(12);
        let prodImg
        if (imgPath === 'images') {
            prodImg = this.state.product_img
        } else {
            prodImg = 'images/' + imgsrc
        }
        // console.log(this.state)
        let reqBody = {
            "product_name": this.state.product_name,
            "product_img": prodImg,
            "product_price": this.state.product_price,
            "product_quantity": this.state.product_quantity,
        }
        axios.patch('http://localhost:3000/allProducts/' + this.state.id, reqBody)
            .then(
                response => {
                    // console.log(response);
                    this.props.history.push('/home');
                    // this.props.history.push('/')
                }, error => {
                    console.error(error);
                }
            )
        if (!inventoryInfo.week2 ) {
            console.log("in week2");
            inventoryreqBody = {
                "product_name": this.state.product_name,
                "week2": this.state.product_quantity,
            }
        } else if ( !inventoryInfo.week3) {
            inventoryreqBody = {
                "product_name": this.state.product_name,
                "week3": this.state.product_quantity,
            }
        } else if( !inventoryInfo.week4){
            inventoryreqBody = {
                "product_name": this.state.product_name,
                "week4": this.state.product_quantity,
            }
        }  else if( !inventoryInfo.week5){
            inventoryreqBody = {
                "product_name": this.state.product_name,
                "week5": this.state.product_quantity,
            }
        }  else{
            console.log("in week6");
            inventoryreqBody = {
                "product_name": this.state.product_name,
                "week6": this.state.product_quantity,
            }
        }

        axios.patch('http://localhost:3000/inventory/' + this.state.id, inventoryreqBody)
            .then(
                response => {
                    // console.log(response);
                    this.props.history.push('/home');
                    // this.props.history.push('/')
                }, error => {
                    console.error(error);
                }
            )

        alert("Editted Product")
    }
    render() {
        return (<div>
            <div className="container">
                <header id="editProduct-header">EDIT PRODUCT</header>
                <form onSubmit={this.contactSubmit}>
                    <div className="row">
                        <div className="col-25">
                            <label>Category Name:</label>
                        </div>
                        <div className="col-75">
                            <input type="text" className="input-text" name="categoryname" id="category_name" value={this.state.category_name}
                                placeholder="Enetr Category Name..." readOnly />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label>Product Name:</label>
                        </div>
                        <div className="col-75">
                            <input type="text" className="input-text" id="productname" name="product_name" value={this.state.product_name}
                                placeholder="Enter Product Name.." onChange={this.changeHandler} title="Name should consists of letters and greater than length 3" required />
                            <span style={{ color: "red", fontSize: "14px" }}>{this.state.errors["productname"]}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label >Product Image:</label>
                        </div>
                        <div className="col-75">
                            <input type="file" className="input-text" id="product_img" name="product_img" onChange={this.changeHandler} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label>Quantity:</label>
                        </div>
                        <div className="col-75">
                            <input type="text" id="productquantity" className="input-text" name="product_quantity" value={this.state.product_quantity}
                                placeholder="Enter Product Quantity.." onChange={this.changeHandler} title="Quantity should be a number" required />
                            <span style={{ color: "red", fontSize: "14px" }}>{this.state.errors["productquantity"]}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label>Price:</label>
                        </div>
                        <div className="col-75">
                            <input type="text" id="productprice" className="input-text" name="product_price" value={this.state.product_price}
                                placeholder="Enter Product Price.." onChange={this.changeHandler} title="Price should be a number" required />
                            <span style={{ color: "red", fontSize: "14px" }}>{this.state.errors["productprice"]}</span>
                        </div>
                    </div>
                    <div className="row">
                        <input type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        </div>);
    }
}

export default withRouter(EditProductForm);