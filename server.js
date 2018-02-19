// start dev server with 'npm run dev', runs express and react servers concurrently
// start production server with 'npm start'

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

let http = require('http').Server(app);
let io = require('socket.io')(http);

const clear = require('clear');
clear();

const PORT = process.env.PORT || 3001;



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("static"));

app.use(routes);

// handle new socket io connection
io.on('connection', function(socket){
  console.log('connection');

  socket.on('joinRoom', newRoom => {
    console.log(`${newRoom.client} joined newRoom: ${newRoom.room}`);

    socket.join(newRoom.room);

    socket.on('updateState', nextState => {
      console.log(`${newRoom.client} sent State: ${nextState}`);
      socket.broadcast.to(newRoom.room).emit('updateState', nextState);
    });

    socket.on('increment', () => {
      console.log(`${newRoom.client} sent increment`);
      socket.broadcast.to(newRoom.room).emit('increment');
    })

  });
});







// Start the API server
http.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);
