import React from 'react';
import ReactDOM from 'react-dom'
import AddProduct from './addProduct'
import { render, cleanup } from '@testing-library/react';
import { MemoryRouter as Router, withRouter } from 'react-router-dom'
// import renderer from "react-test-renderer";

import '@testing-library/jest-dom/extend-expect'

afterEach(cleanup)

it('Add Product renders without crashing', ()=>{
    const div = document.createElement('div')
    ReactDOM.render(<Router><AddProduct></AddProduct></Router>, div)
})