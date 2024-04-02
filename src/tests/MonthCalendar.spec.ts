// import React from 'react';
// import { render } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect'; // For additional matchers

// import MonthCalendar from '../components/MonthCalendar';

// describe('MonthCalendar Component', () => {
//   test('renders previous month button', () => {
//     const { getByText } = render(<MonthCalendar />);
//     const previousMonthButton = getByText('Previous Month');
//     expect(previousMonthButton).toBeInTheDocument();
//   });

//   test('renders next month button', () => {
//     const { getByText } = render(<MonthCalendar />);
//     const nextMonthButton = getByText('Next Month');
//     expect(nextMonthButton).toBeInTheDocument();
//   });

//   test('renders month and year correctly', () => {
//     const { getByText } = render(<MonthCalendar />);
//     const monthYearText = getByText(/^(January|February|March|April|May|June|July|August|September|October|November|December)\s\d{4}$/);
//     expect(monthYearText).toBeInTheDocument();
//   });

//   test('renders weekday header', () => {
//     const { getByText } = render(<MonthCalendar />);
//     const weekdayHeader = getByText(/^(Sun|Mon|Tue|Wed|Thu|Fri|Sat)$/);
//     expect(weekdayHeader).toBeInTheDocument();
//   });

//   // Add more tests as needed for specific functionalities or components within the MonthCalendar
// });
