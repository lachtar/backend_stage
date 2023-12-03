const mongoose = require("mongoose"); 

const userSchema = new mongoose.Schema({
     
    email:{
        type : String , 
        required : true , 
        unique : true,

    },
  
    username: {
        type : String , 
        required : true,
        trim: true ,
        
    },

    password: {
        type : String , 
        required : true , 

    },
    role: {
        type: String,
        required: true,
      },
    num_identite: {
        type: String,
        required: true,
      },
    
      nomEntreprise: {
        type: String,
        required: true,

      },
      site_Entreprise: {
        type: String,
        required: true,

      },
     
      localisation_Entreprise:{
        type: String,
        required: true,

      }
      

  
  
   
},

{ timestamps:true }

);

module.exports = mongoose.model('User' , userSchema) ;