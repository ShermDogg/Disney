const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    comment: String,
    
    userId: String,

    postID: String,
    
   
    
    
    
});

module.exports = mongoose.model('comment', CommentSchema);