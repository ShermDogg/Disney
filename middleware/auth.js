const jwt = require('jsonwebtoken');
const dotenv =  require("dotenv");
dotenv.config();


const authenticate = async (req, res, next) => {
    
    const token = req.headers.authorization?.split(" ")[1] || ""
    

    try {
        const verified =  jwt.verify(token, process.env.JWT_SECRET)
    
        req.verifiedUser = await verified.user
       
        
        
        console.log("Verification Success", verified)
         
        
        console.log(token)
        console.log(req.headers)
        
        next();
    } catch (error) {
        console.log("Verification failed")
        console.log(error)
        console.log(req.headers)
        next();
    }
}
module.exports = {authenticate}



