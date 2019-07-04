let request = require('request');

let breeds = process.argv.slice(2);

let requestBreeds = (breed, cb) => {
  //let catPromise = new Promise((resolve, reject) => {
  request(`https://api.thecatapi.com/v1/breeds/search?q=${breed}`, (error, response, body) => {
    let promiseReturn = '';
    if (error) {
      promiseReturn = `Failed to request details: ${error}`;
    }

    const data = JSON.parse(body);
    if (data[0]) {
      promiseReturn = `${breed}: ${data[0]["description"]}`;
    } else {
      promiseReturn = `${breed} not found`;
    }
    cb(error,promiseReturn);
  });
};


let promiseArray = breeds.map((breed)=>{
  return new Promise((resolve, reject) => {
    requestBreeds(breed, (err, data)=> {
      resolve(data);
    });
  });
});

Promise.all(promiseArray).then(function(values) {
  console.log(values.join("\n"));
});

