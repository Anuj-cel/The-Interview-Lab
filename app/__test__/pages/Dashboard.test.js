// page.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Page from '../../dashboard/page';
jest.mock('../../dashboard/_components/AddNewInterview', () => () => <div>AddNewInterview Mock</div>);
jest.mock('../../dashboard/_components/InterviewList', () => () => <div>InterviewList Mock</div>);
//When Dashboard renders in your test, instead of using the real component, it renders the fake one (<div>AddNewInterview Mock</div>).
describe('Dashboard Page', () => {
  
  test('renders dashboard title and subtitle', () => {
    render(<Page />);
    
    // Check if main heading exists
    const mainHeading = screen.getByText(/Dashboard/i);
    expect(mainHeading).toBeInTheDocument();

    // Check if subtitle exists
    const subHeading = screen.getByText(/Create and Start your AI Mockup/i);
    expect(subHeading).toBeInTheDocument();
  });

test('renders AddNewInterview component', () => {
  render(<Page />);
  const addInterview = screen.getByText(/AddNewInterview Mock/i);
  expect(addInterview).toBeInTheDocument();
});

test('renders InterviewList component', () => {
  render(<Page />);
  const interviewList = screen.getByText(/InterviewList Mock/i);
  expect(interviewList).toBeInTheDocument();
});

});
