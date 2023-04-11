require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const errorHandler=require('./handlers/error');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

const cors = require("cors");


const PORT = '8081';

app.use(bodyParser.json());
app.use(cors({
    origin:"*",
    preflightContinue:true
  }));
app.use('/api/auth',authRoutes);
app.use('/api/users',userRoutes);



app.get('/', (req,res)=>{
    res.send('hello');
})




app.use(function(req,res,next){
    let err = new Error('not found');
    err.status=404;
    next(err);
});
app.use(errorHandler);



app.listen(PORT, function(){
    console.log(`server on PORT ${PORT}`);
});