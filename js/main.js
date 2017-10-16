/** Class representing a coordinates. */
class Coordinates {
  /**
   * Create a coordinates.
   * @param {number} latitude - The latitude value.
   * @param {number} longitude - The longitude value.
   */
  constructor(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
  }
}

/** Class representing a City. */
class City {
  /**
   * Create a coordinates.
   * @param {string} title - The title value.
   * @param {number} latitude - The latitude value.
   * @param {number} longitude - The longitude value.
   */
  constructor(title, latitude, longitude) {
    this.title = title;
    this.coordinates = new Coordinates(latitude, longitude);
  }
}

/** Class representing a Map. */
class Map {
  /**
   * Create a coordinates.
   * @param {array} cities - The cities value.
   */
  constructor(cities) {
    this.cities = cities;
  }

  /**
   * Calculates the distance from a point to a point
   * @param {Coordinates} coordinatesCity - coordinates of the current city
   * @param {Coordinates} desiredCoordinates - entered coordinates
   * @returns {number}
   */
  static calculateDistance(coordinatesCity, desiredCoordinates) {
    return (((desiredCoordinates.latitude - coordinatesCity.latitude) ** 2) +
    ((desiredCoordinates.longitude - coordinatesCity.longitude) ** 2));
  }

  /**
   * Looking for the nearest city to the given coordinate
   * @param {Coordinates} desiredCoordinates - entered coordinates
   * @returns {string} title City
   */
  findNearestCity(desiredCoordinates) {
    return (this.cities.reduce((requiredCity, currentCity) => {
      if (Map.calculateDistance(requiredCity.coordinates, desiredCoordinates) <
          Map.calculateDistance(currentCity.coordinates, desiredCoordinates)) {
        return requiredCity;
      }
      return currentCity;
    })).title;
  }

  /**
   * Sets the coordinate equal to the direction of compass
   * @param {string} direction - name of compass direction
   * @returns {*} result of the function findNearestCity
   */
  findNearestCityInDirection(direction) {
    const desiredCoordinates = new Coordinates();
    switch (direction) {
      case 'North': {
        desiredCoordinates.latitude = 90;
        desiredCoordinates.longitude = 0;
        break;
      }
      case 'South': {
        desiredCoordinates.latitude = -90;
        desiredCoordinates.longitude = 0;
        break;
      }
      case 'West': {
        desiredCoordinates.latitude = 0;
        desiredCoordinates.longitude = 180;
        break;
      }
      case 'East': {
        desiredCoordinates.latitude = 0;
        desiredCoordinates.longitude = -180;
        break;
      }
      default: {
        return 'Wrong direction';
      }
    }
    return this.findNearestCity(desiredCoordinates);
  }

  /**
   * Creates a unique list of abbreviations
   * @returns {string} unique list of abbreviations
   */
  findAbbreviations() {
    return [...new Set(this.cities.map(city => city.title.match(/\b[A-Z]+\b/g).join()))].join(' ');
  }
}

const USA = new Map([
  new City('Nashville, TN', 36.17, -86.78),
  new City('New York, NY', 40.71, -74.00),
  new City('Atlanta, GA', 33.75, -84.39),
  new City('Denver, CO', 39.74, -104.98),
  new City('Seattle, WA', 47.61, -122.33),
  new City('Los Angeles, CA', 34.05, -118.24),
  new City('Memphis, TN', 35.15, -90.05)]);

console.log(`The northernmost city ${USA.findNearestCityInDirection('North')}`);
console.log(`The southernmost  city ${USA.findNearestCityInDirection('South')}`);
console.log(`The easternmost city ${USA.findNearestCityInDirection('West')}`);
console.log(`The westernmost city ${USA.findNearestCityInDirection('East')}`);
console.log(`The nearest city to the point ${USA.findNearestCity(new Coordinates(40, -100))}`);
console.log(`List of abbreviations ${USA.findAbbreviations()}`);
