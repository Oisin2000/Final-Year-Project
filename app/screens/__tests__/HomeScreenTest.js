import React from "react";
// Import required testing components and the HomeScreen2 component
import { render, fireEvent } from "@testing-library/react-native";
import HomeScreen2 from "../HomeScreen2";

// Reset fetch mocks before each test
beforeEach(() => {
  fetch.resetMocks();
});

// Test suite for HomeScreen2 component
describe("HomeScreen2", () => {
  // Test if the component renders correctly
  test("renders correctly", () => {
    const { getByText } = render(<HomeScreen2 />);
    expect(getByText("The Film Club")).toBeTruthy();
  });

  // Test if the About Us modal opens and closes correctly
  test("opens and closes the About Us modal", () => {
    const { getByText, queryByText } = render(<HomeScreen2 />);
    fireEvent.press(getByText("About Us"));
    expect(getByText("About us")).toBeTruthy();

    fireEvent.press(getByText("Close"));
    expect(queryByText("About us")).toBeNull();
  });

  // Test if the Friends modal opens and closes correctly
  test("opens and closes the Friends modal", () => {
    const { getByText, queryByText } = render(<HomeScreen2 />);
    fireEvent.press(getByText("Friends"));
    expect(getByText("My Friends")).toBeTruthy();

    fireEvent.press(getByText("Close"));
    expect(queryByText("My Friends")).toBeNull();
  });

  // Test if the Trending modal opens and closes correctly
  test("opens and closes the Trending modal", () => {
    const { getByText, queryByText } = render(<HomeScreen2 />);
    fireEvent.press(getByText("Trending"));
    expect(getByText("This Week's Trending Movies !")).toBeTruthy();

    fireEvent.press(getByText("Close"));
    expect(queryByText("This Week's Trending Movies !")).toBeNull();
  });

  // Test if the By Genre modal opens and closes correctly
  test("opens and closes the By Genre modal", () => {
    const { getByText, queryByText } = render(<HomeScreen2 />);
    fireEvent.press(getByText("By Genre"));
    expect(
      getByText("Discover movies from your favourite Genres !")
    ).toBeTruthy();

    fireEvent.press(getByText("Close"));
    expect(
      queryByText("Discover movies from your favourite Genres !")
    ).toBeNull();
  });
});
