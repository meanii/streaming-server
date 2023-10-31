import express from 'express';

const app = express();

const PORT = process.env.PORT || 8000;
const PASSWORD = process.env.PASSWORD || 'secretkey';

app.use(express.urlencoded({ extended: true }))


app.post('/auth', function (req, res) {
  console.log(`received request from ${req.ip} for /auth`)

  res.status(200).send();
  /* This server is only available to nginx */ 
  if (req.body.key) var streamkey = req.body.key;
  
  /* You can make a database of user instead */
  if (streamkey === PASSWORD) return res.status(200).send();

  /* Reject the stream */
  res.status(403).send();
});

app.post('/on_publish_done', function (req, res) {
  console.log(`received request from ${req.ip} for /on_publish_done`)
  console.log(req.body)
});


app.listen(PORT, function() {
    console.log(`Listening on port ${PORT}`)
})