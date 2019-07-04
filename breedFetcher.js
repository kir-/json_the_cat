let request = require('request');

let breeds = process.argv.slice(2);

breeds.forEach(breed => {
  request(`https://api.thecatapi.com/v1/breeds/search?q=${breed}`, (error, response, body) => {
    //console.log(error);
    //console.log(response);
    //console.log(body);

    if (error) {
      return console.log('Failed to request details: ', error);
    }

    const data = JSON.parse(body);
    if (data[0]) {
      console.log(data[0]["description"]);
    } else {
      console.log(`${breed} not found`);
    }
    //console.log(typeof data);
  });
});