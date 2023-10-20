const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : '1234',
      database : 'major_server'
    }
});
const app = express();
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
    res.send('success');
})
app.post('/signin', (req,res) => { signin.handleSignin(req, res, db, bcrypt) })
app.post('/register', (req,res) => { register.handleRegister(req, res, db, bcrypt) })
app.listen(3000, () =>{
    console.log('Server running on Port: 3000');
})