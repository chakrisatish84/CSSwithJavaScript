import React from 'react';
import { render, screen, RenderResult } from '@testing-library/react';
import { StyledAppComp } from './App';

let renderResult: RenderResult | undefined;
test('App renders successfully', () => {
  //Arrange 
  renderResult = render(<StyledAppComp />);
  // const linkElement = screen.getByText(/learn react/i);
 // Act is not there in this test
  //Assert
  expect(renderResult).toBeTruthy();
});


test('HandyManWord test', () => {

})