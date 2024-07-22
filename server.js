// Server for Lab - 7 - 3
const express = require('express');
const logger = require('morgan');
const path = require('path');
const server = express();

// Middleware to parse URL-encoded bodies
server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

// Setup static page serving for all the pages in "public"
const publicServedFilesPath = path.join(__dirname, 'public');
server.use(express.static(publicServedFilesPath));

// Route for displaying form (GET request)
server.get('/ITC505/lab-7-copy/index.html', (req, res) => {
  res.sendFile(path.join(publicServedFilesPath, 'index.html'));
});

// POST route to handle form submission
server.post('/submit', (req, res) => {
    const { hero, adjective1, pluralNoun1, place, verbPast, adjective2, pluralNoun2, verb, exclamation, noun } = req.body;

    // Check if all fields are filled out
    if (!hero || !adjective1 || !pluralNoun1 || !place || !verbPast || !adjective2 || !pluralNoun2 || !verb || !exclamation || !noun) {
        res.status(400).send(`
            <p>Please fill out ALL fields</p>
        `);
        return;
    }
    
    const story = `
        Once upon a time, there was a brave hero named <span class="user-input">${hero}</span>. <span class="user-input">${hero}</span> was known throughout the land for being incredibly <span class="user-input">${adjective1}</span>. One day, a group of <span class="user-input">${pluralNoun1}</span> appeared in the peaceful town of <span class="user-input">${place}</span>. The townspeople were terrified and didn't know what to do.

        But <span class="user-input">${hero}</span> wasn't afraid. With a mighty roar, <span class="user-input">${hero}</span> <span class="user-input">${verbPast}</span> into action. Armed with only their <span class="user-input">${adjective2}</span> wits and a trusty <span class="user-input">${pluralNoun2}</span>, <span class="user-input">${hero}</span> confronted the <span class="user-input">${pluralNoun1}</span>. The battle was fierce, and it seemed like all hope was lost.

        Just when things were looking bleak, <span class="user-input">${hero}</span> remembered the advice of their wise mentor: "Always <span class="user-input">${verb}</span> with courage." With a newfound determination, <span class="user-input">${hero}</span> let out a triumphant "<span class="user-input">${exclamation}</span>!" and charged forward. In the end, the <span class="user-input">${pluralNoun1}</span> were defeated, and the town of <span class="user-input">${place}</span> was saved.

        The townspeople hailed <span class="user-input">${hero}</span> as a true hero, and everyone celebrated by dancing around a giant <span class="user-input">${noun}</span>. From that day on, <span class="user-input">${hero}</span> became a legend, known far and wide as the hero who never backed down.
    `;

    // Send the story as the response
    res.send(story);
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
