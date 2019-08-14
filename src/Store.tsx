import { observable, action } from 'mobx';

class Store {
    @observable locations: Array<{ name?: string, lat?: number, lon?: number }> = [
        { name: 'Kraków, Polska', lat: 50.06465009999999, lon: 19.94497990000002 },
        { name: 'Tokio, Japonia', lat: 35.6803997, lon: 139.76901739999994 },
        { name: 'Nowy Jork, Stany Zjednoczone', lat: 40.7127753, lon: -74.0059728 }
    ];
    @observable date: Date = new Date();
    @observable edit: boolean | number = false;

    @action addLocation = () => {
        this.locations = [...this.locations, { name: '' }];
        this.edit = this.locations.length - 1;
    }

    @action saveLocation = (
        id: number,
        location: {
            name: string,
            lat: number,
            lon: number
        }
    ) => {
        this.locations[id] = location;
    }

    @action removeLocation = (id: number) => {
        let locations = this.locations;
        locations.splice(id, 1);
        this.locations = locations;
        this.edit = false;
    }
}

export default Store;
