import React from 'react';
import ReactDOM from 'react-dom'
import LoginComponent from './login'
import { render, cleanup } from '@testing-library/react';
import { MemoryRouter as Router, withRouter } from 'react-router-dom'
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


import '@testing-library/jest-dom/extend-expect'

Enzyme.configure({ adapter: new Adapter() });


afterEach(cleanup)

it('Login Component Form renders without crashing', ()=>{
    const div = document.createElement('div')
    ReactDOM.render(<Router><LoginComponent></LoginComponent></Router>, div)
})

it('check if div renders in correct way', ()=>{
    const {getByTestId} = render(<Router><LoginComponent label='LOG-IN'></LoginComponent></Router>)
    expect(getByTestId('login')).toHaveTextContent('LOG-IN')
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
