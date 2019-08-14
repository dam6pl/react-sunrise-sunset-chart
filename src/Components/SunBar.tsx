/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import moment from 'moment';

interface IProps {
    lat?: number,
    lon?: number
    date: Date
}

interface IState {
    sunrise: number,
    sunset: number
}

export default class SunBar extends React.Component<IProps, IState> {
    state: Readonly<IState> = {
        sunrise: 0,
        sunset: 0
    }

    componentDidMount = () => {
        this.setStateFromApi();
    }

    componentDidUpdate = (prevProps: IProps) => {
        if (this.props.date !== prevProps.date) {
            this.setStateFromApi();
        }
    }

    setStateFromApi = () => {
        let dayStart = moment(this.props.date).startOf('day').unix();
        let date = moment(this.props.date).format('YYYY-MM-DD');

        return fetch(
            `https://api.sunrise-sunset.org/json?lat=${this.props.lat}&lng=${this.props.lon}&date=${date}`
        ).then(resp => resp.json()
        ).then(resp => {
            this.setState({
                sunrise: (moment(`${date} ${resp.results.sunrise}`, ['YYYY-MM-DD h:m a']).unix() - dayStart) / 864,
                sunset: (moment(`${date} ${resp.results.sunset}`, ['YYYY-MM-DD h:m a']).unix() - dayStart) / 864
            })
        })
    }

    render() {
        return (
            <div>
                {this.state.sunrise < this.state.sunset ?
                    (
                        <SunBarContainer>
                            <Span style={{
                                marginLeft: `${this.state.sunrise}%`,
                                width: `${this.state.sunset - this.state.sunrise}%`
                            }}></Span>
                        </SunBarContainer>
                    ) : (
                        this.state.sunrise > 0 && this.state.sunset > 0 && (
                            <SunBarContainer>
                                <Span style={{
                                    width: `${this.state.sunset}%`
                                }}></Span>
                                <Span style={{
                                    marginLeft: `${this.state.sunrise - this.state.sunset}%`,
                                    width: `${100 - this.state.sunrise}%`
                                }}></Span>
                            </SunBarContainer>
                        )
                    )
                }
            </div>
        )
    }
}

const SunBarContainer = styled.div`
    background: #3c3c3c;
    padding: 5px;
    border-radius: 5px;
    position: relative;
    &:before {
        content: '00:00';
        position: absolute;
        left: 0;
        bottom: -12px;
        font-size: 10px;
    }
    &:after {
        content: '23:59';
        position: absolute;
        right: 0;
        bottom: -12px;
        font-size: 10px;
    }
`;

const Span = styled.div`
    background: #ffbc00;
    width: 0;
    display: inline-block;
    height: 20px;
`;