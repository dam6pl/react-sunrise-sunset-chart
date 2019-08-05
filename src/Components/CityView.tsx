/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import SunBar from './SunBar';
import edit from '../edit.svg'
import styled from '@emotion/styled';

interface IProps {
    id: number,
    edit: number | false,
    editCallback: (edit: number | false) => void,
    saveCallback: (id: number, name?: string, lat?: number, lon?: number) => void,
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
`;

export default class CityView extends React.Component<IProps, IState> {
    state: Readonly<IState> = {
        name: this.props.name,
        lat: this.props.lat,
        lon: this.props.lon
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({ [e.target.name]: e.target.value });
    }

    render = () => {
        return (
            <div css={{ padding: '10px 0' }}>
                {this.props.edit !== this.props.id ?
                    (
                        <div css={{ display: 'flex', alignItems: 'center' }}>
                            <h3
                                css={css`
                                    flex: 1; 
                                    position: relative;
                                    &:hover {
                                        button {
                                            display: block !important
                                        }
                                    }
                                `}
                            >
                                {this.props.name}
                                {this.props.edit === false &&
                                    <button
                                        onClick={() => this.props.editCallback(this.props.id)}
                                        css={{
                                            width: 15,
                                            height: 15,
                                            padding: 0,
                                            background: 'transparent',
                                            border: 'none',
                                            position: 'absolute',
                                            top: 3,
                                            right: 20,
                                            display: 'none',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <img alt="edit"
                                            src={edit}
                                            css={{
                                                width: '100%',
                                                height: '100%'
                                            }}
                                        />
                                    </button>
                                }
                            </h3>
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
                                    <input id="name" name="name"
                                        value={this.state.name}
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </Fieldset>
                                <Fieldset>
                                    <label htmlFor="lat">Lat: </label>
                                    <input id="lat" name="lat"
                                        value={this.state.lat}
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </Fieldset>
                                <Fieldset>
                                    <label htmlFor="lon">Lon: </label>
                                    <input id="lon" name="lon"
                                        value={this.state.lon}
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </Fieldset>
                            </div>
                            <button
                                onClick={() => this.props.saveCallback(
                                    this.props.id,
                                    this.state.name,
                                    this.state.lat,
                                    this.state.lon
                                )}
                                css={css`
                                    padding: 5px 15px;
                                    background: green;
                                    color: #fff;
                                    border-color: #075407;
                                    font-size: 16px;
                                    font-weight: bold;
                                    cursor: pointer;
                                    transition: all 300ms;

                                    &:hover {
                                        color: green;
                                        background: transparent;
                                    }
                                `}
                            >
                                Save</button>
                        </div>
                    )}
            </div>
        )
    }
}