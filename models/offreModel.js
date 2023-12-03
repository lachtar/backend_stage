const mongoose = require("mongoose"); 

const OffreSchema = new mongoose.Schema({
     
  

    nomEntreprise: {
        type: String,
        required: true,
      },
    description: {
        type: String,
        required: true,
      },
    
      localisation: {
        type: String,
        required: true,

      },
      date_publication: {
        type: String,
        required: true,

      },
     
     
      

  
  
   
},

{ timestamps:true }

);

module.exports = mongoose.model('Offre' , OffreSchema) ;