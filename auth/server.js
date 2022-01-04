const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }))

app.post('/auth', function (req, res) {
  /* This server is only available to nginx */ 
  if (req.body.key) {
      var streamkey = req.body.key;
  }
  
  /* You can make a database of user instead */
  if (streamkey === "secretkey") return res.status(200).send();

  /* Reject the stream */
  res.status(403).send();
});

app.listen(8000, function() {
    console.log("Listening on port 8000")
})