import React, { Component } from 'react';
import './addProductForm.css'
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class AddProductForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryname: 'Electronics',
            // productcode: '',
            productname: '',
            product_img: '',
            productquantity: '',
            productprice: '',
            errors: {},
            allCategories: []
        }
    }

    componentWillMount() {
        axios.get('http://localhost:3000/allCategories')
            .then(response => {
                // console.log(response.data)
                this.setState({ allCategories: response.data })
                // console.log(this.state.allProducts);
            }, error => {
                console.error(error);
            })
    }

    changeHandler = (event) => {
        // console.log(event.target.name)
        let name = event.target.name;
        let val = event.target.value;
        this.setState({ [name]: val });
        //console.log(this.state)
        // this.handleValidation();
    }

    handleValidation() {
        let productname = this.state.productname;
        let productquantity = this.state.productquantity
        let productprice = this.state.productprice
        let errors = {};
        let formIsValid = true;

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
            this.submitProduct();
        } else {
            console.log("Form has errors.");
        }
    }
    submitProduct = (event) => {
        console.log("submit clicked!!")
        console.log(this.state)
        let imgsrc = this.state.product_img.substr(12);
        let prodImg = 'images/' + imgsrc
        console.log("imgsrc" + prodImg)
        let reqBody = {
            "category_name": this.state.categoryname,
            "product_name": this.state.productname,
            "product_price": this.state.productprice,
            "product_quantity": this.state.productquantity,
            "product_img": prodImg
        }
        let inventoryreqBody = {
            "product_name": this.state.productname,
            "week1": this.state.productquantity
        }
        axios.post('http://localhost:3000/allProducts', reqBody)
            .then(
                response => {
                    // console.log(response);
                    this.props.history.push('/home');
                    // this.props.history.push('/')
                }, error => {
                    console.error(error);
                }
            )
        axios.post('http://localhost:3000/inventory', inventoryreqBody)
            .then(
                response => {
                    console.log(response);
                    this.props.history.push('/home');
                    // this.props.history.push('/')
                }, error => {
                    console.error(error);
                }
            )


        // event.preventDefault()
        alert("Added Product")
    }

    displayCategories = () => {
        return this.state.allCategories.map(cat => {
            return (<option key={cat.id} value={cat.category_name}>{cat.category_name}</option>)
        })
    }
    render() {
        return (
            <div>
                <div className="container">
                    <header id="addProduct-header">ADD PRODUCT</header>
                    <form onSubmit={this.contactSubmit}>
                        <div className="row">
                            <div className="col-25">
                                <label htmlFor="categoryname">Category Name:</label>
                            </div>
                            <div className="col-75">
                                <select name="categoryname" className="input-select" onChange={this.changeHandler} >
                                    {this.displayCategories()}
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label>Product Name:</label>
                            </div>
                            <div className="col-75">
                                <input type="text" className="input-text" id="productname" name="productname" autoComplete="off"
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
                                <label >Quantity</label>
                            </div>
                            <div className="col-75">
                                <input type="text" className="input-text" id="productquantity" name="productquantity" autoComplete="off"
                                    placeholder="Enter Product Quantity.." onChange={this.changeHandler} title="Quantity should be a number" required />
                                <span style={{ color: "red", fontSize: "14px" }}>{this.state.errors["productquantity"]}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label >Price</label>
                            </div>
                            <div className="col-75">
                                <input type="text" className="input-text" id="productprice" name="productprice" autoComplete="off"
                                    placeholder="Enter Product Price.." onChange={this.changeHandler} title="Price should be a number" required />
                                <span style={{ color: "red", fontSize: "14px" }}>{this.state.errors["productprice"]}</span>
                            </div>
                        </div>
                        <div className="row">
                            <input type="submit" value="Submit" />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(AddProductForm);