const express = require('express')
const app = express()

app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.post('/post', function (req, res) {
  console.log(req.body);
  res.send({ "ok": req.body });
})

app.post('/post2', function (req, res) {
  console.log(req.body);
  res.send({ "ok2": req.body });
})

app.listen(3000)

// a941437437de9c1f067d
// 6c1c6c470c508009813281ae2b90fa3d4fbf41b0
