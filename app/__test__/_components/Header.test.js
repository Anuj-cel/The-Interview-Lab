import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "../../dashboard/_components/Header";
import { usePathname } from "next/navigation";
import "@testing-library/jest-dom";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

// Mock next/image
jest.mock("next/image", () => (props) => {
  return <img {...props} alt={props.alt || "mocked image"} />;
});

// Mock Clerk
jest.mock("@clerk/nextjs", () => ({
  UserButton: () => <div />,
}));

describe("Header Links", () => {
  it("renders Dashboard and Questions links", () => {
    usePathname.mockReturnValue("/dashboard");
    render(<Header />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Questions")).toBeInTheDocument();
  });

  it("highlights Dashboard when pathname is /dashboard", () => {
    usePathname.mockReturnValue("/dashboard");
    render(<Header />);
    expect(screen.getByText("Dashboard")).toHaveClass("text-primary", "font-bold");
    expect(screen.getByText("Questions")).not.toHaveClass("text-primary");
  });

  it("highlights Questions when pathname is /dashboard/questions", () => {
    usePathname.mockReturnValue("/dashboard/questions");
    render(<Header />);
    expect(screen.getByText("Questions")).toHaveClass("text-primary", "font-bold");
    expect(screen.getByText("Dashboard")).not.toHaveClass("text-primary");
  });
});
