const clarifi = require('clarifai');
const app = new Clarifai.App({
  apiKey: 'ce7919e475474ca7b40ac4ee37c6c134'
 });
 const handleApiCall = (req,res)=>{
   app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
  .then(data => res.json(data))
  .catch(err=> res.status(400).json("unable to get API !!"))
  }
const handleImage=(req, res,db) => {
	const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries=>{
	 res.json(entries[0]);
  }).catch(err => res.status(400).json("unable to get count!!"))
	
};

module.exports ={

    handleImage:handleImage
    ,handleApiCall:handleApiCall
};