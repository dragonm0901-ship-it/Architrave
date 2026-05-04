const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const validate = require('../middleware/validateRequest');
const { contactSchema } = require('../middleware/schemas');

// Post a contact submission
router.post('/', validate(contactSchema), contactController.createContactSubmission);


module.exports = router;

