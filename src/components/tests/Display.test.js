//imports
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Display from './../Display';

import mockFetchShow from '../../api/fetchShow';
jest.mock('../../api/fetchShow');



//test data
const testShow = {
    //add in approprate test data structure here.
    image: null,
    name: "show",
    summary: "This is the summary",
    seasons: [
        {
            episodes: [],
            id: 1, 
            name: "season 1"
        },
        {
            episodes: [],
            id: 2, 
            name: "season 1"
        },
        {
            episodes: [],
            id: 3, 
            name: "season 1"
        }
    ]


}


//test the Display component renders
test('renders without props', () => {
    render(<Display/>);
});

//testing fetch button calls the show component 'that's so fetch!'
test('fetch button displays the show component', async () => {
    render(<Display/>)
    mockFetchShow.mockResolvedValueOnce(testShow);

    const button = screen.getByRole('button', /Press to Get Show Data/i);
    userEvent.click(button);

    const showID = await screen.findByTestId('show-container')

    expect(showID).toBeInTheDocument();
    expect(showID).toHaveTextContent('show');
    // somethings wrong here???
});

//testing when fetch button is pressed, the amoutn of select options rendered is equal to the amount of seasons in testData
test('fetch button select options equal seasons amount', async () => {
    render(<Display />);
    mockFetchShow.mockResolvedValueOnce(testShow)

    const button = screen.getByRole('button', 'Press to Get Show Data/i');
    userEvent.click(button);
    const seasonsOptions = await screen.findAllByTestId("season-option");

    expect(seasonsOptions).toHaveLength(3);
})

//testing when fetch button is pressed, the function is called
test('when fetch is pressed, function is called' , async () => {
    const mockDisplayFunc = jest.fn();
    render(<Display displayFunc={mockDisplayFunc}/>); //mock function
    mockFetchShow.mockResolvedValueOnce(testShow); //mock api call

    const button = screen.getByRole('button', /Press to Get Show Data/i);
    userEvent.click(button);

    await waitFor(() => expect(mockDisplayFunc).toHaveBeenCalledTimes(1));
})








///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.