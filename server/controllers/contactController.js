const ContactMessage = require('../models/ContactMessage');
const { sendContactConfirmation, sendAdminReply, sendAdminContactNotification } = require('../utils/email');

const createContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const contact = await ContactMessage.create({ name, email, subject, message });

    sendContactConfirmation(contact).catch((err) =>
      console.error('Contact confirmation email error:', err.message)
    );
    sendAdminContactNotification(contact).catch((err) =>
      console.error('Admin contact notification error:', err.message)
    );

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (err) {
    next(err);
  }
};

const getAllContacts = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const total = await ContactMessage.countDocuments();
    const contacts = await ContactMessage.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({
      contacts,
      pagination: { total, page: parseInt(page), pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    next(err);
  }
};

const replyToContact = async (req, res, next) => {
  try {
    const { replyMessage } = req.body;
    const contact = await ContactMessage.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Message not found' });

    contact.isRead = true;
    contact.replyMessage = replyMessage;
    contact.repliedAt = new Date();
    await contact.save();

    await sendAdminReply(contact.email, contact.name, replyMessage, contact.subject);
    res.json({ message: 'Reply sent successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = { createContact, getAllContacts, replyToContact };
