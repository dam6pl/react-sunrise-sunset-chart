/** @jsx jsx */
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import CityView from './CityView';

interface IState {
    locations: Array<{
        name?: string,
        lat?: number,
        lon?: number
    }>,
    date: Date
    edit: number | false
}

const AppStyled = styled.div`
    width: 700px;
    margin: 60px auto;
    padding: 15px;
    background: #fff;
    border-radius: 5px
`;

const HeaderStyled = styled.div`
    border-bottom: 1px solid black;
    padding-bottom: 15px;

    h1 {
        margin-top: 0;
    }

    h4 {
        display: inline;
    }
`;

export const ButtonStyled = styled.button`
    padding: 5px 15px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: all 300ms;
    background: green;
    color: #fff;
    border-color: #075407;

    &:hover {
        color: green;
        background: transparent;
    }
`;

export const ButtonRedStyled = styled(ButtonStyled)`
    background: #e42a2a;
    color: #fff;
    border-color: #860a0a;

    &:hover {
        color: #e42a2a;
        background: transparent;
    }
`;

export default class App extends React.Component<{}, IState> {
    state: Readonly<IState> = {
        locations: [
            { name: 'Kraków, Polska', lat: 50.06465009999999, lon: 19.94497990000002 },
            { name: 'Tokio, Japonia', lat: 35.6803997, lon: 139.76901739999994 },
            { name: 'Nowy Jork, Stany Zjednoczone', lat: 40.7127753, lon: -74.0059728 }
        ],
        date: new Date(),
        edit: false
    };

    editLocation = (
        action: 'ADD' | 'EDIT_START' | 'EDIT' | 'REMOVE',
        id?: number,
        location?: {
            name?: string,
            lat?: number,
            lon?: number
        }
    ) => {
        switch (action) {
            case 'ADD':
                this.setState({
                    locations: [...this.state.locations, { name: '' }]
                });
                this.setState({ edit: this.state.locations.length });
                break;
            case 'EDIT_START':
                if (id !== undefined) {
                    this.setState({ edit: id })
                }
                break;
            case 'EDIT':
                if (id !== undefined && location !== undefined && location.name !== '') {
                    this.setState({ edit: false });
                    let locations = this.state.locations;
                    locations[id] = location;
                    this.setState({ locations: locations });
                }
                break;
            case 'REMOVE':
                if (id !== undefined) {
                    this.setState({ edit: false });
                    let locations = this.state.locations;
                    locations.splice(id, 1);
                    this.setState({ locations: locations });
                }
                break;
        }
    }

    render = () => {
        return (
            <AppStyled>
                <HeaderStyled>
                    <h1>Sunrise - sunset chart</h1>
                    <h4>Select date:</h4>
                    <DatePicker
                        onChange={(val: Date) => this.setState({ date: val })}
                        dateFormat="dd/MM/yyyy"
                        selected={this.state.date}
                        css={{ marginLeft: 10, fontSize: 14 }}
                    />
                </HeaderStyled>

                {this.state.locations.map((item, key) => {
                    return <CityView
                        key={key}
                        id={key}
                        editMode={this.state.edit}
                        editCallback={this.editLocation}
                        name={item.name}
                        lat={item.lat}
                        lon={item.lon}
                        date={this.state.date}
                    />
                })}

                {this.state.edit === false &&
                    <ButtonStyled onClick={() => this.editLocation('ADD')}>Add new</ButtonStyled>
                }
            </AppStyled>
        );
    }
}
