import React from 'react';
import ReactDOM from 'react-dom'
import GraphDetailsComponent from './graphDetails'
import { render, cleanup } from '@testing-library/react';
// import renderer from "react-test-renderer";

import '@testing-library/jest-dom/extend-expect'

afterEach(cleanup)

it('component renders without crashing', ()=>{
    const div = document.createElement('div')
    ReactDOM.render(<GraphDetailsComponent></GraphDetailsComponent>, div)
})