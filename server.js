
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require ('bcrypt-nodejs');
const cors = require('cors');
const { response } = require('express');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');
const knex = require('knex'); 


// HEROKU db connection
const db = knex({ // for connecting to PostgreSQL
	client: 'pg', // type of db
	connection: { 
	  connectionString: process.env.POSTGRES_URL, // dynamic database value from heroku hosting server    
	  ssl: {
		require: true,
		rejectUnauthorized: false
	  }
	}
  });

 
const app = express();
app.use(cors()); // use 'app.use' as is middleware
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded()); // Parse URL-encoded bodies
 

app.get('/', (req, res)=>{ res.send(`SmartBrain-Backend Running on port ${process.env.PORT}`)})
app.post('/signin', (req,res)=>{signin.handleSignin(req,res,db,bcrypt)});
app.post('/register', (req,res)=> {register.handleRegister(req,res,db,bcrypt)}); 
app.get('/profile/:id', (req, res )=>{profile.handleProfile(req,res,db)});
app.put('/image', (req,res)=>{image.handleImage(req,res,db)})
app.post('/imageurl', (req,res)=>{image.handleApiCall(req,res)})
 
app.listen(process.env.PORT  || 3000, ()=>{
	console.log(`App is running on port ${process.env.PORT}`);
	
})