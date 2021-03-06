const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//permite dados do tipo json

app.use(cors());


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/curso',{
    useNewUrlParser:true, useUnifiedTopology: true
});
mongoose.set('useCreateIndex', true)



const PORT = 3005
require('./src/app/controllers/index')(app);



app.listen(PORT, () => {
    
    console.log("Servidor Rodando")
})




//todos modelos estão dentro da pasta models

