const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    email: String,
    
    body: String,

    authorID: String,
    
   
    
    
    
});

module.exports = mongoose.model('post', PostSchema);