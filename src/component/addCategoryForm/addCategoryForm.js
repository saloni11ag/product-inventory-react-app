import React, { Component } from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class AddCategoryForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryname: '',
            allCategories: [],
            errors: {}
          }
    }

    componentWillMount() {
        this.getAllCategories()
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

    changeHandler = (event) => {
        // console.log(event.target.name)
        let name = event.target.name;
        let val = event.target.value;
        this.setState({ [name]: val });
        //console.log(this.state)
        // this.handleValidation();
    }

    handleValidation() {
        let categoryname = this.state.categoryname;
        let errors = {};
        let formIsValid = true;

        //Name
        if (categoryname.length < 3) {
            formIsValid = false;
            errors["categoryname"] = "Cannot be less than length 3";
        }

        if (typeof categoryname !== "undefined") {
           var temp =  this.state.allCategories.filter(cat => {
              return  cat.category_name.toLowerCase() === categoryname.toLowerCase()
            })

            // console.log(temp);

            if(temp.length  > 0 ){
                formIsValid = false;
                errors["categoryname"] = "Name already exists";
            }
        }        

        if (typeof categoryname !== "undefined") {
            if (!categoryname.match(/^[a-zA-Z\s]*$/)) {
                formIsValid = false;
                errors["categoryname"] = "Only letters";
            }
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    contactSubmit = (e) => {
        e.preventDefault();

        if (this.handleValidation()) {
            // console.log("Form submitted");
            this.submitProduct();
        } else {
            // console.log("Form has errors.");
        }
    }
    submitProduct = (event) => {
        // console.log("submit clicked!!")
        // console.log(this.state)
        let reqBody = {
            "category_name": this.state.categoryname,
            "stock": 0
        }
        axios.post('http://localhost:3000/allCategories', reqBody)
            .then(
                response => {
                    // console.log(response);
                    this.props.history.push('/home');
                    // this.props.history.push('/')
                }, error => {
                    console.error(error);
                }
            )
        // event.preventDefault()
        alert("Added Category")
    }
    render() { 
        return ( 
            <div>
                <div className="container">
                    <header data-testid="addCategory" id="addProduct-header">ADD CATEGORY</header>
                    <form onSubmit={this.contactSubmit}>
                        <div className="row">
                            <div className="col-25">
                                <label data-testid="name" >Category Name:</label>
                            </div>
                            <div className="col-75">
                                <input type="text" className="input-text" id="categoryname" name="categoryname" autoComplete="off"
                                    placeholder="Enter Category Name.." onChange={this.changeHandler} title="Name should consists of letters and greater than length 3" required />
                                <span style={{ color: "red", fontSize: "14px" }}>{this.state.errors["categoryname"]}</span>
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
 
export default withRouter(AddCategoryForm);