// src/routes/applicantRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// IMPORT THE CONTROLLER
const { 
    createApplicant, 
    getAllApplicants, 
    deleteApplicant,
    getApplicantById, 
    updateApplicant 
} = require('../controllers/applicantControllers');

// -------------------------------
// Multer setup for file uploads
// -------------------------------
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/applicant_photos')); // folder to store photos
    },
    filename: (req, file, cb) => {
        // Make filename unique by adding timestamp
        cb(null, Date.now() + '_' + file.originalname);
    }
});

const upload = multer({ storage });

// -------------------------------
// Routes
// -------------------------------

// Fetch single applicant by ID
router.get('/:id', getApplicantById); 

// Fetch all applicants
router.get('/', getAllApplicants);

// Create applicant (with photo upload)
router.post('/create', upload.single('applicant_photo'), createApplicant);

// Update applicant (with optional photo upload)
router.put('/:id', upload.single('applicant_photo'), updateApplicant);

// Delete applicant
router.delete('/:id', deleteApplicant);

module.exports = router;
