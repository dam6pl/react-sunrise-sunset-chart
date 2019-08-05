/** @jsx jsx */
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { jsx, css } from '@emotion/core';
import CityView from './Components/CityView';

interface IState {
  locations: Array<{
    name?: string,
    lat?: number,
    lon?: number
  }>,
  date: Date
  edit: number | false
}

export default class App extends React.Component<{}, IState> {
  state: Readonly<IState> = {
    locations: [
      { name: 'Kraków', lat: 50.064651, lon: 19.944981 },
      { name: 'Tokio', lat: 39.758602, lon: -104.997437 },
      { name: 'New York', lat: 55.755825, lon: 37.617298 }
    ],
    date: new Date(),
    edit: false
  };

  addLocation = () => {
    this.setState({
      locations: [...this.state.locations, { name: '' }]
    });
    this.setEditMode(this.state.locations.length);
  }

  saveLocation = (id: number, name?: string, lat?: number, lon?: number) => {
    this.setEditMode(false);
    let locations = this.state.locations;
    locations[id].name = name;
    locations[id].lat = lat;
    locations[id].lon = lon;
    this.setState({ locations: locations });
  }

  setEditMode = (edit: number | false) => {
    this.setState({ edit: edit })
  }

  render = () => {
    return (
      <div css={{
        width: 600,
        margin: '60px auto',
        padding: 15,
        background: '#fff',
        borderRadius: 5
      }}>
        <div css={{ borderBottom: `1px solid black`, paddingBottom: 15 }}>
          <h1 css={{ marginTop: 0 }}>Sunrise - sunset chart</h1>
          <h4 css={{ display: 'inline' }}>Select date:</h4>
          <DatePicker
            onChange={(val: Date) => this.setState({ date: val })}
            dateFormat="dd/MM/yyyy"
            selected={this.state.date}
            css={{ marginLeft: 10, fontSize: 14 }}
          />
        </div>

        {this.state.locations.map((item, key) => {
          return <CityView
            key={key}
            id={key}
            edit={this.state.edit}
            editCallback={this.setEditMode}
            saveCallback={this.saveLocation}
            name={item.name}
            lat={item.lat}
            lon={item.lon}
            date={this.state.date}
          />
        })}

        {this.state.edit === false &&
          <button
            onClick={() => this.addLocation()}
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
          >Add new</button>
        }
      </div>
    );
  }
}
