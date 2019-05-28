// implement your API here
const express = require('express');
const db = require('./data/db');

const server = express();

server.use(express.json()); // add this to make post and put work



server.get('/api/users/:id', (req, res) => {
  const id = req.params.id

  db
    .findById(id)
    .then( user => {
      if(!user) {
        res.status(404).json( {message: "The user with the specified ID does not exist."})
      } else {
      res.status(200).json( {user} )
      }
    })
    .catch( err => {
      res.status(500).json( {error: "The user information could not be retrieved."})
    });
})

server.get('/api/users', (req, res) => {
  db.find()
    .then(users => {
      // 200-299 success
      // 300-399 redirect
      // 400-499 client error
      // 500-599 server error
      res.status(200).json( {users} )
    })
    .catch( err => {
      res.status(500).json({ message: 'The users information could not be retrieved'} )
    });
});

server.post('/api/users', (req, res) => {
  // read data for the item
  const userInfo = req.body;
  console.log(userInfo);
  if(!userInfo.name || !userInfo.bio) {
    res.status(400).json( { 
      errorMessage: 'Please provide name and bio for the user'
    })
  }
  // add the item to our db
  db
    .insert(userInfo)
    .then(users => {
      res.status(201).json( {users} );
    })
    .catch( error => {
      res.status(500).json( {message: 'message'});
    })
  // let the client know what happened
})

server.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;

  db
    .remove(id)
    .then(users => {
      res.status(204).end();
    })
    .catch( error => {
      res.status(500).json( {message: 'message'});
    })
})

server.put('/api/users/:id', (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const changes = req.body;

  if(!changes.name || !changes.bio) {
    res.status(400).json( { 
      errorMessage: 'Please provide name and bio for the user.'
    })
  }

  db
    .update(id, changes)
      .then(updated => {
        if(updated) {
          res.status(200).json(updated);
        } else {
          res.status(404).json({ message: "The user with the specified ID does not exist."});
        }
      })
      .catch(error => {
        res.status(500).json( {message: "The user information could not be modified." });
      })
})

// server.get('/now', (req, res) => {
//   const now = new Date().toISOString();
//   res.send(now);
// });

// server.get('/api/users/:id', (req, res) => {

// })

// server.get('/', (req, res) => {
//   res.send('Hello World!');
// })

// server.get('/hobbits', (req, res) => {
//   const hobbits = [
//     {
//       id: 1,
//       name: 'Samwise Gamgee'
//     },
//     {
//       id: 2,
//       name: 'Frodo Baggins'
//     }
//   ];

//   res.status(200).json(hobbits);
// })

server.listen(8000, () => console.log('API Running on port 8000'));