// const express = require('express');
// const path = require('path');

// //-------------------------------------------------------------------------
// const app = express();

// //--------------------------------------------------------------------------

// // setting up the encoders, so that we can get what is being sent by user on the frontend (in as it is format)---------------------------------------------
// app.use(express.json());
// app.use(express.urlencoded({ encoded: true }));

// //setting up static files ------- (to use static js and css files)--------
// app.use(express.static(path.join(__dirname, 'public')));

// //setting up of the ejs files----------------------------------------------
// app.set('view engine', 'ejs');

// app.get('/', function (req, res) {
//   // res.send('chal rha hai');
//   res.render('index.ejs');
// });

// app.get('/api/v1/:name/:age', function (req, res) {
//   res.send(`Hello, ${req.params.name} of age ${req.params.age} !`);
// });

// //------------------------------------------------------------------------------
// app.listen(3000, function () {
//   console.log('its running');
// });

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

//setting up the parsers-------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//setting up public folder's static files; ------------
app.use(express.static(path.join(__dirname, 'public')));

//setting up the ejs view engine------------------------
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  fs.readdir('./files', function (err, file) {
    console.log(file);
    res.render('index.ejs', { files: file });
  });
  // res.render('index.ejs');
});

app.post('/create', function (req, res) {
  // console.log(req.body);
  fs.writeFile(
    `./files/${req.body.title.split(' ').join('')}.txt`,
    req.body.details,
    function (err) {
      res.redirect('/');
    }
  );
});

app.get('/file/:filename', function (req, res) {
  fs.readFile(
    `./files/${req.params.filename}`,
    'utf-8',
    function (err, filedata) {
      // res.send()
      console.log(filedata);
    }
  );
});

app.get('/api/v1/:name/:age', function (req, res) {
  res.send(`Hello, ${req.params.name} of age ${req.params.age} !`);
});

app.listen(3000);
