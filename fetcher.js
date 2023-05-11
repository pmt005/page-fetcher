const request = require('request'); //Take example code from Using request Library
const fs = require('fs'); //Easiest method of wrtiing files in Node.js
const readline = require('readline'); // Interact with user

const rl = readline.createInterface({ //set up an interaction with user
  input: process.stdin,
  output: process.stdout
});

//Take argumuments from the command line
const inputArg = process.argv.slice(2);

const fetcher = (url, dest) => {

  request(url, (error, response, body) => {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    
    if (fs.existsSync(dest)) {
      rl.question(`${dest} already exists. Y to overwrite `,(answer) => {
        if (answer === 'y' || answer === 'Y') {
          fs.writeFile(dest, body, err => {
            rl.close();
            if (err) {
              console.log('error', err);
            }
            console.log("File written");
          });
        }
        console.log("File not written");
        rl.close();
      });
    } else {
      console.log('file not found!');
      fs.writeFile(dest, body, err => {
        if (err) {
          console.log('error', err);
        }
        console.log("File written");
      });
    }

  });
};

fetcher(inputArg[0], inputArg[1]);