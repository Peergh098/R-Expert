const express = require('express');
const router = express.Router();
const { createContact, getAllContacts, replyToContact } = require('../controllers/contactController');
const { protect, adminOnly } = require('../middleware/auth');

router.post('/', createContact);
router.get('/', protect, adminOnly, getAllContacts);
router.put('/:id/reply', protect, adminOnly, replyToContact);

module.exports = router;
