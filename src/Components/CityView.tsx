/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import SunBar from './SunBar';
import edit from '../edit.svg'
import styled from '@emotion/styled';
import { ButtonStyled, ButtonRedStyled } from '../App';
import LocationInput from './LocationInput';
import Store from '../Store';
import { observer } from 'mobx-react';

interface IProps {
    id: number,
    location: { name?: string, lat?: number, lon?: number },
    store: Store
}

@observer
export default class CityView extends React.Component<IProps> {
    handleLocationChange = (name: string, lat: number, lon: number) => {
        this.props.store.saveLocation(this.props.id, { name, lat, lon });
    }

    render() {
        const { id, location, store } = this.props;

        return (
            <div css={{ padding: '10px 0' }}>
                {store.edit !== this.props.id ?
                    (
                        <div css={{ display: 'flex', alignItems: 'center' }}>
                            <TitleStyled>
                                {location.name}
                                {store.edit === false &&
                                    <ButtonEditStyled onClick={() => store.edit = id}>
                                        <SvgStyled alt="edit" src={edit} />
                                    </ButtonEditStyled>
                                }
                            </TitleStyled>
                            <div css={{ flex: 1 }}>
                                <SunBar
                                    lat={location.lat}
                                    lon={location.lon}
                                    date={store.date}
                                />
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div css={{ display: 'flex' }}>
                                <Fieldset>
                                    <label htmlFor="name">Name: </label>
                                    <LocationInput value={location.name} saveCallback={this.handleLocationChange} />
                                </Fieldset>
                            </div>
                            <ButtonsContainerStyled>
                                <ButtonRedStyled onClick={() => store.removeLocation(this.props.id)} >
                                    Remove
                                </ButtonRedStyled>
                                <ButtonStyled onClick={() => store.edit = false}>
                                    Save
                                </ButtonStyled>
                            </ButtonsContainerStyled>
                        </div>
                    )}
            </div>
        )
    }
}

const Fieldset = styled.fieldset`
    border: none;
    flex: 1;
    padding: 15px 0;

    label {
        font-weight: bold;
        margin-bottom: 5px;
    }

    & > div {
        display: inline-block;
        width: 80%;
    }
`;

const TitleStyled = styled.h3`
    flex: 1; 
    position: relative;
    &:hover {
        button {
            display: block !important
        }
    }
`;

const ButtonEditStyled = styled.button`
    width: 15px;
    height: 15px;
    padding: 0;
    background: transparent;
    border: none;
    position: absolute;
    top: 3px;
    right: 20px;
    display: none;
    cursor: pointer;
`;

const SvgStyled = styled.img`
    width: 100%;
    height: 100%;
`;

const ButtonsContainerStyled = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
