/* global window */
import React, {Component} from 'react';
//MAPGL
import ReactMapGL, {Marker} from 'react-map-gl';
//MUICSS
import Button from 'muicss/lib/react/button';

//CUSTOM COMPONENTS
import MenuButtonContainer from './MenuButtonContainer.js'
import CustomBurgerMenu from './CustomBurgerMenu.js'
import MARKER_STYLE from './marker-style.js';

//HELPERS
import TriMetAPIVehicles from '../utilities/TriMetAPIVehicles.js'
import GPSPostion from '../utilities/GPSPosition.js'
import * as CustomFilters from '../utilities/CustomFilters.js' // Figure out a better way to do this!
import * as WebStorage from '../utilities/WebStorage'

//JSON
import trimetStations from '../data/trimet-stations.json';

const MAPBOX_TOKEN = '';
const TRIMET_API_KEY = '';

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewport: {
        latitude: 0,
        longitude: 0,
        zoom: 14,
        bearing: 0,
        pitch: 55,
        width: 500,
        height: 500
      },
      settings: {
        dragPan: true,
        dragRotate: false,
        scrollZoom: true,
        touchZoomRotate: true,
        doubleClickZoom: true,
        minZoom: 0,
        maxZoom: 20,
        minPitch: 0,
        maxPitch: 85
      },
      vehicles: [],
      stops: [],
      current: {
        latitude: 0,
        longitude: 0
      },
      keys: {
        triMet: TRIMET_API_KEY,
        mapBox: MAPBOX_TOKEN
      },
      searchRange: 1,
      updateDisabled: false
    };
  };


  // COMPONENT LIFECYCLE
  componentWillMount() {
    this._initKey("mapBox");
  }

  componentDidMount() {
    this._initKey("triMet");
    window.addEventListener('resize', this._resize);
    this._resize();
    this._onUpdateGPSButtonClick();
    // this._onUpdateVehicleButtonClick ();
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
  };
  // END COMPONENT LIFECYCLE

  // LOCAL STORE
  _initKey = (key) => {
    if (WebStorage.getKeyValue(key)) {
      this.setState({keys: {...this.state.keys, [key]: WebStorage.getKeyValue(key)}})
    }
  }
  // END LOCAL STORE

  // MENU SETTINGS
  _onClickBurgerMenu = (event) => {
    event.preventDefault();
  }

  _onUpdateTriMetKey = (event) => {
    this.setState({keys: {...this.state.keys, triMet: event.target.value}});
    WebStorage.setKeyValue("triMet", event.target.value);
  }

  _onUpdateMapBoxKey = (event) => {
    this.setState({keys: {...this.state.keys, mapBox: event.target.value}});
    WebStorage.setKeyValue("mapBox", event.target.value);
  }

  _onUpdateSearchRange = (event) => {
    this.setState({searchRange: event.target.value});
  }
  // END MENU SETTINGS

  // MAP SETTINGS
  _updateVehicleJSON = (vehicles) => {
    this.setState({ vehicles: vehicles });
  }

  _onUpdateVehicleButtonClick = () => {
    const vehicleURL = "https://developer.trimet.org/ws/v2/vehicles";
    const apiString = `${vehicleURL}&appID=${this.state.keys.triMet}`
    var that = this;

    this.setState({updateDisabled: true});

    fetch(apiString)
      .then(function(response) {
        if (response.status != 200) {
          console.log(response.status)
          return;
        }
        return response.json();
      })
      .then(function(data) {
        // FILTER
        var filteredResults = []
        if (data.resultSet.vehicle) {
          // DISTANCE
          filteredResults = CustomFilters
          .distanceFilter(that.state.searchRange,
                          that.state.current.latitude,
                          that.state.current.longitude,
                          data.resultSet.vehicle);
          // VEHICLE TYPE (FUTURE)
          // VEHICLE NUMBER (FUTURE)
          that.setState({updateDisabled: false});
        }
        // Set State
        that._updateVehicleJSON(filteredResults);
      })
      .catch(function(err) {
        console.log(err);
        that.setState({updateDisabled: false});
      });
  }

  _updateLatLon = (pos) => {
    var latitude = pos.coords.latitude;
    var longitude = pos.coords.longitude;

    this.setState({
      viewport: {
        ...this.state.viewport,
        latitude,
        longitude
      }
    });
    this.setState({
      current: {
        latitude,
        longitude
      }
    });
    this.setState({updateDisabled: false});
  }

  _onUpdateGPSButtonClick = () => {
    if (navigator.geolocation) {
      this.setState({updateDisabled: true});
      navigator.geolocation.getCurrentPosition(this._updateLatLon);
    }
    else {
      console.log("Geolocation is not supported by this browser.");
      this.setState({updateDisabled: false});
    }
  }

  _resize = () => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: this.props.width || window.innerWidth,
        height: this.props.height || window.innerHeight
      }
    });
  };

  _onViewportChange = viewport => this.setState({viewport});

  _renderStation(station, i) {
    const {name, coordinates} = station;
    return (
      <Marker key={i} longitude={coordinates[0]} latitude={coordinates[1]} >
        <div className="station"><span>{name}</span></div>
      </Marker>
    );
  }

  _renderVehicle(vehicle, i) {
    const {latitude, longitude, routeNumber, vehicleID} = vehicle;
    return (
      <Marker key={vehicleID} longitude={longitude} latitude={latitude} >
        <div className="vehicle"><span>{routeNumber}</span></div>
      </Marker>
    );
  }
  // END MAP SETTINGS

  render() {

    const {viewport, settings} = this.state;

    return (
      <div>

        <CustomBurgerMenu triMetKey = { this.state.keys.triMet }
                          mapBoxKey = { this.state.keys.mapBox }
                          searchRange = { this.state.searchRange }
                          updateTriMetKey = { this._onUpdateTriMetKey }
                          updateMapBoxKey = { this._onUpdateMapBoxKey }
                          updateSearchRange = {this._onUpdateSearchRange } />

        <ReactMapGL
          {...viewport}
          {...settings}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          onViewportChange={this._onViewportChange}
          mapboxApiAccessToken={this.state.keys.mapBox} >
          <style>{MARKER_STYLE}</style>

          { trimetStations.map(this._renderStation) }
          { this.state.vehicles.map(this._renderVehicle) }

          <Marker latitude={this.state.current.latitude}
                  longitude={this.state.current.longitude} >
            <div className="current">
              <i className="fa fa-user fa-2x" aria-hidden="true"></i>
            </div>
          </Marker>
        </ReactMapGL>

        <MenuButtonContainer>
          <Button size="large"
                  color="danger"
                  disabled={this.state.updateDisabled}
                  onClick={this._onUpdateVehicleButtonClick}>TriMet
          </Button>
          <Button size="large"
                  color="primary"
                  disabled={this.state.updateDisabled}
                  onClick={this._onUpdateGPSButtonClick}>GPS
          </Button>
        </MenuButtonContainer>

      </div>
    );
  }

}

export default Map;
