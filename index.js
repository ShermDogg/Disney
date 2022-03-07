const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const {bodyParser} = require('body-parser')
const cors = require('cors');
const schema = require('./schema');
const connectDB = require('./db');
const {authenticate} = require('./middleware/auth');
const app = express();
app.use(cors());
const dotenv =  require("dotenv");
const { createJwtToken } = require('./utils/auth');
dotenv.config();

connectDB();

app.use(authenticate)

app.get('/',(req, res) => {
    console.log(req.verifiedUser)
    res.json({msg:"Welcome"})
    
}) 

app.get("/authtest", (req, res) => {
    res.json(
        createJwtToken({
            username: "jov boy",
            email: "beegin@gmail.com",
            password:"123456",
            admin: false,
        })
    )

})

 
   


  
app.use('/graphql',
 graphqlHTTP ({
    schema,
    graphiql:true,
    
})
);





    
    

app.listen(process.env.PORT, () => {
    console.log(`App running on PORT ${process.env.PORT}`);
});