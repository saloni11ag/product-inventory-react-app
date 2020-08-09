import React, { Component } from 'react';
import './productDisplay.css'
import ProductDetails from '../productDetails/productDetails';
import {  withRouter } from 'react-router-dom';
import axios from 'axios';

class ProductDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allProducts: [],
            searchProducts: [],
            allCategories: [],
            search: ''
        }
    }

    componentWillMount() {
        this.getAllProducts()
        this.getAllCategories()
    }

    deleteProduct = (id) => {
        console.log(id)
        axios.delete('http://localhost:3000/allProducts/' + id)
            .then(response => {
                // console.log(response)
                alert("This product will be deleted")
                this.getAllProducts()
            }, error => {
                console.error(error)
            })
        axios.delete('http://localhost:3000/inventory/' + id)
            .then(response => {
                // console.log(response)
            }, error => {
                console.error(error)
            })
    }

    getAllProducts = () => {
        axios.get('http://localhost:3000/allProducts')
            .then(response => {
                // console.log(response.data)
                this.setState({ allProducts: response.data })
                this.setState({ searchProducts: response.data })
            }, error => {
                console.error(error);
            })
    }

    getAllCategories = () => {
        axios.get('http://localhost:3000/allCategories')
            .then(response => {
                // console.log(response.data)
                this.setState({ allCategories: response.data })
            }, error => {
                console.error(error);
            })
    }
    displayProducts = () => {
        return this.state.allProducts.map(product => {
            return (
                <div key={product.id} className="prod-column">
                    <ProductDetails
                        key={product.id}
                        id={product.id}
                        name={product.product_name}
                        price={product.product_price}
                        quantity={product.product_quantity}
                        img={product.product_img}
                        deleteProduct={this.deleteProduct}
                    ></ProductDetails>
                </div>
            )
        })
    }

    addProductClick = () => {
        this.props.history.push('/addProduct')
    }

    handleChange = (event) => {
        let name = event.target.name;
        let val = event.target.value;

        if (val === '') {
            this.setState({ allProducts: this.state.searchProducts })
        }

        this.setState({ [name]: val });
        let filteredProducts = this.state.searchProducts.filter(prod => {
            return prod.product_name.toLowerCase().match(val.toLowerCase())
        })
        // console.log("searched product"+filteredProducts);
        this.setState({ allProducts: filteredProducts })
    }

    selectChange = (event) => {
        // let name = event.target.name;
        let val = event.target.value;
        // console.log(val)
        if (val === "all") {
            this.setState({ allProducts: this.state.searchProducts })
        } else {
            let filteredProducts = this.state.searchProducts.filter(prod => {
                return prod.category_name === val
            })
            this.setState({ allProducts: filteredProducts })
        }
    }

    displayCategories = () => {
        return this.state.allCategories.map(cat => {
            return (<option key={cat.id} value={cat.category_name}>{cat.category_name}</option>)
        })
    }

    render() {

    // let categoriesInDropdown = this.state.allCategories.map(cat => {
    //     return (<option key={cat.id} value={cat.category_name}>{cat.category_name}</option>)
    // })
        return (
            <div>
                <div className="home-page">
                    <button className="button button1" onClick={this.addProductClick}>Add Product</button>
                    <div className="select-category">
                        <span style={{ marginLeft: "50px" }}>Select By Category  </span>
                        <select name="categoryname" className="input-category" onChange={this.selectChange} >
                            <option value= "all">All Categories</option>
                            {this.displayCategories()}
                            {/* {categoriesInDropdown} */}
                        </select>
                    </div>
                    <div className="search-container">
                        <form>
                            <input type="text" placeholder="Search.." name="search"
                                value={this.state.search} onChange={this.handleChange} />
                            <button type="submit"><i className="fa fa-search"></i></button>
                        </form>
                    </div>
                    <div className="prod-row">
                        {this.displayProducts()}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ProductDisplay);