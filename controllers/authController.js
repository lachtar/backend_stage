const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const Profile = require('../models/profilModel');
const Offre = require('../models/offreModel');
const Demande = require('../models/demandeModel');






// Function for registering a stagiaire
const stagiaireRegister = async (req, res) => {
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(400).json({ message: 'This email already exists' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const stagiaire = new User({
    email: req.body.email,
    password: hashedPassword,
    username: req.body.username,
    confirmpassword: req.body.confirmpassword,
    role: 'Stagiaire'
  });

  try {
    const savedStagiaire = await stagiaire.save();
    const token = jwt.sign({ id: stagiaire._id }, process.env.token_secret);
    res.header('authtoken', token).json({
      
      id: stagiaire._id,
      message: 'Stagiaire registration successful',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Stagiaire registration failed' });
  }
};

// Function for registering a recruteur
const recruteurRegister = async (req, res) => {
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(400).json({ message: 'This email already exists' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
  const recruteur = new User({
    email: req.body.email,
    password: hashedPassword,
    username: req.body.username,
    num_identite: req.body.num_identite,
    confirmpassword: req.body.confirmpassword,
    nomEntreprise: req.body.nomEntreprise,
    site_Entreprise: req.body.site_Entreprise,
    localisation_Entreprise: req.body.localisation_Entreprise,
    role: 'recruteur'
  
  });
  

  try {
    const savedRecruteur = await recruteur.save();
    const token = jwt.sign({ id: recruteur._id }, process.env.token_secret);
    res.header('authtoken', token).json({
      
      id: recruteur._id,
      message: 'Recruteur registration successful',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Recruteur registration failed' });
  }
};


 const userLogin = async (req, res) => {
  try {
    // checking email existence
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error('Invalid email');
    }

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
      throw new Error('Wrong password');
    }

    const token = jwt.sign({ id: user._id }, process.env.token_secret);
    res.header('authtoken', token).json({ token: token, id: user._id, message: 'Login successful' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const resetPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: 'Email not found' });
    }

   

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.confirmPassword, salt);

    user.password = hashedPassword;

    const updatedUser = await user.save();
    const token = jwt.sign({ id: updatedUser._id }, process.env.token_secret);
    res.header('authtoken', token).json({
     
      message: 'Password reset successful',
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const addProfile= async (req, res) => {
  try {
    // Get project data from the request body
    const { email,username,matricule,nomEntreprise,num_identite,date_naissance,lieu_naissance,numero_tlp } = req.body;

   
    const newProfile = new Profile({
     email,
     username,
     matricule,
     nomEntreprise,
     num_identite,
     date_naissance,
     lieu_naissance,
     numero_tlp,
      
    });

    // Save the new project to the database
    const savedProfile = await newProfile.save();

    return res.status(200).json({ Profile: savedProfile});
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const listProfiles = async (req, res) => {
  try {
    // Récupérez tous les profils de la base de données
    const profiles = await Profile.find();

    // Retournez les profils en tant que réponse JSON
    return res.status(200).json({ profiles });
  } catch (error) {
    // Gérez les erreurs s'il y en a
    return res.status(500).json({ error: error.message });
  }
};
const addOffre= async (req, res) => {
  try {
    // Get project data from the request body
    const {nomEntreprise,description,localisation,date_publication}=req.body;
 
    const newOffre = new Offre({
    description,
     nomEntreprise,
     localisation,
     date_publication,
      
    });

    // Save the new project to the database
    const savedOffre = await newOffre.save();

    return res.status(200).json({ Offre: savedOffre});
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const listOffre = async (req, res) => {
  try {
    // Récupérez tous les profils de la base de données
    const Offres  = await Offre.find();

    // Retournez les profils en tant que réponse JSON
    return res.status(200).json({ Offres});
  } catch (error) {
    // Gérez les erreurs s'il y en a
    return res.status(500).json({ error: error.message });
  }
};
const addDemande= async (req, res) => {
  try {
    // Get project data from the request body
    const {username_stagiaire,cv_stagiaire,lettre_motivation,niveau_etude,date_naissance}=req.body;
 
    const newDemande = new Demande({
     username_stagiaire,
     cv_stagiaire,
     lettre_motivation,
     niveau_etude,
     date_naissance,
      
    });

    // Save the new project to the database
    const savedDemande = await newDemande.save();

    return res.status(200).json({ Demande: savedDemande});
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
const listDemande = async (req, res) => {
  try {
    // Récupérez tous les profils de la base de données
    const demandes = await Demande.find();

    // Retournez les profils en tant que réponse JSON
    return res.status(200).json({ demandes});
  } catch (error) {
    // Gérez les erreurs s'il y en a
    return res.status(500).json({ error: error.message });
  }
};


 module.exports = { userLogin ,stagiaireRegister,resetPassword,recruteurRegister,addProfile,listProfiles,addOffre,listOffre,addDemande,listDemande}