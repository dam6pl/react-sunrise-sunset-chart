/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import SunBar from './SunBar';
import edit from '../edit.svg'
import styled from '@emotion/styled';
import { ButtonStyled, ButtonRedStyled } from './App';
import LocationInput from './LocationInput';

interface IProps {
    id: number,
    editMode: number | false,
    editCallback: (
        action: 'ADD' | 'EDIT_START' | 'EDIT' | 'REMOVE',
        id?: number,
        location?: {
            name?: string,
            lat?: number,
            lon?: number
        }) => void,
    name?: string,
    lat?: number,
    lon?: number,
    date: Date
}

interface IState {
    name?: string,
    lat?: number,
    lon?: number
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

export default class CityView extends React.Component<IProps, IState> {
    state: Readonly<IState> = {
        name: this.props.name,
        lat: this.props.lat,
        lon: this.props.lon
    }

    componentWillReceiveProps(props: IProps) {
        this.setState({
            name: props.name,
            lat: props.lat,
            lon: props.lon
        })
    }

    handleChange = (name: string, lat: number, lon: number) => {
        this.setState({
            name: name,
            lat: lat,
            lon: lon
        });
    }

    render = () => {
        return (
            <div css={{ padding: '10px 0' }}>
                {this.props.editMode !== this.props.id ?
                    (
                        <div css={{ display: 'flex', alignItems: 'center' }}>
                            <TitleStyled>
                                {this.props.name}
                                {this.props.editMode === false &&
                                    <ButtonEditStyled onClick={() => this.props.editCallback('EDIT_START', this.props.id)}>
                                        <SvgStyled alt="edit" src={edit} />
                                    </ButtonEditStyled>
                                }
                            </TitleStyled>
                            <div css={{ flex: 1 }}>
                                <SunBar
                                    lat={this.props.lat}
                                    lon={this.props.lon}
                                    date={this.props.date}
                                />
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div css={{ display: 'flex' }}>
                                <Fieldset>
                                    <label htmlFor="name">Name: </label>
                                    <LocationInput value={this.state.name} saveCallback={this.handleChange} />
                                </Fieldset>
                            </div>
                            <ButtonsContainerStyled>
                                <ButtonRedStyled onClick={() => this.props.editCallback('REMOVE', this.props.id)} >
                                    Remove
                                </ButtonRedStyled>
                                <ButtonStyled onClick={() => this.props.editCallback('EDIT', this.props.id, this.state)}>
                                    Save
                                </ButtonStyled>
                            </ButtonsContainerStyled>
                        </div>
                    )}
            </div>
        )
    }
}