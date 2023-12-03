const mongoose = require("mongoose"); 

const ProfilSchema = new mongoose.Schema({
     
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

    matricule: {
        type : Number , 
        required : true , 

    },
    nomEntreprise: {
        type: String,
        required: true,
      },
    num_identite: {
        type: String,
        required: true,
      },
    
      date_naissance: {
        type: String,
        required: true,

      },
      lieu_naissance: {
        type: String,
        required: true,

      },
     
      numero_tlp:{
        type: String,
        required: true,

      }
      

  
  
   
},

{ timestamps:true }

);

module.exports = mongoose.model('Profil' , ProfilSchema) ;