import React, { Component } from 'react';
import './productDisplay.css'
import ProductDetails from '../productDetails/productDetails';
import { withRouter } from 'react-router-dom';
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

    deleteProduct = (id, categoryname, quantity) => {
        console.log(id)
        var temCat = this.state.allCategories.filter(cat => {
            return cat.category_name === categoryname
        })
        let tempStock = temCat[0].stock
        tempStock = tempStock - parseInt(quantity)
        let stockreq = {
            "stock": tempStock
        }
        axios.patch('http://localhost:3000/allCategories/' + temCat[0].id, stockreq)
            .then(
                response => {
                    // console.log(response);
                    // this.props.history.push('/home');
                    // this.props.history.push('/')
                }, error => {
                    console.error(error);
                }
            )
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
                        categoryname={product.category_name}
                        deleteProduct={this.deleteProduct}
                    ></ProductDetails>
                </div>
            )
        })
    }

    addProductClick = () => {
        this.props.history.push('/addProduct')
    }

    addCategoryClick = () => {
        this.props.history.push('/addCategory')
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
            this.setState({ message: false })
            this.setState({ allProducts: this.state.searchProducts })
        } else {
            let filteredProducts = this.state.searchProducts.filter(prod => {
                return prod.category_name === val
            })
            if (filteredProducts.length === 0) {
                this.setState({ message: true })
            } else {
                this.setState({ message: false })
                this.setState({ allProducts: filteredProducts })
            }
        }
    }

    displayCategories = () => {
        return this.state.allCategories.map(cat => {
            return (<option key={cat.id} value={cat.category_name}>{cat.category_name}</option>)
        })
    }

    sortChange = (event) => {
        let val = event.target.value;
        if (val === "all-product") {
            this.setState({ allProducts: this.state.searchProducts })
        } else if (val === "product-asc") {
            var prods_list = [].concat(this.state.searchProducts)
                .sort((a, b) => {
                    if (a.product_name < b.product_name) { return -1; }
                })
            this.setState({ allProducts: prods_list })
            console.log(prods_list);
        } else if (val === "product-desc") {
            var prods_list = [].concat(this.state.searchProducts)
                .sort((a, b) => {
                    if (a.product_name > b.product_name) { return -1; }
                })
            this.setState({ allProducts: prods_list })
            console.log(prods_list);
        } else if (val === "price-asc") {
            var prods_list = [].concat(this.state.searchProducts)
                .sort((a, b) => {
                    if (a.product_price < b.product_price) { return -1; }
                })
            this.setState({ allProducts: prods_list })
            console.log(prods_list);
        } else if (val === "price-desc") {
            var prods_list = [].concat(this.state.searchProducts)
                .sort((a, b) => {
                    if (a.product_price > b.product_price) { return -1; }
                })
            this.setState({ allProducts: prods_list })
            console.log(prods_list);
        }
    }

    render() {

        // let categoriesInDropdown = this.state.allCategories.map(cat => {
        //     return (<option key={cat.id} value={cat.category_name}>{cat.category_name}</option>)
        // })
        return (
            <div>
                <div className="home-page">
                    <button className="addbutton button1" onClick={this.addProductClick}>Add Product</button>
                    <button className="addbutton button1" onClick={this.addCategoryClick}>Add Category</button>
                    <div className="select-category">
                        <span style={{ marginLeft: "50px" }}>Filter By Category  </span>
                        <select name="categoryname" className="input-category" onChange={this.selectChange} >
                            <option value="all">All Categories</option>
                            {this.displayCategories()}
                            {/* {categoriesInDropdown} */}
                        </select>
                    </div>
                    <div style={{ display: "inline" }}>
                        <span style={{ marginLeft: "30px" }}>Sort By: </span>
                        <select name="sort" className="input-sort-product" onChange={this.sortChange} >
                            <option value="all-product">---  sort by  ---</option>
                            <option value="product-asc">Ascending A to Z</option>
                            <option value="product-desc">Descending Z to A</option>
                            <option value="price-asc">Price Low To High</option>
                            <option value="price-desc">Price High To Low</option>
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
                        {this.state.message ? <div className="error-message">No Product Available Right Now</div> : this.displayProducts() }
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ProductDisplay);