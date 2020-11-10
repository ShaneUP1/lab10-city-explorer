

function mungeLocation(location) {
    return {
        formatted_query: location[0].display_name,
        latitude: location[0].lat,
        longitude: location[0].lon
    }
}

function mungeWeather(location) {
    location.date.map(item => {
        return {
            forecast: item.weather.description,
            time: item.datetime
        }
    })
}

module.exports = {
    mungeLocation,
    mungeWeather
};