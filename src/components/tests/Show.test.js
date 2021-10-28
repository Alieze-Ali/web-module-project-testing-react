import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Show from './../Show';

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

test('renders testShow and no selected Season without errors', ()=>{
    render(<Show show={testShow} selectedSeason={"none"}/>);
});

test('renders Loading component when prop show is null', () => {
    //arrange
    render(<Show show={null} />);
    //act
    const loading = screen.getByTestId("loading-container");
    //assert
    expect(loading).toBeVisible();
});

test('renders same number of options seasons are passed in', ()=>{
    //arrange
    render(<Show show={testShow} selectedSeason={"none"}/>);
    //act
    const seasonsOptions = screen.getAllByTestId("season-option");
    //assert
    expect(seasonsOptions).toHaveLength(3);
});

test('handleSelect is called when an season is selected', () => {
    //arrange
    const mockHandleSelect = jest.fn();
    render(<Show show={testShow} selectedSeason={"none"} handleSelect={mockHandleSelect}/>)
    const selectingSeason = screen.getByLabelText('Select A Season');
    //act
    userEvent.selectOptions(selectingSeason, ['1']);
    //assert
    expect(mockHandleSelect).toHaveBeenCalledTimes(1);
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
    //arrange
    const { rerender } = render(<Show show={testShow} selectedSeason={'none'}/>)
    //act
    let episodeComponent = screen.queryAllByTestId('episodes-container');
    //assert
    expect(episodeComponent).toHaveLength(0);

    //arrange
    rerender(<Show show={testShow} selectedSeason={1}/>);
    //act
    episodeComponent = screen.getAllByTestId('episodes-container');
    //assert
    expect(episodeComponent).toHaveLength(1);
});

//Tasks:
//1. Build an example data structure that contains the show data in the correct format. A show should contain a name, a summary and an array of seasons, each with a id, name and (empty) list of episodes within them. Use console.logs within the client code if you need to to verify the structure of show data.
//2. Test that the Show component renders when your test data is passed in through show and "none" is passed in through selectedSeason.
//3. Test that the Loading component displays when null is passed into the show prop (look at the Loading component to see how to test for it's existance)
//4. Test that when your test data is passed through the show prop, the same number of season select options appears as there are seasons in your test data.
//5. Test that when an item is selected, the handleSelect function is called. Look at your code to see how to get access to the select Dom element and userEvent reference materials to see how to trigger a selection.
//6. Test that the episode component DOES NOT render when the selectedSeason props is "none" and DOES render the episode component when the selectedSeason prop has a valid season index.