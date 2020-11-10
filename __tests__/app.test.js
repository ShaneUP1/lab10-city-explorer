require('dotenv').config();
const { mungeLocation, mungeWeather, mungeTrails } = require('../utils.js');
const hikingRaw = require('../data/hikingRaw.js');
const hikingMunged = require('../data/hikingMunged.js');
const { execSync } = require('child_process');
const fakeRequest = require('supertest');
const app = require('../lib/app');
const client = require('../lib/client');

describe('app routes', () => {
  describe('routes', () => {


    // beforeAll(async done => {
    //   execSync('npm run setup-db');

    //   client.connect();

    //   const signInData = await fakeRequest(app)
    //     .post('/auth/signup')
    //     .send({
    //       email: 'jon@user.com',
    //       password: '1234'
    //     });

    //   token = signInData.body.token;

    //   return done();
    // });

    // afterAll(done => {
    //   return client.end(done);
    // });

    test('returns location', () => {

      const oldLocation = {
        place_id: '235549103',
        licence: 'https://locationiq.com/attribution',
        osm_type: 'relation',
        osm_id: '237385',
        boundingbox: [
          '47.4810022',
          '47.7341357',
          '-122.459696',
          '-122.224433'
        ],
        lat: '47.6038321',
        lon: '-122.3300624',
        display_name: 'Seattle, King County, Washington, USA',
        class: 'place',
        type: 'city',
        importance: 0.772979173564379,
        icon: 'https://locationiq.org/static/images/mapicons/poi_place_city.p.20.png'
      };

      const expectation =
      {
        formatted_query: 'Seattle, King County, Washington, USA',
        latitude: '47.6038321',
        longitude: '-122.3300624'
      };

      const result = mungeLocation(oldLocation);
      expect(result).toEqual(expectation);
    });
  });

  test.only('returns trail in modified format', () => {

    const oldTrail = hikingRaw;

    const expectation = hikingMunged;


    const result = mungeTrails(oldTrail);
    expect(result).toEqual(expectation);
  });
});


test('returns 8 days of forecast', () => {

  const oldWeather = {
    data: [{
      'wind_cdir': 'NE',
      'rh': 59,
      'pod': 'd',
      'lon': '-78.63861',
      'pres': 1006.6,
      'timezone': 'America\/New_York',
      'ob_time': '2017-08-28 16:45',
      'country_code': 'US',
      'clouds': 75,
      'vis': 10,
      'wind_spd': 6.17,
      'wind_cdir_full': 'northeast',
      'app_temp': 24.25,
      'state_code': 'NC',
      'ts': 1503936000,
      'h_angle': 0,
      'dewpt': 15.65,
      'weather': {
        'icon': 'c03d',
        'code': 803,
        'description': 'Broken clouds'
      },
      'uv': 2,
      'aqi': 45,
      'station': 'CMVN7',
      'wind_dir': 50,
      'elev_angle': 63,
      'datetime': '2017-08-28:17',
      'precip': 0,
      'ghi': 444.4,
      'dni': 500,
      'dhi': 120,
      'solar_rad': 350,
      'city_name': 'Raleigh',
      'sunrise': '10:44',
      'sunset': '23:47',
      'temp': 24.19,
      'lat': '35.7721',
      'slp': 1022.2
    }]
  };

  const expectation =
    [{
      forecast: 'Broken Clouds',
      time: '08/28/2017'
    }];

  const result = mungeWeather(oldWeather);
  expect(result).toEqual(expectation);
});





