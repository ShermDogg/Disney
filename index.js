const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const BodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    exposedHeaders: ['authorization']
    
}

const schema = require('./schema');
const connectDB = require('./db');


const {authenticate} = require('./middleware/auth');

const app = express();
app.use(cors(corsOptions))
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));



const dotenv =  require("dotenv");

dotenv.config();

connectDB();




app.use(authenticate)











app.use('/graphql',
 graphqlHTTP ({
    schema,
    graphiql:true,
    headerEditorEnabled: true
    
})
);






    
    

app.listen(process.env.PORT, () => {
    console.log(`App running on PORT ${process.env.PORT}`);
});