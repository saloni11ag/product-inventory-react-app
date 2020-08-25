import React from 'react';
import ReactDOM from 'react-dom'
import SignupComponent from './signup'
import { render, cleanup } from '@testing-library/react';
import { MemoryRouter as Router, withRouter } from 'react-router-dom'
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


import '@testing-library/jest-dom/extend-expect'

Enzyme.configure({ adapter: new Adapter() });


afterEach(cleanup)

it('Signup Component Form renders without crashing', ()=>{
    const div = document.createElement('div')
    ReactDOM.render(<Router><SignupComponent></SignupComponent></Router>, div)
})

it('check if div renders in correct way', ()=>{
    const {getByTestId} = render(<Router><SignupComponent label='SIGN-UP'></SignupComponent></Router>)
    expect(getByTestId('signup')).toHaveTextContent('SIGN-UP')
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
