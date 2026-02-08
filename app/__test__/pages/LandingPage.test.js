import { experimental_useEffectEvent } from "react"
import LandingPage from "../../page"
import { render,screen } from "@testing-library/react"
import { fireEvent } from "@testing-library/react"
describe('LandingPage Buttons', () => {
  test('Start Practice Interview button can be clicked', () => {
    render(<LandingPage />);
    const button = screen.getByRole('button', { name: 'Start Practice Interview' });
    expect(button).toBeInTheDocument();
  });

  test('Get Started button can be clicked', () => {
    render(<LandingPage />);
    const button = screen.getByRole('button', { name: 'Get Started' });
    fireEvent.click(button);
      });
  test('Watch Demo button can be clicked', () => {
    render(<LandingPage />);
    const button = screen.getByRole('button', { name: 'Watch Demo' });
    fireEvent.click(button);
      });
  test('Start Free Mock Interview button can be clicked', () => {
    render(<LandingPage />);
    const button = screen.getByRole('button', { name: 'Start Free Mock Interview' });
    fireEvent.click(button);
      });
  test('Get Started button can be clicked', () => {
    render(<LandingPage />);
    const button = screen.getByRole('button', { name: 'Get Started' });
    fireEvent.click(button);
      });
});

describe('LandingPage Headings', () => {
  test('AI-Powered Mock Interviews renders correctly', () => {
    render(<LandingPage />);
    const heading = screen.getByText('AI-Powered Mock Interviews');
    expect(heading).toBeInTheDocument();
  });
  test('Why Choose Logoipsum? renders correctly', () => {
    render(<LandingPage />);
    const heading = screen.getByText('Why Choose Logoipsum?');
    expect(heading).toBeInTheDocument();
  });
  test('Master Your Next Interview renders correctly', () => {
    render(<LandingPage />);
    const heading = screen.getByRole('heading', { name: /Master Your Next Interview/i });
    expect(heading).toBeInTheDocument();
  });
});

