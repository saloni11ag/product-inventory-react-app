import React from 'react';
import ReactDOM from 'react-dom'
import AddCategoryForm from './addCategoryForm'
import { render, cleanup } from '@testing-library/react';
import { MemoryRouter as Router, withRouter } from 'react-router-dom'
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


import '@testing-library/jest-dom/extend-expect'

Enzyme.configure({ adapter: new Adapter() });


afterEach(cleanup)

it('Add Category Form renders without crashing', ()=>{
    const div = document.createElement('div')
    ReactDOM.render(<Router><AddCategoryForm></AddCategoryForm></Router>, div)
})

it('check if div renders in correct way', ()=>{
    const {getByTestId} = render(<Router><AddCategoryForm label='ADD CATEGORY'></AddCategoryForm></Router>)
    expect(getByTestId('addCategory')).toHaveTextContent('ADD')
})

it('check if label renders in correct way', ()=>{
    const {getByTestId} = render(<Router><AddCategoryForm label='Category Name'></AddCategoryForm></Router>)
    expect(getByTestId('name')).toHaveTextContent('Name')
})

it('check for input text', () => {
    const wrapper = mount(<input type="text" />)
    const input  = wrapper.find("input")
    expect(input.prop("type")).toEqual("text")
})

it('check for input submit', () => {
    const wrapper = mount(<input type="submit" />)
    const input  = wrapper.find("input")
    expect(input.prop("type")).toEqual("submit")
})
