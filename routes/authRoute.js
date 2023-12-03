const router = require('express').Router() ; 
const Profil =require('../models/profilModel');
const Offre =require('../models/offreModel');
const Demande = require('../models/demandeModel');
const authController = require("../controllers/authController");

const mongoose = require('mongoose');




// --------------------------------------- REGISTER --------------------------------------------------- //
router.post('/register1',authController.recruteurRegister);
router.post('/register',authController.stagiaireRegister);
router.post('/addprofile',authController.addProfile);
router.get('/listProfiles',authController.listProfiles);
router.post('/addOfrre',authController.addOffre);
router.get('/listOffre',authController.listOffre);
router.post('/addDemande',authController.addDemande);
router.get('/listDemande',authController.listDemande);

// Route pour télécharger le CV
router.get('/download-cv/:demandeId', async (req, res) => {
    try {
      const demande = await Demande.findById(req.params.demandeId);
  
      if (!demande || !demande.cv_stagiaire.data || demande.cv_stagiaire.contentType !== 'application/pdf') {
        return res.status(404).json({ error: 'CV not found or not a PDF' });
      }
  
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=cv.pdf',
      });
  
      return res.send(demande.cv_stagiaire.data);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });
  
  // Route pour télécharger la lettre de motivation
  router.get('/download-lettre-motivation/:demandeId', async (req, res) => {
    try {
      const demande = await Demande.findById(req.params.demandeId);
  
      if (!demande || !demande.lettre_motivation.data || demande.lettre_motivation.contentType !== 'application/pdf') {
        return res.status(404).json({ error: 'Lettre de motivation not found or not a PDF' });
      }
  
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=lettre_motivation.pdf',
      });
  
      return res.send(demande.lettre_motivation.data);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });




// --------------------------------------- LOGIN --------------------------------------------------- //
router.post('/login',authController.userLogin);
router.post('/resetpassword',authController.resetPassword);


router.get('/interface-stagiare', (req, res) => {
    res.json({ message: 'Bienvenue cher stagiaire' });
  });
  

  router.get('/interface-recruteur', (req, res) => {
    res.json({ message: 'Bienvenue cher recruteur'});
  });


  router.post('/profiles/:idProfile/modifier', async (req, res) => {
    try {
      const param = req.params.idProfile;
      const modifierProfile = {
        email : req.body.email,
        username : req.body.username,
        matricule: req.body.matricule,
        nomEntreprise: req.body.nomEntreprise,
        num_identite: req.body.num_identite,
        date_naissance: req.body.date_naissance,
        lieu_naissance: req.body.lieu_naissance,
        numero_tlp: req.body.numero_tlp,
        
      };
  
      const modifiedProfile = await Profil.findByIdAndUpdate(param, modifierProfile, { new: true });
  
      if (!modifiedProfile) {
        return res.status(404).json({ message: "projet introuvable" });
      }
  
      console.log('profile modifié :', modifiedProfile);
      return res.json({ message: 'profile modifié', Profile: modifiedProfile });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du projet :', error);
      res.status(500).json({ error: error.message });
    }
  });
  router.post('/Offre/:idOffre/modifier', async (req, res) => {
    try {
      const param = req.params.idOffre;
      const modifierOffre = {
        description: req.body.description,
        nomEntreprise: req.body.nomEntreprise,
        localisation:req.body.localisation,
        date_publication: req.body.date_publication,
         
        
      };
  
      const modifiedOffre = await Offre.findByIdAndUpdate(param, modifierOffre, { new: true });
  
      if (!modifiedOffre) {
        return res.status(404).json({ message: "offre introuvable" });
      }
  
      console.log('Offre modifié :', modifiedOffre);
      return res.json({ message: 'offre modifié', Offre: modifiedOffre });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du projet :', error);
      res.status(500).json({ error: error.message });
    }
  });
  //supprimer offre 
  router.delete('/Offre/:idOffre/supprimer', async (req, res) => {
    try {
      const param = req.params.idOffre;
      if (!mongoose.isValidObjectId(param)) {
        return res.status(400).json({ message: "ID  invalide" });
      }
      const deletedOffre = await Offre.deleteOne({ _id: param });
      if (deletedOffre.deletedCount === 1) {
        return res.status(200).json({ message: "Offre supprimé avec succès" });
      } else {
        return res.status(404).json({ message: "Offre introuvable" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });
  //button refuser 
  router.delete('/Demande/:idDemande/supprimer', async (req, res) => {
    try {
      const param = req.params.idDemande;
      if (!mongoose.isValidObjectId(param)) {
        return res.status(400).json({ message: "ID  invalide" });
      }
      const deletedDemande = await Demande.deleteOne({ _id: param });
      if (deletedDemande.deletedCount === 1) {
        return res.status(200).json({ message: "demande  supprimé avec succès" });
      } else {
        return res.status(404).json({ message: "demande introuvable" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

module.exports = router;