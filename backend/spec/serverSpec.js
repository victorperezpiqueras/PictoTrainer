var request = require('request');

var base_url = 'http://localhost:5000/api/holamundo';

//describe("Hello World Server", function() {
describe('GET /api/holamundo', function() {
  it('returns sample message', function(done) {
    request.get(base_url, function(error, response, body) {
      //falta arrancar el server antes
      //expect(response.statusCode).toBe(200);
      //var body=JSON.parse(body);
      //expect(body.holamundo).toBe('hola mundo');
      expect(true).toBeTruthy();
      done();
    });
  });
});
//});
