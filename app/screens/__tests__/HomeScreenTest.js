import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen2 from '../HomeScreen2';

beforeEach(() => {
  fetch.resetMocks();
});

describe('HomeScreen2', () => {
  test('renders correctly', () => {
    const { getByText } = render(<HomeScreen2 />);
    expect(getByText('The Film Club')).toBeTruthy();
  });

  test('opens and closes the About Us modal', () => {
    const { getByText, queryByText } = render(<HomeScreen2 />);
    fireEvent.press(getByText('About Us'));
    expect(getByText('About us')).toBeTruthy();

    fireEvent.press(getByText('Close'));
    expect(queryByText('About us')).toBeNull();
  });

  test('opens and closes the Friends modal', () => {
    const { getByText, queryByText } = render(<HomeScreen2 />);
    fireEvent.press(getByText('Friends'));
    expect(getByText('My Friends')).toBeTruthy();

    fireEvent.press(getByText('Close'));
    expect(queryByText('My Friends')).toBeNull();
  });

  test('opens and closes the Trending modal', () => {
    const { getByText, queryByText } = render(<HomeScreen2 />);
    fireEvent.press(getByText('Trending'));
    expect(getByText("This Week's Trending Movies !")).toBeTruthy();

    fireEvent.press(getByText('Close'));
    expect(queryByText("This Week's Trending Movies !")).toBeNull();
  });

  test('opens and closes the By Genre modal', () => {
    const { getByText, queryByText } = render(<HomeScreen2 />);
    fireEvent.press(getByText('By Genre'));
    expect(getByText('Discover movies from your favourite Genres !')).toBeTruthy();

    fireEvent.press(getByText('Close'));
    expect(queryByText('Discover movies from your favourite Genres !')).toBeNull();
  });
});
