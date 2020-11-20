//const connection = require('./config/conf');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan'); // npm i morgan
const app = express();
const multer = require('multer'); // npm install --save multer
const fs = require('fs');
const cors = require('cors'); // npm install cors
const passport = require('passport'); // npm install passport
const LocalStrategy = require('passport-local');
const jwt = require('jsonwebtoken'); // npm install jsonwebtoken
const JwtStrategy = require('passport-jwt').Strategy; // npm install passport-jwt
const ExtractJwt = require('passport-jwt').ExtractJwt; // npm install passport-local
const verifyToken = require('./verifyToken');
const key = require('./key');
const bcrypt = require('bcrypt'); // npm install bcrypt
const path = require('path');
//const axios = require('axios');

//const port = 8000;

require('dotenv').config();
const connection = require('./connection');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
//app.use(express.static(__dirname  +  '/public'));
app.use(cors());
app.use(express.static(path.join(__dirname, 'client/build')));


// app.use((req, res, next)=> {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

// PASSEPORT CONFIG STRATEGY
passport.use(new LocalStrategy(
  {
      usernameField: 'email',
      passwordField: 'password',
      session: false
  },
  function (email, password, cb) {
    console.log('hello toto')
    connection.query('SELECT userID, email, password FROM users WHERE email = ?', email , function (err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (bcrypt.compareSync(password, user[0].password)!=true) { return cb(null, false); }
      return cb(null, user);
  })
})
)

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: key
},
function (jwtPayload, cb) {
  console.log(jwtPayload)
  return cb(null, jwtPayload);
}
));

// TEST
app.get('/', (req, res) => {
  res.send('Bienvenue sur Express');
});

// app.get('/*', (req, res) => {
//   res.send(path.join(__dirname+'/client/build/index.html'));
// });


//GET USERS
app.get('/api/users', (req, res) => {
  connection.query('SELECT * from users', (err, results) => {
    if (err) {
      res.status(500).send("Erreur lors de la récupération des utilisateurs");
    } else {
      res.json(results);
    }
  });
});

//GET ONE USERS
app.get('/api/users/:userID', passport.authenticate('jwt', { session:  false }), (req, res) => {
  const idUser = req.params.userID;
  connection.query('SELECT * from users WHERE userID = ?', [idUser], (err, results) => {
    if (err) {
      res.status(500).send("Erreur lors de la récupération des utilisateurs");
    } else {
      res.json(results);
    }
  });
});

//POST USERS
app.post('/api/users', (req, res) => {
  const {lastname, firstname, sex, password, birthday, country, city, email, phone_number, description, avatar}  = req.body
  const hash = bcrypt.hashSync(password, 10, (err, hash) => {
    return hash
  });
  formData = {lastname, firstname, sex, password: hash, birthday, country, city, email, phone_number, description, avatar};
  console.log(formData)
    connection.query('INSERT INTO users (lastname, firstname, sex, password, birthday, country, city, email, phone_number, description, avatar) VALUES (?,?,?,?,?,?,?,?,?,?,?)', [formData.lastname, formData.firstname, formData.sex, formData.password, formData.birthday, formData.country, formData.city, formData.email, formData.phone_number, formData.description, formData.avatar], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la sauvegarde d'un utilisateur");
    } else {
      res.sendStatus(200);
    }
  });
});

//UPDATE USERS
app.put('/api/users', (req, res) => {
  console.log(req.body)
  const idUser = req.body.userID;
  console.log(req.body)
  const formData = req.body;
  connection.query('UPDATE users SET ? WHERE userID = ?', [formData, idUser], err => {
    if (err) {
      console.log(err);
      res.status(500).send('Erreur lors de la modification d\'un utilisateur');
    } else { 
      res.sendStatus(200);
    }
  });
});

//DELETE USERS
app.delete('/api/users/:userID', (req, res) => {
  const idUser = req.params.userID;
  connection.query('DELETE FROM users WHERE userID = ?', [idUser], err => {
    if (err) {
      console.log(err);
      res.status(500), send('Erreur lors de la suppression d\'un utilisateur');
    } else {
      res.sendStatus(200);
    }
  })
})


// GET TRAVEL
app.get('/api/travels', (req, res) => {
  connection.query('SELECT * from travels order by start_date desc', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des voyages');
    } else {
      res.json(results);
    }
  });
});

// GET TRAVEL BY USERID
app.get('/api/travels/:userID', passport.authenticate('jwt', { session:  false }), (req, res) => {
  const idUser = req.params.userID;
  connection.query('SELECT * from travels WHERE IDuser_creator = ?', [idUser], (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des voyages');
    } else {
      res.json(results);
    }
  });
});

