const request = require('request'); //Take example code from Using request Library
const fs = require('fs'); //Easiest method of wrtiing files in Node.js

//Take argumuments from the command line
const inputArg = process.argv.slice(2);

const fetcher = (url, dest) => {

  request(url, (error, response, body) => {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //console.log('body:', body); // Print the HTML for the Google homepage.
   
    fs.writeFile(dest, body, err => {
      if (err) {
        console.log('error', err);
      }
    });
  });
};

fetcher(inputArg[0], inputArg[1]);