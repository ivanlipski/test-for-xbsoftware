class City {
    constructor(title, latitude, longitude) {
        this.title = title;
        this.coordinates = new Coordinates(latitude, longitude);
    }
}

class Coordinates {
    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
}

class Maps {
    constructor(cities) {
        this.cities = cities;
    }

    calculateDistance(city, desiredCoordinates) {
        return Math.sqrt(Math.pow((desiredCoordinates.latitude - city.coordinates.latitude),2) + Math.pow((desiredCoordinates.longitude - city.coordinates.longitude),2))
    }

    findNearestCity(desiredCoordinates) {
        return (this.cities.reduce((requiredCity, currentCity) => {
            if (this.calculateDistance(requiredCity, desiredCoordinates) < this.calculateDistance(currentCity, desiredCoordinates)) {
                return requiredCity;
            }
            return currentCity;
        })).title;
    }

    findRightCity(direction) {
        let desiredCoordinates = new Coordinates();
        switch(direction) {
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

    findAbbreviations() {
        return [...new Set(this.cities.map(function (city) {
            return city.title.match(/\b[A-Z]+\b/g).join();
        }))].join(' ');
    }
}

USA = new Maps([
    new City('Nashville, TN', 36.17, -86.78),
    new City('New York, NY', 40.71, -74.00),
    new City('Atlanta, GA', 33.75, -84.39),
    new City('Denver, CO', 39.74, -104.98),
    new City('Seattle, WA', 47.61, -122.33),
    new City('Los Angeles, CA', 34.05, -118.24),
    new City('Memphis, TN', 35.15, -90.05)]
);

console.log('The northernmost city ' + USA.findRightCity('North'));
console.log('The southernmost  city ' + USA.findRightCity('South'));
console.log('The easternmost city ' + USA.findRightCity('West'));
console.log('The westernmost city ' + USA.findRightCity('East'));
console.log('The nearest city to the point ' + USA.findNearestCity(new Coordinates(40, -100)));
console.log('List of abbreviations ' + USA.findAbbreviations());
