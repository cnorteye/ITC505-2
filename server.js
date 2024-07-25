const express = require('express');
const logger = require('morgan');
const path = require('path');
const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

// Routes
server.get('/do_a_random', (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`);
});

// Setup static page serving for all the pages in "public"
const publicServedFilesPath = path.join(__dirname, 'public');
server.use(express.static(publicServedFilesPath));

// Route for displaying form (GET request)
server.get('/itc505/lab7/index.html', (req, res) => {
  res.sendFile(path.join(publicServedFilesPath, 'index.html'));
});

server.get('public/itc505/lab7/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// POST route to handle form submission
server.post('/submit', (req, res) => {
    const { hero, adjective1, pluralNoun1, place, verbPast, adjective2, pluralNoun2, verb, exclamation, noun } = req.body;

    // Check if all fields are filled out
    if (!hero || !adjective1 || !pluralNoun1 || !place || !verbPast || !adjective2 || !pluralNoun2 || !verb || !exclamation || !noun) {
        res.status(400).send(`
            <html>
          <head>
              <link rel="stylesheet" type="text/css" href="/itc505/lab7/styles.css">
          </head>
          <body>
            <h1>Submission Failed</h1>
            <p>Please fill out ALL fields</p>
            <a href="/itc505/lab7/index.html" class="button">Go Back to Form</a>
          </body>
          </html>
        `);
        return;
    }
    
    const story = `
        Once upon a time, there was a brave hero named <span class="user-input">${hero}</span>. <span class="user-input">${hero}</span> was known throughout the land for being incredibly <span class="user-input">${adjective1}</span>. One day, a group of <span class="user-input">${pluralNoun1}</span> appeared in the peaceful town of <span class="user-input">${place}</span>. The townspeople were terrified and didn't know what to do.

        But <span class="user-input">${hero}</span> wasn't afraid. With a mighty roar, <span class="user-input">${hero}</span> <span class="user-input">${verbPast}</span> into action. Armed with only their <span class="user-input">${adjective2}</span> wits and a handful of <span class="user-input">${pluralNoun2}</span>, <span class="user-input">${hero}</span> set out to save the day.

        As the <span class="user-input">${pluralNoun1}</span> approached, <span class="user-input">${hero}</span> didn't hesitate. <span class="user-input">${hero}</span> began to <span class="user-input">${verb}</span> with all their might. "<span class="user-input">${exclamation}</span>!" shouted the townspeople, watching in awe.

        In the end, <span class="user-input">${hero}</span> triumphed. The <span class="user-input">${pluralNoun1}</span> were defeated, and peace was restored to <span class="user-input">${place}</span>. The townspeople cheered and hailed <span class="user-input">${hero}</span> as their savior. And so, the tale of <span class="user-input">${hero}</span> and the <span class="user-input">${noun}</span> became a legend that would be told for generations to come.
    `;
    
    res.send(`
      <html>
      <head>
          <link rel="stylesheet" type="text/css" href="/itc505/lab7/styles.css">
      </head>
      <body>
        <div class="form__title">Submission Successful</div>
        <p class="form__description">${story}</p>
        <a href="/itc505/lab7/index.html" class="form__btn">Go Back to Form</a>
      </body>
      </html>
    `);
});

// Use the PORT environment variable if available, otherwise default to 80
const port = process.argv[2] === 'local' ? 8080 : (process.env.PORT || 80);
server.listen(port, () => console.log(`Server is running on port ${port}`));










/* const express = require('express')
const logger = require('morgan')
const path = require('path')
const server = express()
server.use(express.urlencoded({'extended': true}))
server.use(logger('dev'))
// Routes
server.get('/do_a_random', (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`)
})
// Setup static page serving for all the pages in "public"
const publicServedFilesPath = path.join(__dirname, 'public')
server.use(express.static(publicServedFilesPath))

// POST route to handle form submission
server.post('/submit', (req, res) => {
    const { hero, adjective1, pluralNoun1, place, verbPast, adjective2, pluralNoun2, verb, exclamation, noun } = req.body;

    // Check if all fields are filled out
    if (!hero || !adjective1 || !pluralNoun1 || !place || !verbPast || !adjective2 || !pluralNoun2 || !verb || !exclamation || !noun) {
        res.status(400).send(`
            <html>
          <head>
              <link rel="stylesheet" type="text/css" href="/itc505/lab7/styles.css">
          </head>
          <body>
            <h1>Submission Failed</h1>
            <p>Please fill out ALL fields</p>
            <a href="/itc505/lab7/index.html" class="button">Go Back to Form</a>
          </body>
          </html>
        `);
        return;
    }
    
    const story = `
        Once upon a time, there was a brave hero named <span class="user-input">${hero}</span>. <span class="user-input">${hero}</span> was known throughout the land for being incredibly <span class="user-input">${adjective1}</span>. One day, a group of <span class="user-input">${pluralNoun1}</span> appeared in the peaceful town of <span class="user-input">${place}</span>. The townspeople were terrified and didn't know what to do.

        But <span class="user-input">${hero}</span> wasn't afraid. With a mighty roar, <span class="user-input">${hero}</span> <span class="user-input">${verbPast}</span> into action. Armed with only their <span class="user-input">${adjective2}</span> wits and a handful of <span class="user-input">${pluralNoun2}</span>, <span class="user-input">${hero}</span> set out to save the day.

        As the <span class="user-input">${pluralNoun1}</span> approached, <span class="user-input">${hero}</span> didn't hesitate. <span class="user-input">${hero}</span> began to <span class="user-input">${verb}</span> with all their might. "<span class="user-input">${exclamation}</span>!" shouted the townspeople, watching in awe.

        In the end, <span class="user-input">${hero}</span> triumphed. The <span class="user-input">${pluralNoun1}</span> were defeated, and peace was restored to <span class="user-input">${place}</span>. The townspeople cheered and hailed <span class="user-input">${hero}</span> as their savior. And so, the tale of <span class="user-input">${hero}</span> and the <span class="user-input">${noun}</span> became a legend that would be told for generations to come.
    `;
    
    res.send(`
      <html>
      <head>
          <link rel="stylesheet" type="text/css" href="/itc505/lab7/styles.css">
      </head>
      <body>
        <div class="form__title">Submission Successful</div>
        <p class="form__description">${story}</p>
        <a href="/itc505/lab7/index.html" class="form__btn">Go Back to Form</a>
      </body>
      </html>
    `);
}); */



