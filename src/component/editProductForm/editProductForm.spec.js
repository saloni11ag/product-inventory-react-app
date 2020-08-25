import React from 'react';
import ReactDOM from 'react-dom'
import EditProductForm from './editProductForm'
import { render, cleanup } from '@testing-library/react';
import { MemoryRouter as Router, withRouter } from 'react-router-dom'
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import '@testing-library/jest-dom/extend-expect'

Enzyme.configure({ adapter: new Adapter() });

afterEach(cleanup)

it('Edit Product Form renders without crashing', ()=>{
    const div = document.createElement('div')
    ReactDOM.render(<Router><EditProductForm></EditProductForm></Router>, div)
})

it('check if div renders in correct way', ()=>{
    const {getByTestId} = render(<Router><EditProductForm label='EDIT PRODUCT'></EditProductForm></Router>)
    expect(getByTestId('editProduct')).toHaveTextContent('EDIT')
})

it('check if label renders in correct way', ()=>{
    const {getByTestId} = render(<Router><EditProductForm label='Product Name'></EditProductForm></Router>)
    expect(getByTestId('productname')).toHaveTextContent('Name')
})

// it('check for input text', () => {
//     const wrapper = mount(<input type="text" />)
//     const input  = wrapper.find("input")
//     expect(input.prop("type")).toEqual("text")
// })

// it('check for input submit', () => {
//     const wrapper = mount(<input type="submit" />)
//     const input  = wrapper.find("input")
//     expect(input.prop("type")).toEqual("submit")
// })

