
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require ('bcrypt-nodejs');
const cors = require('cors');
const { response } = require('express');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');
 const db = knex = require('knex')({
	client: 'pg',
	connection: {
	  host : '127.0.0.1',
	  user : 'postgres',
	  password : 'test',
	  database : 'smartbrain'
	}
  });

 
const app = express();
app.use(bodyParser.json());
app.use(cors());
 

app.get('/', (req, res)=>{	res.send('it is working !');})
app.post('/signin', (req,res)=>{signin.handleSignin(req,res,db,bcrypt)});
app.post('/register', (req,res)=> {register.handleRegister(req,res,db,bcrypt)}); 
app.get('/profile/:id', (req, res )=>{profile.handleProfile(req,res,db)});
app.put('/image', (req,res)=>{image.handleImage(req,res,db)})
app.post('/imageurl', (req,res)=>{image.handleApiCall(req,res)})
 
app.listen(process.env.PORT  || 3000, ()=>{
	console.log(`App is running on port ${process.env.PORT}`);
	
})