// POST TRAVEL
app.post('/api/travels', (req, res) => {
  const formData = req.body
  console.log(formData)
  connection.query(
    'INSERT INTO travels SET ?',
    [formData], (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la sauvegarde d'un voyage");
      } else {
          res.sendStatus(200);
        // connection.query(
        //   'SELECT * FROM travels WHERE travelID = ?', 
        //   results.insertId, (err, results) => {
        //     if (err) {
        //       res.status(500).send('Erreur lors de la récupération des voyages');
        //     } else {
        //       res.status(200).json(results[0]);
        //     }
        //   }
        // )
      }
    }
  );
});

// UPDATE TRAVEL
app.put('/api/travels/:travelID', (req, res) => {
  const idTravel = req.body.travelID;
  const formData = req.body;
  connection.query('UPDATE travels SET ? WHERE travelID = ?', [formData, idTravel], err => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la modification d'un voyage");
    } else {
      res.sendStatus(200);
    }
  });
});

// DELETE TRAVEL
app.delete('/api/travels/:travelID', (req, res) => {
  const idTravel = req.params.travelID;
  connection.query('DELETE FROM travels WHERE travelID = ?', [idTravel], err => {
    if (err) {
       console.log(err);
      res.status(500).send("Error deleting a travel");
    } else {
      res.sendStatus(200);
    }
  });
}); 

// POST TRAVEL RESERVATION
app.post('/api/travel_user', (req, res) => {
  const formData = req.body
  console.log(formData)
  connection.query('INSERT INTO travel_user SET ?', [formData], (err, results) => {

    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la reservation d'un voyage");
    } else {
      res.sendStatus(200);
    }
  });
});

// GET USERS FROM RESERVED TRAVEL
app.get('/api/travels/:travelID/users',(req, res) => {
  const travelID = req.params.travelID
  connection.query('SELECT * FROM users AS u INNER JOIN travel_user AS tu ON u.userID = tu.id_user WHERE tu.id_travel = ?', [travelID], (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des utilistateurs');
    } else {
      res.json(results).status(200)
    }
  });
})




// app.get('/api/travels/:travelID/users', (req,res) => {
// app.get('/api/users/:userID/travels', (req,res) => {
// GET TRAVEL RESERVATION
app.get('/api/:userID/travel_user', (req,res) => {
  const userID = req.params.userID
  console.log(userID)
  connection.query('SELECT * FROM travels AS t INNER JOIN travel_user AS tu ON t.travelID = tu.id_travel WHERE tu.id_user = ?', [userID], (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des voyages');
    } else {
      res.json(results);
    }
  });
})

// app.delete('/api/travels/:travelID/users/:userID', (req,res) => {
// DELETE TRAVEL RESERVATION
app.delete('/api/travel_user/:travel_user_id', (req,res) => {
  const idTravel = req.params.travel_user_id
  //console.log(userID)
  connection.query('DELETE FROM travel_user WHERE travel_user_id = ?', [idTravel], (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la supression de la réservation');
    } else {
      res.json(results);
    }
  });
})

// SELECT * FROM travels AS t INNER JOIN travel_user AS tu ON t.travelID = tu.id_travel WHERE tu.id_user = 1

// LOGIN & TOKEN

app.post('/api/login', (req, res) => {
  passport.authenticate('local',(err, users, info) => {
    if(err)
      return res.status(500).send(err)
    if (!users)
      return res.status(400).json({flash: 'erreur de login'});

    const {userID} = users[0];
    const token = jwt.sign({userID}, key, {expiresIn: 60*60});
    return res.json({
      user: {userID},
      token
    })
 })(req, res)
})


// UPLOAD FILE
const upload = multer({ 
  dest: 'tmp/',
  limits: {
    files: 1, // allow only 1 file per request,
    fieldSize: 3* 1024 * 1024 // 3 MB (max file size)
  },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
      return cb(('Only images are allowed.'), false);
    }
    //cb(null, true);
    cb(null, file.originalname);
  } 
});

app.post('/uploaddufichier', upload.single('image'), (req, res) => {
  // fs.access('../tuktuktravel/public/'+ req.file.originalname, fs.constants.F_OK, (err) => {
  //   console.log(`${req.file.name} ${err ? 'does not exist' : 'exists'}`);
  //   if (!err) {
  //     fs.unlinkSync('../tuktuktravel/public/'+ req.file.originalname);
  //   }
  fs.rename(req.file.path, '../tuktuktravel/public' + req.file.originalname, function(err) {
  if (err) throw err;
  //   //res.redirect(targetUrl)
  //   //res.send('problème durant le transfert');
  res.send('Fichier transféré avec succès');
  console.log("filenewpath", req.file.path)
  });
});


// app.listen(port, (err) => {
//   if (err) {
//     throw new Error('Something bad happened...');
// 	}
// 	console.log(`Server is listening on ${port}`);
// });

module.exports = app;
