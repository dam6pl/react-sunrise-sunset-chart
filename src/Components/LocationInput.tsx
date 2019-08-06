/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import styled from '@emotion/styled';

interface IProps {
    value?: string,
    saveCallback: (name: string, lat: number, lon: number) => void
}

interface IState {
    value: string
}

const InputContainer = styled.div`
    position: relative;

    .location-search-input {
        width: 100%;
        font-size: 16px;
        box-sizing: border-box;
    }

    .autocomplete-dropdown-container {
        box-sizing: border-box;
        position: absolute;
        background: #fff;
        border: 1px solid #c3c3c3;
        border-top: 0;
        width: 100%;
        z-index: 100;

        & > div {
            padding: 5px;
        }
    }
`;

export default class LocationInput extends React.Component<IProps, IState> {
    state: Readonly<IState> = {
        value: this.props.value || ''
    }

    handleSelect = (value: string) => {
        this.setState({ value: value });
        geocodeByAddress(value)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                this.props.saveCallback(this.state.value, latLng.lat, latLng.lng)
            })
            .catch(error => console.error('Error', error));
    };

    render() {
        return (
            <PlacesAutocomplete
                value={this.state.value}
                onChange={(value) => this.setState({ value: value })}
                onSelect={this.handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <InputContainer>
                        <input
                            {...getInputProps({
                                placeholder: 'Search Places ...',
                                className: 'location-search-input'
                            })}
                        />
                        <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion)}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </InputContainer>
                )}
            </PlacesAutocomplete>
        );
    }
}