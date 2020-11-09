require('dotenv').config();
const { mungeLocation } = require('../utils.js');
const { execSync } = require('child_process');
const fakeRequest = require('supertest');
const app = require('../lib/app');
const client = require('../lib/client');

describe('app routes', () => {
  describe('routes', () => {
    let token;

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
        place_id: "235549103",
        licence: "https://locationiq.com/attribution",
        osm_type: "relation",
        osm_id: "237385",
        boundingbox: [
          "47.4810022",
          "47.7341357",
          "-122.459696",
          "-122.224433"
        ],
        lat: "47.6038321",
        lon: "-122.3300624",
        display_name: "Seattle, King County, Washington, USA",
        class: "place",
        type: "city",
        importance: 0.772979173564379,
        icon: "https://locationiq.org/static/images/mapicons/poi_place_city.p.20.png"
      };

      const expectation =
      {
        formatted_query: "Seattle, King County, Washington, USA",
        latitude: "47.6038321",
        longitude: "-122.3300624"
      };

      const result = mungeLocation(oldLocation);
      expect(result).toEqual(expectation);
    });
  });
});


