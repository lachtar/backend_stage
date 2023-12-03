const mongoose = require("mongoose");

const DemandeSchema = new mongoose.Schema({
  username_stagiaire: {
    type: String,
    required: true,
  },
  cv_stagiaire: {
    data: {
      type: Buffer,
      required: true,
    },
    contentType: String,
  },
  lettre_motivation: {
    data: {
      type: Buffer,
      required: true,
    },
    contentType: String,
  },
  niveau_etude: {
    type: String,
    required: true,
  },
  date_naissance: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Demande', DemandeSchema);
