

function mungeLocation(location) {
    return {
        formatted_query: location[0].display_name,
        latitude: location[0].lat,
        longitude: location[0].lon
    };
}

function mungeWeather(location) {
    return location.data.map(item => {
        return {
            forecast: item.weather.description,
            time: item.datetime
        };
    }).slice(0, 8);
}

function mungeTrails(location) {
    return location.trails.map(item => {
        return {
            name: item.name,
            location: item.location,
            length: item.length,
            stars: item.stars,
            summary: item.summary,
            trail_url: item.url,
            conditions: item.conditionStatus,
            condition_date: item.conditionDate.slice(0, 10),
            condition_time: item.conditionDate.slice(10)
        };
    }).slice(0, 10);
}

function mungeReviews(location) {
    return location.businesses.map(item => {
        return {
            name: item.name,
            image_url: item.image_url,
            price: item.price,
            rating: item.rating,
            url: item.url
        };
    }).slice(0, 10);
}

module.exports = {
    mungeLocation,
    mungeWeather,
    mungeTrails,
    mungeReviews
};
