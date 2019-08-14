/** @jsx jsx */
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import CityView from './Components/CityView';
import Store from './Store';
import { observer } from 'mobx-react';

interface IProps {
    store: Store
}

@observer
export default class App extends React.Component<IProps> {
    render() {
        const { store } = this.props;

        return (
            <AppStyled>
                <HeaderStyled>
                    <h1>Sunrise - sunset chart</h1>
                    <h4>Select date:</h4>
                    <DatePicker
                        onChange={(val: Date) => store.date = val}
                        dateFormat="dd/MM/yyyy"
                        selected={store.date}
                        css={{ marginLeft: 10, fontSize: 14 }}
                    />
                </HeaderStyled>

                {store.locations.map((item, key) => {
                    return <CityView
                        key={key}
                        id={key}
                        location={item}
                        store={store}
                    />
                })}

                {store.edit === false &&
                    <ButtonStyled onClick={() => store.addLocation()}>Add new</ButtonStyled>
                }
            </AppStyled>
        );
    }
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
