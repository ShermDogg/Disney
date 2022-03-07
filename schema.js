const bcrypt = require('bcrypt');
const dotenv =  require("dotenv");
const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment')
const { createJwtToken } = require ('./utils/auth');


dotenv.config();


const {GraphQLObjectType, GraphQLInt,
     GraphQLString, GraphQLBoolean,GraphQLNonNull, 
      GraphQLList,GraphQLSchema, GraphQLID } = require('graphql');
     
      
const axios = require('axios');
  



//launches
const UserType = new GraphQLObjectType({
    name: 'User',
    
    fields: () => ({     
    
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email:{type: GraphQLString},
        password: {type: GraphQLString},
        
       
        
        
        
        
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent,args){
                return Post.find({ authorID: parent.id });
            },
           
            
        }
    

    })
});


const PostType = new GraphQLObjectType({
    name: 'Post',
    
    fields: () => ({     
    
        id: {type: GraphQLID},
        email: {type:GraphQLString},
        body: {type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent,args) {
                return User.findById(parent.authorID);
            },
            comments: {
                type: new GraphQLList(CommentType),
                resolve(parent, args) {
                    return Comment.find({postId: parent.id})
                },
                
            
            }
        
        }
        
    })
});
const CommentType = new GraphQLObjectType({
    name: 'Comment',
    description: "Comment Type",
    fields: () => ({
        id: {type: GraphQLID},
        comment: {type: GraphQLString},

        user:{
            type: UserType,
            resolve(parent,args){
                return User.findById(parent.userID)
            },
        },
        post: {
            type: PostType,
            resolve(parent,args) {
                return Post.findById(parent.postId)

            }
        }


    }),
})

// Rocket type



//root query

const RootQuery =  new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        users: {
            type: new GraphQLList(UserType),
            
             resolve:  (parent,args) => {
                return  User.find({});
                


            }

        },
        user:{
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve: async(parent, args) => {
                return await User.findById(args.id);
            }
        },
        post:{
            type: PostType,
            args: { id: { type: GraphQLID } },
            resolve:(_, args) => {
                return Post.findById(args.id);
            }
        },
        posts:{
            type: new GraphQLList(PostType),
            resolve:  (parent,args) => {
                return  Post.find();
                


            }

           
            
        },
        comments:{
            type: new GraphQLList(CommentType),
            resolve() {
                return Comment.find()

            },
        },
         comment:{
             type: CommentType,
             args: {id: { type: GraphQLID}},
             resolve: async (_, args) => {
                 return await Comment.findById(args.id)

             }
         }
    }
});








const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: GraphQLString,
            args: {
                //GraphQLNonNull make these field required
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
                
                
                
            },
            
             resolve: async (parent, args) =>  {
                const {name,email,password} = args
               
                const hashed = await bcrypt.hash(password, 10)
                const user = await new User({
                    
                    name,
                    email,
                    password: hashed,
                    
            
                });
                
                
                 await  user.save();
                 const  token =  createJwtToken(user)
                
                 console.log(user)
                 return token
                 
                 
                 

            }
            
        },

        
        
        
        addPost: {
            type: PostType,
            args: {
                //GraphQLNonNull make these field require
                email: { type: new GraphQLNonNull(GraphQLString) },
                body: { type: new GraphQLNonNull(GraphQLString) },
                
            },
            resolve: async (parent, args, {verifiedUser}) => {
                console.log('Verified User:', verifiedUser)
                if (!verifiedUser) {
                    throw new Error("unAuthorized Mutha...")

                }
                
                let post = await new Post({
                    
                    email: args.email,
                    body: args.body,
                    authorID: verifiedUser._id,
                    
                    
                    
                    
                });
                 await  post.save();
                 console.log(post)
                 return post
            }
        },
        addComment: {
            type: CommentType,

            args: {
            comment: {type: new GraphQLNonNull(GraphQLString)},
            postId: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve: async (parent, args, {verifiedUser}) => {

                let comment = await new Comment({
                    
                   userID: verifiedUser._id,
                   postId: args.postId,
                   comment: args.comment,
                    
                    
                    
                    
                    
                    
                })
                
                await comment.save()
                
                return comment

            }


       },
        login: {
            type: GraphQLString,
            args: {
                //GraphQLNonNull make these field require
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
                
            },
            resolve: async (parent, args) => {
                const user = await User.findOne({email: args.email}).select("+password")
                console.log(user)
                if(!user || args.password !== user.password) {
                    throw new Error("INVALID CREDENTIALS")
                }
                 
               const token = createJwtToken(user) 
               return token
            }
        },
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
    
    
});