/* // The server uses port 80 by default unless you start it with the extra
// command line argument 'local' like this:
//       node server.js local
let port = 80
if (process.argv[2] === 'local') {
  port = 8080
}
server.listen(port, () => console.log('Ready on localhost!')) */





//Server for Lab 7 : Mad Lib Assignment
// const express = require('express');
// const logger = require('morgan');
// const path = require('path');
// const fs = require('fs');
// const server = express();

//Middleware to parse URL-encoded bodies
// server.use(express.urlencoded({ extended: true }));
// server.use(logger('dev'));

//Setup static page serving for all the pages in "public"
// const publicServedFilesPath = path.join(__dirname, 'public');
// server.use(express.static(publicServedFilesPath));

//Route for displaying form (GET request)
//server.get('public/ITC505/lab7/index.html', (req, res) => {
 // res.sendFile(path.join(publicServedFilesPath, 'index.html'));
//});

// server.get('public/ITC505/lab7/index.html', (req, res) => {

//     res.sendFile(path.join(__dirname, 'public', 'index.html'));

// });
 
// app.get('/ITC505/lab7/index.html', (req, res) => {

//     res.sendFile(path.join(__dirname, 'public', 'ITC505', 'lab7', 'index.html'));

// });
 

//Routes
// server.get('/do_a_random', (req, res) => {
//     res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`);
// });

//POST route to handle form submission
// server.post('/submit', (req, res) => {
//     const { hero, adjective1, pluralNoun1, place, verbPast, adjective2, pluralNoun2, verb, exclamation, noun } = req.body;

//     // Check if all fields are filled out
//     if (!hero || !adjective1 || !pluralNoun1 || !place || !verbPast || !adjective2 || !pluralNoun2 || !verb || !exclamation || !noun) {
//         res.status(400).send(`
//             <html>
//           <head>
//               <link rel="stylesheet" type="text/css" href="/ITC505/lab-7/styles.css">
//           </head>
//           <body>
//             <h1>Submission Failed</h1>
//             <p>Please fill out ALL fields</p>
//             <a href="/ITC505/lab7/index.html" class="button">Go Back to Form</a>
//           </body>
//           </html>
//         `);
//         return;
//     }
    
//     const story = `
//         Once upon a time, there was a brave hero named <span class="user-input">${hero}</span>. <span class="user-input">${hero}</span> was known throughout the land for being incredibly <span class="user-input">${adjective1}</span>. One day, a group of <span class="user-input">${pluralNoun1}</span> appeared in the peaceful town of <span class="user-input">${place}</span>. The townspeople were terrified and didn't know what to do.

//         But <span class="user-input">${hero}</span> wasn't afraid. With a mighty roar, <span class="user-input">${hero}</span> <span class="user-input">${verbPast}</span> into action. Armed with only their <span class="user-input">${adjective2}</span> wits and a handful of <span class="user-input">${pluralNoun2}</span>, <span class="user-input">${hero}</span> set out to save the day.

//         As the <span class="user-input">${pluralNoun1}</span> approached, <span class="user-input">${hero}</span> didn't hesitate. <span class="user-input">${hero}</span> began to <span class="user-input">${verb}</span> with all their might. "<span class="user-input">${exclamation}</span>!" shouted the townspeople, watching in awe.

//         In the end, <span class="user-input">${hero}</span> triumphed. The <span class="user-input">${pluralNoun1}</span> were defeated, and peace was restored to <span class="user-input">${place}</span>. The townspeople cheered and hailed <span class="user-input">${hero}</span> as their savior. And so, the tale of <span class="user-input">${hero}</span> and the <span class="user-input">${noun}</span> became a legend that would be told for generations to come.
//     `;
    
//     res.send(`
//       <html>
//       <head>
//           <link rel="stylesheet" type="text/css" href="/ITC505/lab-7/styles.css">
//       </head>
//       <body>
//         <div class="form__title">Submission Successful</div>
//         <p class="form__description">${story}</p>
//         <a href="/ITC505/lab7/index.html" class="form__btn">Go Back to Form</a>
//       </body>
//       </html>
//     `);
// });



//The server uses port 80 by default unless you start it with the extra command line argument 'local' like this:
      //node server.js local
// let port = 80;
// if (process.argv[2] === 'local') {
//     port = 8080;
// }
// server.listen(port, () => console.log('Ready on localhost!'));
