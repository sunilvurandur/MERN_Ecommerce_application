import express from 'express';
import data from './data';
import dotenv from 'dotenv';
import config from './config';
import mongoose  from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
const path = require('path');
dotenv.config();


const mongodbURL = config.MONGODB_URL || 'mongodb://localhost/my_database';
mongoose.connect(mongodbURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).catch((error) => console.log(error.reason));

const app = express();

app.use(bodyParser.json())

app.use("/api/users", userRoute);
app.use("/api/products", productRoute);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('Client/build'))

    app.get('*', (req, res)=>{
        res.sendFile(path.join(__dirname, 'Client', 'build', 'index.html'));

    })
}

app.listen(process.env.PORT || 5000, () =>{
    console.log("Server started at 5000");
})