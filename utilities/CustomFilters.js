import GeoLib from 'geolib';

function distanceFilter(searchRadius, currentLatitude, currentLongitude, vehicleArray) {
  // Returns filtered array of trimet vehicle indecies
  // that meet the <= distance away criteria
  // Distance between currentLocation(coords) and vehicleLocation(coords)
  // is less than or equal to searchRadius(miles)
  let GL = gl();
  let currentPosition = {
    latitude: currentLatitude,
    longitude: currentLongitude
  }
  let filteredArray = [];
  //Miles to Meters
  let searchRadiusInMeters = searchRadius * 1609.34;

  filteredArray = vehicleArray.filter(v => {
      return GL.isPointInCircle({latitude: v.latitude, longitude: v.longitude},
                                  currentPosition,
                                  searchRadiusInMeters);
    });
  return filteredArray;

}

// What the hell am I doing here?
function gl() {
  return GeoLib
}

export {gl, distanceFilter};
