const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const router = express.Router();
const port = 3000;

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

router.get('/hello', (req, res) => res.send('Hello World!'))

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))